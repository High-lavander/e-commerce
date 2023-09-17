import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useState } from 'react';
import Arrow from '../../assets/icons/Aerrow.svg';
import { deleteBasketById, updateBasketById } from '../../store/basket';
import './Basket.scss';
import { CartActionsType } from '../../store/basket';
import { LineItemComponent } from '../../components/Basket/lineItemComponent';
import { Link } from 'react-router-dom';

const BasketPage = () => {
  const dispatch = useAppDispatch();
  const basketStore = useAppSelector((state) => state.basket);
  const [promoCode, setPromocode] = useState('');

  const applyDiscount = () => {
    if (basketStore.basket) {
      updateBasketById(basketStore.basket?.id, {
        version: basketStore.basket?.version,
        actions: [
          {
            action: CartActionsType.ADDDISCOUNT,
            code: promoCode,
          },
        ],
      })(dispatch);
    }
  };

  const clearBasket = () => {
    if (basketStore.basket) {
      deleteBasketById(basketStore.basket?.id, basketStore.basket?.version)(dispatch);
    }
  };
  return (
    <section className="basket__inner">
      <div className="basket__content">
        {basketStore.basket?.lineItems && basketStore.basket?.lineItems?.length > 0 ? (
          <ul className="basket__items">
            {basketStore.basket?.lineItems.map((item) => {
              return (
                <li key={item.id}>
                  <LineItemComponent {...item} />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="basket__empty">
            <h3 className="basket__empty-title">Your cart is empty!</h3>
            <h4 className="basket__empty-message">Hurry, head to the shop page</h4>
            <Link to="/shop" className="basket__shop-link">
              <button className="basket__button-shop">
                <p className="basket__button-text">Shop Now</p>
                <img className="basket__button-arrow" src={Arrow} alt="arrow" />
              </button>
            </Link>
          </div>
        )}
      </div>
      {basketStore.basket?.lineItems && (
        <div className="basket__total-container">
          <div className="basket__promo">
            <span className="basket__promo-span">Enter promo code</span>
            <input className="basket__promo-input" value={promoCode} onChange={(e) => setPromocode(e.target.value)} />
            <button className="basket__promo-button" onClick={applyDiscount}>
              Apply
            </button>
          </div>
          <div className="basket__footer">
            <div className="basket__total-price">Total: {basketStore.basket?.totalPrice.centAmount}</div>
            <button className="basket__clear-button" onClick={clearBasket}>
              Clear Basket
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BasketPage;
