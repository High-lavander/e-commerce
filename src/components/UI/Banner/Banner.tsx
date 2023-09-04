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
    <div>
      <div className={styles.banner} style={BannerStyle}>
        {props.title}
      </div>
    </div>
  );
}

export default Banner;
