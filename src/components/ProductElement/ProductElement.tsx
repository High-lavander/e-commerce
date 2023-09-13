import { useState, useEffect } from 'react';
import IProductElement from '../../ApiCatalog/ApiCatalog';
import './ProductElement.scss';
import { CartActionsType, updateBasketById } from '../../store/basket';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

function ProductElement({
  product,
  productData,
}: {
  product: IProductElement['masterData']['current'];
  productData: IProductElement;
}) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const dispatch = useAppDispatch();
  const { basket } = useAppSelector((state) => state.basket);

  const addProductToCart = () => {
    if (basket) {
      updateBasketById(basket?.id, {
        version: basket?.version,
        actions: [
          {
            action: CartActionsType.ADDITEM,
            variantId: product?.masterVariant?.id,
            productId: productData.id,
            quantity: 1,
          },
        ],
      })(dispatch);

      const isAddedToCart = basket.lineItems.some((item) => item.productId === productData.id);

      if (isAddedToCart) {
        setAddedToCart(true);
        setCartItemCount(cartItemCount + 1);
      }
    }
  };

  useEffect(() => {
    if (basket) {
      const totalItems = basket.lineItems.reduce((total, item) => total + item.quantity, 0);
      setCartItemCount(totalItems);
    }
  }, [basket]);

  return (
    <div className="product_block">
      <div className="product_block_images">
        {product.masterVariant.images[0] ? <img src={product.masterVariant.images[0].url} alt="Product img" /> : null}
      </div>
      <div className="product_block_description">
        <p>{productData.description.en}</p>
      </div>
      <div className="product_block_info">
        <div className="product_block_info_title">
          <p className="title">{product.name.en}</p>
          <div className="price">
            <p className="price_discount">
              ${product.masterVariant.prices[0] ? product.masterVariant.prices[0].value.centAmount : null}
            </p>
            <p className="price_current">
              ${product.masterVariant.prices[1] ? product.masterVariant.prices[1].value.centAmount : null}
            </p>
          </div>
        </div>
        <button className="product_block_info_btn-basket" onClick={addProductToCart}>
          <p>{addedToCart ? 'Added' : 'Add'}</p>
          <div className="total_product">{cartItemCount}</div>
        </button>
      </div>
    </div>
  );
}

export default ProductElement;
