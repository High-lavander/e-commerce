import { ChangeEvent, useRef } from 'react';
interface IInputElementProps {
  placeholder?: string;
  className?: string;
  value: string | number;
  type: 'text' | 'number' | 'password' | 'email' | 'date';
  validationCb: 'name' | 'password' | 'email' | 'date' | 'street' | 'city' | 'postalCode' | 'country';
  id?: string;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const regex = /\S+@\S+\.\S+/;
const excludeSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const excludeSpecialCharAndNumbers = /[0-9]|[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const USPostalCode = /\d{5}([ \-]\d{4})?/;

const InputElement = (props: IInputElementProps) => {
  const inputRef = useRef(null);
  const inputElement: HTMLInputElement = inputRef.current!;
  const validates: { [key: string]: <T>(val: T) => void } = {
    name: (val) => {
      props.setError('');
      if (excludeSpecialChar.test(val as string)) {
        props.setError('must not have special characters');
      }
      if ((val as string).length < 2) {
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
      if ((val as string).length < 8) {
        props.setError('minimum 8 characters');
      }
      if (!(val as string).split('').some((char) => char.toUpperCase() === char)) {
        props.setError(' at least 1 uppercase letter');
      }
      if (!(val as string).split('').some((char) => char.toLowerCase() === char)) {
        props.setError(' at least 1 lowercase letter');
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
      console.log({ year, currentYear });
      console.log('currentYear - year', currentYear - year < 13);
      if (Boolean(val) !== true) {
        props.setError(`no date`);
      }
      if (currentYear - year < 13) {
        props.setError('must be 13 years old or older');
      }
    },
    street: (val) => {
      props.setError('');
      if ((val as string).length < 1) {
        props.setError('at least 1 character');
      }
    },
    city: (val) => {
      props.setError('');
      if (excludeSpecialCharAndNumbers.test(val as string)) {
        props.setError('must not have special characters or numbers');
      }
      if ((val as string).length < 1) {
        props.setError(`at least 1 character`);
      }
    },
    country: (val) => {
      props.setError('');
      if (excludeSpecialCharAndNumbers.test(val as string)) {
        props.setError('must not have special characters or numbers');
      }
      if ((val as string).length < 1) {
        props.setError(`at least 1 character`);
      }
    },
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
    if (validates[props.validationCb]) {
      validates[props.validationCb](inputElement?.value);
    }
    console.log('e', e);
    console.log('props.value', props.value);
    if (inputElement?.value) {
      console.log('inputRef.current', inputElement.value);
    }
  };
  return (
    <label className="registration__label" htmlFor={props.id}>
      <input
        ref={inputRef}
        name={props.id}
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChange}
        maxLength={props.maxLength}
        minLength={props.minLength}
        max={props.max}
        min={props.min}
        disabled={props.disabled}
        required={props.required}
        style={{ borderColor: props.error ? 'red' : 'black' }}
      />
      <span className="registration__input-placeholder">{props.placeholder}</span>
      {props.error && <span className="registration__input-error">{props.error}</span>}
      {props.type === 'date' && !Boolean(props.value) && <span className="registration__date-error">Enter date</span>}
    </label>
  );
};
export default InputElement;
