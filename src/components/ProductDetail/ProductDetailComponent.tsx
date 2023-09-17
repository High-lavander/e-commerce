import { useMemo, useState } from 'react';
import './ProductDetailComponent.scss';
import { SwiperImageComponent } from '../Swiper/SwiperImageComponent';
import { ProductDetailModal } from './ProductDetailModal';
import { CartActionsType, createBasket, updateBasketById } from '../../store/basket';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { IBasket } from '../../store/basket';

interface IProductDetailProps {
  productData?: IProductDetail;
}

interface IProductDetail {
  id?: string;
  version: number;
  versionModifiedAt: string;
  createdAt: string;
  masterData: IMasterData;
  productType: IProductType;
  taxCategory: IProductType;
}

interface IProductType {
  typeId: string;
  id: string;
}
interface IMasterData {
  current: ICurrent;
}

interface ICurrent {
  categories: IProductType[];
  description: { en: string };
  name: { en: string };
  masterVariant: IMasterVariant;
  slug: { en: string };
  staged: object;
}

interface IMasterVariant {
  attributes: object;
  id: number;
  images: IImage[];
  prices: IPrice[];
}

interface IPrice {
  id: string;
  value: IProductValue;
}

interface IProductValue {
  centAmount: number;
  currencyCode: string;
  type: string;
  fractionDigits: number;
}
interface IImage {
  dimensions?: { w?: number; h?: number };
  url: string;
}
export const ProductDetailComponent = (props: IProductDetailProps) => {
  const dispatch = useAppDispatch();
  const basketStore = useAppSelector((state) => state.basket);
  const images = props.productData?.masterData.current.masterVariant.images.map((img) => img.url) || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentLineItem = useMemo(() => {
    return basketStore.basket?.lineItems.find((item) => item?.productId === props.productData?.id);
  }, [basketStore.basket?.lineItems, props.productData?.id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addProductToCart = async () => {
    if (basketStore.basket) {
      updateBasketById(basketStore.basket?.id, {
        version: basketStore.basket?.version,
        actions: [
          {
            action: CartActionsType.ADDITEM,
            variantId: props.productData?.masterData.current.masterVariant.id,
            productId: props.productData?.id,
            quantity: 1,
          },
        ],
      })(dispatch);
    }
    if (!basketStore.basket) {
      createBasket(dispatch).then((data) => {
        const basket: IBasket = data as IBasket;
        updateBasketById(basket?.id, {
          version: basket?.version,
          actions: [
            {
              action: CartActionsType.ADDITEM,
              variantId: props.productData?.masterData.current.masterVariant.id,
              productId: props.productData?.id,
              quantity: 1,
            },
          ],
        })(dispatch);
      });
    }
  };

  const removeProductFromCart = () => {
    if (basketStore.basket && currentLineItem) {
      updateBasketById(basketStore.basket?.id, {
        version: basketStore.basket?.version,
        actions: [
          {
            action: CartActionsType.REMOVEITEM,
            lineItemId: currentLineItem?.id,
            productId: props.productData?.id,
            quantity: 1,
          },
        ],
      })(dispatch);
    }
  };
  return (
    <div className="product-element">
      <ProductDetailModal isOpened={isModalOpen} outerCloseCb={closeModal} images={images} />
      <div className="product-element__inner">
        <div className="product-element__cell">
          {images.length > 1 ? (
            <div className="product-element__sliders">
              <SwiperImageComponent images={images} swiperItemClass="product-element__image" outerCb={openModal} />
            </div>
          ) : (
            <img
              className="product-element__image"
              src={props.productData?.masterData.current.masterVariant.images[0].url}
            ></img>
          )}
        </div>
        <div className="product-element__cell">
          <div className="product-element__info">
            <h1 className="product-element__title">{props.productData?.masterData.current.name.en}</h1>
            <div className="product-element__rating"></div>
            <div className="product-element__prices">
              <div className="product-element__old-price">
                {props.productData?.masterData.current.masterVariant.prices[0].value.centAmount}{' '}
                {props.productData?.masterData.current.masterVariant.prices[0].value.currencyCode}
              </div>
              <div className="product-element__price">
                {props.productData?.masterData.current.masterVariant.prices[1].value.centAmount}{' '}
                {props.productData?.masterData.current.masterVariant.prices[1].value.currencyCode}
              </div>
            </div>
            <p className="product-element__description">{props.productData?.masterData.current.description.en}</p>
          </div>
          <div className="product-element__product-cart product-cart">
            <div className="product-cart__inner">
              {currentLineItem ? (
                <button
                  className={`product-cart__cart-button cart__button cart__button_remove`}
                  onClick={removeProductFromCart}
                >
                  Remove From Cart
                </button>
              ) : (
                <button
                  className={`product-cart__cart-button cart__button cart__button_add`}
                  onClick={addProductToCart}
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
