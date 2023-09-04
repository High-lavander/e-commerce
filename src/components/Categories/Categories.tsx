import { useSearchParams } from 'react-router-dom';
import IGetCategory from '../../ApiCatalog/ApiCatalog';
import './Categories.scss';
import { MouseEventHandler } from 'react';

function Categories({ categories }: { categories: IGetCategory[] }) {
  const [, setSearchParams] = useSearchParams();

  const handleClick =
    (categoryId: string): MouseEventHandler<HTMLLIElement> =>
    (event) => {
      event.preventDefault();

      setSearchParams({ categoryId });
    };

  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={handleClick(category.id)}>
            {category.name.en}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
