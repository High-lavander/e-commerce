import { InputElement } from '../../components';
import useInput from '../../hooks/useInput';
import './UserProfile.scss';
import avatar from '../../assets/user/avatar.svg';
import geolocation from '../../assets/user/geolocation.svg';
import lock from '../../assets/user/lock.svg';
import { useEffect, useState } from 'react';
import AddressComponent from '../../components/AddressComponent';
import { getCustomerById } from '../../store/userProfile';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
// import { useState } from 'react';
//a42bf47e-75a6-4b92-b237-5f2a16be09d9

const dataJson = {
  id: 'a42bf47e-75a6-4b92-b237-5f2a16be09d9',
  version: 1,
  versionModifiedAt: '2023-08-05T11:50:11.241Z',
  lastMessageSequenceNumber: 1,
  createdAt: '2023-08-05T11:50:11.241Z',
  lastModifiedAt: '2023-08-05T11:50:11.241Z',
  lastModifiedBy: {
    clientId: 'hvI2XZLbWCzD8ky8lv0D_f_S',
    isPlatformClient: false,
  },
  createdBy: {
    clientId: 'hvI2XZLbWCzD8ky8lv0D_f_S',
    isPlatformClient: false,
  },
  customerNumber: '1',
  email: 'jane.doe@example.com',
  firstName: 'Jane',
  lastName: 'Doe',
  title: 'Mrs',
  dateOfBirth: '1974-09-20',
  password: '****7Ck=',
  addresses: [
    {
      id: 'tqsvzzix',
      title: 'Mrs.',
      firstName: 'Jane',
      lastName: 'Doe',
      streetName: 'First Street',
      streetNumber: '12',
      postalCode: '12345',
      city: 'Example City',
      country: 'NL',
      phone: '+312345678',
      mobile: '+312345679',
      email: 'jane.doe@example.com',
    },
    {
      id: 'sAzGJpI6',
      title: 'Head of factory',
      firstName: 'Jane',
      lastName: 'Doe',
      streetName: 'Third Street',
      streetNumber: '34',
      postalCode: '12345',
      city: 'Example City',
      country: 'NL',
      phone: '+3112345678',
      mobile: '+3112345679',
      email: 'jane.doe@example.com',
    },
  ],
  shippingAddressIds: [],
  billingAddressIds: [],
  isEmailVerified: true,
  key: 'janeDoe',
  stores: [],
  authenticationMode: 'Password',
};

interface IGenerals {
  id: string;
  vesrion: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  customerNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  dateOfBirth: string;
}

interface IGeneralsBlockProps {
  generals: IGenerals | unknown;
}
const GeneralsBlock = (props: IGeneralsBlockProps) => {
  const generals = props.generals as IGenerals;
  const firstName = useInput(generals.firstName);
  const lastName = useInput(generals.lastName);
  const email = useInput(generals.email);
  const birthDate = useInput(generals.dateOfBirth);
  const phone = useInput(generals.customerNumber);
  console.log('props', props);
  return (
    <div className="user-profile__edit-inner">
      <h1 className="user-profile__title">Welcome to your account on the app!</h1>
      <form className="user-profile__info-block">
        <div className="user-profile__input_double">
          <InputElement
            className="user-profile__input app__input_text"
            type="text"
            placeholder="First name"
            validationCb="name"
            {...firstName}
          />
          <InputElement
            className="user-profile__input app__input_text"
            type="text"
            placeholder="Last name"
            validationCb="name"
            {...lastName}
          />
        </div>
        <InputElement
          className="user-profile__input app__input_email"
          type="email"
          placeholder="Email"
          validationCb="email"
          {...email}
        />
        <div className="user-profile__input_double">
          <InputElement
            className="user-profile__input app__input_date"
            type="date"
            placeholder="Date of birth"
            validationCb="date"
            {...birthDate}
          />
          <InputElement
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

interface IAddress {
  key?: string;
  id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  postalCode: string;
  city: string;
  country: string;
  phone?: string;
  mobile?: string;
  email?: string;
}
interface IAddressesBlockProps {
  addresses: IAddress[] | unknown;
  shippingAddressIds: number[];
  billingAddressIds: number[];
}
const AddressesBlock = (props: IAddressesBlockProps) => {
  const [homeAddress, setHomeAddress] = useState<IAddress | object>({});
  const [billingAddress, setBillingAddress] = useState<IAddress | object>({});
  const [defaultAddress, setDefaultAddress] = useState<IAddress | object>({});
  const [newAddress, setNewAddress] = useState<IAddress | object>({});
  const adressesData = [
    { id: 'home-address', title: 'Home address', data: homeAddress, setCb: setHomeAddress },
    { id: 'billing-address', title: 'Billing address', data: billingAddress, setCb: setBillingAddress },
    { id: 'new-address', title: 'New address', data: newAddress, setCb: setNewAddress },
  ];
  const saveAddresses = () => {
    console.log('adressesData', adressesData);
    console.log('props', props);
    setDefaultAddress({});
  };

  return (
    <div className="user-profile__edit-inner">
      <h1 className="user-profile__title">Address management</h1>
      <AddressComponent title="Default address" isDefault={true} data={defaultAddress} />
      {adressesData.map((address) => {
        return (
          <AddressComponent
            formId={address.id}
            title={address.title}
            key={address.id}
            data={address.data}
            setCb={address.setCb}
          />
        );
      })}
      <button className="user-profile__button" onClick={saveAddresses}>
        Save changes
      </button>
    </div>
  );
};

interface IPasswordBlockProps {
  password: string;
}
const PasswordBlock = (props: IPasswordBlockProps) => {
  const currentPassword = useInput('');
  const newPassword = useInput('');
  console.log('props.password', props.password);
  return (
    <div className="user-profile__edit-inner">
      <h1 className="user-profile__title">Modifying the password</h1>
      <form className="user-profile__info-block">
        <InputElement
          {...currentPassword}
          className="user-profile__input app__input_password"
          type="password"
          placeholder="Current password"
          minLength={4}
          validationCb="password"
        />
        <InputElement
          {...newPassword}
          className="user-profile__input app__input_password"
          type="password"
          placeholder="New password"
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
  const dispatch = useDispatch();
  const { userProfile, userProfileError } = useAppSelector((store) => store.userProfile);
  // const [defaultAddress, setDefaultAddress] = useState<IAddress | null>();
  const [generalsBlockData, setGeneralsBlockData] = useState({});
  const [addressesBlockData, setAddressesBlockData] = useState<IAddress[]>([]);
  const [passwordBlockData, setPasswordBlockData] = useState('');

  const switchBlock = (block: string) => {
    setCurrentBlock(block);
  };

  useEffect(() => {
    // const fetchUserProfile = async () => {
    //   await getCustomerById('a42bf47e-75a6-4b92-b237-5f2a16be09d9')(dispatch);
    //   setDefaultAddress(userProfile);
    // };
    // fetchUserProfile();
    getCustomerById('a42bf47e-75a6-4b92-b237-5f2a16be09d9')(dispatch);
    // setDefaultAddress(null);
    setGeneralsBlockData(dataJson);
    setAddressesBlockData(dataJson.addresses);
    setPasswordBlockData(dataJson.password);
    console.log(userProfile, userProfileError);
    console.log('useEffect');
  }, []);
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
          {currentBlock === 'generals' && <GeneralsBlock generals={generalsBlockData} />}
          {currentBlock === 'addresses' && (
            <AddressesBlock
              addresses={addressesBlockData}
              billingAddressIds={dataJson.billingAddressIds}
              shippingAddressIds={dataJson.shippingAddressIds}
            />
          )}
          {currentBlock === 'password' && <PasswordBlock password={passwordBlockData} />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
