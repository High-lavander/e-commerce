import Arrow from '../../assets/icons/Aerrow.svg';
import { Link } from 'react-router-dom';
import styles from './main.module.scss';

function Main() {
  return (
    <section className={styles.banner}>
      <div className={styles.banner_title}>
        <h4>Delicious and Healthy</h4>
        <h1>Explore a New Dimension of Nutrition!</h1>
      </div>
      <div className="banner_btn">
        <Link to="/shop" >
          <p>Shop Now</p>
          <img src={Arrow} alt="arrow" />
        </Link>
      </div>
      <button className={styles.banner_btn}>
        <p>Shop Now</p>
        <img src={Arrow} alt="arrow" />
      </button>
    </section>
  );
}

export default Main;
