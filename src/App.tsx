import Header from './components/UI/header/Header';
import Footer from './components/Footer';
import Home from './pages/home/home';
import RegistrationPage from './pages/registration/registration';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/login';

function App() {
  return (
    <>
      <div className="app">
        <Header />
        {/* <Home className="main" /> */}
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/registration" element={<RegistrationPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
