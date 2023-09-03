import { useEffect, useState } from 'react';
import './Catalog.scss';
import Categories from '../Categories/Categories';
import IProductElement, { categoryFilter, getAllCategories, getAllProducts } from '../../ApiCatalog/ApiCatalog';
import ProductElement from '../ProductElement/ProductElement';
import CatalogBreadcrumbs from '../CatalogBreadcrumbs/CatalogBreadcrumbs';
import { useSearchParams } from 'react-router-dom';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get('categoryId');

  useEffect(() => {
    async function fetchProducts() {
      try {
        let productData;
        if (categoryId) {
          const categoryData = await categoryFilter(categoryId);

          productData = categoryData.results;
        } else {
          const allProductsData = await getAllProducts();
          productData = allProductsData.results;
        }
        setProducts(productData);
      } catch (error) {
        console.error('Error in receiving products:', error);
      }
    }

    async function fetchCategories() {
      try {
        const categoryData = await getAllCategories();
        setCategories(categoryData.results);
      } catch (error) {
        console.error('Error when retrieving categories:', error);
      }
    }

    fetchProducts();
    fetchCategories();
  }, [categoryId]);

  return (
    <div className="catalog">
      <div className="catalog_banner">
        <h1>Shop</h1>
      </div>
      <CatalogBreadcrumbs categories={categories} />
      <Categories categories={categories} />
      <div className="catalog_products">
        {products.map((product) => (
          <ProductElement key={(product as IProductElement).id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
