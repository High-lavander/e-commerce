import { useState } from 'react';

const useInput = (initialValue: string | number | undefined = undefined) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
    setValue,
  };
};

export default useInput;
