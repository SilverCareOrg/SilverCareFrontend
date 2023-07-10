import { Link } from "react-router-dom";
import '../styles/styles.css';


const Slide = ({ image }) => {
  return (
    <div
      className="slide h-full flex justify-center items-center"
      style={{ backgroundImage: `url(${image.src})` }}
      key={image.id}
    >
      <div className="absolute text-white top-0 w-full h-full flex flex-col justify-center">
      <div className="md:left-[10%] m-auto absolute p-4">
      <div className=" flex flex-col gap-5 items-start pl-10 container mx-auto">
        <h1 className="font-bold max-w-[1500px] text-5xl md:text-7xl drop-shadow-2xl font-semibold w-4/5">
          {image.headline}
        </h1>
        <p className="drop-shadow-2xl pr-5 py-2 max-w-[1100px] text-sm md:text-lg">{image.body}</p>
        <Link
          to="/product"
          className="border border-solid mt-2 border-white text-white transition duration-300 px-8 py-3"
        >
          {image.cta}
        </Link>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Slide;
