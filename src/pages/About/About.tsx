import Banner from '../../components/UI/Banner/Banner';
import aboutBackground from '../../assets/banner-about.svg';
import aboutFood from '../../assets/about-food.svg';
import react from '../../assets/icons/react.svg';
import redux from '../../assets/icons/redux.svg';
import typescript from '../../assets/icons/typescript.svg';
import jest from '../../assets/icons/jest.svg';
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
              <div className={styles.rightCol}>
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
    </main>
  );
}

export default About;
