import IGetCategory from '../../ApiCatalog/ApiCatalog';
import './Categories.scss';

function Categories({
  categories,
  onCategoryClick,
}: {
  categories: IGetCategory[];
  onCategoryClick: (categoryId: string) => void;
}) {
  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={() => onCategoryClick(category.id)}>
            {category.name.en}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
