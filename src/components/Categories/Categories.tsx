import { useSearchParams } from 'react-router-dom';
import IGetCategory from '../../ApiCatalog/ApiCatalog';
import './Categories.scss';
import { MouseEventHandler, useState } from 'react';

function Categories({ categories }: { categories: IGetCategory[] }) {
  const [, setSearchParams] = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick =
    (categoryId: string): MouseEventHandler<HTMLLIElement> =>
    (event) => {
      event.preventDefault();

      setSearchParams({ categoryId });
    };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className={`categories ${menuOpen ? 'menu-open' : ''}`}>
      <div className="menu-button" onClick={toggleMenu}>
        Categories
      </div>
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
