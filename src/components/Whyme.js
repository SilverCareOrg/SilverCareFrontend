import whyme_siguranta from "../styles/icons/whyme_siguranta.svg";
import whyme_comunitate from "../styles/icons/whyme_comunitate.svg";
import whyme_varietate from "../styles/icons/whyme_varietate.svg";
import whyme_accesibilitate from "../styles/icons/whyme_accesibilitate.svg";
import whyme_inclusivitate from "../styles/icons/whyme_inclusivitate.svg";
import whyme_flexibilitate from "../styles/icons/whyme_flexibilitate.svg";

const reasons = [
  { name: "Siguranță", description: "Seniorii beneficiază de servicii sigure și de încredere.", icon: whyme_siguranta },
  { name: "Comunitate", description: "Suntem convinși că împreună vom crea o comunitate mai unită, în care seniorii pot cunoaște oameni cu pasiuni comune.", icon: whyme_comunitate, small_description:"Suntem convinși că împreună vom crea o comunitate mai unită."},
  { name: "Varietate", description: "Organizăm o varietate de activități recreative, pentru a vă menține corpul și mintea active.", icon: whyme_varietate },
  { name: "Accesibilitate", description: "Platforma noastră vă facilitează accesul la o gamă variată de activități și experiențe.", icon: whyme_accesibilitate },
  { name: "Inclusivitate", description: "Știm că fiecare senior aduce cu el experiențe și abilități unice, iar noi reflectăm această diversitate in serviciile noastre.", icon: whyme_inclusivitate, small_description:"Stim ca fiecare senior aduce cu el experiențe și abilități unice." },
  { name: "Flexibilitate", description: "Vă punem la dispoziție modalități de plată care să corespundă circumstanțelor dvs.", icon: whyme_flexibilitate },
];

const Reason = ({ reason }) => {
  return (
    <div className="relative bg-light-grey max-lg:w-[10rem] lg:h-[13.5rem] max-lg:h-[14rem]">
      <div className="absolute top-[0rem] left-[0rem] lg:w-[24.38rem] max-lg:w-[10rem] h-[13.5rem] flex flex-col items-center justify-start py-[1rem] lg:px-[2rem] box-border gap-[0.5rem]">
        <div className="w-[4.5rem] h-[4.5rem] flex flex-row items-center justify-center py-[0rem] px-[0.75rem] box-border">
          <img className="relative w-[4rem] h-[4rem]" alt="" src={reason.icon}/>
        </div>
        <div className="self-stretch relative tracking-[0.05em] max-lg:tracking-[0.1rem] leading-[120%] font-semibold text-center lg:text-[1.5rem] max-lg:text-[1.2rem]">
          {reason.name}
        </div>
        <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf text-center max-lg:text-[0.9rem]">
          <span className="lg:hidden">{reason.small_description ? reason.small_description : reason.description}</span>
          <span className="max-lg:hidden">{reason.description}</span>
        </div>
      </div>
    </div>
  );
}

const Whyme = () => {
  return (
    <section className="pb-6">
      <div className="flex flex-col items-center justify-center pt-[1rem] pb-[4rem] box-border text-center">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="self-stretch rounded-lg bg-light-grey shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] flex flex-col items-center justify-center py-[4rem] px-[0rem] gap-[1.5rem]">
            <div className="relative max-lg:text-[1.9rem] lg:text-[2.25rem] tracking-[0.05em] leading-[120%] font-semibold flex items-center justify-center lg:w-[51rem] max-lg:w-[23rem] h-[2.5rem] shrink-0">De ce SilverCare ?</div>
            <div className="lg:w-[77.06rem] grid max-lg:grid-cols-2 lg:grid-cols-3 max-lg:grid-rows-3 lg:grid-rows-2 gap-4">
              {reasons.map((reason, index) => (
                <Reason key={index} reason={reason} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whyme;
