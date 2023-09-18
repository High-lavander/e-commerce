import Banner from '../../components/UI/Banner/Banner';
import aboutBackground from '../../assets/banner-about.svg';
import firstMemberImg from '../../assets/anvar-abduragimov.jpg';
import secondMemberImg from '../../assets/tatsiana-kulinkovich.jpg';
import thirdMemberImg from '../../assets/shakhzod-ikramov.jpg';
import styles from './About.module.scss';
import { AboutProps, AboutCard } from '../../components/UI/AboutCard/AboutCard';

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
    </main>
  );
}

export default About;
