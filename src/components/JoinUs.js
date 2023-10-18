import { NavLink } from "react-router-dom";

const JoinUs = () => {
    return (
      <div className="self-stretch bg-light-purple h-36 flex flex-col items-center justify-start">
      <div className="flex-1 w-[1232px] flex flex-col items-center justify-center">
        <div className="w-[1233px] flex flex-row items-center justify-between">
          <div className="flex flex-col items-start justify-start">
            <div style={{ fontSize: '30px' }} className="relative tracking-[0.05em] leading-[120%] font-semibold flex items-center w-[610px] h-10 shrink-0">
              Alătură-te echipei SilverCare
            </div>
            <div className="relative text-base tracking-[0.05em] leading-[24px] flex items-center w-[586px] h-10 shrink-0">
              Dorești să devii partener SilverCare?
            </div>
          </div>
        <NavLink to="/contact">
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
  