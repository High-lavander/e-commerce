import { ChangeEvent, useRef, useState } from 'react';
interface IInputElementProps {
  placeholder?: string;
  className?: string;
  value?: string | number;
  checked?: boolean;
  type: 'text' | 'number' | 'password' | 'email' | 'date' | 'checkbox';
  validationCb?: 'name' | 'password' | 'email' | 'date' | 'street' | 'city' | 'postalCode' | 'country';
  id?: string;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  outerCb?: <T>(arg: T) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  labelClassname?: string;
}

const regex = /\S+@\S+\.\S+/;
const excludeSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const excludeSpecialCharAndNumbers = /[0-9]|[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const USPostalCode = /\d{5}([ \-]\d{4})?/;

const InputElement = (props: IInputElementProps) => {
  const inputRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const inputElement: HTMLInputElement = inputRef.current!;
  const validates: { [key: string]: <T>(val: T) => void } = {
    name: (val) => {
      props.setError('');
      if (excludeSpecialChar.test(val as string)) {
        props.setError('must not have special characters');
      }
      if (val && (val as string).length < 2) {
        props.setError(`at least 2 characters`);
      }
    },
    postalCode: (val) => {
      props.setError('');
      if (!USPostalCode.test(val as string)) {
        props.setError(`it's not US postal code`);
      }
    },
    password: (val) => {
      props.setError('');
      if (val && (val as string).length < 8) {
        props.setError('minimum 8 characters');
      }
      if (!(val as string)?.match(/[A-Z]/g)) {
        props.setError('at least 1 uppercase letter');
      }
      if (!(val as string)?.match(/[a-z]/g)) {
        props.setError('at least 1 lowercase letter');
      }
      if (!(val as string).match(/[0-9]/)?.length) {
        props.setError('at least 1 number letter');
      }
      if (!(val as string).match(/[!@#$%^&*]/)?.length) {
        props.setError('at least 1 special symbol from !@#$%^&*');
      }
      if ((val as string)?.split('').some((char) => char === ' ')) {
        props.setError('must not conatin spaces');
      }
    },
    email: (val) => {
      props.setError('');
      regex.test(val as string) ? props.setError('') : props.setError(`it's not email`);
    },
    date: (val) => {
      props.setError('');
      const year = new Date(val as string).getFullYear();
      const currentYear = new Date().getFullYear();
      if (Boolean(val) !== true) {
        props.setError(`no date`);
      }
      if (currentYear - year < 13) {
        props.setError('must be 13 years old or older');
      }
    },
    street: (val) => {
      props.setError('');
      if (val && (val as string).length < 1) {
        props.setError('at least 1 character');
      }
    },
    city: (val) => {
      props.setError('');
      if (excludeSpecialCharAndNumbers.test(val as string)) {
        props.setError('must not have special characters or numbers');
      }
      if (val && (val as string).length < 1) {
        props.setError(`at least 1 character`);
      }
    },
    country: (val) => {
      props.setError('');
      if (excludeSpecialCharAndNumbers.test(val as string)) {
        props.setError('must not have special characters or numbers');
      }
      if (val && (val as string).length < 1) {
        props.setError(`at least 1 character`);
      }
    },
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
    if (props.outerCb) {
      props.outerCb<boolean>(e.target.checked);
    }
    if (props.validationCb && validates?.[props.validationCb]) {
      validates[props.validationCb](inputElement?.value);
    }
  };

  const switchPasswordVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <label className={`registration__label ${props.labelClassname ? props.labelClassname : ''}`} htmlFor={props.id}>
      <span
        className="registration__input-placeholder"
        style={{ paddingLeft: props.type === 'checkbox' ? '10px' : '0', textAlign: 'left' }}
      >
        {props.placeholder}
      </span>
      {props.type !== 'password' ? (
        <input
          ref={inputRef}
          name={props.id}
          className={props.className}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          checked={props.checked}
          onChange={handleChange}
          maxLength={props.maxLength}
          minLength={props.minLength}
          max={props.max}
          min={props.min}
          disabled={props.disabled}
          required={props.required}
          style={{ borderColor: props.error ? 'red' : 'black' }}
        />
      ) : (
        <>
          <input
            ref={inputRef}
            name={props.id}
            className={`${props.className} password-input__input`}
            type={isVisible ? 'text' : 'password'}
            placeholder={props.placeholder}
            value={props.value}
            checked={props.checked}
            onChange={handleChange}
            maxLength={props.maxLength}
            minLength={props.minLength}
            max={props.max}
            min={props.min}
            disabled={props.disabled}
            required={props.required}
            style={{ borderColor: props.error ? 'red' : 'black' }}
          />
          <span
            onClick={switchPasswordVisibility}
            className={`password-input__eye ${isVisible ? `password-input__eye_open` : `password-input__eye_close`}`}
          ></span>
        </>
      )}

      {props.error && <span className="registration__input-error">{props.error}</span>}
      {props.type === 'date' && !Boolean(props.value) && <span className="registration__date-error">Enter date</span>}
    </label>
  );
};
export default InputElement;
