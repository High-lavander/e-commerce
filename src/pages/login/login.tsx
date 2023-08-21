import './login.scss';
import useInput from '../../hooks/useInput';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputElement } from '../../components';
import { Loader } from '../../components/Loader';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { loginCustomer } from '../../store/customer';

const LoginPage = () => {
  const navigate = useNavigate();

  const email = useInput('');
  const password = useInput('');
  const [formError, setFormError] = useState('');
  const [fetchErrorMessage, setErrorDataMessage] = useState('');
  const dispatch = useAppDispatch();
  const isCustomerLoading = useAppSelector((state) => state.customer.isCustomerLoading);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    setErrorDataMessage('');

    const postForm = {
      email: email.value,
      password: password.value,
    };

    if (!(postForm.email && postForm.password)) {
      setFormError('Form is not full');
      return;
    }
    loginCustomer(email.value, password.value)(dispatch, navigate);
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
          {fetchErrorMessage && <div className="login__message_error">{fetchErrorMessage}</div>}
          {isCustomerLoading && (
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
