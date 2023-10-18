import {
  FaPeopleGroup,
  FaShapes
} from "react-icons/fa6";

import {
  AiFillSafetyCertificate
} from "react-icons/ai";

import whyme_siguranta from "../styles/icons/whyme_siguranta.svg";
import whyme_comunitate from "../styles/icons/whyme_comunitate.svg";
import whyme_varietate from "../styles/icons/whyme_varietate.svg";
import whyme_accesibilitate from "../styles/icons/whyme_accesibilitate.svg";
import whyme_inclusivitate from "../styles/icons/whyme_inclusivitate.svg";
import whyme_flexibilitate from "../styles/icons/whyme_flexibilitate.svg";


const Whyme = () => {
  return (
    <section className="pb-20">
      {/* Desktop */}
      <div className="flex flex-col items-center justify-center pt-[1rem] pb-[4rem] box-border text-center">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="self-stretch rounded-lg bg-light-grey shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] flex flex-col items-center justify-center py-[4rem] px-[0rem] gap-[1.5rem]">
              <div className="relative text-[2.25rem] tracking-[0.05em] leading-[120%] font-semibold flex items-center justify-center w-[51rem] h-[2.5rem] shrink-0">
                De ce SilverCare ?
              </div>
              <div className="w-[77.06rem] flex flex-row items-start justify-center gap-[2rem]">
                <div className="relative bg-light-grey w-[24.38rem] h-[13.5rem]">
                  <div className="absolute top-[0rem] left-[0rem] w-[24.38rem] h-[13.5rem] flex flex-col items-center justify-start py-[1rem] px-[2rem] box-border gap-[0.5rem]">
                    <div className="w-[4.5rem] h-[4.5rem] flex flex-row items-center justify-center py-[0rem] px-[0.75rem] box-border">
                      <img
                        className="relative w-[4rem] h-[4rem]"
                        alt=""
                        src={whyme_siguranta}
                      />
                    </div>
                    <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                      Siguranță
                    </div>
                    <div className="self-stretch relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium">
                      Seniorii beneficiază de servicii sigure și de încredere.
                    </div>
                  </div>
                </div>
                <div className="relative bg-light-grey w-[24.38rem] h-[13.5rem]">
                  <div className="absolute top-[0rem] left-[0rem] w-[24.38rem] h-[13.5rem] flex flex-col items-center justify-start py-[1rem] px-[2rem] box-border gap-[0.5rem]">
                    <div className="w-[4.5rem] h-[4.5rem] flex flex-row items-center justify-center py-[0rem] px-[0.75rem] box-border">
                      <img
                        className="relative w-[4rem] h-[4rem]"
                        alt=""
                        src={whyme_comunitate}
                      />
                    </div>
                    <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                      Comunitate
                    </div>
                    <div className="self-stretch relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf">
                      Suntem convinși că împreună vom crea o comunitate mai
                      unită, în care seniorii pot cunoaște oameni cu pasiuni
                      comune.
                    </div>
                  </div>
                </div>
                <div className="relative bg-light-grey w-[24.38rem] h-[13.5rem]">
                  <div className="absolute top-[0rem] left-[0rem] w-[24.38rem] h-[13.5rem] flex flex-col items-center justify-start py-[1rem] px-[2rem] box-border gap-[0.5rem]">
                    <div className="w-[4.5rem] h-[4.5rem] flex flex-row items-center justify-center py-[0rem] px-[0.75rem] box-border">
                      <img
                        className="relative w-[4rem] h-[4rem]"
                        alt=""
                        src={whyme_varietate}
                      />
                    </div>
                    <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                      Varietate
                    </div>
                    <div className="self-stretch relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf">
                      Organizăm o varietate de activități recreative, pentru a
                      va menține corpul și mintea active.
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[77.06rem] flex flex-row items-start justify-start gap-[2rem]">
                <div className="relative bg-light-grey w-[24.38rem] h-[13.5rem]">
                  <div className="absolute top-[0rem] left-[0rem] w-[24.38rem] h-[13.5rem] flex flex-col items-center justify-start py-[1rem] px-[2rem] box-border gap-[0.5rem]">
                    <div className="w-[4.5rem] h-[4.5rem] flex flex-row items-center justify-center py-[0rem] px-[0.75rem] box-border">
                      <img
                        className="relative w-[4rem] h-[4rem]"
                        alt=""
                        src={whyme_accesibilitate}
                      />
                    </div>
                    <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                      Accesibilitate
                    </div>
                    <div className="self-stretch relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf">
                      Platforma noastră vă facilitează accesul la o gamă variată
                      de activități și experiențe.
                    </div>
                  </div>
                </div>
                <div className="relative bg-light-grey w-[24.38rem] h-[13.5rem]">
                  <div className="absolute top-[0rem] left-[0rem] w-[24.38rem] h-[13.5rem] flex flex-col items-center justify-start py-[1rem] px-[2rem] box-border gap-[0.5rem]">
                    <div className="w-[4.5rem] h-[4.5rem] flex flex-row items-center justify-center py-[0rem] px-[0.75rem] box-border">
                      <img
                        className="relative w-[4rem] h-[4rem]"
                        alt=""
                        src={whyme_inclusivitate}
                      />
                    </div>
                    <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                      Inclusivitate
                    </div>
                    <div className="self-stretch relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf">
                      Stim ca fiecare senior aduce cu el experiențe si abilități
                      unice, iar noi reflectăm această diversitate in serviciile
                      noastre.
                    </div>
                  </div>
                </div>
                <div className="relative bg-light-grey w-[24.38rem] h-[13.5rem]">
                  <div className="absolute top-[0rem] left-[0rem] w-[24.38rem] h-[13.5rem] flex flex-col items-center justify-start py-[1rem] px-[2rem] box-border gap-[0.5rem]">
                    <div className="w-[4.5rem] h-[4.5rem] flex flex-row items-center justify-center py-[0rem] px-[0.75rem] box-border">
                      <img
                        className="relative w-[4rem] h-[4rem]"
                        alt=""
                        src={whyme_flexibilitate}
                      />
                    </div>
                    <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                      Flexibilitate
                    </div>
                    <div className="self-stretch relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf">
                      Vă punem la dispoziție modalități de plată care să
                      corespundă circumstanțelor dvs.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Mobile */}
      <div className="md:hidden">
      <div className="container mx-auto flex flex-col gap-5">
        <h2 className="text-4xl py-14 text-center font-semibold text-gray-700">
          De ce ai alege SilverCare?
        </h2>
        <div className="grid grid-rows-3 gap-10 justify-between">
          <div className="text-center  flex flex-col gap-3 bg-gray-200 py-10 px-4">
            <div className="flex justify-center">
              <AiFillSafetyCertificate className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl text-gray-900 font-semibold">
              Siguranță
            </h1>
            <p className="text-gray-700 text-lg">
              Seniorii beneficiază de servicii sigure și de încredere.
            </p>
          </div>
          <div className="text-center flex flex-col gap-3 bg-gray-200 py-10 px-4">
            <div className="flex justify-center">
              <FaPeopleGroup className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl font-semibold">Comunitate</h1>
            <p className="text-gray-700 text-lg">
              Avem convingerea că împreună putem crea o comunitate mai unită, unde seniorii pot cunoaște oameni cu pasiuni comune.
            </p>
          </div>
          <div className="text-center flex flex-col gap-3 bg-gray-200 py-10 px-4">
            <div className="flex justify-center">
              <FaShapes className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl font-semibold">Varietate</h1>
            <p className="text-gray-700 text-lg">
              Suntem motivați să oferim o gamă cât mai largă de servicii.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Whyme;
