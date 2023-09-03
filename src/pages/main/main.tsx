import './main.scss';
import Arrow from '../../assets/icons/Aerrow.svg';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <section className="banner">
      <div className="banner_title">
        <h4>Delicious and Healthy</h4>
        <h1>Explore a New Dimension of Nutrition!</h1>
      </div>
      <div className="banner_btn">
        <Link to="/shop" >
          <p>Shop Now</p>
          <img src={Arrow} alt="arrow" />
        </Link>
      </div>
    </section>
  );
}

export default Main;
