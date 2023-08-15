import { ChangeEvent, useRef } from 'react';
interface IInputElementProps {
  placeholder?: string;
  className?: string;
  value: string | number;
  type?: string;
  id?: string;
  min?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputElement = (props: IInputElementProps) => {
  const inputRef = useRef(null);
  return (
    <label className="registration__label" htmlFor={props.id}>
      <input
        ref={inputRef}
        id={props.id}
        name={props.id}
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        min={props.min}
        disabled={props.disabled}
      />
      <span className="registration__input-placeholder">{props.placeholder}</span>
      {props.error && <span className="registration__input-error">{props.error}</span>}
    </label>
  );
};
export default InputElement;
