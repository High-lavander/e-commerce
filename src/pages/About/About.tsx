import Banner from '../../components/UI/Banner/Banner';
import aboutBackground from '../../assets/banner-about.svg';
import aboutFood from '../../assets/about-food.svg';
import react from '../../assets/icons/react.svg';
import redux from '../../assets/icons/redux.svg';
import typescript from '../../assets/icons/typescript.svg';
import jest from '../../assets/icons/jest.svg';
import backend from '../../assets/icons/backend.svg';
import rsSchoolLogo from '../../assets/icons/rs-school-logo.svg';
import firstMemberImg from '../../assets/anvar-abduragimov.jpg';
import secondMemberImg from '../../assets/tatsiana-kulinkovich.jpg';
import thirdMemberImg from '../../assets/shakhzod-ikramov.jpg';
import styles from './About.module.scss';
import { AboutProps, AboutCard } from '../../components/UI/AboutCard/AboutCard';
import { StackCard } from '../../components/UI/StackCard/StackCard';

function About() {
  const firstPerson: AboutProps = {
    photo: `${firstMemberImg}`,
    fullName: 'Anvar Abduragimov',
    role: 'Team Lead and Front-end developer',
    github: '//github.com/crecker05ru',
    contribution:
      'Worked on handling requests and interacting with Redux, ensuring efficient application state management. Implemented a robust authentication system for our service, ensuring the security of customer data. Responsible for Commerce Tools API requests to update product states.  Developed a detailed product page and a shopping cart page, ensuring a seamless purchasing process.',
  };
  const secondPerson: AboutProps = {
    photo: `${secondMemberImg}`,
    fullName: 'Tatsiana Kulinkovich',
    role: 'Half Team Lead and designer',
    github: '//github.com/bogdanovich231',
    contribution:
      'Worked on handling requests and interacting with Redux, ensuring efficient application state management. Implemented a robust authentication system for our service, ensuring the security of customer data. Responsible for Commerce Tools API requests to update product states.  Developed a detailed product page and a shopping cart page, ensuring a seamless purchasing process.',
  };
  const thirdPerson: AboutProps = {
    photo: `${thirdMemberImg}`,
    fullName: 'Shakhzod Ikramov',
    role: 'Half Team Lead and Front-end developer',
    github: '//github.com/Shakhzod235',
    contribution:
      'Worked on handling requests and interacting with Redux, ensuring efficient application state management. Implemented a robust authentication system for our service, ensuring the security of customer data. Responsible for Commerce Tools API requests to update product states.  Developed a detailed product page and a shopping cart page, ensuring a seamless purchasing process.',
  };
  return (
    <main>
      <Banner title="Our Team" backgroundImage={aboutBackground} />
      <section className={styles.about}>
        <div className={styles.container}>
          <div className={styles.aboutContainer}>
            <div className={styles.aboutHeading}>
              <h3 className={styles.aboutTitle}>Team</h3>
              <h2 className={styles.aboutSubtitle}>Our Developer Team</h2>
              <p className={styles.aboutDescription}>
                Let&apos;s introduce you to our team, the cutting-edge technologies we&apos;ve used, each team
                member&apos;s contribution, and the collaborative synergy that brought it all together.
              </p>
            </div>
            <div className={styles.aboutCards}>
              <AboutCard {...firstPerson} />
              <AboutCard {...secondPerson} />
              <AboutCard {...thirdPerson} />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.ourStack}>
        <div className={styles.container}>
          <div className={styles.ourStackContainer}>
            <div className={styles.stackInfo}>
              <div className={styles.leftCol}>
                <h3 className={styles.stackTitle}>What was used?</h3>
                <h2 className={styles.stackSubtitle}>Our key technologies</h2>
                <p className={styles.stackDescription}>
                  All team members demonstrated outstanding skills in working with TypeScript, React, Redux (including
                  Redux Toolkit), and integrating with Commerce Tools API. Additionally, we conducted thorough code
                  testing using Jest. Thanks to our efforts and collaborative work, the project dedicated to organic
                  products was successfully implemented.
                </p>
                <button className={styles.stackBtn}>
                  In more detail
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <circle cx="9.5" cy="9.5" r="9.5" fill="#335B6B" />
                    <path
                      d="M9.47641 6.12891L12.871 9.19342L9.47641 12.2579M12.3995 9.19342H5.51611"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className={styles.stackRightCol}>
                <img src={aboutFood} alt="fruits and salad" />
              </div>
            </div>
            <div className={styles.stackCards}>
              <StackCard stackImg={react} stackTitle="React" />
              <StackCard stackImg={redux} stackTitle="Redux Toolkit" />
              <StackCard stackImg={typescript} stackTitle="TypeScript" />
              <StackCard stackImg={jest} stackTitle="Jest" />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.course}>
        <div className={styles.container}>
          <div className={styles.courseContainer}>
            <div className={styles.courseLeftCol}>
              <h3 className={styles.courseTitle}>About the Course</h3>
              <p className={styles.courseDescription}>
                RS School is free-of-charge and community-based education program conducted by The Rolling Scopes
                developer communitysince 2013.
              </p>
              <a className={styles.courseLink} href="//rs.school">
                <img className={styles.courseLogo} src={rsSchoolLogo} alt="The RS School logo" />
              </a>
            </div>
            <div className={styles.courseRightCol}>
              <div className={styles.stackIcons}>
                <div className={styles.stackIconsFirstRow}>
                  <svg
                    className={styles.stackLogo}
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <path d="M12.5 87.5V12.5H87.5V87.5H12.5Z" fill="#FFD600" />
                    <path
                      d="M61.5375 68.6397C62.9791 70.9814 64.5458 73.2252 67.8646 73.2252C70.6521 73.2252 72.1146 71.8397 72.1146 69.9231C72.1146 67.6293 70.6021 66.8147 67.5354 65.4793L65.8541 64.7627C61.0021 62.7043 57.775 60.1252 57.775 54.6772C57.775 49.6564 61.6187 45.8356 67.625 45.8356C71.9021 45.8356 74.975 47.3168 77.1916 51.196L71.9541 54.5439C70.8021 52.4856 69.5562 51.6752 67.625 51.6752C65.6541 51.6752 64.4062 52.9189 64.4062 54.5439C64.4062 56.5522 65.6562 57.3647 68.5416 58.6085L70.2229 59.3252C75.9416 61.7606 79.1666 64.2481 79.1666 69.8397C79.1666 75.8647 74.4083 79.1668 68.0208 79.1668C61.7729 79.1668 58.225 76.0314 56.25 72.1502L61.5375 68.6397ZM37.4 68.8106C38.4541 70.6981 40.0562 72.1502 42.3604 72.1502C44.5646 72.1502 45.8333 71.2793 45.8333 67.8939V45.8335H52.7771V68.9606C52.7771 75.9752 48.7083 79.1668 42.7666 79.1668C37.3979 79.1668 33.5229 75.5293 31.9437 72.1502L37.4 68.8106Z"
                      fill="#000001"
                    />
                  </svg>
                  <svg
                    className={styles.stackLogo}
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <path d="M87.5 12.5H12.5V87.5H87.5V12.5Z" fill="#1976D2" />
                    <path
                      d="M57.2708 45.8335H29.6396V52.6335H39.55V83.3335H47.4021V52.6335H57.2708V45.8335Z"
                      fill="white"
                    />
                    <path
                      d="M81.6542 54.3416C81.6542 54.3416 77.9313 51.8582 73.7229 51.8582C69.5146 51.8582 68 53.8582 68 55.9957C68 61.5124 83.3771 60.9603 83.3771 72.0624C83.3771 89.1645 59.9313 81.5791 59.9313 81.5791V73.3749C59.9313 73.3749 64.4146 76.7541 69.7917 76.7541C75.1688 76.7541 74.9646 73.2374 74.9646 72.7541C74.9646 67.652 59.725 67.652 59.725 56.3416C59.725 40.9645 81.9292 47.0312 81.9292 47.0312L81.6542 54.3416Z"
                      fill="white"
                    />
                  </svg>
                  <svg
                    className={styles.stackLogo}
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <path
                      d="M93.7388 49.2362C93.7388 44.0955 89.1365 39.9283 83.4589 39.9283C83.0939 39.9283 82.7336 39.9461 82.3786 39.9797L96.4977 2.27344H36.4959L50.5955 39.947C50.3886 39.9356 50.1807 39.9283 49.9708 39.9283C44.2935 39.9283 39.691 44.0955 39.691 49.2362C39.691 53.3916 42.6985 56.9093 46.8494 58.1062C44.6571 61.5448 41.8984 64.6417 38.7663 67.3174C34.5075 70.9554 29.6333 73.7138 24.3615 75.4138C18.0851 72.4942 15.121 66.0014 17.7956 60.3083C18.0974 59.6655 18.4059 59.0139 18.7004 58.3651C23.2477 57.4042 26.6359 53.7132 26.6359 49.303C26.6359 44.1624 22.0336 39.9952 16.356 39.9952C10.6787 39.9952 6.07613 44.1624 6.07613 49.303C6.07613 52.4554 7.80848 55.2398 10.4562 56.9236C7.91192 62.1691 4.1718 67.6586 3.00661 74.0212C1.61019 81.6463 3.00209 89.7402 10.2855 94.3112C27.2479 104.956 45.6606 87.712 65.0742 83.3772C72.11 81.8061 79.833 82.0594 86.0318 78.8085C90.6868 76.3672 93.7556 72.3217 94.6265 67.7796C95.4869 63.2925 94.2326 58.825 91.3479 55.2025C92.84 53.5868 93.7388 51.507 93.7388 49.2362Z"
                      fill="#99425B"
                    />
                    <path
                      d="M92.1532 67.3903C91.397 71.3335 88.7073 74.7781 84.7737 76.8411C81.1068 78.7641 76.7127 79.3381 72.0605 79.9455C69.5681 80.2709 66.991 80.6075 64.4733 81.1697C57.8163 82.656 51.3684 85.5561 45.133 88.3604C32.6543 93.9728 21.8776 98.819 11.716 92.4424C4.27262 87.7712 4.61633 79.1287 5.48351 74.3927C6.28717 70.005 8.45989 65.9642 10.5611 62.0562C10.9241 61.3805 11.2799 60.7174 11.6261 60.06C12.6675 60.4367 13.7752 60.6938 14.9298 60.8106C12.791 67.202 16.1545 74.1516 23.2145 77.4356L24.1806 77.885L25.2039 77.5552C30.7851 75.7554 35.9279 72.8674 40.4895 68.9704C43.438 66.4516 45.9733 63.665 48.0569 60.6874C48.6815 60.7727 49.3205 60.8174 49.971 60.8174C56.4505 60.8174 61.8162 56.4313 62.6465 50.7664C65.2988 50.6785 68.116 50.6778 70.7835 50.7655C71.6133 56.4309 76.9793 60.8174 83.4591 60.8174C86.1683 60.8174 88.6815 60.0486 90.7518 58.7426C92.1891 61.4067 92.7256 64.4043 92.1532 67.3903ZM16.3561 42.2681C20.6403 42.2681 24.1253 45.4239 24.1253 49.3029C24.1253 50.6962 23.6739 51.9954 22.8986 53.0896C21.6069 54.9132 19.4124 56.1633 16.8899 56.3192C16.7134 56.3302 16.5356 56.3377 16.3561 56.3377C15.4016 56.3377 14.487 56.1799 13.6414 55.8937C11.9309 55.314 10.5056 54.2028 9.60901 52.7838C8.96001 51.7565 8.58693 50.5687 8.58693 49.3029C8.58693 45.4239 12.0722 42.2681 16.3561 42.2681ZM42.2018 49.2361C42.2018 45.7117 45.079 42.7853 48.8179 42.2793C49.1942 42.2281 49.5793 42.2013 49.971 42.2013C52.4616 42.2013 54.679 43.2697 56.1013 44.9252C56.4548 45.3364 56.7613 45.7827 57.0081 46.2592C57.4768 47.1639 57.7402 48.1724 57.7402 49.2361C57.7402 49.7985 57.6649 50.3452 57.5266 50.8697C56.7693 53.7397 54.0666 55.9332 50.7548 56.2351C50.4972 56.2585 50.2356 56.2708 49.971 56.2708C48.4199 56.2708 46.9748 55.8555 45.7604 55.1435C43.6213 53.8888 42.2018 51.7103 42.2018 49.2361ZM74.6276 40.871C72.9633 42.3129 71.7255 44.1552 71.1092 46.2269C68.2322 46.1291 65.1815 46.1291 62.3211 46.2269C61.6641 44.0188 60.3013 42.0708 58.4683 40.5911L66.5074 25.8721L74.6276 40.871ZM39.9979 4.54662H92.9955L80.4782 37.9748C79.9356 38.0927 79.4064 38.2412 78.8927 38.4196L66.5272 15.5792L54.1269 38.2832C53.5909 38.1162 53.0385 37.9816 52.4731 37.8795L39.9979 4.54662ZM91.2283 49.2361C91.2283 49.9415 91.1118 50.6223 90.8976 51.2652C90.3875 52.7947 89.3169 54.1053 87.9032 55.0014C86.6428 55.8002 85.1108 56.2708 83.4591 56.2708C79.8719 56.2708 76.8458 54.0573 75.9562 51.0597C75.7835 50.4777 75.6899 49.8667 75.6899 49.2361C75.6899 48.2744 75.9045 47.3576 76.2919 46.5222C76.4915 46.0916 76.7406 45.6847 77.0265 45.3023C78.4247 43.4339 80.7842 42.2013 83.4591 42.2013C83.7044 42.2013 83.9464 42.2129 84.1859 42.2331C88.1304 42.5659 91.2283 45.579 91.2283 49.2361ZM96.2496 49.2361C96.2496 43.5819 91.7505 38.8643 85.8246 37.8563L100 0H32.9945L47.1915 37.9334C41.4712 39.0859 37.1805 43.7144 37.1805 49.2361C37.1805 53.3821 39.6005 57.0242 43.2271 59.0706C41.4827 61.424 39.414 63.6384 37.0437 65.6635C33.284 68.875 29.0957 71.3104 24.5803 72.9128C20.0322 70.326 18.1096 65.4477 20.1063 61.1978L20.2627 60.8647C20.3606 60.6567 20.4585 60.4483 20.5562 60.2398C25.5516 58.6621 29.1467 54.3569 29.1467 49.3029C29.1467 42.9167 23.4088 37.7215 16.3561 37.7215C9.30347 37.7215 3.56562 42.9167 3.56562 49.3029C3.56562 52.5262 5.02883 55.4452 7.38382 57.5468C6.95701 58.3704 6.5076 59.2082 6.0464 60.0659C3.89326 64.0703 1.45291 68.609 0.529994 73.6489C-1.30303 83.6583 1.65376 91.6597 8.85557 96.1793C13.2259 98.9218 17.6637 100 22.1299 100C30.5396 100 39.0464 96.1745 47.3667 92.4324C53.3589 89.7376 59.5552 86.9507 65.6756 85.584C67.9528 85.0755 70.2962 84.7695 72.7773 84.4456C77.6969 83.8029 82.7842 83.1386 87.2903 80.7755C92.5137 78.036 96.0894 73.4407 97.1004 68.1682C97.9684 63.6418 96.924 59.1081 94.3764 55.2635C95.5639 53.5065 96.2496 51.4425 96.2496 49.2361Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className={styles.stackIconsSecondRow}>
                  <img className={styles.stackLogo} src={react} alt="react logo" />
                  <svg
                    className={styles.stackLogo}
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <path
                      d="M50 10C27.91 10 10 27.91 10 50C10 68.7433 22.9067 84.4267 40.3067 88.7667C40.12 88.2267 40 87.6 40 86.8233V79.9867C38.3767 79.9867 35.6567 79.9867 34.9733 79.9867C32.2367 79.9867 29.8033 78.81 28.6233 76.6233C27.3133 74.1933 27.0867 70.4767 23.84 68.2033C22.8767 67.4467 23.61 66.5833 24.72 66.7C26.77 67.28 28.47 68.6867 30.07 70.7733C31.6633 72.8633 32.4133 73.3367 35.39 73.3367C36.8333 73.3367 38.9933 73.2533 41.0267 72.9333C42.12 70.1567 44.01 67.6 46.32 66.3933C33 65.0233 26.6433 58.3967 26.6433 49.4C26.6433 45.5267 28.2933 41.78 31.0967 38.6233C30.1767 35.49 29.02 29.1 31.45 26.6667C37.4433 26.6667 41.0667 30.5533 41.9367 31.6033C44.9233 30.58 48.2033 30 51.65 30C55.1033 30 58.3967 30.58 61.39 31.61C62.25 30.5667 65.8767 26.6667 71.8833 26.6667C74.3233 29.1033 73.1533 35.52 72.2233 38.6467C75.01 41.7967 76.65 45.5333 76.65 49.4C76.65 58.39 70.3033 65.0133 57.0033 66.39C60.6633 68.3 63.3333 73.6667 63.3333 77.71V86.8233C63.3333 87.17 63.2567 87.42 63.2167 87.7167C78.8033 82.2533 90 67.4533 90 50C90 27.91 72.09 10 50 10Z"
                      fill="black"
                    />
                  </svg>
                  <img className={styles.stackLogo} src={backend} alt="Commerce Tools" />
                </div>
              </div>
              <p className={styles.stackText}>
                The core technologies of the course that we delved into during the program.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
