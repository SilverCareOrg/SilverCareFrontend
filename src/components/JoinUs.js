import { NavLink } from "react-router-dom";

const JoinUs = () => {
  return (
    <div className=" bg-light-purple h-40 flex items-center justify-center ">
      <div className="w-full flex items-center  justify-center flex-col lg:flex-row lg:justify-between md:px-28 max-w-[1450px]">
        <div className="flex flex-col items-center lg:items-start">
          <div className="flex-col text-lg sm:text-2xl md:text-3xl tracking-[0.05em]  font-semibold flex items-center h-10 shrink-0 ">
            Alătură-te echipei SilverCare
          </div>
          <div className="text-sm pb-3 lg:pb-0 sm:text-lg md:text-xl tracking-[0.05em] leading-[24px] flex items-center max-w-[586px] h-10 shrink-0">
            Dorești să devii partener SilverCare?
          </div>
        </div>
        <NavLink to="/contact">
          <div className="rounded bg-accent w-[274px] py-4 flex flex-row items-center justify-start box-border text-center text-sm text-white">
            <b className="flex-1 tracking-[0.15em] uppercase">explorează</b>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default JoinUs;
