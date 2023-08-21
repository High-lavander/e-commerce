import './registration.scss';
import useInput from '../../hooks/useInput';
import useCheckbox from '../../hooks/useCheckbox';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputElement } from '../../components';
import { Loader } from '../../components/Loader';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { createCustomer } from '../../store/customer';
import countries from '../../db/countries';
const RegistrationPage = () => {
  const navigate = useNavigate();
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const password = useInput('');
  const birthDate = useInput('');
  const country = useInput('');
  const city = useInput('');
  const street = useInput('');
  const postalCode = useInput('');
  const billingAddress = useInput('');
  const setDefaultAddress = useCheckbox(false);
  const setAsBillingAddress = useCheckbox(false);
  const [selectedCity, setSelectedCountry] = useState('');
  const [formError, setFormError] = useState('');
  const [fetchDataMessage, setFetchDataMessage] = useState('');
  const [fetchErrorMessage, setErrorDataMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const billing = billingAddress.value.split(' ');
  const dispatch = useAppDispatch();
  const { customer, customerError } = useAppSelector((state) => state.customer);
  const filtered = useMemo(() => {
    return countries.filter((c) => c.name.toLocaleLowerCase().includes(country.value.toLocaleLowerCase()));
  }, [country.value]);

  const handleSelectCountry = (countryCode: string, countryName: string) => {
    country.setValue(`(${countryCode}) ${countryName}`);
    setSelectedCountry(countryCode);
  };
  const address = [
    {
      key: '0',
      country: selectedCity,
      city: city.value,
      streetName: street.value,
      postalCode: postalCode.value,
    },
  ];
  const billingIndAdresses = {
    key: '1',
    country: billing[0],
    city: billing[1],
    streetName: billing[2],
    postalCode: billing[3],
  };

  if (billingAddress.value) {
    address[1] = billingIndAdresses;
  }

  const setAsBillingAddressChange = <T,>(checked: T) => {
    if (checked) {
      billingAddress.setValue(`${selectedCity} ${city.value} ${street.value} ${postalCode.value}`);
    } else {
      billingAddress.setValue('');
    }
  };

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
    setErrorDataMessage('');

    const postForm = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      birthDate: birthDate.value,
      addresses: address,
      ...{ defaultShippingAddress: Boolean(setDefaultAddress.checked) ? 0 : undefined },
      shippingAddresses: [0],
      ...{ defaultBillingAddress: billingAddress.value ? 1 : undefined },
      ...{ billingAddresses: Boolean(setAsBillingAddress.checked) ? [0] : undefined },
    };

    if (
      !(
        postForm.firstName &&
        postForm.lastName &&
        postForm.email &&
        postForm.password &&
        postForm.birthDate &&
        postForm.addresses[0].city &&
        postForm.addresses[0].country &&
        postForm.addresses[0].postalCode &&
        postForm.addresses[0].streetName
      )
    ) {
      setFormError('Form is not full');
      return;
    }
    createCustomer(postForm)(dispatch, navigate);
  };

  useEffect(() => {
    if (customer) {
      setTimeout(() => navigate('/'), 2500);
      setFetchDataMessage('Successful,redirecting to home page...');
      setIsLoading(false);
    }
    if (customerError) {
      setErrorDataMessage('Error' && customerError);
      setIsLoading(false);
    }
  }, [customer, customerError]);

  return (
    <div className="registration">
      <div className="registration__container">
        <div className="registration__column column__left registration__wrapper">
          <div className="registration__title-description">Already registered?</div>
          <p className="registration__description_welcome">
            Welcome back! Please enter your
            <br /> credentials to access your account.
          </p>
          <button className="registration__button" onClick={() => navigate('/login')}>
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
            <div className="registration__input-wrapper country_selector">
              <InputElement
                {...country}
                className="registration__input app__input_text"
                type="text"
                placeholder="Country"
                validationCb="country"
              />

              {country.value && filtered[0] && (
                <ul className="registration__list countries-list">
                  {filtered.map((country) => {
                    return (
                      <li
                        className="countries-list__item"
                        value={country.code}
                        key={country.code}
                        onClick={() => handleSelectCountry(country.code, country.name)}
                      >
                        {country.name}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

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
            <InputElement
              labelClassname="checkbox_label"
              {...setDefaultAddress}
              className="registration__checkbox  app__input_checkbox"
              type="checkbox"
              placeholder="Set address as default"
            />
            <InputElement
              labelClassname="checkbox_label"
              {...setAsBillingAddress}
              outerCb={setAsBillingAddressChange}
              className="registration__checkbox app__input_checkbox"
              type="checkbox"
              placeholder="Set address as billing address"
            />
            <InputElement
              {...billingAddress}
              className="registration__input app__input_text"
              type="text"
              placeholder="Billing address"
            />

            <button className="registration__button sign-in__button" disabled={isDisabled}>
              SIGN UP {isDisabled}
            </button>
            {formError && <div className="form__error">{formError}</div>}
          </form>
          {fetchDataMessage && <div className="registration__message_success">{fetchDataMessage}</div>}
          {fetchErrorMessage && <div className="registration__message_error">{fetchErrorMessage}</div>}
          {isLoading && (
            <div className="registration__loader">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
