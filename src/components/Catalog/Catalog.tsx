import { useEffect, useState } from 'react';
import './Catalog.scss';
import Categories from '../Categories/Categories';
import IProductElement, { categoryFilter, getAllCategories, getAllProducts } from '../../ApiCatalog/ApiCatalog';
import ProductElement from '../ProductElement/ProductElement';

function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let productData;
        if (activeCategory) {
          const categoryData = await categoryFilter(activeCategory);
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
  }, [activeCategory]);

  const handleCategoryClick = async (categoryId: string) => {
    try {
      setActiveCategory(categoryId);
    } catch (error) {
      console.error('Error when retrieving products by category:', error);
    }
  };

  return (
    <div className="catalog">
      <div className="catalog_banner">
        <h1>Shop</h1>
      </div>
      <Categories categories={categories} onCategoryClick={handleCategoryClick} />
      <div className="catalog_products">
        {products.map((product) => (
          <ProductElement key={(product as IProductElement).id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
