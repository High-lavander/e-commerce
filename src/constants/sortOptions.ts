import './Sort.scss';

interface ISortOption {
  name: string;
  value: string;
}

const sortOptions: ISortOption[] = [
  {
    name: 'by name(asc)',
    value: 'name.en asc',
  },
  {
    name: 'by name(desc)',
    value: 'name.en desc',
  },
  {
    name: 'by price(desc)',
    value: 'price desc',
  },
  {
    name: 'by price(asc)',
    value: 'price asc',
  },
];

export { sortOptions };
export type { ISortOption };
