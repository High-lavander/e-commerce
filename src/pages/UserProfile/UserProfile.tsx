import { InputElement } from '../../components';
import useInput from '../../hooks/useInput';
import './UserProfile.scss';
import avatar from '../../assets/user/avatar.svg';
import geolocation from '../../assets/user/geolocation.svg';
import lock from '../../assets/user/lock.svg';
import { useEffect, useState } from 'react';
import AddressComponent from '../../components/AddressComponent';
import { changePassword, getCustomerById, updateCustomer } from '../../store/userProfile';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { Loader } from '../../components/Loader';
import { FetchMessagesComponent } from '../../components/FetchMessagesComponent';
import { useNavigate } from 'react-router';

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
  const firstName = useInput(generals ? generals.firstName : '');
  const lastName = useInput(generals ? generals.lastName : '');
  const email = useInput(generals ? generals.email : '');
  const birthDate = useInput(generals ? generals.dateOfBirth : '');
  const phone = useInput(generals ? generals.customerNumber : '');
  const [isEditMode, setIsEditMode] = useState(false);
  const [formMessage, setFormMessage] = useState<string | undefined>();
  const dispatch = useDispatch();
  const { userProfileMessage, userProfileError, isUserProfileLoading, userProfile } = useAppSelector(
    (state) => state.userProfile
  );

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const saveChanges = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setFormMessage(undefined);
    if (!firstName.value || !lastName.value || !email.value || !birthDate.value) {
      setFormMessage('Fields First name, Last Name, Email and Date of birth must be filled');
      return;
    }
    const postForm = {
      version: userProfile?.version,
      actions: [
        ...(firstName.value ? [{ action: 'setFirstName', firstName: firstName.value }] : []),
        ...(lastName.value
          ? [
              {
                action: 'setLastName',
                lastName: lastName.value,
              },
            ]
          : []),
        ...(email.value
          ? [
              {
                action: 'changeEmail',
                email: email.value,
              },
            ]
          : []),
        ...(birthDate.value
          ? [
              {
                action: 'setDateOfBirth',
                dateOfBirth: birthDate.value,
              },
            ]
          : []),
        ...(phone.value
          ? [
              {
                action: 'setCustomerNumber',
                customerNumber: phone.value,
              },
            ]
          : []),
      ],
    };
    const postFormJson = JSON.stringify(postForm);
    if (userProfile) {
      updateCustomer(userProfile.id, postFormJson)(dispatch);
    } else {
      console.log('No user id detected,login again');
    }
    setFormMessage(undefined);
    setIsEditMode(false);
  };

  return (
    <div className="user-profile__edit-inner">
      <h1 className="user-profile__title">Welcome to your account on the app!</h1>
      <section className="user-profile__info-block">
        <button className="user-profile__edit-switch" onClick={handleEditMode}></button>
        {isUserProfileLoading && <Loader />}
        {formMessage && <FetchMessagesComponent errorMessage={formMessage} />}
        <FetchMessagesComponent successMessage={userProfileMessage} errorMessage={userProfileError} />
        {/* {fetchDataMessage && <div className="user-profile__message_success">{fetchDataMessage}</div>}
        {fetchErrorMessage && <div className="user-profile__message_error">{fetchErrorMessage}</div>} */}
        {isEditMode ? (
          <form className="user-profile__info-edit edit-block">
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
            <button className="user-profile__button" onClick={(e) => saveChanges(e)}>
              Save changes
            </button>
          </form>
        ) : (
          <ul className="user-profile__list">
            <li className="user-profile__list-item">
              <span className="user-profile__item-key">First name: </span>
              {generals.firstName}
            </li>
            <li className="user-profile__list-item">
              <span className="user-profile__item-key">Last name: </span>
              {generals.lastName}
            </li>
            <li className="user-profile__list-item">
              <span className="user-profile__item-key">Email: </span>
              {generals.email}
            </li>
            <li className="user-profile__list-item">
              <span className="user-profile__item-key">Date of birth: </span>
              {generals.dateOfBirth}
            </li>
            <li className="user-profile__list-item">
              <span className="user-profile__item-key">Phone: </span>
              {generals.customerNumber}
            </li>
          </ul>
        )}
      </section>
    </div>
  );
};

interface IAddress {
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
interface IAddressesBlockProps {
  addresses: IAddress[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
}

enum AddressTypes {
  SHIPPING = 'Shipping address',
  BILLING = 'Billing address',
}

interface INewAddress extends IAddress {
  index?: number;
  isEditMode?: boolean;
  asDefaultAddress?: boolean;
  addressType?: AddressTypes;
}

interface IPostFormUpdate {
  version?: number;
  actions?: object[];
}
const AddressesBlock = (props: IAddressesBlockProps) => {
  const dispatch = useDispatch();
  const { userProfile, isUserProfileLoading, userProfileError, userProfileMessage } = useAppSelector(
    (state) => state.userProfile
  );
  const [updateAddresses, setUpdateAddresses] = useState<IAddress[]>(props.addresses);
  const [newAddresses, setNewAddresses] = useState<INewAddress[]>([]);
  const [isEditMode, setIsEditMode] = useState(props?.addresses?.map(() => false) || []);
  const defaultAddressData = props?.addresses.find((address) => address.id === props.defaultShippingAddressId);

  const handleUpdateAddressesCb = (address: IAddress) => {
    setUpdateAddresses(updateAddresses.map((addr) => (addr.id === address.id ? { ...addr, ...address } : { ...addr })));
  };

  const saveAddresses = (addr: IAddress, index: number) => {
    const address = updateAddresses.find((address) => address.id === addr.id);
    setIsEditMode(isEditMode.map((_, indx) => (indx === index ? false : false)));

    let postForm = {};
    if (address) {
      postForm = {
        version: userProfile?.version,
        actions: [
          {
            action: 'changeAddress',
            addressId: address.id,
            address: {
              ...(address.city && { city: address.city }),
              ...(address.country && { country: address.country }),
              ...(address.postalCode && { postalCode: address.postalCode }),
              ...(address.streetName && { streetName: address.streetName }),
            },
          },
        ],
      };
    }

    const postFormJson = JSON.stringify(postForm);
    if (userProfile) {
      updateCustomer(userProfile.id, postFormJson)(dispatch);
    } else {
      console.log('No user id detected,login again');
    }
  };

  const handleEditMode = (index: number) => {
    setIsEditMode(isEditMode.map((val, indx) => (indx === index ? !val : val)));
  };

  const deleteAddress = (address: IAddress) => {
    const postForm = {
      version: userProfile?.version,
      actions: [
        {
          action: 'removeAddress',
          addressId: address.id,
        },
      ],
    };
    const postFormJson = JSON.stringify(postForm);
    if (userProfile) {
      updateCustomer(userProfile.id, postFormJson)(dispatch);
    } else {
      console.log('No user id detected,login again');
    }
  };

  const addNewAddress = () => {
    const newAddress: INewAddress = {
      city: '',
      country: '',
      streetName: '',
      postalCode: '',
      isEditMode: true,
    };
    setNewAddresses((prev) => [...prev, newAddress]);
  };

  const cancelNewAddress = (index: number) => {
    setNewAddresses((prev) => prev.filter((_, inx) => inx !== index));
  };

  const saveNewAddresses = (newAddr: INewAddress, index: number) => {
    setNewAddresses((prev) =>
      prev.map((addr, inx) =>
        inx === index ? { ...addr, ...newAddr, isEditMode: false } : { ...newAddr, isEditMode: false }
      )
    );

    let postForm: IPostFormUpdate = {};
    const keyGenerate = `${newAddr.city} ${newAddr.streetName}`;
    if (newAddr) {
      postForm = {
        version: userProfile?.version,
        actions: [
          {
            action: 'addAddress',
            address: {
              key: keyGenerate,
              ...(newAddr.city && { city: newAddr.city }),
              ...(newAddr.country && { country: newAddr.country }),
              ...(newAddr.postalCode && { postalCode: newAddr.postalCode }),
              ...(newAddr.streetName && { streetName: newAddr.streetName }),
            },
          },
        ],
      };
    }
    if (postForm.actions) {
      if (newAddr.asDefaultAddress && newAddr.addressType === AddressTypes.SHIPPING) {
        postForm.actions.push({ action: 'setDefaultShippingAddress', addressKey: keyGenerate });
        postForm.actions.push({ action: 'addShippingAddressId', addressKey: keyGenerate });
      }
      if (newAddr.asDefaultAddress && newAddr.addressType === AddressTypes.BILLING) {
        postForm.actions.push({ action: 'setDefaultBillingAddress', addressKey: keyGenerate });
        postForm.actions.push({ action: 'addBillingAddressId', addressKey: keyGenerate });
      }
      if (!newAddr.asDefaultAddress && newAddr.addressType === AddressTypes.SHIPPING) {
        postForm.actions.push({ action: 'addShippingAddressId', addressKey: keyGenerate });
      }
      if (!newAddr.asDefaultAddress && newAddr.addressType === AddressTypes.BILLING) {
        postForm.actions.push({ action: 'addBillingAddressId', addressKey: keyGenerate });
      }
    }
    const postFormJson = JSON.stringify(postForm);
    if (userProfile) {
      updateCustomer(userProfile.id, postFormJson)(dispatch);
      setNewAddresses([]);
    } else {
      console.log('No user id detected?login again');
    }
  };

  const handleUpdateNewAddressesCb = (address: INewAddress) => {
    setNewAddresses(
      newAddresses.map((addr, indx) => (indx === address.index ? { ...addr, ...address } : { ...address }))
    );
  };

  return (
    <div className="user-profile__edit-inner">
      {<div className="user-profile__fetch-messages"></div>}
      <FetchMessagesComponent successMessage={userProfileMessage} errorMessage={userProfileError} />
      <h1 className="user-profile__title">Address management</h1>
      {isUserProfileLoading && (
        <div className="user-profile__loader-fixed">
          <Loader />
        </div>
      )}

      {defaultAddressData ? (
        <div className="user-profile__default-address">
          <AddressComponent title="Default address" isDefault={true} data={defaultAddressData} />
        </div>
      ) : (
        <div className="user-profile__default-address">Default address not set</div>
      )}
      <ul className="user-profile__addresses-list">
        {props.addresses &&
          props.addresses.map((address, index) => {
            return (
              <li className="user-profile__addresses-item" key={address.id}>
                <button className="user-profile__edit-switch" onClick={() => handleEditMode(index)}></button>
                <AddressComponent
                  title={`Address ${index + 1}`}
                  formId={address.id}
                  data={address}
                  setCb={handleUpdateAddressesCb}
                  isEditableMode={isEditMode[index]}
                  defaultShippingAddressId={userProfile?.defaultShippingAddressId}
                  defaultBillingAddressId={userProfile?.defaultBillingAddressId}
                  shippingAddressIds={userProfile?.shippingAddressIds}
                  billingAddressIds={userProfile?.billingAddressIds}
                />
                {!isEditMode[index] && (
                  <button className="user-profile__button-delete" onClick={() => deleteAddress(address)}>
                    Delete address
                  </button>
                )}
                {isEditMode[index] && (
                  <button className="user-profile__button" onClick={() => saveAddresses(address, index)}>
                    Save changes
                  </button>
                )}
              </li>
            );
          })}
      </ul>
      <ul className="user-profile__addresses-new">
        {newAddresses &&
          newAddresses.map((newAddr, index) => {
            return (
              <li className="user-profile__addresses-item" key={index}>
                <AddressComponent
                  title={`New address ${index + 1}`}
                  formId={`new${index}`}
                  data={newAddr}
                  setCb={handleUpdateNewAddressesCb}
                  isEditableMode={newAddr.isEditMode}
                  index={index}
                />
                {newAddr.isEditMode && (
                  <button onClick={() => cancelNewAddress(index)} className="user-profile__button-cancel">
                    Cancel address
                  </button>
                )}
                <button className="user-profile__button" onClick={() => saveNewAddresses(newAddr, index)}>
                  Save changes
                </button>
              </li>
            );
          })}
      </ul>
      {newAddresses.length < 1 && (
        <button onClick={addNewAddress} className="user-profile__button-add">
          Add new address
        </button>
      )}
    </div>
  );
};

interface IPasswordBlockProps {
  password: string;
}
const PasswordBlock = (props: IPasswordBlockProps) => {
  const dispatch = useDispatch();
  const { userProfileMessage, userProfileError, isUserProfileLoading, userProfile } = useAppSelector(
    (state) => state.userProfile
  );
  const currentPassword = useInput(props.password);
  const newPassword = useInput('');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const saveChangedPassword = () => {
    const postForm = {
      id: userProfile?.id,
      version: userProfile?.version,
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    };
    const postData = JSON.stringify(postForm);
    changePassword(postData)(dispatch);
    if (userProfileError) {
      return;
    }
    setIsEditMode(false);
  };

  return (
    <div className="user-profile__edit-inner">
      <h1 className="user-profile__title">Modifying the password</h1>
      <section className="user-profile__password-block">
        <button className="user-profile__change-switch" onClick={handleEditMode}>
          {isEditMode ? 'Cancel' : 'Change Password'}
        </button>
        {isUserProfileLoading && <Loader />}
        <FetchMessagesComponent successMessage={userProfileMessage} errorMessage={userProfileError} />
        {isEditMode ? (
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
            <button
              className="user-profile__button"
              onClick={saveChangedPassword}
              disabled={Boolean(newPassword.error)}
            >
              Save changes
            </button>
          </form>
        ) : (
          <div className="user-profile__password-view">
            <InputElement
              {...currentPassword}
              value={currentPassword.value}
              className="user-profile__input app__input_password"
              type="password"
              placeholder="Current password"
              minLength={4}
              disabled={true}
            />
          </div>
        )}
      </section>
    </div>
  );
};
const UserProfile = () => {
  const { userProfile } = useAppSelector((state) => state.userProfile);
  const { customer } = useAppSelector((state) => state.customer);
  const [currentBlock, setCurrentBlock] = useState('generals');
  const dispatch = useDispatch();
  const [passwordBlockData, setPasswordBlockData] = useState('');
  const navigate = useNavigate();

  const switchBlock = (block: string) => {
    setCurrentBlock(block);
  };

  const delayedNavigate = (delay: number) => {
    setTimeout(() => {
      navigate('/');
    }, delay);
  };

  useEffect(() => {
    getCustomerById(customer.id)(dispatch);
    if (userProfile) {
      setPasswordBlockData(userProfile.password);
    }
  }, []);
  if (!customer) {
    delayedNavigate(2500);
    return (
      <>
        <h2>Your not logged!</h2>
        <p>redirecting to main</p>
      </>
    );
  }
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
          {userProfile && currentBlock === 'generals' && <GeneralsBlock generals={userProfile} />}
          {userProfile && currentBlock === 'addresses' && (
            <AddressesBlock
              addresses={userProfile.addresses}
              billingAddressIds={userProfile.billingAddressIds}
              shippingAddressIds={userProfile.shippingAddressIds}
              defaultShippingAddressId={userProfile.defaultShippingAddressId}
              defaultBillingAddressId={userProfile.defaultBillingAddressId}
            />
          )}
          {userProfile && currentBlock === 'password' && <PasswordBlock password={passwordBlockData} />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
