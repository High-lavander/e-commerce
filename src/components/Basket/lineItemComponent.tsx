import { useEffect, useState } from 'react';
import type { ILineItem } from '../../store/basket';
import type { IProductDetail } from '../../types/productDetail';
import { useAppSelector } from '../../store/hooks';
import type { IToken } from '../../store/customer';
import './LineItemComponent.scss';

type ILineItemsProps = ILineItem;
export const LineItemComponent = (props: ILineItemsProps) => {
  const [productData, setProductData] = useState<IProductDetail>();
  const tokenData = useAppSelector((state) => state.customer.tokenData as IToken | null);
  useEffect(() => {
    const fetchProductData = async () => {
      fetch(
        `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/products/${props.productId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tokenData && tokenData?.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if ('errors' in data) {
            console.log('Error');
            return;
          }
          setProductData(data);
        });
    };
    fetchProductData();
  }, []);
  return (
    <div className="line-item">
      <img
        className="line-item__image"
        src={productData?.masterData.current.masterVariant.images[0].url}
        alt={productData?.masterData.current.name.en || 'Product image'}
      />
      <h2 className="line-item__name"></h2>
      <div className="line-item__price">{props.price.value.centAmount}</div>
      <div className="line-item__quantity-container">
        <button className="line-item__quantity-button quantity-button quantity-button__add">+</button>
        <div className="line-item__count">{props.quantity}</div>
        <button className="line-item__quantity-button  quantity-button quantity-button__remove">-</button>
      </div>
      <div className="line-item__total">{props.totalPrice.centAmount}</div>
    </div>
  );
};
