import useInput from '../hooks/useInput';
import { useEffect, useMemo, useState } from 'react';
import { InputElement } from '../components';
import countries from '../db/countries';
import useCheckbox from '../hooks/useCheckbox';
import { CheckboxSwitcherElement } from './UI/checkboxSwitcherElement';
interface IAddressComponent {
  key?: string;
  id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  streetName: string;
  streetNumber?: string;
  postalCode: string;
  city: string;
  country: string;
  phone?: string;
  mobile?: string;
  email?: string;
}

interface INewAddress extends IAddressComponent {
  index?: number;
  isEditMode?: boolean;
}

interface IAddressComponentProps {
  index?: number;
  title?: string;
  formId?: string;
  data?: INewAddress;
  isDefault?: boolean;
  isDisabled?: boolean;
  isEditableMode?: boolean;
  setCb?: (arg: IAddressComponent) => void;
}
const AddressComponent = (props: IAddressComponentProps) => {
  const asDefaultAddress = useCheckbox(false);
  const addressType = useInput('');
  const country = useInput(props.data ? props.data.country : '');
  const city = useInput(props.data ? props.data.city : '');
  const street = useInput(props.data ? props.data.streetName : '');
  const postalCode = useInput(props.data ? props.data.postalCode : '');
  const isEditable: boolean = Boolean(props.isEditableMode);
  const [selectedCity, setSelectedCountry] = useState(props.data ? props.data.country : '');
  const filtered = useMemo(() => {
    return countries.filter((c) => c.name.toLocaleLowerCase().includes(country.value.toLocaleLowerCase()));
  }, [country.value]);

  const handleSelectCountry = (countryCode: string, countryName: string) => {
    country.setValue(`(${countryCode}) ${countryName}`);
    setSelectedCountry(countryCode);
  };

  const address = {
    ...(props.data?.id && { id: props.data?.id }),
    ...(props.data?.index && { index: props.data?.index }),
    ...(props.data?.isEditMode && { isEditMode: props.data?.isEditMode }),
    city: city.value,
    country: selectedCity,
    postalCode: postalCode.value,
    streetName: street.value,
  };
  console.log(address);

  useEffect(() => {
    props.setCb && props.setCb(address);
  }, [city.value, selectedCity, postalCode.value, street.value]);

  return (
    <div
      className={`address-component__edit-inner ${props.isDefault && 'address-component__mode_default'} ${
        props.isEditableMode && 'address-component__mode_edit'
      }`}
    >
      {props.title && <div className="user-profile__sub-title">{props.title}</div>}
      <form id={props.formId} className="user-profile__info-block">
        <CheckboxSwitcherElement
          {...addressType}
          value1="Shipping address"
          value2="Billing address"
          isDisabled={props.isDefault || !isEditable}
        />
        <div className="registration__input-wrapper country_selector">
          <InputElement
            {...country}
            className="user-profile__input app__input_text"
            type="text"
            placeholder="Country"
            validationCb="country"
            disabled={props.isDefault || !isEditable}
          />

          {isEditable && country.value !== selectedCity && filtered[0] && (
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
          disabled={props.isDefault || !isEditable}
        />
        <InputElement
          {...street}
          className="user-profile__input app__input_text"
          type="text"
          placeholder="Street"
          validationCb="street"
          disabled={props.isDefault || !isEditable}
        />
        <InputElement
          {...postalCode}
          className="user-profile__input app__input_number"
          type="text"
          placeholder="Postal code"
          validationCb="postalCode"
          disabled={props.isDefault || !isEditable}
        />
        <InputElement
          labelClassname="checkbox_label"
          {...asDefaultAddress}
          className="registration__checkbox app__input_checkbox"
          type="checkbox"
          placeholder="Set as default address"
          disabled={props.isDefault || !isEditable}
        />
      </form>
    </div>
  );
};

export default AddressComponent;
