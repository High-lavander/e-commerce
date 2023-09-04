import Banner from '../../components/UI/Banner/Banner';
import shopSingleBackground from '../../assets/banner-shop-single.svg';
import styles from './DetailedProduct.module.scss';

function DetailedProduct() {
  return (
    <div>
      <Banner title={'Shop Single'} backgroundImage={shopSingleBackground} />
      <div className={styles.container}>
        <h2 className={styles.heading}>Related products</h2>
        Product Details
      </div>
    </div>
  );
}

export default DetailedProduct;
