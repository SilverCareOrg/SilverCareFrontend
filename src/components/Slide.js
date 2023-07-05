import { Link } from "react-router-dom";
import '../styles/styles.css';


const Slide = ({ image }) => {
  return (
    <div
      className="slide h-full flex justify-center items-center"
      style={{ backgroundImage: `url(${image.src})` }}
      key={image.id}
    >
      <div className="slide-content flex flex-col gap-5 items-start pl-10 container mx-auto">
        <h1 className="homepage-slide-frame-headline">
          {image.headline}
        </h1>
        <p className="homepage-slide-frame-text">{image.body}</p>
        <Link
          to="/product"
          className="homepage-slide-shop-box"
        >
          {image.cta}
        </Link>
      </div>
    </div>
  );
};

export default Slide;
