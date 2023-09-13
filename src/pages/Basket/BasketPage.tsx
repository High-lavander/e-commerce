import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import Arrow from '../../assets/icons/Aerrow.svg';
import {
  createBasket,
  deleteBasketById,
  getBasketByCustomerId,
  getBasketById,
  queryBaskets,
  replicateBasket,
  updateBasketById,
} from '../../store/basket';
import './Basket.scss';
import { CartActionsType } from '../../store/basket';
import { LineItemComponent } from '../../components/Basket/lineItemComponent';
import { Link } from 'react-router-dom';

const BasketPage = () => {
  const dispatch = useAppDispatch();
  const router = useParams();
  const { basket, basketError, isBasketLoading } = useAppSelector((state) => state.basket);
  const { customer } = useAppSelector((state) => state.customer);
  const [promoCode, setPromocode] = useState('');
  useEffect(() => {
    if (router.id) {
      console.log('router.id', router.id);
      console.log('basket', basket);
      console.log('basketError', basketError);
    }
  }, [basket, basketError, isBasketLoading]);

  const handleQuery = () => {
    queryBaskets(dispatch);
  };

  const handleGetById = () => {
    getBasketById('59433385-0544-40a9-afb4-53f5c36ae467')(dispatch);
  };

  const handleGetByCustomerId = () => {
    getBasketByCustomerId(customer?.id || 'svS0pMBqBgsAvo4YHURZIY5j')(dispatch);
  };

  const handleCreate = () => {
    createBasket(dispatch);
  };

  const handleReplicate = () => {
    replicateBasket('59433385-0544-40a9-afb4-53f5c36ae467')(dispatch);
  };

  const applyDiscount = () => {
    if (basket) {
      updateBasketById(basket?.id, {
        version: basket?.version,
        actions: [
          {
            action: CartActionsType.ADDDISCOUNT,
            code: promoCode,
          },
        ],
      })(dispatch);
    }
  };

  const handleUpdateBasketById = () => {
    updateBasketById('59433385-0544-40a9-afb4-53f5c36ae467', {
      version: 1,
      actions: [
        {
          action: CartActionsType.ADDITEM,
          variantId: 1,
          productId: '91d01317-cbb3-48fe-a6cc-410ec5ee4934',
          quantity: 1,
        },
      ],
    })(dispatch);
  };

  const handleSetCutomerId = () => {
    if (basket) {
      updateBasketById(basket?.id, {
        version: basket?.version || 1,
        actions: [
          {
            action: CartActionsType.SETCUSTOMERID,
            customerId: customer?.id || 'svS0pMBqBgsAvo4YHURZIY5j',
          },
        ],
      })(dispatch);
    }
  };

  const handleDelete = () => {
    deleteBasketById('59433385-0544-40a9-afb4-53f5c36ae467', 1)(dispatch);
  };
  useEffect(() => {
    console.log('basket', basket);
  }, []);
  return (
    <section className="basket__inner">
      <div className="basket__content">
        <div className="basket__buttons">
          <button onClick={handleQuery}>Query Basket</button>
          <button onClick={handleGetById}>Get By ID Basket</button>
          <button onClick={handleGetByCustomerId}>Get By Customer ID Basket</button>
          <button onClick={handleCreate}>Create Basket</button>
          <button onClick={handleReplicate}>Replicate Basket</button>
          <button onClick={handleUpdateBasketById}>Update By ID Basket</button>
          <button onClick={handleDelete}>Delete Basket</button>
          <button onClick={handleSetCutomerId}>handleSetCutomerId</button>
        </div>
        <ul className="basket__items"></ul>
        {basket?.lineItems ? (
          basket?.lineItems.map((item) => {
            return (
              <li key={item.id}>
                <LineItemComponent {...item} />
              </li>
            );
          })
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
      {basket?.lineItems && (
        <div className="basket__total-container">
          <div className="basket__promo">
            <span className="basket__promo-span">Enter promo code</span>
            <input className="basket__promo-input" value={promoCode} onChange={(e) => setPromocode(e.target.value)} />
            <button className="basket__promo-button" onClick={applyDiscount}>
              Apply
            </button>
          </div>
          <div className="basket__total-price">Total: {basket?.totalPrice.centAmount}</div>
        </div>
      )}
    </section>
  );
};

export default BasketPage;
