import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown, ChevronRight } from 'lucide-react';

type ContactsFormData = {
  email: string;
  phone: string;
  socialType1: string;
  socialHandle1: string;
  termsOfUse: boolean;
  [key: string]: string | boolean; 
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
  countryCode?: string;
};

interface ContactsFormProps {
  onNext: () => void;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  step: number;
  userData: UserData;
}

const ContactsForm: React.FC<ContactsFormProps> = ({ onNext, setUserData, userData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactsFormData>({
    defaultValues: {
      email: userData.email || '',
      phone: userData.phoneNumber || '',
      socialType1: 'Skype',
      socialHandle1: '',
      termsOfUse: false,
    },
    mode: 'onSubmit',
  });

  const [socialFields, setSocialFields] = useState([{ type: 'Skype', handle: '' }]);
  const socialOptions = ['Skype', 'Facebook', 'Instagram', 'TikTok'];

  const onSubmit = (data: ContactsFormData) => {
    setUserData((prev: any) => ({
      ...prev,
      email: data.email,
      phoneNumber: data.phone,
      ...socialFields.reduce((acc, field, index) => ({
        ...acc,
        [`${field.type.toLowerCase()}`]: data[`socialHandle${index + 1}`],
      }), {}),
    }));
    onNext();
  };

  const addSocialField = () => {
    setSocialFields([...socialFields, { type: 'Skype', handle: '' }]);
  };

  return (
    <div className="w-full bg-white mt-20">
      <h2 className="text-3xl font-bold mb-2">Profile info</h2>
      <p className="text-custom-gray mb-4 text-sm font-roboto font-light">
        Fill in the data for profile. It will take a couple of minutes. You only need a passport
      </p>

      <div className="mb-7 p-6 bg-white border border-gray-300 rounded-md">
        <h3 className="text-lg font-medium mb-2">Contacts</h3>
        <p className="text-sm text-gray-500 mb-4">These contacts are used to inform about orders</p>

        <label className="block text-sm text-gray-700 mb-2">Email</label>
        <input
          {...register('email', { required: 'Email is required' })}
          className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-b-blue-600 mb-4 flex items-center"
          placeholder="alex_manager@gmail.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

        <label className="block text-sm text-gray-700 mb-2">Phone</label>
        <div className="flex items-center w-full border-b border-gray-300 px-3 py-2 text-sm focus-within:border-b-blue-600 mb-4">
          <span className="text-gray-400 mr-4">
            {userData.countryCode || '+1'}
          </span>
          <input
            {...register('phone', { required: 'Phone is required' })}
            className="w-full focus:outline-none"
            placeholder="123-4567"
          />
        </div>
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}

        <h3 className="text-lg font-medium mb-2 mt-4">Social network</h3>
        <p className="text-sm text-gray-500 mb-4">Indicate the desired communication method</p>

        {socialFields.map((field, index) => (
          <div key={index} className="flex items-center mb-4">
            <Listbox value={field.type} onChange={(value) => {
              const newFields = [...socialFields];
              newFields[index].type = value;
              setSocialFields(newFields);
            }}>
              <div className="relative w-1/3 mr-2">
                <Listbox.Button className="w-full border-b border-gray-300 px-3 py-2 text-sm text-left focus:outline-none focus:border-b-blue-600 flex items-center">
                  <span className={field.type ? 'text-gray-900' : 'text-gray-400'}>
                    {field.type}
                  </span>
                  <ChevronDown size={18} className="ml-2 text-gray-400" />
                </Listbox.Button>
                <Transition
                  as={React.Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    {socialOptions.map((option, idx) => (
                      <Listbox.Option
                        key={idx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                          }`
                        }
                        value={option}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {option}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                <Check size={18} />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <input
              {...register(`socialHandle${index + 1}` as const, { required: 'Social handle is required' })}
              className="w-2/3 border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-b-blue-600"
              placeholder={field.type === 'Skype' ? '@alex_92' : field.type === 'Instagram' ? '@instagram_handle' : field.type === 'TikTok' ? '@tiktok_handle' : '@profile'}
            />
            {errors[`socialHandle${index + 1}` as keyof ContactsFormData] && (
              <p className="text-red-500 text-sm mt-1">{errors[`socialHandle${index + 1}` as keyof ContactsFormData]?.message}</p>
            )}
          </div>
        ))}

        <button
          type="button"
          className="text-blue-600 text-sm font-medium mt-2"
          onClick={addSocialField}
        >
          + Add More
        </button>
      </div>
      <button
        type="submit"
        className="font-roboto font-medium text-sm bg-white-600 border border-gray-300 pl-4 pr-1 py-2 mb-5 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
        onClick={handleSubmit(onSubmit)}
      >
        Go Next <ChevronRight size={18} className="ml-1" />
      </button>
    </div>
  );
};

export default ContactsForm;