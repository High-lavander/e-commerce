import Banner from '../../components/UI/Banner/Banner';
import contactBackground from '../../assets/banner-contact.svg';
import contactFruits from '../../assets/contact-fruits.svg';
import locationPin from '../../assets/location-pin.svg';
import styles from './Contact.module.scss';

function Contact() {
  return (
    <main>
      <Banner title="Contact Us" backgroundImage={contactBackground} />
      <section className={styles.contactUs}>
        <div className={styles.container}>
          <div className={styles.contactUsContainer}>
            <div className={styles.contactUsLeftCol}>
              <img src={contactFruits} className={styles.contactUsfruitsImg} alt="fruits" />
            </div>
            <div className={styles.contactUsRightCol}>
              <h2 className={styles.contactUsTitle}>We&apos;d love to talk about how we can work together.</h2>
              <p className={styles.contactUsDescription}>
                Simply dummy text of the printing and typesetting industry. Lorem had ceased to been the industry&apos;s
                standard dummy text ever since the 1500s, when an unknown printer took a galley.
              </p>
              <div className={styles.contacts}>
                <div className={styles.contactCard}>
                  <div className={styles.verticallyCentered}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="89" height="90" viewBox="0 0 89 90" fill="none">
                      <rect y="0.5" width="89" height="89" rx="11" fill="#f4f4f4" />
                      <rect x="22" y="31.5" width="42" height="31" rx="8" fill="#f9eab6" />
                      <rect x="22" y="31.5" width="42" height="31" rx="8" stroke="#7eb693" />
                      <rect x="27.5" y="28" width="39" height="28" rx="6.5" stroke="#7eb693" strokeWidth="3" />
                      <path
                        d="M29 29.5L44.8187 43.7173C45.9499 44.734 47.6628 44.7433 48.805 43.7391L65 29.5"
                        stroke="#7eb693"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className={styles.contactCardTitle}>Message</h3>
                    <a className={styles.contactCardDetails} href="mailto:support@organic.com">
                      support@organic.com
                    </a>
                  </div>
                </div>
                <div className={styles.contactCard}>
                  <div className={styles.verticallyCentered}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="89" height="90" viewBox="0 0 89 90" fill="none">
                      <rect y="0.5" width="89" height="89" rx="11" fill="#f4f4f4" />
                      <path
                        d="M66.5642 62.5452C64.8082 60.7761 60.5553 58.1942 58.4919 57.1537C55.8048 55.8003 55.5837 55.6898 53.4716 57.2588C52.0628 58.3059 51.1262 59.2413 49.4775 58.8897C47.8287 58.5381 44.2459 56.5555 41.1088 53.4286C37.9716 50.3016 35.874 46.6151 35.5212 44.972C35.1685 43.3289 36.1194 42.4034 37.1567 40.9914C38.6185 39.0011 38.508 38.6694 37.2584 35.9825C36.2842 33.8927 33.627 29.6799 31.8511 27.9328C29.9513 26.0564 29.9513 26.3881 28.7272 26.8968C27.7306 27.316 26.7745 27.8257 25.8709 28.4193C24.1016 29.5947 23.1197 30.5711 22.433 32.0384C21.7463 33.5057 21.4378 36.9456 24.9841 43.3875C28.5304 49.8294 31.0184 53.1234 36.1681 58.2584C41.3178 63.3933 45.2776 66.1543 51.0665 69.4007C58.2276 73.4112 60.9744 72.6294 62.4462 71.9439C63.9181 71.2583 64.8989 70.2853 66.0766 68.5161C66.6718 67.6141 67.1826 66.6591 67.6026 65.6634C68.1123 64.4438 68.4441 64.4438 66.5642 62.5452Z"
                        fill="#f9eab6"
                      />
                      <path
                        d="M68.7203 55.6273C67.1551 54.0504 63.3645 51.7492 61.5254 50.8218C59.1304 49.6155 58.9333 49.517 57.0508 50.9154C55.7951 51.8487 54.9603 52.6825 53.4908 52.3691C52.0212 52.0557 48.8279 50.2886 46.0317 47.5015C43.2356 44.7144 41.3659 41.4287 41.0515 39.9642C40.7371 38.4997 41.5847 37.6748 42.5092 36.4162C43.8122 34.6423 43.7136 34.3466 42.5999 31.9518C41.7316 30.0891 39.3632 26.3342 37.7803 24.7771C36.087 23.1046 36.087 23.4003 34.996 23.8536C34.1077 24.2273 33.2556 24.6816 32.4502 25.2107C30.8732 26.2583 29.998 27.1286 29.3859 28.4364C28.7739 29.7442 28.4989 32.8102 31.6597 38.5519C34.8205 44.2936 37.0381 47.2295 41.6281 51.8064C46.218 56.3832 49.7475 58.8441 54.9071 61.7376C61.2898 65.3121 63.7381 64.6154 65.0499 64.0043C66.3617 63.3933 67.236 62.526 68.2856 60.9492C68.8162 60.1452 69.2715 59.294 69.6458 58.4065C70.1001 57.3194 70.3958 57.3194 68.7203 55.6273Z"
                        stroke="#7eb693"
                        strokeWidth="3"
                        strokeMiterlimit="10"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className={styles.contactCardTitle}>Contact Us</h3>
                    <a className={styles.contactCardDetails} href="tel:+01123456789">
                      +01 123 456 789
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.contactIcons}>
                <a className={styles.contactLink} href="//www.instagram.com">
                  <svg xmlns="//www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                    <circle className={styles.contactCircle} cx="30" cy="30.5" r="30" fill="#eff6f1" />
                    <path
                      d="M33.6585 23.0472C34.7231 23.0503 35.7431 23.4589 36.4958 24.1838C37.2486 24.9086 37.6729 25.8909 37.6761 26.916V34.6527C37.6729 35.6778 37.2486 36.66 36.4958 37.3849C35.7431 38.1098 34.7231 38.5183 33.6585 38.5214H25.6243C24.5598 38.5183 23.5397 38.1098 22.787 37.3849C22.0342 36.66 21.6099 35.6778 21.6068 34.6527V26.916C21.6099 25.8909 22.0342 24.9086 22.787 24.1838C23.5397 23.4589 24.5598 23.0503 25.6243 23.0472H33.6585ZM33.6585 21.5H25.6243C22.5309 21.5 20 23.9371 20 26.916V34.6527C20 37.6315 22.5309 40.0686 25.6243 40.0686H33.6585C36.752 40.0686 39.2828 37.6315 39.2828 34.6527V26.916C39.2828 23.9371 36.752 21.5 33.6585 21.5Z"
                      fill="#274c5b"
                    />
                    <path
                      d="M34.8633 26.9163C34.6249 26.9163 34.3919 26.8482 34.1937 26.7207C33.9956 26.5932 33.8411 26.4119 33.7499 26.1999C33.6587 25.9878 33.6348 25.7545 33.6813 25.5293C33.7278 25.3042 33.8426 25.0974 34.0111 24.9351C34.1797 24.7728 34.3944 24.6623 34.6282 24.6175C34.862 24.5727 35.1043 24.5957 35.3245 24.6836C35.5447 24.7714 35.7329 24.9201 35.8654 25.111C35.9978 25.3018 36.0685 25.5262 36.0685 25.7558C36.0688 25.9083 36.0379 26.0593 35.9774 26.2003C35.917 26.3412 35.8282 26.4693 35.7163 26.5771C35.6043 26.6849 35.4713 26.7704 35.3249 26.8286C35.1785 26.8868 35.0217 26.9166 34.8633 26.9163ZM29.641 27.6897C30.2767 27.6897 30.8981 27.8712 31.4266 28.2113C31.9551 28.5514 32.3671 29.0347 32.6103 29.6003C32.8536 30.1658 32.9172 30.7881 32.7932 31.3884C32.6692 31.9888 32.3631 32.5402 31.9136 32.9731C31.4641 33.4059 30.8915 33.7007 30.268 33.8201C29.6446 33.9395 28.9984 33.8782 28.4111 33.644C27.8238 33.4097 27.3219 33.013 26.9687 32.5041C26.6156 31.9951 26.4271 31.3967 26.4271 30.7846C26.428 29.9641 26.7669 29.1774 27.3694 28.5972C27.972 28.0169 28.7889 27.6906 29.641 27.6897ZM29.641 26.1425C28.6876 26.1425 27.7555 26.4147 26.9628 26.9248C26.17 27.4349 25.5521 28.1599 25.1873 29.0081C24.8224 29.8564 24.7269 30.7898 24.9129 31.6903C25.099 32.5908 25.5581 33.4179 26.2323 34.0671C26.9065 34.7163 27.7654 35.1585 28.7005 35.3376C29.6357 35.5167 30.605 35.4248 31.4858 35.0734C32.3667 34.7221 33.1196 34.1271 33.6493 33.3637C34.179 32.6003 34.4617 31.7028 34.4617 30.7846C34.4617 29.5534 33.9538 28.3727 33.0498 27.5021C32.1457 26.6315 30.9196 26.1425 29.641 26.1425Z"
                      fill="#274c5b"
                    />
                  </svg>
                </a>
                <a className={styles.contactLink} href="//www.facebook.com">
                  <svg xmlns="//www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                    <circle className={styles.contactCircle} cx="30" cy="30.5" r="30" fill="#eff6f1" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M39.2828 30.7843C39.2828 25.6572 34.9657 21.5 29.6414 21.5C24.3171 21.5 20 25.6572 20 30.7843C20 35.4182 23.5251 39.2592 28.1349 39.9563V33.4689H25.6863V30.7843H28.1349V28.7389C28.1349 26.4124 29.5747 25.1263 31.7767 25.1263C32.8317 25.1263 33.9353 25.3078 33.9353 25.3078V27.5928H32.7189C31.5219 27.5928 31.1475 28.3082 31.1475 29.0435V30.7843H33.8212L33.3942 33.4689H31.1479V39.9572C35.7577 39.2604 39.2828 35.4194 39.2828 30.7843Z"
                      fill="#274c5b"
                    />
                  </svg>
                </a>
                <a className={styles.contactLink} href="//twitter.com">
                  <svg xmlns="//www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                    <circle className={styles.contactCircle} cx="30" cy="30.5" r="30" fill="#eff6f1" />
                    <path
                      d="M40.6602 24.4584C39.8852 24.7952 39.0652 25.017 38.2261 25.117C39.1079 24.6006 39.7711 23.7803 40.0912 22.8099C39.2575 23.2974 38.3469 23.6394 37.3984 23.8214C36.9991 23.4028 36.5187 23.0698 35.9866 22.8427C35.4546 22.6155 34.8818 22.4989 34.3033 22.5C31.9609 22.5 30.0654 24.368 30.0654 26.6708C30.0637 26.9911 30.1004 27.3104 30.1747 27.622C28.4951 27.5433 26.8504 27.1148 25.3458 26.364C23.8413 25.6132 22.51 24.5566 21.4372 23.2619C21.0608 23.8963 20.8618 24.6203 20.8608 25.358C20.8608 26.8042 21.6154 28.0826 22.7547 28.8315C22.0797 28.8155 21.4185 28.6368 20.8273 28.3107V28.3623C20.8273 30.3853 22.2907 32.0682 24.2276 32.4513C23.8634 32.5484 23.488 32.5976 23.1111 32.5977C22.8436 32.5981 22.5767 32.5722 22.3144 32.5202C22.8528 34.1773 24.42 35.3825 26.2764 35.4169C24.7679 36.5794 22.9159 37.2078 21.0115 37.2032C20.6734 37.2027 20.3357 37.1825 20 37.1429C21.9374 38.38 24.1895 39.0344 26.4882 39.0281C34.2943 39.0281 38.5589 32.6708 38.5589 27.1572C38.5589 26.9764 38.5541 26.7956 38.5455 26.6191C39.3733 26.0303 40.0893 25.2986 40.6602 24.4584Z"
                      fill="#274c5b"
                    />
                  </svg>
                </a>
                <a className={styles.contactLink} href="//www.pinterest.com">
                  <svg xmlns="//www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none">
                    <circle className={styles.contactCircle} cx="30" cy="30.5" r="30" fill="#eff6f1" />
                    <path
                      d="M29.7966 20.5C24.3866 20.5 20 24.8847 20 30.2923C20 34.301 22.4142 37.7458 25.8649 39.2627C25.8386 38.5807 25.8605 37.7589 26.0354 37.0157C26.2235 36.2201 27.295 31.678 27.295 31.678C27.295 31.678 26.9801 31.0529 26.9801 30.1305C26.9801 28.6792 27.8198 27.595 28.8695 27.595C29.7617 27.595 30.1903 28.2639 30.1903 29.0639C30.1903 29.96 29.6173 31.2977 29.3243 32.5392C29.0794 33.5797 29.8447 34.4234 30.8725 34.4234C32.7269 34.4234 33.9777 32.0409 33.9777 29.2169C33.9777 27.0704 32.5301 25.4661 29.9016 25.4661C26.932 25.4661 25.0776 27.6825 25.0776 30.1567C25.0776 31.0092 25.3313 31.6125 25.7249 32.0759C25.9042 32.2901 25.9305 32.3775 25.8649 32.6223C25.8168 32.8015 25.7118 33.2343 25.6637 33.4092C25.5981 33.6584 25.3969 33.7458 25.1738 33.654C23.8049 33.0944 23.1664 31.5994 23.1664 29.9119C23.1664 27.1316 25.515 23.7961 30.1684 23.7961C33.9077 23.7961 36.37 26.5021 36.37 29.4048C36.37 33.2474 34.2314 36.1152 31.0824 36.1152C30.0241 36.1152 29.0313 35.5425 28.6901 34.8955C28.6901 34.8955 28.1216 37.1512 27.9991 37.5884C27.7936 38.3447 27.3868 39.0966 27.0151 39.6867C27.9169 39.9526 28.8521 40.0881 29.7923 40.0889C35.2023 40.0889 39.5889 35.7042 39.5889 30.2966C39.5889 24.889 35.2067 20.5 29.7966 20.5Z"
                      fill="#274c5b"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.location}>
        <div className={styles.container}>
          <div className={styles.locationBackground}>
            <div className={styles.locationContainer}>
              <h3 className={styles.locationTitle}>Location</h3>
              <h2 className={styles.locationSubtitle}>Our Farms</h2>
              <p className={styles.locationDescription}>
                Established fact that a reader will be distracted by the readable content of a page when looking a
                layout. The point of using.
              </p>
              <div className={styles.locationAddressList}>
                <div className={styles.locationAddress}>
                  <img src={locationPin} alt="Map Pin" />
                  <div className={styles.locationInfo}>
                    <p>
                      <strong className={styles.locationAddressCity}>New York, USA:</strong>
                    </p>
                    <p>299 Park Avenue New York,</p>
                    <p>New York 10171</p>
                  </div>
                </div>
                <div className={styles.locationAddress}>
                  <img src={locationPin} alt="Map Pin" />
                  <div className={styles.locationInfo}>
                    <p>
                      <strong className={styles.locationAddressCity}>London, UK:</strong>
                    </p>
                    <p>30 Stamford Street,</p>
                    <p>London SE1 9LQ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
