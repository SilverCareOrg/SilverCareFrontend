import { NavLink } from "react-router-dom";

const CheckArticles = () => {
  return (
    <div className=" bg-light-purple mt-10 mb-20 h-56 lg:h-48 flex items-center justify-center ">
      <div className="w-full flex items-center  justify-center flex-col lg:flex-row lg:justify-between md:px-28 max-w-[1450px]">
        <div className="flex flex-col items-center lg:items-start justify-center max-lg:text-center">
          <div className="flex-col text-lg sm:text-xl md:text-2xl tracking-[0.05em]  font-semibold flex items-center h-10 shrink-0 ">
            Descoperă articolele noastre
          </div>
          <div className="text-sm pb-3 lg:pb-0 sm:text-md md:text-lg tracking-[0.025em] leading-[24px] flex items-center max-w-[350px] sm:max-w-[586px] shrink-0">
            Explorează articolele noastre acum și descoperă modalități de a trăi o viață activă și împlinită la orice vârstă!
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
