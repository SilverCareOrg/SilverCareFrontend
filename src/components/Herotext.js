const Herotext = ({ textt }) => {
  return (
    <section className="flex items-center justify-center h-[20rem] herobg">
      <h1 className="max-md:text-4xl text-6xl font-semibold text-gray-50">{textt}</h1>
    </section>
  );
};

export default Herotext;
