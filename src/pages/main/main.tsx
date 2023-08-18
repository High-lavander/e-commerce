import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <section>
      <h1>E-commerce</h1>
      <h2>Main Page</h2>
      <h3>Organic</h3>
      <Link to="/login">Login</Link>
    </section>
  );
};

export default Main;
