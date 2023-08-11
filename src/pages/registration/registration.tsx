import './registration.scss';
import useInput from '../../components/UI/useInput';
const RegistrationPage = () => {
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const password = useInput('');
  const birthDate = useInput('');
  const country = useInput('');
  const city = useInput('');
  const street = useInput('');
  const postalCode = useInput('');

  return (
    <div className="registration">
      <h1>Registration</h1>
      <div className="registration__container">
        <form className="registration__form form">
          <input {...firstName} className="registration__input app__input_text" type="text" placeholder="First name" />
          <input {...lastName} className="registration__input app__input_text" type="text" placeholder="Last name" />
          <input {...email} className="registration__input app__input_email" type="email" placeholder="Email" />
          <input
            {...password}
            className="registration__input app__input_password"
            type="password"
            placeholder="Password"
          />
          <input
            {...birthDate}
            className="registration__input app__input_date"
            type="date"
            placeholder="Date of birth"
          />
          <input {...country} className="registration__input app__input_text" type="text" placeholder="Country" />
          <input {...city} className="registration__input app__input_text" type="text" placeholder="City" />
          <input {...street} className="registration__input app__input_text" type="text" placeholder="Street" />
          <input
            {...postalCode}
            className="registration__input app__input_number"
            type="number"
            min="0"
            placeholder="Postal code"
          />
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
