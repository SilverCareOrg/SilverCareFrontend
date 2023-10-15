import heroImage from '../images/homepage-photo-4.jpg';

const Hero = () => {
  const heroStyle = {
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '0 auto',
    maxWidth: '77rem',
    position: 'relative',
  };

  const leftShadowGradientStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '25%',
    background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent)',
    pointerEvents: 'none',
  };

  const rightShadowGradientStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '25%',
    background: 'linear-gradient(to left, rgba(0, 0, 0, 0.7), transparent)',
    pointerEvents: 'none',
  };

  return (
    <div
      className="flex flex-col items-center justify-center text-white relative"
      style={heroStyle}
    >
      {/* Left shadow gradient */}
      <div style={{ ...leftShadowGradientStyle, left: 0 }}></div>
      {/* Right shadow gradient */}
      <div style={{ ...rightShadowGradientStyle, right: 0 }}></div>

      <div className="w-[70rem] flex flex-col items-center justify-center">
        <div className="self-stretch h-[35rem] overflow-hidden shrink-0 flex flex-col items-start justify-end p-[2rem] box-border gap-[4rem]">
          <div className="relative tracking-[0.1em] leading-[120%] font-semibold flex items-center w-[31.25rem] h-[0rem] shrink-0">
            Armonie în corp, minte și suflet!
          </div>
          <a href="/product">
            <div className="rounded bg-accent w-[17.13rem] h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border text-center text-[0.88rem]">
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
