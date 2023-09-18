import Catalog from '../../components/Catalog/Catalog';

function Shop() {
  return (
    <div>
      <div className="catalog_banner">
        <h1>Shop</h1>
      </div>

      <div className="catalog">
        <Catalog />
      </div>
    </div>
  );
}

export default Shop;
