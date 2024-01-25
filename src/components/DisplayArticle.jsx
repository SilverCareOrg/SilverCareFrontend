import findmore_sport from "../images/findmore_sport.png";
const DisplayArticle = () => {
  return (
    <div className=" flex items-center justify-center md:my-14 py-6">
      <div className="w-full flex items-center max-w-[1450px] justify-start px-28 ">
        <div className="">
          <img
            // TODO: PHONE TABLET LAPTOP WIDTH AND HEIGHT FOR IMAGE
            className="object-cover md:w-[848px] md:h-[360px] w-[560px] h-[180px]"
            src={findmore_sport} // Replace with your image URL
            alt="Your Alt Text"
          />
          <div className="flex flex-col md:w-[848px]">
            <div className="flex gap-8 py-2">
              <p>TZMO</p>
              <p>22.01.2024</p>
            </div>
            <div className="pt-2">
              <p className="text-3xl">
                Imbunatatirea sănătății seniorilor. Un ghid cuprinzător pentru
                bunăstarea în anii de aur
              </p>
              <p className="text-xl mt-6">
                Imbunatatirea sănătății seniorilor. Un ghid cuprinzător pentru
                bunăstarea în anii de aur Pe măsură ce indivizii trec cu grație
                în anii lor de aur, prioritizarea sănătății devine esențială
                pentru menținerea unui stil de viață vibrant și împlinit.
                Îmbătrânirea este un proces natural care aduce schimbări în
                bunăstarea fizică,
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayArticle;
