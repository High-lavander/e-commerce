import { ChangeEvent, useEffect, useState } from 'react';
import { updateBasketById, type ILineItem, CartActionsType } from '../../store/basket';
import type { IProductDetail } from '../../types/productDetail';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { IToken } from '../../store/customer';
import './LineItemComponent.scss';
// import { InputElement } from '..';
// import useInput from '../../hooks/useInput';

type ILineItemsProps = ILineItem;
export const LineItemComponent = (props: ILineItemsProps) => {
  const { basket, isBasketLoading } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const [productData, setProductData] = useState<IProductDetail>();
  // const quantity = useInput(String(props.quantity) || '1');
  const [quantity, setQuantity] = useState(props.quantity);
  const tokenData = useAppSelector((state) => state.customer.tokenData as IToken | null);

  const quantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    changeLineItemQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      changeLineItemQuantity(quantity - 1);
    }
  };

  const deleteFromBasket = () => {
    if (basket) {
      console.log('IFFFF', basket?.id);
      updateBasketById(basket?.id, {
        version: basket?.version,
        actions: [
          {
            action: CartActionsType.REMOVEITEM,
            lineItemId: props.id,
          },
        ],
      })(dispatch);
      if (basket.discountCodes) {
        basket?.discountCodes[0].discountCode.id;
      }
    }
  };

  const changeLineItemQuantity = (quantity: number) => {
    console.log('changeLineItemQuantity', basket?.id);
    if (basket) {
      updateBasketById(basket?.id, {
        version: basket?.version,
        actions: [
          {
            action: CartActionsType.CHANGEQUANTITY,
            lineItemId: props.id,
            quantity,
          },
        ],
      })(dispatch);
    }
  };

  const updateQuantity = () => {
    changeLineItemQuantity(quantity);
  };
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
      <h2 className="line-item__name">{productData?.masterData.current.name.en}</h2>
      <div className="line-item__prices">
        <div className={`line-item__price ${props?.discountedPricePerQuantity[0] && 'line-item__old-price'}`}>
          {props.price.value.centAmount}
        </div>

        <div className="line-item__discount-price">
          {' '}
          {props?.discountedPricePerQuantity[0] &&
            props?.discountedPricePerQuantity?.[0].discountedPrice.value.centAmount}
        </div>
      </div>
      <div className="line-item__quantity-container">
        <button
          className="line-item__quantity-button quantity-button quantity-button__increment"
          onClick={incrementQuantity}
        >
          +
        </button>
        <div className="line-item__count">
          <input value={quantity} onChange={quantityChange} className="line-item__quantity-input" type="number" />
          <span
            className={`line-item__quantity-update update-arrows ${isBasketLoading && 'update-arrows__loading'}`}
            onClick={updateQuantity}
          ></span>
        </div>
        <button
          className="line-item__quantity-button  quantity-button quantity-button__decrement"
          onClick={decrementQuantity}
        >
          -
        </button>
      </div>
      <div className="line-item__total">{props.totalPrice.centAmount}</div>
      <button className="line-item__quantity-button quantity-button__delete" onClick={deleteFromBasket}>
        x
      </button>
    </div>
  );
};
