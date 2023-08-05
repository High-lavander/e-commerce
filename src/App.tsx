import { useState } from 'react';
import { InputElement } from './components';
function App() {
  const [count] = useState(0);

  return (
    <>
      <div>{count}</div>
      <InputElement />
    </>
  );
}

export default App;
