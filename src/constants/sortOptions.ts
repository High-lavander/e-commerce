interface ISortOption {
  name: string;
  value: string;
}

const sortOptions: ISortOption[] = [
  {
    name: 'по названию(а-я)',
    value: 'name.en asc',
  },
  {
    name: 'по названию(я-а)',
    value: 'name.en desc',
  },
  {
    name: 'по цене(сначала дорогие)',
    value: 'price desc',
  },
  {
    name: 'по цене(сначала дешёвые)',
    value: 'price asc',
  },
];

export { sortOptions };
export type { ISortOption };
