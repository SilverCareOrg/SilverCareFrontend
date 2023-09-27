import BestSelling from "../components/BestSelling";
import Consultation from "../components/Consultation";
import FeatureProducts from "../components/FeatureProducts";
import AuthRecommandation from "../components/AuthRecommandation";
import Slider from "../components/Slider";
import Whyme from "../components/Whyme";
import Lottie from "lottie-react";
import caring_family from "../animations/caring-family.json";

const Home = () => {
  return (
    <div className="home overflow-x-hidden">
      <Slider />
      <div className="flex items-center justify-center mt-10  justify-center">
        <Lottie className="max-w-[700px] max-h-[700px]" animationData={caring_family} />
      </div>
      <BestSelling />
      {/* <FeatureProducts /> */}
      {/* <Consultation /> */}
      <AuthRecommandation />
      <Whyme />
    </div>
  );
};

export default Home;
