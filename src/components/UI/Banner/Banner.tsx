import styles from './Banner.module.scss';

interface IBannerProps {
  backgroundImage: string;
  title?: string;
  className?: string;
}
function Banner(props: IBannerProps) {
  const BannerStyle = {
    backgroundImage: `url(${props.backgroundImage})`,
  };
  return (
    <div className={styles.banner} style={BannerStyle}>
      <h1 className={styles.title}>{props.title}</h1>
    </div>
  );
}

export default Banner;
