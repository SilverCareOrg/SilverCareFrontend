import { NavLink } from "react-router-dom";

const CheckArticles = () => {
  return (
    <div className=" bg-light-purple mt-10 mb-20 h-40 flex items-center justify-center ">
      <div className="w-full flex items-center  justify-center flex-col lg:flex-row lg:justify-between md:px-28 max-w-[1450px]">
        <div className="flex flex-col items-center lg:items-start">
          <div className="flex-col text-lg sm:text-2xl md:text-3xl tracking-[0.05em]  font-semibold flex items-center h-10 shrink-0 ">
            Descoperă articolele noastre
          </div>
          <div className="text-sm pb-3 lg:pb-0 sm:text-lg md:text-xl tracking-[0.05em] leading-[24px] flex items-center max-w-[586px] h-10 shrink-0">
            Lorem ipsum dolor sit amet, qui minim labore
          </div>
        </div>
        <NavLink to="/articles">
          <div className="rounded bg-accent w-[274px] py-4 flex flex-row items-center justify-start box-border text-center text-sm text-white">
            <b className="flex-1 tracking-[0.15em] uppercase">explorează articole</b>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default CheckArticles;
