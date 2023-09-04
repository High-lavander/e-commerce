import Banner from '../../components/UI/Banner/Banner';
import shopSingleBackground from '../../assets/banner-shop-single.svg';
import styles from './DetailedProduct.module.scss';
import ProductElement from '../../components/ProductComponents/ProductElement/ProductElement';

function DetailedProduct() {
  return (
    <div>
      <Banner title={'Shop Single'} backgroundImage={shopSingleBackground} />
      <div className={styles.container}>
        <h2 className={styles.heading}>Related products</h2>
        <ProductElement />
      </div>
    </div>
  );
}

export default DetailedProduct;
