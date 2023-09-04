export default interface IProductElement {
  id: string;
  key: string;
  price: number;
  imageUrl: string;
  masterData: {
    current: {
      description: {
        en: string;
      };
      categories: [{ typeId: string; id: string }];
      masterVariant: {
        prices: {
          value: {
            centAmount: number;
            currencyCode: string;
          };
        }[];
        images: [{ url: string }];
      };
      name: {
        en: string;
      };
    };
  };
}

export default interface IGetCategory {
  id: string;
  key: string;
  name: {
    en: string;
  };
}
