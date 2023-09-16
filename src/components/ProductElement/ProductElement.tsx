import { useState } from 'react';
import IProductElement from '../../ApiCatalog/ApiCatalog';
import './ProductElement.scss';
import { CartActionsType, updateBasketById } from '../../store/basket';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Link } from 'react-router-dom';

function ProductElement({
  product,
  productData,
}: {
  product: IProductElement['masterData']['current'];
  productData: IProductElement;
}) {
  const dispatch = useAppDispatch();
  const { basket } = useAppSelector((state) => state.basket);

  const findCartItem = basket?.lineItems.find((item) => item.productId === productData.id);
  const [cartItemCount, setCartItemCount] = useState(findCartItem ? findCartItem.quantity : 0);

  const addProductToCart = () => {
    if (basket) {
      const existingCartItem = basket.lineItems.find((item) => item.productId === productData.id);

      if (existingCartItem) {
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
        setCartItemCount(existingCartItem.quantity + 1);
      } else {
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
        setCartItemCount(1);
      }
    }
  };
  return (
    <div className="product_block">
      <Link to={`/product/${productData.id}`} key={productData.id}>
        <div className="product_block_images">
          {product.masterVariant.images[0] ? <img src={product.masterVariant.images[0].url} alt="Product img" /> : null}
        </div>
      </Link>
      <div className="product_block_description">
        <p>{`${productData.description.en.slice(0, 50)}...`}</p>
      </div>
      <div className="product_block_info">
        <div className="product_block_info_title">
          <p className="title">{product.name.en}</p>
          <div className="price">
            <p className="price_discount">
              &#8364;
              {product.masterVariant.prices[0]
                ? `${(product.masterVariant.prices[0].value.centAmount / 100).toFixed(2)}`
                : null}
            </p>
            <p className="price_current">
              &#8364;
              {product.masterVariant.prices[1]
                ? `${(product.masterVariant.prices[1].value.centAmount / 100).toFixed(2)}`
                : null}
            </p>{' '}
          </div>
        </div>
        <button className="product_block_info_btn-basket" onClick={addProductToCart}>
          <p>Add</p>
          <div className="total_product">{cartItemCount}</div>
        </button>
      </div>
    </div>
  );
}

export default ProductElement;
