import IProductElement from '../../ApiCatalog/ApiCatalog';
import './ProductElement.scss';

function ProductElement({ product }: { product: IProductElement }) {
  const {
    masterData: { current },
  } = product;

  return (
    <div className="product_block">
      <div className="product_block_images">
        {current.masterVariant.images[0] ? (
          <img src={product.masterData.current.masterVariant.images[0].url} alt="Product img" />
        ) : null}
      </div>
      <div className="product_block_description">
        <p>{current.description ? current.description.en : null}</p>
      </div>
      <div className="product_block_info">
        <div className="product_block_info_title">
          <p className="title">{current.name.en}</p>
          <div className="price">
            <p className="price_discount">
              ${current.masterVariant.prices[0] ? current.masterVariant.prices[0].value.centAmount / 100 : null}
            </p>
            <p className="price_current">
              ${current.masterVariant.prices[1] ? current.masterVariant.prices[1].value.centAmount / 100 : null}
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
