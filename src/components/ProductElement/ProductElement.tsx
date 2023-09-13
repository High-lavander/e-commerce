import IProductElement from '../../ApiCatalog/ApiCatalog';
import './ProductElement.scss';
import { CartActionsType, updateBasketById } from '../../store/basket';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface IProductDetailProps {
  productData?: {
    id: string;
    key: string;
    price: number;
    imageUrl: string;
    masterData: {
      current: {
        description: {
          en: string;
        };
        categories: [{ typeId: string; id: string }];
        masterVariant: {
          id: number;
          prices: {
            value: {
              centAmount: number;
              currencyCode: string;
            };
          }[];
          images: [{ url: string }];
        };
        name: {
          en: string;
        };
      };
    };
  };
}
function ProductElement({
  product,
  addProducts,
}: {
  product: IProductElement['masterData']['current'];
  addProducts: IProductDetailProps;
}) {
  const dispatch = useAppDispatch();
  const { basket } = useAppSelector((state) => state.basket);

  const addProductToCart = () => {
    if (basket) {
      updateBasketById(basket?.id, {
        version: basket?.version,
        actions: [
          {
            action: CartActionsType.ADDITEM,
            variantId: addProducts.productData?.masterData.current.masterVariant.id,
            productId: addProducts.productData?.id,
            quantity: 1,
          },
        ],
      })(dispatch);
    }
  };

  return (
    <div className="product_block">
      <div className="product_block_images">
        {product.masterVariant.images[0] ? <img src={product.masterVariant.images[0].url} alt="Product img" /> : null}
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
          <p>Add</p>
          <div className="total_product">0</div>
        </button>
      </div>
    </div>
  );
}

export default ProductElement;
