import IProductElement from '../../ApiCatalog/ApiCatalog';
import './ProductElement.scss';

function ProductElement({ product }: { product: IProductElement }) {
  return (
    <div className="product_block">
      <div className="product_block_categories">
        <div className="category"></div>
      </div>
      <div className="product_block_images">
        <img src={product.masterData.current.masterVariant.images[0].url} alt="Product img" />
      </div>
      <div className="product_block_info">
        <div className="product_block_info_title">
          <p className="title">{product.masterData.current.name.en}</p>
          <div className="price">
            <p className="price_discount">
              ${product.masterData.current.masterVariant.prices[0].value.centAmount / 100}
            </p>
            <p className="price_current">
              ${product.masterData.current.masterVariant.prices[1].value.centAmount / 100}
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
