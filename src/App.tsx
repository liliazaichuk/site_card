import { useState } from 'react';
import PhoneNumberForm from './components/registration/PhoneNumberForm';
import ConfirmCodeForm from './components/registration/ConfirmCodeForm';
import EmailPasswordForm from './components/registration/EmailPasswordForm';
import PersonalDataForm from './components/profile/PersonalDataForm';
import ContactsForm from './components/profile/ContactsForm';
import DeliveryAddressForm from './components/profile/DeliveryAddressForm';

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

function App() {
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<UserData>({});

  const handleNext = () => setStep((prev) => prev + 1);
  const handleSave = () => {
    console.log('User Data:', userData);
    setStep(1);
  };

  const getProgressStep = (step: number) => {
    if (step <= 3) return step;
    if (step === 4) return 1;
    if (step === 5) return 2;
    if (step === 6) return 3;
    return 1; 
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <img src="./img/Vector.png" alt="Vector" className="h-6 w-6" />
        <span className="text-xl font-semibold text-gray-800">COMPANY NAME</span>
      </div>

      <div className="flex flex-col items-center pt-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      getProgressStep(step) >= s ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                  {s < 3 && <div className="w-12 h-0.5 bg-gray-300 mr-2.5 ml-4"></div>}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <PhoneNumberForm onNext={handleNext} setUserData={setUserData} step={step} />
          )}
          {step === 2 && (
            <ConfirmCodeForm
              onNext={handleNext}
              setUserData={setUserData}
              step={step}
              userData={userData}
            />
          )}
          {step === 3 && (
            <EmailPasswordForm
              onNext={handleNext}
              setUserData={setUserData}
              step={step}
              userData={userData}
            />
          )}
          {step === 4 && (
            <PersonalDataForm
              onNext={handleNext}
              setUserData={setUserData}
              step={step}
              userData={userData}
            />
          )}
          {step === 5 && (
            <ContactsForm
              onNext={handleNext}
              setUserData={setUserData}
              step={step}
              userData={userData}
            />
          )}
          {step === 6 && (
            <DeliveryAddressForm
              onNext={handleSave}
              setUserData={setUserData}
              step={step}
              userData={userData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;