import Banner from '../../components/UI/Banner/Banner';
import shopSingleBackground from '../../assets/banner-shop-single.svg';
import { getProductById } from '../../store/productDetail';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { ProductDetailComponent } from '../../components/ProductDetail/ProductDetailComponent';
import { Loader } from '../../components/Loader';

function DetailedProduct() {
  const dispatch = useAppDispatch();
  const router = useParams();
  const { productDetail, isProductDetailLoading } = useAppSelector((state) => state.productDetail);
  useEffect(() => {
    if (router.id) {
      getProductById(router.id)(dispatch);
    }
    console.log('DetailedProduct');
  }, []);
  return (
    <div>
      <Banner title={'Shop Single'} backgroundImage={shopSingleBackground} />
      <div className="app__">
        {isProductDetailLoading && <Loader />}
        {productDetail && <ProductDetailComponent productData={productDetail} />}
      </div>
    </div>
  );
}

export default DetailedProduct;
