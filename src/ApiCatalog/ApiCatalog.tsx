import { getToken } from '../store/customer';

export default interface IProductElement {
  id: string;
  key: string;
  price: number;
  imageUrl: string;
  description: {
    en: string;
  };
  masterData: {
    current: {
      description: {
        en: string;
      };
      categories: [{ typeId: string; id: string }];
      masterVariant: {
        id: number;
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

export const getAllProducts = async (filter: string | null, sort: string | null, searchQuery: string | null) => {
  try {
    const tokenObject = await getToken();
    const accessToken = tokenObject.access_token;

    const url = [
      `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/product-projections/search`,
    ];

    if (filter) {
      url.push(`?filter=${filter}`);
    }

    if (searchQuery) {
      url.push(url.length > 1 ? `&text.en=${searchQuery}` : `?text.en=${searchQuery}`);
    }

    if (sort) {
      url.push(url.length > 1 ? `&sort=${sort}` : `?sort=${sort}`);
    }

    const response = await fetch(url.join(''), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error while executing the query: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in receiving products:', error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const tokenObject = await getToken();
    const accessToken = tokenObject.access_token;

    const response = await fetch(
      `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/categories`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error while executing the query: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in receiving category:', error);
    throw error;
  }
};

export const categoryFilter = async (categoryId: string) => {
  try {
    const tokenObject = await getToken();
    const accessToken = tokenObject.access_token;

    const where = `masterData(current(categories(id="${categoryId}")))`;

    const response = await fetch(
      `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/products?where=` +
        encodeURIComponent(where),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error while executing the query: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error when receiving products by category:', error);
    throw error;
  }
};
