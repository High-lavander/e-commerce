import { ChangeEvent, useState } from 'react';

export default function useInput(initialValue: boolean = false) {
  const [checked, setChecked] = useState(initialValue);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return {
    checked,
    error,
    onChange: handleChange,
    setError,
  };
}
