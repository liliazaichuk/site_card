import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown, ChevronRight } from 'lucide-react';

type PersonalDataFormData = {
  firstName: string;
  secondName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  itin: string;
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

interface PersonalDataFormProps {
  onNext: () => void;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  step: number;
  userData: UserData;
}

const PersonalDataForm: React.FC<PersonalDataFormProps> = ({ onNext, setUserData}) => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<PersonalDataFormData>({
    defaultValues: {
      firstName: '',
      secondName: '',
      dateOfBirth: '',
      placeOfBirth: '',
      itin: '',
      termsOfUse: false,
    },
    mode: 'onSubmit', 
  });

  const itin = watch('itin');
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

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
      setValue('placeOfBirth', `${selectedCity}, ${selectedCountry}`, { shouldValidate: true });
    } else if (selectedCountry) {
      setValue('placeOfBirth', selectedCountry, { shouldValidate: true });
    } else {
      setValue('placeOfBirth', '', { shouldValidate: true });
    }
  }, [selectedCity, selectedCountry, setValue]);

  const onSubmit = (data: PersonalDataFormData) => {
    setUserData((prev: any) => ({
      ...prev,
      firstName: data.firstName,
      lastName: data.secondName,
      dateOfBirth: data.dateOfBirth,
      placeOfBirth: data.placeOfBirth,
      itin: data.itin,
    }));
    onNext();
  };

  const displayValue = selectedCity && selectedCountry
    ? `${selectedCity}, ${selectedCountry}`
    : selectedCountry || 'Select a country and city';

  const cityHint = selectedCountry && !selectedCity ? 'Select city' : '';

  return (
    <div className="w-full bg-white mt-20">
      <h2 className="text-3xl font-bold">Profile info</h2>
      <p className="text-custom-gray mb-4 text-sm font-roboto font-light">
        Fill in the data for profile. It will take a couple of minutes. You only need a passport
      </p>

      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          {...register('termsOfUse', { required: 'You must agree with Terms of use' })}
          className="mr-2"
        />
        <span className="text-sm">
          I agree with <span className="text-blue-600">Terms of use</span>
        </span>
      </label>
      {errors.termsOfUse && <p className="text-red-500 text-xs mb-1">{errors.termsOfUse.message}</p>}

      <div className="mb-7 px-6 pt-3 bg-white border border-gray-300 rounded-md">
        <h3 className="text-lg font-medium mb-1 mt-1">Personal data</h3>
        <p className="text-sm text-gray-500 mb-4">Specify exactly as in your passport</p>

        <label className="block text-sm text-gray-700 mb-2">First name</label>
        <input
          {...register('firstName', { required: 'First name is required' })}
          className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-b-blue-600 "
          placeholder="Alexander"
        />
        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}

        <label className="block text-sm text-gray-700 mb-2">Second name</label>
        <input
          {...register('secondName', { required: 'Second name is required' })}
          className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-b-blue-600"
          placeholder="Smith"
        />
        {errors.secondName && <p className="text-red-500 text-xs">{errors.secondName.message}</p>}

        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              {...register('dateOfBirth', { required: 'Date of Birth is required' })}
              className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-b-blue-600"
            />
            {errors.dateOfBirth && <p className="text-red-500 text-xs">{errors.dateOfBirth.message}</p>}
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-700 mb-2">Place of Birth</label>
            <Listbox value={selectedCity || selectedCountry} onChange={(value) => {
              if (!selectedCountry) {
                setSelectedCountry(value as string);
              } else {
                setSelectedCity(value as string);
              }
            }}>
              <div className="relative">
                <Listbox.Button className="w-full border-b border-gray-300 px-3 py-2 text-sm text-left focus:outline-none focus:border-b-blue-600 flex justify-between items-center z-50">
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
                  <Listbox.Options className="absolute mt-1 max-h-60 z-50 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
              {...register('placeOfBirth', { required: 'Place of Birth is required' })}
            />
            {errors.placeOfBirth && <p className="text-red-500 text-xs">{errors.placeOfBirth.message}</p>}
            {cityHint && <p className="text-red-500 text-xs mt-1">{cityHint}</p>}
          </div>
        </div>
      </div>
      <div className="mb-5 px-6 bg-white border border-gray-300 rounded-md">
        <div className="relative mb-4">
          <input
            {...register('itin', {
              required: 'ITIN is required',
              pattern: {
                value: /^\d{3}-\d{2}-\d{3}$/,
                message: 'ITIN must be in format 123-45-678',
              },
            })}
            className="w-full border-b border-gray-300 pt-4 text-sm focus:outline-none focus:border-b-blue-600"
            placeholder="123-45-678"
          />
          {errors.itin && <p className="text-red-500 text-xs mt-1">{errors.itin.message}</p>}
          {itin && !errors.itin && (
            <p className="text-green-600 text-xs mt-1">✓ Your ITIN</p>
          )}
        </div>
        </div>
      <button
          type="submit"
          className="font-roboto font-medium text-sm bg-white-600 border border-gray-300 pl-4 pr-1 py-2 mb-5 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
          onClick={handleSubmit(onSubmit)}
        >
          Go Next<ChevronRight size={18} className="ml-1" />
        </button>
    </div>
  );
};

export default PersonalDataForm;