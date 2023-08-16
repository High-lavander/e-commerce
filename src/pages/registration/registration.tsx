import './registration.scss';
import useInput from '../../hooks/useInput';
import { FormEvent, useEffect, useMemo, useState } from 'react';
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
  const [formError, setFormError] = useState('');

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
    setFormError('');
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
    setFormError('');
    if (values.some((val) => val === null || val === undefined || Boolean(val) === false)) {
      setFormError('Form is not full');
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
        <div className="registration__column column__left registration__wrapper">
          <div className="registration__title-description">Already registered?</div>
          <p className="registration__description_welcome">
            Welcome back! Please enter your
            <br /> credentials to access your account.
          </p>
          <button className="registration__button">
            Log In<span className="registration__button-icon"></span>
          </button>
        </div>
        <div className="registration__column column__right registration__wrapper">
          <div className="registration__title-description">Sign Up for an Account</div>
          <p className="registration__description_join">Join us! Create an account to access our features.</p>
          <form className="registration__form form" onSubmit={handleSubmit}>
            <div className="form__row_double">
              <InputElement
                id="firstName"
                className="registration__input app__input_text"
                type="text"
                placeholder="First name"
                validationCb="name"
                {...firstName}
              />
              <InputElement
                id="lastName"
                className="registration__input app__input_text"
                type="text"
                placeholder="Last name"
                validationCb="name"
                {...lastName}
              />
            </div>

            <InputElement
              {...email}
              className="registration__input app__input_email"
              type="email"
              placeholder="Email"
              validationCb="email"
            />
            <InputElement
              {...password}
              className="registration__input app__input_password"
              type="password"
              placeholder="Password"
              minLength={4}
              validationCb="password"
            />
            <InputElement
              {...birthDate}
              className="registration__date app__input_date"
              type="date"
              placeholder="Date of birth"
              required={true}
              validationCb="date"
            />
            <InputElement
              {...country}
              className="registration__input app__input_text"
              type="text"
              placeholder="Country"
              validationCb="country"
            />
            <InputElement
              {...city}
              className="registration__input app__input_text"
              type="text"
              placeholder="City"
              validationCb="city"
            />
            <InputElement
              {...street}
              className="registration__input app__input_text"
              type="text"
              placeholder="Street"
              validationCb="street"
            />
            <InputElement
              {...postalCode}
              className="registration__input app__input_number"
              type="text"
              placeholder="Postal code"
              validationCb="postalCode"
            />
            <button className="registration__button sign-in__button" disabled={isDisabled}>
              SIGN UP {isDisabled}
            </button>
            {formError && <div className="form__error">{formError}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
