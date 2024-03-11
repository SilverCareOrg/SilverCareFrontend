import BestSelling from "../components/BestSelling";
import Consultation from "../components/Consultation";
import FeatureProducts from "../components/FeatureProducts";
import AuthRecommandation from "../components/AuthRecommandation";
import FindMore from "../components/FindMore";
import Slider from "../components/Slider";
import ArticlesTab from "../components/ArticlesTab";
import Hero from "../components/Hero";
import Whyme from "../components/Whyme";
import HomeSearch from "../components/HomeSearch";
import Lottie from "lottie-react";
import caring_family from "../animations/caring-family.json";
import { WorkInProgress } from "./WorkInProgress";
import JoinUs from "../components/JoinUs";
import CheckArticles from "../components/CheckArticles";

const Bar = () => {
  return (
    <div className="self-stretch flex items-center justify-center pb-10 pt-[3rem]">
      <div className="relative box-border max-lg:w-5/6 lg:w-[77.09rem] h-[0.09rem] border-t-[1.5px] border-solid border-text-fields-grey-hf" />
    </div>
  );
};

const Home = () => {
  return (
    <div className="home overflow-x-hidden overflow-hidden">
      <HomeSearch />
      <Hero />
      <Bar />
      <FindMore />
      <CheckArticles/>
      <Whyme />
      {/* <ArticlesTab /> */}

      {/* <WorkInProgress /> */}
    </div>
  );
};

export default Home;
