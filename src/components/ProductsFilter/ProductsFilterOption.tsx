import { Dispatch, FC, SetStateAction } from 'react';
import { cookingOptions } from '../../constants/cookingOptions';

interface IProductsFilterOptionProps {
  activeCookingOptions: string[];
  setActiveCookingOptions: Dispatch<SetStateAction<string[]>>;
}

const ProductsFilterOption: FC<IProductsFilterOptionProps> = ({ activeCookingOptions, setActiveCookingOptions }) => {
  return (
    <form className="filter_option">
      {cookingOptions.map((option) => (
        <div key={option.value} className="filter_option_checkbox">
          <input
            checked={activeCookingOptions.includes(option.value)}
            type="checkbox"
            onChange={(e) => {
              e.target.checked
                ? setActiveCookingOptions([...activeCookingOptions, option.value])
                : setActiveCookingOptions(activeCookingOptions.filter((it) => it !== option.value));
            }}
            className="filter_option_baking"
            id={option.value}
            name={option.name}
          />
          <label htmlFor={option.value}>{option.name} </label>
        </div>
      ))}
    </form>
  );
};

export default ProductsFilterOption;
