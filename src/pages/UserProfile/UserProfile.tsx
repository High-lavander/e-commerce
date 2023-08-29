import { InputElement } from '../../components';
import useInput from '../../hooks/useInput';
import './UserProfile.scss';
import avatar from '../../assets/user/avatar.svg';
import geolocation from '../../assets/user/geolocation.svg';
import lock from '../../assets/user/lock.svg';
import { useMemo, useState } from 'react';
import countries from '../../db/countries';
// import { useState } from 'react';

const GeneralsBlock = () => {
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const birthDate = useInput('');
  const phone = useInput('');
  return (
    <div className="user-profile__edit-inner">
      <h1 className="user-profile__title">Welcome to your account on the app!</h1>
      <form className="user-profile__info-block">
        <div className="user-profile__input_double">
          <InputElement
            id="firstName"
            className="user-profile__input app__input_text"
            type="text"
            placeholder="First name"
            validationCb="name"
            {...firstName}
          />
          <InputElement
            id="lastName"
            className="user-profile__input app__input_text"
            type="text"
            placeholder="Last name"
            validationCb="name"
            {...lastName}
          />
        </div>
        <InputElement
          id="email"
          className="user-profile__input app__input_email"
          type="email"
          placeholder="Email"
          validationCb="email"
          {...email}
        />
        <div className="user-profile__input_double">
          <InputElement
            id="birthDate"
            className="user-profile__input app__input_date"
            type="text"
            placeholder="Date of birth"
            validationCb="date"
            {...birthDate}
          />
          <InputElement
            id="phone"
            className="user-profile__input app__input_number"
            type="text"
            placeholder="Phone number"
            validationCb="name"
            {...phone}
          />
        </div>
        <button className="user-profile__button">Save changes</button>
      </form>
    </div>
  );
};

const AddressesBlock = () => {
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
      key: '0',
      country: selectedCity,
      city: city.value,
      streetName: street.value,
      postalCode: postalCode.value,
    },
  ];

  console.log(address);

  return (
    <div className="user-profile__edit-inner">
      <h1 className="user-profile__title">Welcome to your account on the app!</h1>
      <form className="user-profile__info-block">
        <div className="registration__input-wrapper country_selector">
          <InputElement
            {...country}
            className="user-profile__input app__input_text"
            type="text"
            placeholder="Country"
            validationCb="country"
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
        />
        <InputElement
          {...street}
          className="user-profile__input app__input_text"
          type="text"
          placeholder="Street"
          validationCb="street"
        />
        <InputElement
          {...postalCode}
          className="user-profile__input app__input_number"
          type="text"
          placeholder="Postal code"
          validationCb="postalCode"
        />
        <button className="user-profile__button">Save changes</button>
      </form>
    </div>
  );
};

const PasswordBlock = () => {
  const currentPassword = useInput('');
  const newPassword = useInput('');
  return (
    <div className="user-profile__edit-inner">
      <h1 className="user-profile__title">Welcome to your account on the app!</h1>
      <form className="user-profile__info-block">
        <InputElement
          {...currentPassword}
          className="user-profile__input app__input_password"
          type="password"
          placeholder="Password"
          minLength={4}
          validationCb="password"
        />
        <InputElement
          {...newPassword}
          className="user-profile__input app__input_password"
          type="password"
          placeholder="Password"
          minLength={4}
          validationCb="password"
        />
        <button className="user-profile__button">Save changes</button>
      </form>
    </div>
  );
};
const UserProfile = () => {
  const [currentBlock, setCurrentBlock] = useState('generals');

  const switchBlock = (block: string) => {
    setCurrentBlock(block);
  };
  return (
    <div className="user-profile">
      <div className="user-profile__inner">
        <div className="user-profile__aside">
          <div
            className={`user-profile__switch-general settings__switch ${
              currentBlock === 'generals' && 'settings__switch_active'
            }`}
            onClick={() => switchBlock('generals')}
          >
            <img className="settings__image" src={avatar} alt="user avatar" />
          </div>
          <div
            className={`user-profile__switch-general settings__switch ${
              currentBlock === 'addresses' && 'settings__switch_active'
            }`}
            onClick={() => switchBlock('addresses')}
          >
            <img className="settings__image" src={geolocation} alt="geolocation" />
          </div>
          <div
            className={`user-profile__switch-general settings__switch ${
              currentBlock === 'password' && 'settings__switch_active'
            }`}
            onClick={() => switchBlock('password')}
          >
            <img className="settings__image" src={lock} alt="lock" />
          </div>
        </div>
        <div className="user-profile__edit">
          {currentBlock === 'generals' && <GeneralsBlock />}
          {currentBlock === 'addresses' && <AddressesBlock />}
          {currentBlock === 'password' && <PasswordBlock />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
