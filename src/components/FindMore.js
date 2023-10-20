import findmore_spiritualitate from "../images/findmore_spiritualitate.png";
import findmore_excursii from "../images/findmore_excursii.png";
import findmore_sanatate from "../images/findmore_sanatate.png";
import findmore_sport from "../images/findmore_sport.png";
import findmore_evenimente from "../images/findmore_evenimente.png";
import findmore_arta from "../images/findmore_arta.png";
import findmore_cursuri from "../images/findmore_cursuri.png";
import findmore_hobby from "../images/findmore_hobby.png";

  
const FindMore = () => {
    return (
    <div className="flex flex-col items-center justify-start pt-[4rem] px-[0rem] pb-[2rem] box-border">
            <div className="w-[77rem] flex flex-col items-center justify-center">
                <div className="self-stretch flex flex-col items-start justify-start gap-[2.5rem]">
                <div className="relative box-border w-[77.09rem] h-[0.09rem] border-t-[1.5px] border-solid border-text-fields-grey-hf" />
                <div className="relative text-[2.25rem] tracking-[0.05em] leading-[120%] font-semibold flex items-center w-[37rem] h-[2.5rem] shrink-0">
                    Descopera categoriile noastre
                </div>
                <div className="self-stretch flex flex-row items-start justify-start gap-[2rem] text-white">
                    
                    
                    <div className="flex-1 relative rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] h-[15rem]"
                        style={{
                            transition: "transform 0.2s", // Add a smooth transition effect
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale when hovering
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
                          }}>

                        <a href="/product/Spiritualitate">
                            <div className="absolute top-[0rem] left-[0rem] rounded w-[17.75rem] h-[15rem] overflow-hidden">
                                <img
                                    className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                                    alt=""
                                    src={findmore_spiritualitate}
                                    />
                                    
                                    <div className="absolute top-[0rem] left-[0rem] [background:linear-gradient(0deg,_rgba(0,_0,_0,_0.55),_rgba(0,_0,_0,_0))] w-[17.75rem] h-[15rem]" />
                                </div>
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] flex flex-row items-end justify-start py-[1.5rem] px-[2rem] box-border">
                                    <div className="relative tracking-[0.1em] leading-[120%] font-semibold">
                                    Spiritualitate
                                    </div>
                                </div>
                        </a>
                    </div>

                    <div className="flex-1 relative rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] h-[15rem]"style={{
                            transition: "transform 0.2s", // Add a smooth transition effect
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale when hovering
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
                          }}>
                            <a href="/product/Excursii">
                                <div className="absolute top-[0rem] left-[0rem] rounded w-[17.75rem] h-[15rem] overflow-hidden">
                                    <img
                                    className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                                    alt=""
                                    src={findmore_excursii}
                                    />
                                    <div className="absolute top-[0rem] left-[0rem] [background:linear-gradient(0deg,_rgba(0,_0,_0,_0.55),_rgba(0,_0,_0,_0))] w-[17.75rem] h-[15rem]" />
                                </div>
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] flex flex-row items-end justify-start py-[1.5rem] px-[2rem] box-border">
                                    <div className="relative tracking-[0.1em] leading-[120%] font-semibold">
                                    Excursii
                                    </div>
                                </div>
                            </a>
                    </div>

                    <div className="flex-1 relative rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] h-[15rem]"style={{
                            transition: "transform 0.2s", // Add a smooth transition effect
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale when hovering
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
                          }}>
                            <a href="/product/Sanatate">
                            <div className="absolute top-[0rem] left-[0rem] rounded w-[17.75rem] h-[15rem] overflow-hidden">
                                <img
                                className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                                alt=""
                                src={findmore_sanatate}
                                />
                                <div className="absolute top-[0rem] left-[0rem] [background:linear-gradient(0deg,_rgba(0,_0,_0,_0.55),_rgba(0,_0,_0,_0))] w-[17.75rem] h-[15rem]" />
                            </div>
                            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] flex flex-row items-end justify-start py-[1.5rem] px-[2rem] box-border">
                                <div className="relative tracking-[0.1em] leading-[120%] font-semibold">
                                Sănătate
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="flex-1 relative rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] h-[15rem]"style={{
                            transition: "transform 0.2s", // Add a smooth transition effect
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale when hovering
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
                          }}>
                            <a href="/product/Sport">
                                <div className="absolute top-[0rem] left-[0rem] rounded w-[17.75rem] h-[15rem] overflow-hidden">
                                    <img
                                    className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                                    alt=""
                                    src={findmore_sport}
                                    />
                                    <div className="absolute top-[0rem] left-[0rem] [background:linear-gradient(0deg,_rgba(0,_0,_0,_0.55),_rgba(0,_0,_0,_0))] w-[17.75rem] h-[15rem]" />
                                </div>
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] flex flex-row items-end justify-start py-[1.5rem] px-[2rem] box-border">
                                    <div className="relative tracking-[0.1em] leading-[120%] font-semibold">
                                    Sport
                                    </div>
                                </div>
                            </a>
                    </div>
                </div>

                <div className="self-stretch flex flex-row items-start justify-start gap-[2rem] text-white">

                    <div className="flex-1 relative rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] h-[15rem]"style={{
                            transition: "transform 0.2s", // Add a smooth transition effect
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale when hovering
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
                          }}>
                        <a href="/product/Divertisment">
                            <div className="absolute top-[0rem] left-[0rem] rounded w-[17.75rem] h-[15rem] overflow-hidden">
                                <img
                                className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                                alt=""
                                src={findmore_evenimente}
                                />
                                <div className="absolute top-[0rem] left-[0rem] [background:linear-gradient(0deg,_rgba(0,_0,_0,_0.55),_rgba(0,_0,_0,_0))] w-[17.75rem] h-[15rem]" />
                            </div>
                            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] flex flex-row items-end justify-start py-[1.5rem] px-[2rem] box-border">
                                <div className="relative tracking-[0.1em] leading-[120%] font-semibold">
                                Divertisment
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="flex-1 relative rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] h-[15rem]"style={{
                            transition: "transform 0.2s", // Add a smooth transition effect
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale when hovering
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
                          }}>
                        <a href="/product/Arta">
                            <div className="absolute top-[0rem] left-[0rem] rounded w-[17.75rem] h-[15rem] overflow-hidden">
                                <img
                                className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                                alt=""
                                src={findmore_arta}
                                />
                                <div className="absolute top-[0rem] left-[0rem] [background:linear-gradient(0deg,_rgba(0,_0,_0,_0.55),_rgba(0,_0,_0,_0))] w-[17.75rem] h-[15rem]" />
                            </div>
                            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] flex flex-row items-end justify-start py-[1.5rem] px-[2rem] box-border">
                                <div className="relative tracking-[0.1em] leading-[120%] font-semibold">
                                Artă
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="flex-1 relative rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] h-[15rem]"style={{
                            transition: "transform 0.2s", // Add a smooth transition effect
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale when hovering
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
                          }}>
                        <a href="/product/Cursuri%20de%20limbi%20străine">
                            <div className="absolute top-[0rem] left-[0rem] rounded w-[17.75rem] h-[15rem] overflow-hidden">
                                <img
                                className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                                alt=""
                                src={findmore_cursuri}
                                />
                                <div className="absolute top-[0rem] left-[0rem] [background:linear-gradient(0deg,_rgba(0,_0,_0,_0.55),_rgba(0,_0,_0,_0))] w-[17.75rem] h-[15rem]" />
                            </div>
                            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] flex flex-row items-end justify-start py-[1.5rem] px-[2rem] box-border">
                                <div className="relative tracking-[0.1em] leading-[120%] font-semibold">
                                Cursuri
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="flex-1 relative rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] h-[15rem]"style={{
                            transition: "transform 0.2s", // Add a smooth transition effect
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale when hovering
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
                          }}>
                        <a href="/product/Hobby">
                            <div className="absolute top-[0rem] left-[0rem] rounded w-[17.75rem] h-[15rem] overflow-hidden">
                                <img
                                className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                                alt=""
                                src={findmore_hobby}
                                />
                                <div className="absolute top-[0rem] left-[0rem] [background:linear-gradient(0deg,_rgba(0,_0,_0,_0.55),_rgba(0,_0,_0,_0))] w-[17.75rem] h-[15rem]" />
                            </div>
                            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] flex flex-row items-end justify-start py-[1.5rem] px-[2rem] box-border">
                                <div className="relative tracking-[0.1em] leading-[120%] font-semibold">
                                Hobby
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                    <div className="self-stretch flex flex-col items-end justify-start pt-[1rem] px-[0rem] pb-[0rem] text-center text-[0.88rem]">
                        <a href="/product" className="button-link">
                            <div className="rounded box-border w-[15rem] h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] border-[1.5px] border-solid border-dark-navy">
                                <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                                    VEZI MAI MULT
                                </b>
                            </div>
                        </a>
                    </div>
                <div className="relative box-border pl-5 max-lg:w-[50rem] lg:w-[77.09rem] h-[0.09rem] border-t-[1.5px] border-solid border-text-fields-grey-hf" />
                </div>
            </div>
            </div>

);
};

export default FindMore;
