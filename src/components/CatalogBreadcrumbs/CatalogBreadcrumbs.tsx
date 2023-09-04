import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './CatalogBreadcrumbs.scss';
import IGetCategory from '../../ApiCatalog/ApiCatalog';

interface ICatalogBreadcrumbsProps {
  categories: IGetCategory[];
}

const CatalogBreadcrumbs: FC<ICatalogBreadcrumbsProps> = ({ categories }) => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  return (
    <div className="bread-crumb">
      <Link to={'/'}>Home</Link>
      {'/'}
      <Link className={categoryId ? '' : 'active'} to={'/shop'}>
        Catalog
      </Link>

      {categoryId ? (
        <>
          {'/'}
          <span className={'active'}>{categories.find((it) => it.id === categoryId)?.name?.en}</span>
        </>
      ) : null}
    </div>
  );
};

export default CatalogBreadcrumbs;
