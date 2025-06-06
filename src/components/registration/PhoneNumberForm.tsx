import { useForm } from 'react-hook-form';
import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

type PhoneNumberFormData = {
  phoneNumber: string;
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

interface PhoneNumberFormProps {
  onNext: () => void;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  step: number;
}

const countryCodes = [
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+38', country: 'Ukraine' },
];

export default function PhoneNumberForm({ onNext, setUserData}: PhoneNumberFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PhoneNumberFormData>({
    defaultValues: {
      phoneNumber: '',
    },
  });

  const [selectedCode, setSelectedCode] = useState(countryCodes[0].code);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPrivacyMessage, setShowPrivacyMessage] = useState(true);

  const onSubmit = async (data: PhoneNumberFormData) => {
  try {
    setUserData((prev: any) => ({ ...prev, phoneNumber: data.phoneNumber, countryCode: selectedCode }));
    setApiError(null);
    onNext();
  } catch (error) {
    setApiError('Failed to send code. Please try again.');
  }
};

  return (
    <div className="w-full bg-white mt-20">
      <h2 className="text-3xl font-bold mb-2">Registration</h2>
      <p className="text-custom-gray mb-4 text-sm font-roboto font-light">
        Fill in the registration data. It will take a couple of minutes. All you need is a phone number and e-mail
      </p>
      
      {showPrivacyMessage && (
        <div className="bg-gray-100 p-5 rounded-md text-sm mb-6 flex items-center">
          <img src="./img/lock.png" alt="Vector" className="h-5 w-4 mr-2" />
          <p className="flex-1">
          We take privacy issues seriously. You can be sure that your personal data is securely protected.
          </p>
          <button 
            className="ml-2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPrivacyMessage(false)}
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="mb-7 p-9 bg-white-50 border border-gray-200 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">Enter your phone number</label>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Listbox value={selectedCode} onChange={setSelectedCode}>
              <Listbox.Button className="bg-white border-b border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none flex">
                {selectedCode}
                <ChevronDown className="ml-2 w-4 mt-0.5 h-4 text-gray-700" />
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 w-auto border rounded-md bg-white shadow-lg z-10">
                {countryCodes.map((item) => (
                  <Listbox.Option
                    key={item.code}
                    value={item.code}
                    className="px-4 py-2  hover:bg-gray-100 duration-200 cursor-pointer text-sm"
                  >
                    {item.code} ({item.country})
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
          
          <input
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^\d{3}\s\d{3}\s\d{4}$/,
                message: 'Phone number must be in the format 555 555 1234',
              },
            })}
            className="flex-1 border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-200"
            placeholder="555 555 1234"
          />
        </div>
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
        )}
      </div>

      {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

      <button
        type="submit"
        className="text-sm bg-white-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        onClick={handleSubmit(onSubmit)}
      >
        Send Code
      </button>
    </div>
  );
}