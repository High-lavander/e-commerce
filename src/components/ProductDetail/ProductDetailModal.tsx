// import { useState } from 'react';
import { SwiperModalComponent } from '../Swiper/SwiperModalComponent';
import './ProductDetailModal.scss';
interface IProductDetailModal {
  isOpened?: boolean;
  images?: string[];
  outerCloseCb?: () => void;
}
export const ProductDetailModal = (props: IProductDetailModal) => {
  // const [isOpened, setIsOpened] = useState(false);

  return (
    props.isOpened && (
      <div className="product-modal">
        <div className="product-modal__inner">
          <div className="product-modal__container">
            <button className="product-modal__close-button" onClick={props.outerCloseCb}>
              X
            </button>
            <div className="product-modal__carousel">
              <SwiperModalComponent
                images={props.images}
                imageClass="product-modal__image"
                swiperClass="product-modal__swiper"
              />
            </div>
          </div>
        </div>

        <div className="product-modal__overlay"></div>
      </div>
    )
  );
};
