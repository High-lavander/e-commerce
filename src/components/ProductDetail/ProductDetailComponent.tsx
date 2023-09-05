import { useEffect } from 'react';

interface IProductDetailProps {
  productData?: IProductDetail;
}

interface IProductDetail {
  id?: string;
  masterData: IMasterData;
}

interface IMasterData {
  current: ICurrent;
}

interface ICurrent {
  masterVariant: IMasterVariant;
}

interface IMasterVariant {
  images: IImage[];
}
interface IImage {
  dimensions?: { w?: number; h?: number };
  url: string;
}
export const ProductDetailComponent = (props: IProductDetailProps) => {
  useEffect(() => {
    console.log('props.productData', props.productData);
  }, [props]);
  return (
    <div className="product-element">
      <div className="product-element-img product-element__img">
        <p className="product-element__class">Type</p>
      </div>
      <div className="product-element-info product-element__info">
        {props.productData && <p className="product-element-info__name">{props.productData?.id}</p>}
        <img src={props.productData?.masterData.current.masterVariant.images[0].url}></img>
        <div className="price-container product-element-info__price-container">
          <p className="price-container__discount"></p>
          <p className="price-container__price"></p>
        </div>
      </div>
    </div>
  );
};
