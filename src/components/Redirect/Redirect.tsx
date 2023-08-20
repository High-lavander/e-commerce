import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import About from '../../pages/About/About';
import Contact from '../../pages/Contact/Contact';
import Error404 from '../../pages/Error404/Error404';
import Header from '../Header/Header';
import RegistrationPage from '../../pages/registration/registration';
import LoginPage from '../../pages/login/login';

function Redirect() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/About" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Main />}></Route>
        <Route path="/registration" element={<RegistrationPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default Redirect;
