interface IHome {
  className?: string;
}

const Main: React.FC<IHome> = (props: IHome) => {
  return (
    <section className={props.className}>
      <h1>E-commerce</h1>
      <h2>Main Page</h2>
      <h3>Organic</h3>
    </section>
  );
};

export default Main;
