import './registration.scss';
import useInput from '../../hooks/useInput';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { getAnonymousSessionToken } from '../../api';
import { InputElement } from '../../components';
import Client from '../../sdk/Client';
import { Loader } from '../../components/Loader';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import { useActions } from '../../hooks/useAction';
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
  const [formError, setFormError] = useState('');
  const [fetchDataMessage, setFetchDataMessage] = useState('');
  const [fetchErrorMessage, setErrorDataMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const { fetchCustomer } = useActions();
  // const { customer, status } = useSelector((state: RootState) => state.customer);

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
    setErrorDataMessage('');
    const address = [
      {
        key: '0',
        country: 'RU',
        city: 'Makhachkala',
        streetName: 'Yaragskogo',
        postalCode: '333333',
      },
    ];
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
      addresses: address,
      defaultShippingAddress: 0,
      shippingAddresses: [],
      defaultBillingAddress: 0,
      billingAddresses: [0],
    };

    const values = Object.values(postForm);
    if (values.some((val) => val === null || val === undefined || (Boolean(val) === false && val !== 0))) {
      setFormError('Form is not full');
      return;
    }
    const createNewCustomer = async () => {
      try {
        setIsLoading(true);
        const response = Client.createCustomer(postForm);
        console.log('response', response);
        const body = await response;
        console.log('body', body);
        // const passwordToken = await Client.passwordToken(postForm.email);
        // console.log('passwordToken', passwordToken);

        setIsLoading(false);
        const auth = await Client.loginCustomer(postForm.email, postForm.password);
        console.log('auth', auth);
        const client = await Client.queryCustomerById(body.body.customer.id);
        console.log('client', client);
        const authCustomerViaEmail = await Client.authCustomerViaEmail(body.body.customer.id);
        console.log('authCustomerViaEmail', authCustomerViaEmail);
        localStorage.setItem('auth', JSON.stringify(auth));
        localStorage.setItem('client', JSON.stringify(client));
        localStorage.setItem('emailToken', JSON.stringify(authCustomerViaEmail));
        // fetchCustomer({body.body.customer.id})
        setFetchDataMessage('Successful,redirecting to home page...');
        setTimeout(() => navigate('/'), 2000);
        return response;
      } catch (e) {
        console.log('Catch e', e);
        setIsLoading(false);
        setErrorDataMessage('Error' && (e as Error).message);
      }
    };
    createNewCustomer();
    console.log('postform', postForm);
  };

  useEffect(() => {
    const fetchAnonToken = async () => {
      // const response = await getAnonymousSessionToken();
      // console.log(response);
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
