import { useEffect, useState } from 'react';
import './Catalog.scss';
import Categories from '../Categories/Categories';
import IProductElement, { getAllCategories, getAllProducts } from '../../ApiCatalog/ApiCatalog';
import ProductElement from '../ProductElement/ProductElement';
import CatalogBreadcrumbs from '../CatalogBreadcrumbs/CatalogBreadcrumbs';
import { useSearchParams } from 'react-router-dom';
import ProductsFilter from '../ProductsFilter/ProductsFilter';
import ProductsFilterOption from '../ProductsFilter/ProductsFilterOption';
import SortSelect from '../SortSelect/SortSelect';
import { sortOptions } from '../../constants/sortOptions';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [priceFilter, setPriceFilter] = useState({ from: '0', to: '9999' });
  const [activeCookingOptions, setActiveCookingOptions] = useState<string[]>([]);

  const categoryId = searchParams.get('categoryId');

  useEffect(() => {
    async function fetchProducts() {
      const categoryFilter = categoryId ? `categories.id:"${categoryId}"` : null;
      const priceFilterString = priceFilter
        ? `variants.price.centAmount:range (${priceFilter.from} to ${priceFilter.to})`
        : null;
      const cookingOptionsString = activeCookingOptions.length > 0 ? `variants.attributes.lookProducts:exists` : null;

      try {
        const allProductsData = await getAllProducts(
          [categoryFilter, priceFilterString, cookingOptionsString].filter(Boolean).join('&'),
          sortOption.value
        );
        setProducts(allProductsData.results);
      } catch (error) {
        console.error('Error in receiving products:', error);
      }
    }

    fetchProducts();
  }, [categoryId, sortOption, priceFilter, activeCookingOptions]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoryData = await getAllCategories();
        setCategories(categoryData.results);
      } catch (error) {
        console.error('Error when retrieving categories:', error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="catalog">
      <div className="catalog_banner">
        <h1>Shop</h1>
      </div>
      <ProductsFilter setPriceFilter={setPriceFilter} />
      <ProductsFilterOption
        setActiveCookingOptions={setActiveCookingOptions}
        activeCookingOptions={activeCookingOptions}
      />
      <CatalogBreadcrumbs categories={categories} />
      <Categories categories={categories} />
      <SortSelect sortOption={sortOption} setSortOption={setSortOption} />
      <div className="catalog_products">
        {products.map((product) => (
          <ProductElement key={(product as IProductElement).id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
