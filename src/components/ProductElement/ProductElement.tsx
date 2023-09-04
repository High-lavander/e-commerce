import IProductElement from '../../ApiCatalog/ApiCatalog';
import './ProductElement.scss';

function ProductElement({ product }: { product: IProductElement['masterData']['current'] }) {
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
        <button className="product_block_info_btn-basket">
          <p>Add</p>
          <div className="total_product">0</div>
        </button>
      </div>
    </div>
  );
}
export default ProductElement;
