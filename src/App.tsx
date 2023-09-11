import { Route, Routes } from 'react-router';
import { Header } from './components';
import Main from './pages/main/main';
import About from './pages/About/About';
import DetailedProduct from './pages/DetailedProduct/DetailedProduct';
import Contact from './pages/Contact/Contact';
import LoginPage from './pages/login/login';
import Error404 from './pages/Error404/Error404';
import RegistrationPage from './pages/registration/registration';
import RedirectToMainLoggged from './components/Redirect/Redirect';
import Catalog from './components/Catalog/Catalog';
import Footer from './components/Footer/Footer';
import UserProfile from './pages/UserProfile/UserProfile';
import BasketPage from './pages/Basket/BasketPage';
import React from 'react';

function App() {
  console.log('App');
  React.useEffect(() => {
    console.log('Use App');
  }, []);
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/About" element={<About />} />
        <Route path="/product/:id" element={<DetailedProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Catalog />} />
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
        <Route path="/user-profile/:id" element={<UserProfile />} />
        <Route path="/basket/:id" element={<BasketPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
