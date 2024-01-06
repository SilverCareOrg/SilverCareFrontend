import heroImage from "../images/hero_smile.png";

const Hero = () => {
  const heroStyle = {
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    margin: "0 auto",
    position: "relative",
  };

  const leftShadowGradientStyle = {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "60%",
    background: "linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent)",
    pointerEvents: "none",
  };

  const rightShadowGradientStyle = {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "25%",
    background: "linear-gradient(to left, rgba(0, 0, 0, 0.7), transparent)",
    pointerEvents: "none",
  };

  const mobileLeftShadowGradientStyle = {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "40%",
    background: "linear-gradient(to right, rgba(0, 0, 0, 0.6), transparent)",
    pointerEvents: "none",
  };

  const mobileRightShadowGradientStyle = {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "12%",
    background: "linear-gradient(to left, rgba(0, 0, 0, 0.4), transparent)",
    pointerEvents: "none",
  };

  return (
    <div
      className="flex-1 overflow-hidden flex flex-col items-center justify-center text-white relative lg:w-[77rem] max-lg:w-5/6 self-stretch max-lg:rounded-lg"
      style={heroStyle}
    >
      {/* Left shadow gradient */}
      <div
        className="max-lg:hidden"
        style={{ ...leftShadowGradientStyle, left: 0 }}
      ></div>
      {/* Right shadow gradient */}
      <div
        className="max-lg:hidden"
        style={{ ...rightShadowGradientStyle, right: 0 }}
      ></div>

      {/* Left shadow gradient */}
      <div
        className="lg:hidden"
        style={{ ...mobileLeftShadowGradientStyle, left: 0 }}
      ></div>
      {/* Right shadow gradient */}
      <div
        className="lg:hidden"
        style={{ ...mobileRightShadowGradientStyle, right: 0 }}
      ></div>

      <div className="max-lg:w-3/4 lg:w-[70rem] flex flex-col items-center justify-center">
        <div className="self-stretch h-[35rem] overflow-hidden shrink-0 flex flex-col max-lg:items-center items-start justify-end p-[2rem] box-border gap-[4rem]">
          <div className="relative tracking-[0.1em] leading-[120%] font-semibold flex items-center max-lg:h-[0.5rem] max-lg:w-[14.4rem] lg:w-[31.25rem] lg:h-[3rem] shrink-0 max-lg:text-[1.1rem] lg:text-[1.7rem]">
            Armonie în corp, minte și suflet!
          </div>
          <a className="lg:h-[6rem]" href="/product">
            <div className="relative rounded bg-accent w-[17.13rem] h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border text-center text-[0.88rem]">
              <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                CUMPĂRĂ EXPERIENȚE
              </b>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
