import { InputElement } from '../../components';
import useInput from '../../hooks/useInput';
import './UserProfile.scss';
import avatar from '../../assets/user/avatar.svg';
import geolocation from '../../assets/user/geolocation.svg';
import lock from '../../assets/user/lock.svg';
const UserProfile = () => {
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const birthDate = useInput('');
  const phone = useInput('');
  return (
    <div className="user-profile">
      <div className="user-profile__inner">
        <div className="user-profile__aside">
          <div className="user-profile__switch-general">
            <img src={avatar} alt="user avatar" />
          </div>
          <div className="user-profile__addresses">
            <img src={geolocation} alt="geolocation" />
          </div>
          <div className="user-profile__security">
            <img src={lock} alt="lock" />
          </div>
        </div>
        <div className="user-profile__edit">
          <h1 className="user-profile">Welcome to your account on the app!</h1>
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
              className="user-profile__input-email app__input_email"
              type="email"
              placeholder="Email"
              validationCb="email"
              {...email}
            />
            <div className="user-profile__input_double">
              <InputElement
                id="birthDate"
                className="user-profile__input-date app__input_date"
                type="text"
                placeholder="Date of birth"
                validationCb="date"
                {...birthDate}
              />
              <InputElement
                id="phone"
                className="user-profile__input-phone app__input_phone"
                type="text"
                placeholder="Phone number"
                validationCb="name"
                {...phone}
              />
            </div>
            <button className="user-profile__button sign-in__button">Save changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
