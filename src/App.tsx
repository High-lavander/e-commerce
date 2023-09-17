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
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchToken } from './store/token';
import { useEffect } from 'react';
import { CartActionsType, createBasket, updateBasketById } from './store/basket';

function App() {
  const customerStore = useAppSelector((state) => state.customer);
  const basketStore = useAppSelector((store) => store.basket);
  const dispatch = useAppDispatch();

  const handleCreateBasket = () => {
    createBasket(dispatch);
  };

  const handleSetCutomerId = () => {
    if (basketStore.basket) {
      updateBasketById(basketStore.basket?.id, {
        version: basketStore.basket?.version || 1,
        actions: [
          {
            action: CartActionsType.SETCUSTOMERID,
            customerId: customerStore.customer?.id,
          },
        ],
      })(dispatch);
    }
  };

  useEffect(() => {
    dispatch(fetchToken);
    if (customerStore.customer) {
      if (!basketStore.basket?.customerId) {
        handleCreateBasket();
        setTimeout(() => {
          handleSetCutomerId();
        }, 0);
      }
    }
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
