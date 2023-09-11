import './main.scss';
import Arrow from '../../assets/icons/Aerrow.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Main() {
  useEffect(() => {
    console.log('Main');
  }, []);
  return (
    <section className="banner">
      <div className="banner_title">
        <h4>Delicious and Healthy</h4>
        <h1>Explore a New Dimension of Nutrition!</h1>
      </div>
      <Link to="/shop" className="banner_shop-link">
        <button className="banner_btn">
          <p>Shop Now</p>
          <img src={Arrow} alt="arrow" />
        </button>
      </Link>
    </section>
  );
}

export default Main;
