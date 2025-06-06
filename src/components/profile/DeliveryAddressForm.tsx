import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';

type DeliveryAddressFormData = {
  country: string;
  city: string;
  address: string;
  zipCode: string;
  termsOfUse: boolean;
};

type UserData = {
  phoneNumber?: string;
  confirmationCode?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  facebook?: string;
  telegram?: string;
  address?: string;
  city?: string;
  country?: string;
};

interface DeliveryAddressFormProps {
  onNext: () => void;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  step: number;
  userData: UserData;
}

const DeliveryAddressForm: React.FC<DeliveryAddressFormProps> = ({ onNext, setUserData, userData }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<DeliveryAddressFormData>({
    defaultValues: {
      country: userData.country || '',
      city: userData.city || '',
      address: userData.address || '',
      zipCode: '',
      termsOfUse: false,
    },
    mode: 'onSubmit',
  });

  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>(userData.country || '');
  const [selectedCity, setSelectedCity] = useState<string>(userData.city || '');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        const data = await response.json();
        const countryList = data.data.map((country: any) => country.country);
        setCountries(countryList);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountry) {
        try {
          const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: selectedCountry }),
          });
          const data = await response.json();
          if (data.data) {
            setCities(data.data);
          } else {
            setCities([]);
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
          setCities([]);
        }
      } else {
        setCities([]);
        setSelectedCity('');
      }
    };
    fetchCities();
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCity && selectedCountry) {
      setValue('city', selectedCity, { shouldValidate: true });
      setValue('country', selectedCountry, { shouldValidate: true });
    } else if (selectedCountry) {
      setValue('country', selectedCountry, { shouldValidate: true });
      setValue('city', '', { shouldValidate: true });
    } else {
      setValue('country', '', { shouldValidate: true });
      setValue('city', '', { shouldValidate: true });
    }
  }, [selectedCity, selectedCountry, setValue]);

  const onSubmit = (data: DeliveryAddressFormData) => {
    setUserData((prev: any) => ({
      ...prev,
      country: data.country,
      city: data.city,
      address: data.address,
      zipCode: data.zipCode,
    }));
    console.log('User Data:', userData);
    onNext();
  };

  const displayValue = selectedCity && selectedCountry
    ? `${selectedCity}, ${selectedCountry}`
    : selectedCountry || 'Select a country and city';

  const cityHint = selectedCountry && !selectedCity ? 'Выберете город' : '';

  return (
    <div className="w-full bg-white mt-20">
      <h2 className="text-3xl font-bold mb-2">Profile info</h2>
      <p className="text-custom-gray mb-4 text-sm font-roboto font-light">
        Fill in the data for profile. It will take a couple of minutes. You only need a passport
      </p>


      <div className="mb-7 p-4 bg-white border border-gray-300 rounded-md">
        <h3 className="text-lg font-medium mb-2 mt-2">Delivery address</h3>
        <p className="text-sm text-gray-500 mb-4">Specify the address where the order will be delivered</p>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">Country and city</label>
          <Listbox value={selectedCity || selectedCountry} onChange={(value) => {
            if (!selectedCountry) {
              setSelectedCountry(value as string);
            } else {
              setSelectedCity(value as string);
            }
          }}>
            <div className="relative">
              <Listbox.Button className="w-full border-b border-gray-300 px-3 py-2 text-sm text-left focus:outline-none focus:border-b-blue-600 flex justify-between items-center">
                <span className={selectedCity || selectedCountry ? 'text-gray-900' : 'text-gray-400'}>
                  {displayValue}
                </span>
                <ChevronDown size={18} className="text-gray-400" />
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  {(!selectedCountry ? countries : cities).map((item, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                        }`
                      }
                      value={item}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {item}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <Check size={18} />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <input
            type="hidden"
            {...register('country', { required: 'Country is required' })}
          />
          <input
            type="hidden"
            {...register('city', { required: 'City is required' })}
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
          {cityHint && <p className="text-red-500 text-sm mt-1">{cityHint}</p>}
        </div>

        <label className="block text-sm text-gray-700 mb-2">Address</label>
        <input
          {...register('address', { required: 'Address is required' })}
          className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-b-blue-600 mb-4"
          placeholder="Main Street 123"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}

        <label className="block text-sm text-gray-700 mb-2">Zip Code</label>
        <input
          {...register('zipCode', { required: 'Zip Code is required' })}
          className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-b-blue-600 mb-4"
          placeholder="12345"
        />
        {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>}
      </div>
      <button
          type="submit"
          className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
          onClick={handleSubmit(onSubmit)}
        >
          <Check size={18} className="mr-2" />
          Save
        </button>
    </div>
  );
};

export default DeliveryAddressForm;