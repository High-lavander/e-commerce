import './login.scss';
import useInput from '../../hooks/useInput';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputElement } from '../../components';
import Client from '../../sdk/Client';
import { Loader } from '../../components/Loader';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { loginCustomer } from '../../store/customer';

const LoginPage = () => {
  const navigate = useNavigate();

  const email = useInput('');
  const password = useInput('');
  const [formError, setFormError] = useState('');
  const [fetchDataMessage, setFetchDataMessage] = useState('');
  const [fetchErrorMessage, setErrorDataMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { customer, isCustomerLoading } = useAppSelector((state) => state.customer);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    setErrorDataMessage('');

    const postForm = {
      email: email.value,
      password: password.value,
    };

    // const values = Object.values(postForm);
    // if (values.some((val) => val === null || val === undefined || (Boolean(val) === false && val !== 0))) {
    //   setFormError('Form is not full');
    //   return;
    // }
    if (!(postForm.email && postForm.password)) {
      setFormError('Form is not full');
      return;
    }
    const logCustomer = async () => {
      try {
        setIsLoading(true);
        // const response = Client.createCustomer(postForm);
        // const response = store.dispatch(createCustomer(postForm));
        const response = dispatch(loginCustomer(postForm.email, postForm.password));
        console.log('customer,isCustomerLoading', customer, isCustomerLoading);
        console.log('response', response);
        const body = await response;
        console.log('body', body);
        // const passwordToken = await Client.passwordToken(postForm.email);
        // console.log('passwordToken', passwordToken);

        setIsLoading(false);
        const auth = await Client.loginCustomer(postForm.email, postForm.password);
        console.log('auth', auth);
        // const client = await Client.queryCustomerById(body.body.customer.id);
        // console.log('client', client);
        // localStorage.setItem('client', JSON.stringify(client));

        localStorage.setItem('auth', JSON.stringify(auth));
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
    logCustomer();
    console.log('postform', postForm);
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__column column__left login__wrapper">
          <div className="login__title-description">Not registred?</div>
          <p className="login__description_welcome"></p>
          <button className="login__button" onClick={() => navigate('/registration')}>
            Register<span className="login__button-icon"></span>
          </button>
        </div>
        <div className="login__column column__right login__wrapper">
          <div className="login__title-description">Sign Up for an Account</div>
          <p className="login__description_join">Join us! Create an account to access our features.</p>
          <form className="login__form form" onSubmit={handleSubmit}>
            <InputElement
              {...email}
              className="login__input app__input_email"
              type="email"
              placeholder="Email"
              validationCb="email"
            />
            <InputElement
              {...password}
              className="login__input app__input_password"
              type="password"
              placeholder="Password"
              minLength={4}
              validationCb="password"
            />

            <button className="login__button sign-in__button">LOG IN</button>
            {formError && <div className="form__error">{formError}</div>}
          </form>
          {fetchDataMessage && <div className="login__message_success">{fetchDataMessage}</div>}
          {fetchErrorMessage && <div className="login__message_error">{fetchErrorMessage}</div>}
          {isLoading && (
            <div className="login__loader">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
