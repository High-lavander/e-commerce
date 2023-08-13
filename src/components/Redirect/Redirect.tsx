import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Main from '../../pages/main/main';
import About from '../../pages/About/About';
import Contact from '../../pages/Contact/Contact';
import Error404 from '../../pages/Error404/Error404';
import Header from '../Header/Header';

function Redirect() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/About" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<Contact />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default Redirect;
