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
import SearchBar from '../SearchBar/SearchBar';
import Pagination from '../Pagination/Pagination';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [priceFilter, setPriceFilter] = useState({ from: '0', to: '9999' });
  const [activeCookingOptions, setActiveCookingOptions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categoryId = searchParams.get('categoryId');

  useEffect(() => {
    async function fetchProducts() {
      const categoryFilter = categoryId ? `categories.id:"${categoryId}"` : null;
      const priceFilterString = priceFilter
        ? `variants.price.centAmount:range (${priceFilter.from} to ${priceFilter.to})`
        : null;
      const cookingOptionsString = activeCookingOptions.length > 0 ? `variants.attributes.lookProducts:exists` : null;
      const searchFilterString = searchQuery ? `text.en=${searchQuery}` : null;

      try {
        const allProductsData = await getAllProducts(
          [categoryFilter, priceFilterString, cookingOptionsString, searchFilterString].filter(Boolean).join('&'),
          sortOption.value,
          searchQuery,
          currentPage
        );
        setProducts(allProductsData.results);
      } catch (error) {
        console.error('Error in receiving products:', error);
      }
    }

    fetchProducts();
  }, [categoryId, sortOption, priceFilter, activeCookingOptions, searchQuery, currentPage]);

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
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <div className="filter_block">
        <div className="search_bar">
          <SearchBar onSearch={handleSearch} />
          <SortSelect sortOption={sortOption} setSortOption={setSortOption} />
        </div>
        <div className="filter_products">
          <ProductsFilter setPriceFilter={setPriceFilter} />
          <ProductsFilterOption
            setActiveCookingOptions={setActiveCookingOptions}
            activeCookingOptions={activeCookingOptions}
          />
        </div>
      </div>
      <div className="categories_block">
        <CatalogBreadcrumbs categories={categories} />
        <Categories categories={categories} />
      </div>
      <div className="catalog_products">
        {products.map((product) => (
          <ProductElement key={(product as IProductElement).id} product={product} productData={product} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={5} onPageChange={handlePageChange} />
    </>
  );
}

export default Catalog;
