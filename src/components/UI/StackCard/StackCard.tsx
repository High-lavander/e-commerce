import styles from './StackCard.module.scss';

interface IStackCard {
  stackImg: string;
  stackTitle: string;
}

export const StackCard = (props: IStackCard) => {
  const { stackImg, stackTitle } = props;
  return (
    <div className={styles.stackCard}>
      <img className={styles.stackImg} width={120} height={120} src={stackImg} alt={stackTitle} />
      <h3 className={stackTitle}>{stackTitle}</h3>
    </div>
  );
};
