import { useEffect } from 'react';
import './ProductDetailComponent.scss';
import { SwiperImageComponent } from '../Swiper/SwiperImageComponent';

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
  const images = props.productData?.masterData.current.masterVariant.images.map((img) => img.url) || [];
  useEffect(() => {
    console.log('props.productData', props.productData);
  }, [props]);
  return (
    <div className="product-element">
      <div className="product-element__inner">
        <div className="product-element__cell">
          {images.length > 1 ? (
            <div className="product-element__sliders">
              <SwiperImageComponent images={images} swiperItemClass="product-element__image" />
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
              <div className="product-cart__quantity"></div>
              <div className="product-cart__quantity-window"></div>
              <div className="product-cart__add-button"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
