import { Link, useLocation } from "react-router-dom";
import '../styles/styles.css';

const ProductDetails = () => {
  const { state: product } = useLocation();

  const { img, title, description, category, rating, price } = product;

  return (
    <section className="flex flex-col gap-16 py-10 bg-gray-100">
      <div className="container mx-auto flex justify-around  items-center w-[80%]">
        <div className="product-details-image">
          <img src={require(`../images/${img}`)} alt={title} className="w-full select-none" />
        </div>
        <div className="product-details-right-box">
          <p className="text-gray-500">
            {"Home/"}
            {<Link to="/product">product</Link>}
            {`/${title}`}
          </p>
          <h2 className="text-4xl">{title}</h2>
          <span className="font-semibold">
            Price: <span className="text-2xl">{price}</span>
          </span>
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl">Description</h1>
            <p className="product-details-description">{description}</p>
          </div>
          <h3 className="flex justify-between text-gray-700 text-lg">
            <span>Category: {category}</span>
            <span>
              Rating:{" "}
              <span className="text-rose-500 font-bold">
                {rating.slice(0, 3)}
              </span>
              <span>{rating.slice(3)}</span>
            </span>
          </h3>
          <button
            onClick={() => console.log("ksk")}
            className="bg-sky-500 text-sky-50 px-2 py-1 mt-4"
          >
            Add to cart
          </button>
        </div>
      </div>
      <Link
        to="/product"
        className="text-xl py-1 text-center hover:text-cyan-500 duration-300 select-none"
      >
        &larr; Go to Product
      </Link>
    </section>
  );
};

export default ProductDetails;
