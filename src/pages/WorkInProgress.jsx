export const WorkInProgress = () => {
  return (
    <div className="h-screen">
      <p className="absolute z-10 max-w-[65vw] lg:max-w-[35vw] text-center left-0 right-0 top-[100px] xl:top-[265px] 2xl:top-[300px] ml-auto mr-auto text-xl sm:text-2xl md:text-3xl bold">
        Momentan platforma este in lucru. Facem tot posibilul sa va oferim cea
        mai buna experienta in timp util.
      </p>
      <iframe
        title="work-in-progress"
        className="absolute z-0 max-w-[1350px] max-h-[600px] w-[100vw] h-[100vh] left-0 lg:top-1/3 lg:my-auto ml-auto mr-auto right-0 bottom-0 lg:bottom-auto"
        id="work-in-progress"
        src="https://lottie.host/embed/58f038bb-04d7-46ed-a86b-b2113f3c16f1/JQj0mxoKKt.json"
      ></iframe>
    </div>
  );
};
