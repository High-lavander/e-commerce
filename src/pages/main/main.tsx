import './main.scss';
import Arrow from '../../assets/icons/Aerrow.svg';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { getStoreToken } from '../../store/customer';
import { useEffect } from 'react';

function Main() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      getStoreToken(dispatch);
    };
    fetchToken();
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
