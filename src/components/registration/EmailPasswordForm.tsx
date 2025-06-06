import React, { useState } from 'react';
import { useForm, Validate } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

type EmailPasswordFormData = {
  email: string;
  password: string;
};

type UserData = {
  phoneNumber?: string;
  countryCode?: string;
  country?: string;
  city?: string;
  email?: string;
  password?: string;
};

interface EmailPasswordFormProps {
  onNext: () => void;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  userData: UserData;
  step: number;
}

const EmailPasswordForm: React.FC<EmailPasswordFormProps> = ({ onNext, setUserData, userData}) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<EmailPasswordFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange', 
  });

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  console.log('userData in EmailPasswordForm:', userData);

  const password = watch('password');

  const validatePassword: Validate<string, EmailPasswordFormData> = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return true;
  };

  const validateEmail: Validate<string, EmailPasswordFormData> = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Invalid email format';
    return true;
  };

  const onSubmit = (data: EmailPasswordFormData) => {
    try {
      setUserData((prev: any) => ({
        ...prev,
        email: data.email,
        password: data.password,
      }));
      setApiError(null);
      onNext();
    } catch (error) {
      setApiError('Failed to register. Please try again.');
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="w-full bg-white mt-20">
      <h2 className="text-3xl font-bold mb-2">Registration</h2>
      <p className="text-custom-gray mb-4 text-sm font-roboto font-light">
        Fill in the registration data. It will take a couple of minutes. All you need is a phone number and e-mail
      </p>

      <div className="mb-7 bg-white-50">
        <div className="flex items-center justify-between mb-4 border border-gray-300 p-4 rounded-md">
          <div>
            <p className="pb-1 text-gray-700">{`${userData.countryCode || '+1'} ${userData.phoneNumber || '555 555-1234'}`}</p>
            <p className="text-sm text-custom-gray">✓ Number confirmed</p>
          </div>
        </div>

        <div className="mb-6 p-8 bg-white border border-gray-300 rounded-md">
          <label className="block text-sm text-gray-700 mb-2">Enter your email</label>
          <input
            {...register('email', {
              validate: validateEmail,
            })}
            className="w-full border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-b-blue-600"
            placeholder="alex_manager@gmail.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

          <label className="block text-sm text-gray-700 mb-2 mt-8">Set a password</label>
          <div className="relative">
            <input
              {...register('password', {
                validate: validatePassword,
              })}
              type={showPassword ? 'text' : 'password'}
              className="w-full border-b border-gray-300 px-2 py-2 text-sm focus:outline-none focus:border-b-blue-600 pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          {password && !errors.password && password.length >= 6 && (
            <p className="text-green-600 text-xs mt-1">✓ Good password</p>
          )}
        </div>

        {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

        <button
          type="submit"
          className="font-medium text-sm bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
          onClick={handleSubmit(onSubmit)}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EmailPasswordForm;