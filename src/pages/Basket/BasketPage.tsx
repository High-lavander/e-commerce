import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
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

const BasketPage = () => {
  const dispatch = useAppDispatch();
  const router = useParams();
  const { basket, basketError, isBasketLoading } = useAppSelector((state) => state.basket);
  const { customer } = useAppSelector((state) => state.customer);
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
      </div>
    </section>
  );
};

export default BasketPage;
