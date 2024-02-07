export const ArticleBar = () => {
  return (
    <div className=" bg-light-purple h-12 md:h-56 flex items-center justify-center">
      <div className="w-full flex items-center max-w-[1450px] justify-center flex-col lg:flex-row lg:justify-between md:px-28">
        <div className="flex flex-col items-center lg:items-start mb-2">
          <div className="flex-col mt-2 text-2xl sm:text-3xl md:text-4xl tracking-[0.05em]  font-semibold flex justify-center items-center h-10 shrink-0 ">
            Articole
          </div>
          <div className="text-sm hidden mt-2 md:flex text-center lg:text-left pb-3 lg:pb-0 sm:text-lg md:text-xl tracking-[0.05em] leading-[24px] items-center max-w-[900px] shrink-0">
            Pe măsură ce indivizii trec cu grație în anii lor de aur,
            prioritizarea sănătății devine esențială pentru menținerea unui stil
            de viață vibrant și împlinit. Îmbătrânirea este un proces natural
            care aduce schimbări în bunăstarea fizică, mentală și emoțională.
          </div>
        </div>
      </div>
    </div>
  );
};
