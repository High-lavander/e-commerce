import './registration.scss';
import useInput from '../../hooks/useInput';
import { FormEvent, useEffect } from 'react';
import { getAnonymousSessionToken } from '../../api';
import { InputElement } from '../../components';
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

  // const validateEmailCb = (element: HTMLInputElement) => {
  //   if (element.validity.typeMismatch) {
  //     console.log('not valid');
  //   }
  // };

  // const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
  //   email.onChange(e);
  //   email.value !== 'car' ? email.setError('no car') : email.setError('isCar');
  // };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const postForm = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      birthDate: birthDate.value,
      country: country.value,
      city: city.value,
      street: street.value,
      postalCode: postalCode.value,
    };

    console.log('postform', postForm);
  };

  useEffect(() => {
    const fetchAnonToken = async () => {
      const response = await getAnonymousSessionToken();
      console.log(response);
    };
    fetchAnonToken();
  }, []);

  return (
    <div className="registration">
      <div className="registration__container">
        <div className="registration__column column__left">
          <div className="registration__title-description">Already registered?</div>
          <p className="registration__description_welcome">
            Welcome back! Please enter your
            <br /> credentials to access your account.
          </p>
          <button className="registration__button">
            Log In<span className="registration__button-icon"></span>
          </button>
        </div>
        <div className="registration__column column__right">
          <div className="registration__title-description">Sign Up for an Account</div>
          <p className="registration__description_join">Join us! Create an account to access our features.</p>
          <form className="registration__form form" onSubmit={handleSubmit}>
            {/* <label className="registration__label" htmlFor="firstName">
              <input
                {...firstName}
                id="firstName"
                className="registration__input app__input_text"
                type="text"
                placeholder="First name"
              />
              <span className="registration__input-placeholder"></span>
            </label> */}

            {/* <label className="registration__label" htmlFor="lastName">
              <input
                {...lastName}
                id="lastName"
                className="registration__input app__input_text"
                type="text"
                placeholder="Last name"
              />
              <span className="registration__input-placeholder"></span>
            </label> */}
            <InputElement
              id="firstName"
              className="registration__input app__input_text"
              type="text"
              placeholder="First name"
              {...firstName}
            />
            <InputElement
              id="lastName"
              className="registration__input app__input_text"
              type="text"
              placeholder="Last name"
              {...lastName}
            />
            <InputElement
              {...email}
              // value={email.value}
              // onChange={handleEmail}
              // error={email.error}
              className="registration__input app__input_email"
              type="email"
              placeholder="Email"
            />
            <InputElement
              {...password}
              className="registration__input app__input_password"
              type="password"
              placeholder="Password"
            />
            <InputElement
              {...birthDate}
              className="registration__input app__input_date"
              type="date"
              placeholder="Date of birth"
            />
            <InputElement
              {...country}
              className="registration__input app__input_text"
              type="text"
              placeholder="Country"
            />
            <InputElement {...city} className="registration__input app__input_text" type="text" placeholder="City" />
            <InputElement
              {...street}
              className="registration__input app__input_text"
              type="text"
              placeholder="Street"
            />
            <InputElement
              {...postalCode}
              className="registration__input app__input_number"
              type="number"
              min="0"
              placeholder="Postal code"
            />

            {/* <input
              {...password}
              className="registration__input app__input_password"
              type="password"
              placeholder="Password"
            /> */}
            {/* <input
              {...birthDate}
              className="registration__input app__input_date"
              type="date"
              placeholder="Date of birth"
            /> */}
            {/* <input {...country} className="registration__input app__input_text" type="text" placeholder="Country" /> */}
            {/* <input {...city} className="registration__input app__input_text" type="text" placeholder="City" /> */}
            {/* <input {...street} className="registration__input app__input_text" type="text" placeholder="Street" /> */}
            {/* <input
              {...postalCode}
              className="registration__input app__input_number"
              type="number"
              min="0"
              placeholder="Postal code"
            /> */}
            <button className="registration__button sign-in__button">SIGN UP</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
