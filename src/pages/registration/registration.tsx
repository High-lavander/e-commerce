import './registration.scss';
import useInput from '../../hooks/useInput';
import { FormEvent, useEffect, useMemo } from 'react';
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

  const isDisabled = useMemo(() => {
    const condition = !!(
      firstName.error ||
      lastName.error ||
      email.error ||
      password.error ||
      birthDate.error ||
      country.error ||
      city.error ||
      street.error ||
      postalCode.error
    );
    console.log('errros arr', [
      firstName.error,
      lastName.error,
      email.error,
      password.error,
      birthDate.error,
      country.error,
      city.error,
      street.error,
      postalCode.error,
    ]);
    console.log('condition', condition);
    return condition;
  }, [
    firstName.error,
    lastName.error,
    email.error,
    password.error,
    birthDate.error,
    country.error,
    city.error,
    street.error,
    postalCode.error,
  ]);

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

    const values = Object.values(postForm);
    if (values.some((val) => val === null || val === undefined || Boolean(val) === false)) {
      console.log('Form is not full');
    }
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
            <div className="form__row_double">
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
            </div>

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
              minLength={4}
            />
            <InputElement
              {...birthDate}
              className="registration__date app__input_date"
              type="date"
              placeholder="Date of birth"
              required={true}
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
            <button className="registration__button sign-in__button" disabled={isDisabled}>
              SIGN UP {isDisabled}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
