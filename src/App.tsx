import { useState } from 'react';
import { InputElement } from './components';
function App() {
  const [count, setCount] = useState('');

  return (
    <>
      <div>{count}</div>
      <input onChange={(e) => setCount(e.target.value)} />
    </>
  );
}

export default App;
