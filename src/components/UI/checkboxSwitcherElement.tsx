import useCheckbox from '../../hooks/useCheckbox';
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
  const switcherCheckbox = useCheckbox(props.value === props.value2);
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const valArray = [props.value1, props.value2];

  useEffect(() => {
    props.outerCb && props.outerCb(valArray[Number(switcherCheckbox.checked)]);
  }, [props.value, props.value1, props.value2, switcherCheckbox.checked]);
  return (
    <div className={`checkbox-switch__container ${props.isDisabled && 'checkbox-switch__disabled'}`}>
      <label className="checkbox-switch__label">
        <input
          className="checkbox-switch__input"
          type="checkbox"
          checked={switcherCheckbox.checked}
          onChange={switcherCheckbox.onChange}
          ref={checkboxRef}
          disabled={props.isDisabled}
        />
        <span className="checkbox-switch__icon"></span>
      </label>
      <span className={`checkbox-switch__value1 ${!switcherCheckbox.checked && 'checkbox-switch__value-active'}`}>
        {props.value1}
      </span>
      <span className={`checkbox-switch__value2 ${switcherCheckbox.checked && 'checkbox-switch__value-active'}`}>
        {props.value2}
      </span>
    </div>
  );
};
