import useInput from '../hooks/useInput';
import { useEffect, useMemo, useState } from 'react';
import { InputElement } from '../components';
import countries from '../db/countries';
interface IAddressComponent {
  title?: string;
  formId?: string;
  data?: object;
  isDefault?: boolean;
  setCb?: (arg: object) => void;
}
const AddressComponent = (props: IAddressComponent) => {
  const country = useInput('');
  const city = useInput('');
  const street = useInput('');
  const postalCode = useInput('');
  const [selectedCity, setSelectedCountry] = useState('');
  const filtered = useMemo(() => {
    return countries.filter((c) => c.name.toLocaleLowerCase().includes(country.value.toLocaleLowerCase()));
  }, [country.value]);

  const handleSelectCountry = (countryCode: string, countryName: string) => {
    country.setValue(`(${countryCode}) ${countryName}`);
    setSelectedCountry(countryCode);
  };

  const address = [
    {
      city: city.value,
      country: selectedCity,
      postalCode: postalCode.value,
      streetName: street.value,
    },
  ];
  console.log(address);

  useEffect(() => {
    props.setCb && props.setCb(address);
  }, [city.value, selectedCity, postalCode.value, street.value]);

  return (
    <div className={`user-profile__edit-inner ${props.isDefault && 'default-address'}`}>
      {props.title && <div className="user-profile__title">{props.title}</div>}
      <form id={props.formId} className="user-profile__info-block">
        <div className="registration__input-wrapper country_selector">
          <InputElement
            {...country}
            className="user-profile__input app__input_text"
            type="text"
            placeholder="Country"
            validationCb="country"
            disabled={props.isDefault}
          />

          {country.value && filtered[0] && (
            <ul className="user-profile__list countries-list">
              {filtered.map((country) => {
                return (
                  <li
                    className="countries-list__item"
                    value={country.code}
                    key={country.code}
                    onClick={() => handleSelectCountry(country.code, country.name)}
                  >
                    {country.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <InputElement
          {...city}
          className="user-profile__input app__input_text"
          type="text"
          placeholder="City"
          validationCb="city"
          disabled={props.isDefault}
        />
        <InputElement
          {...street}
          className="user-profile__input app__input_text"
          type="text"
          placeholder="Street"
          validationCb="street"
          disabled={props.isDefault}
        />
        <InputElement
          {...postalCode}
          className="user-profile__input app__input_number"
          type="text"
          placeholder="Postal code"
          validationCb="postalCode"
          disabled={props.isDefault}
        />
      </form>
    </div>
  );
};

export default AddressComponent;
