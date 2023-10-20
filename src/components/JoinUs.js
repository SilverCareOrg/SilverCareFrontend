import { NavLink } from "react-router-dom";

const JoinUs = () => {
    return (
      <div className="self-stretch bg-light-purple h-40 flex flex-col items-center justify-start">
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="w-full flex max-lg:flex-col lg:flex-row items-center justify-between max-lg:items-start max-lg:justify-start">
          <div className="max-lg:pl-5 lg:pl-10 flex flex-col items-start justify-start">
            <div className="lg:text-3xl max-lg:text-2xl relative tracking-[0.05em] leading-[120%] font-semibold flex items-center h-10 shrink-0">
              Alătură-te echipei SilverCare
            </div>
            <div className="relative text-base tracking-[0.05em] leading-[24px] flex items-center w-[586px] h-10 shrink-0">
              Dorești să devii partener SilverCare?
            </div>
          </div>
        <NavLink className="max-lg:pt-3 pl-5 pr-10" to="/contact">
            <div className="rounded bg-accent w-[274px] h-12 flex flex-row items-center justify-start py-0 px-4 box-border text-center text-sm text-white">
                <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-9">
                explorează
                </b>
            </div>
        </NavLink>
        </div>
      </div>
    </div>
    );
  };
  
  export default JoinUs;
  