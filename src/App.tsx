import { Route, Routes } from 'react-router';
import { Header } from './components';
import Footer from './components/Footer';
import Main from './pages/main/main';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import LoginPage from './pages/login/login';
import Error404 from './pages/Error404/Error404';
import RegistrationPage from './pages/registration/registration';
import RedirectToMainLoggged from './components/Redirect/Redirect';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/About" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Main />} />
        <Route
          path="/registration"
          element={
            <RedirectToMainLoggged>
              <RegistrationPage />
            </RedirectToMainLoggged>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectToMainLoggged>
              <LoginPage />
            </RedirectToMainLoggged>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
