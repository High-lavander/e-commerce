import './main.scss';
import Arrow from '../../assets/icons/Aerrow.svg';

function Main() {
  return (
    <section className="banner">
      <div className="banner_title">
        <h4>Delicious and Healthy</h4>
        <h1>Explore a New Dimension of Nutrition!</h1>
      </div>
      <button className="banner_btn">
        <p>Shop Now</p>
        <img src={Arrow} alt="arrow" />
      </button>
    </section>
  );
}

export default Main;
