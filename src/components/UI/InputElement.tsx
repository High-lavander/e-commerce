import { ChangeEvent, useRef, useState } from 'react';
interface IInputElementProps {
  placeholder?: string;
  className?: string;
  value: string | number;
  type: string;
  id?: string;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const regex = /\S+@\S+\.\S+/;

const InputElement = (props: IInputElementProps) => {
  const [error, setError] = useState('');
  const validates: { [key: string]: <T>(val: T) => void } = {
    email: (val) => {
      regex.test(val as string) ? setError('Yes') : setError(`It's not email`);
    },
  };
  const inputRef = useRef(null);
  const inputElement: HTMLInputElement = inputRef.current!;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
    if (validates[props.type]) {
      validates[props.type](inputElement?.value);
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
      />
      <span className="registration__input-placeholder">{props.placeholder}</span>
      {error && <span className="registration__input-error">{error}</span>}
    </label>
  );
};
export default InputElement;
