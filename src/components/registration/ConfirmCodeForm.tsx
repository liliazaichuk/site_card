import React, { useState } from 'react';
import { Pencil, RotateCcw, Check } from 'lucide-react';

type Props = {
  onNext: () => void;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  step: number;
  userData: { phoneNumber?: string; countryCode?: string };
};

const ConfirmCodeForm: React.FC<Props> = ({ onNext, setUserData, userData }) => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errors, setErrors] = useState<{ confirmationCode?: { message: string }; phoneNumber?: { message: string } }>({});
  const [apiError] = useState<string | null>(null);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(userData.phoneNumber || '');

  const validateCode = (value: string) => {
    const pattern = /^\d{4}$/;
    if (!value) return 'Confirmation code is required';
    if (!pattern.test(value)) return 'Code must be 4 digits';
    if (value !== '1234') return 'Code is incorrect, please try again';
    return null;
  };

  const validatePhoneNumber = (value: string) => {
    const pattern = /^\d{3}\s\d{3}\s\d{4}$/;
    if (!value) return 'Phone number is required';
    if (!pattern.test(value)) return 'Phone number must be in the format 555 555 1234';
    return null;
  };

  const handleSubmit = () => {
    const codeError = validateCode(confirmationCode);
    if (codeError) {
      setErrors({ confirmationCode: { message: codeError } });
      return;
    }
    setErrors({});
    setUserData((prev: any) => ({ ...prev, confirmationCode }));
    onNext();
  };

  const handleSendAgain = () => {
    console.log('Sending code again for:', userData.phoneNumber);
  };

  const handleEditPhoneNumber = () => {
    setIsEditingPhone(true);
  };

  const handleSavePhoneNumber = () => {
    const phoneError = validatePhoneNumber(editedPhoneNumber);
    if (phoneError) {
      setErrors({ phoneNumber: { message: phoneError } });
      return;
    }
    setErrors({});
    setUserData((prev: any) => ({ ...prev, phoneNumber: editedPhoneNumber }));
    setIsEditingPhone(false);
  };

  return (
    <div className="w-full bg-white mt-20">
      <h2 className="text-3xl font-bold mb-2">Registration</h2>
      <p className="text-custom-gray mb-4 text-sm font-roboto font-light">
        Fill in the registration data. It will take a couple of minutes. All you need is a phone number and e-mail
      </p>

      <div className="mb-7 bg-white-50">
        <div className="flex items-center justify-between mb-4 border border-gray-300 p-4 rounded-md">
          {isEditingPhone ? (
            <div className="flex items-center space-x-2 flex-1">
              <span className="text-sm text-gray-700">{userData.countryCode || '+1'}</span>
              <div className="relative flex-1">
                <input
                  value={editedPhoneNumber}
                  onChange={(e) => setEditedPhoneNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 pr-10"
                  placeholder="555 555 1234"
                />
                <button onClick={handleSavePhoneNumber} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Check className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="pb-1 text-gray-700">{`${userData.countryCode || '+1'} ${userData.phoneNumber || '555 555 1234'}`}</p>
              <p className="text-sm text-custom-gray">Number not confirmed yet</p>
            </div>
          )}
          {!isEditingPhone && (
            <button onClick={handleEditPhoneNumber}>
              <Pencil className="w-5 h-5 text-blue-600" />
            </button>
          )}
        </div>
        {errors.phoneNumber && isEditingPhone && (
          <p className="text-red-500 text-sm mt-1 mb-4">{errors.phoneNumber.message}</p>
        )}

        <label className="block text-sm text-gray-700 mb-2 mt-8">Confirmation code</label>
        <div className="flex items-center space-x-2">
          <input
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="flex-1 border-b border-gray-300 px-3 py-2 text-2xl focus:outline-none focus:border-b-blue-600"
            placeholder="- - - -"
            maxLength={4}
          />
          <button
            onClick={handleSendAgain}
            className="font-roboto font-medium flex items-center text-blue-600 text-sm hover:text-blue-700"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Send again
          </button>
        </div>
        <p className="text-custom-gray text-xs mt-2">Confirm phone number with code from SMS message</p>
        {errors.confirmationCode && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmationCode.message}</p>
        )}
      </div>

      {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

      <button
        type="submit"
        className="font-roboto font-medium text-sm bg-white-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        onClick={handleSubmit}
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmCodeForm;