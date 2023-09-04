import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import './ProductsFilter.scss';

interface IProductsFilterProps {
  setPriceFilter: Dispatch<SetStateAction<{ from: string; to: string }>>;
}

const ProductsFilter: FC<IProductsFilterProps> = ({ setPriceFilter }) => {
  const [minPrice, setMinPrice] = useState('100');
  const [maxPrice, setMaxPrice] = useState('9999');

  useEffect(() => {
    setPriceFilter({ from: minPrice, to: maxPrice });
  }, [minPrice, maxPrice]);

  return (
    <div className="range">
      <h4>Filter by price</h4>

      <div className="price-content">
        <div>
          <label>Min</label>
          <p id="min-value">${minPrice}</p>
        </div>

        <div>
          <label>Max</label>
          <p id="max-value">${maxPrice}</p>
        </div>
      </div>

      <div className="range-slider">
        <input
          type="range"
          className="min-price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          min="0"
          max="9999"
          step="10"
        />
        <input
          type="range"
          className="min-price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          min="0"
          max="9999"
          step="10"
        />
      </div>
    </div>
  );
};

export default ProductsFilter;
