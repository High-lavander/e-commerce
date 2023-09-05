import './Sort.scss';
interface ICookingOption {
  name: string;
  value: string;
}

const cookingOptions: ICookingOption[] = [
  { name: 'Baking', value: 'backing' },
  { name: 'Grill', value: 'grill' },
  { name: 'Salad', value: 'salad' },
  { name: 'Smoothie', value: 'smoothie' },
];

export { cookingOptions };
export type { ICookingOption };
