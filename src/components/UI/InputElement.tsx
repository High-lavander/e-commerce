import { ChangeEvent, useRef } from 'react';
interface IInputElementProps {
  placeholder?: string;
  className?: string;
  value: string | number;
  type: 'text' | 'number' | 'password' | 'email' | 'date';
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

const InputElement = (props: IInputElementProps) => {
  // const [error, setError] = useState('');
  const inputRef = useRef(null);
  const inputElement: HTMLInputElement = inputRef.current!;
  const validates: { [key: string]: <T>(val: T) => void } = {
    text: (val) => {
      (val as string).length < 3 ? props.setError(`To short`) : props.setError('');
    },
    number: (val) => {
      String(val).length < 4 ? props.setError(`too short`) : props.setError('');
    },
    password: (val) => {
      (val as string).length <= Number(props.minLength) ? props.setError(`Weak password`) : props.setError('');
    },
    email: (val) => {
      regex.test(val as string) ? props.setError('') : props.setError(`It's not email`);
    },
    date: (val) => {
      Boolean(val) === true ? props.setError('') : props.setError(`It's not date`);
    },
  };

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
      {props.error && props.type !== 'date' && <span className="registration__input-error">{props.error}</span>}
      {props.type === 'date' && !Boolean(props.value) && <span className="registration__date-error">Enter date</span>}
    </label>
  );
};
export default InputElement;
