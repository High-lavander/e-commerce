import './login.scss';
import useInput from '../../hooks/useInput';
import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { InputElement } from '../../components';
import { Loader } from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authenticateCustomer } from '../../store/customer';

const LoginPage = () => {
  const navigate = useNavigate();

  const email = useInput('');
  const password = useInput('');
  const [formError, setFormError] = useState('');
  const [fetchDataMessage] = useState('');
  const [fetchErrorMessage, setErrorDataMessage] = useState('');
  const isCustomerLoading = useAppSelector((state) => state.customer.isCustomerLoading);
  const customer = useAppSelector((state) => state.customer.customer);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    setErrorDataMessage('');

    const postForm = {
      email: email.value,
      password: password.value,
    };

    dispatch(authenticateCustomer(postForm));
  };

  return customer ? (
    <Navigate to={'/'} />
  ) : (
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
          {isCustomerLoading && <div className="login__loader">Loading</div>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
