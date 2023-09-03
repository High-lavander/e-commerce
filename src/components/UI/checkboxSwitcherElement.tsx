// import { useState } from 'react';
import useInput from '../../hooks/useInput';
import './checboxSwitcherElement.scss';
import { ChangeEvent, useRef, useEffect } from 'react';

interface ICheckboxSwitcherElementProps {
  error?: string;
  value: string;
  value1: string;
  value2: string;
  isDisabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  outerCb?: <T>(arg: T) => void;
  setError?: React.Dispatch<React.SetStateAction<string>>;
}
export const CheckboxSwitcherElement = (props: ICheckboxSwitcherElementProps) => {
  // const [value, setValue] = useState();
  const switcher = useInput(props.value1);
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  // const checkboxElement = checkboxRef && (checkboxRef.current as HTMLInputElement);

  useEffect(() => {
    // if (checkboxElement.checked) {
    //   value.setValue(props.value1);
    // } else if (checkboxElement.checked) {
    //   value.setValue(props.value2);
    // }
    props.outerCb && props.outerCb(switcher.value);
  }, [props.value1, props.value2]);
  return (
    <div className={`checkbox-switch__container ${props.isDisabled && 'checkbox-switch__disabled'}`}>
      <label className="checkbox-switch__label">
        <input
          className="checkbox-switch__input"
          type="checkbox"
          value={switcher.value}
          onChange={switcher.onChange}
          ref={checkboxRef}
          disabled={props.isDisabled}
        />
        <span className="checkbox-switch__icon"></span>
      </label>
      <span className="checkbox-switch__value1">{props.value1}</span>
      <span className="checkbox-switch__value2">{props.value2}</span>
    </div>
  );
};
