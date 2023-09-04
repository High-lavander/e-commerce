import { getToken } from '../../../store/customer';

const ProductElement = async () => {
  // const { id } = useParams();
  const projectKey = process.env.VITE_CTP_PROJECT_KEY;
  const requestURL: string = `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${projectKey}/products/`;
  const tokenObject = await getToken();

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${tokenObject.access_token}`);

  enum RedirectOption {
    Follow = 'follow',
    Error = 'error',
    Manual = 'manual',
  }
  type RequestOptions = {
    method: string;
    headers: Headers;
    redirect: RedirectOption;
  };
  const requestOptions: RequestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: RedirectOption.Follow,
  };

  const getProductsList = async () => {
    try {
      const res = await fetch(`${requestURL}`, requestOptions);
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };
  const productData = await getProductsList();
  console.log(productData);

  return (
    <div className="product-element">
      <div className="product-element-img product-element__img">
        <p className="product-element__class">Type</p>
      </div>
      <div className="product-element-info product-element__info">
        {/* <p className="product-element-info__name">{product.name.en}</p> */}
        <div className="price-container product-element-info__price-container">
          <p className="price-container__discount"></p>
          <p className="price-container__price"></p>
        </div>
      </div>
    </div>
  );
};

export default ProductElement;
