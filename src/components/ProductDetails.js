import { Link, useLocation } from "react-router-dom";
import '../styles/styles.css';
import axios_api from '../api/axios_api';
import { useEffect, useRef, useState  } from "react";
import RegistrationService from "./RegistrationService";

const ProductDetails = () => {
  const { state: product } = useLocation();
  const [visibleRegistrationService, setVisibleRegistrationService] = useState(false);
  const { img_path, name, description, category, rating, price, organiser } = product;
  var final_img_path = `${process.env.REACT_APP_SERVER_IMAGE_PATH}${img_path}`;

  const handleAddCart = async (event) => {
    //Prevent page reload
    event.preventDefault();

    axios_api.post("/add_to_cart", {
        service_id: product.service_id,
        senior_name: "senior1",
        adult_name: "adult1",
        phone_number: "1234567890",
        companion: "companion1",
        email: "user@user"
    }, {sameSite: 'none', withCredentials: true,
    headers: {
      // 'X-CSRFToken': csrfToken, // Set the CSRF token in the request headers
      'Content-Type': 'application/json'
  }})
      .then((response) => {
        // Handle the response
        if (response.status == 200) {
        } else {
          console.log("Failed to send login data to the API");
        }
      })
      .catch((error) => {
        // Handle errors
        console.log("Error:", error);
      });
  };

  const toggleRegistrationService = () => {
    setVisibleRegistrationService(prevState => !prevState);
  };

  const closeRegistrationService = () => {
    setVisibleRegistrationService(false);
    console.log("Function" + visibleRegistrationService)
  };

  const DetailsBlock = () => {
    return (
      <div className="w-[44.13rem] flex flex-col items-start justify-center gap-[2.5rem]">
      <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf flex items-center w-[44rem] shrink-0">
        {description}
      </div>
      <div className="flex flex-col items-start justify-start gap-[2rem]">
        <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center h-[1.5rem] shrink-0">
          CE INCLUDE ?
        </div>
        <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf flex items-center w-[43.94rem] h-[4.5rem] shrink-0">
          Alături de specialiştii de la Eka, vei avea parte de toată
          îngrijirea necesară pentru a rezolva diverse afecţiuni ale
          corpului tău, de la dureri de spate până la probleme
          circulatorii. Rezervă acum o sesiune de masaj terapeutic!
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[2rem]">
        <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center h-[1.5rem] shrink-0">
          DETALII IMPORTANTE
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[1rem] text-[1rem]">
          <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[39.5rem] h-[1rem] shrink-0">
            <span className="[line-break:anywhere] w-full">
              <span>{`Coordonatori: `}</span>
              <span className="text-text-fields-grey-hf">{`Alex Hrisca & Adelina Csolti`}</span>
              <span>{` `}</span>
            </span>
          </div>
          <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[42.69rem] h-[1rem] shrink-0">
            Masaj parțial – 1 hr | 195 RON
          </div>
          <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[42.75rem] h-[1rem] shrink-0">
            Masaj general – 2 hr | 330 RON
          </div>
        </div>
      </div>
      <div className="relative box-border w-[46.19rem] h-[0.06rem] border-t-[1px] border-solid border-text-fields-grey-hf" />
      <div className="flex flex-col items-start justify-center gap-[2rem]">
        <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center h-[1rem] shrink-0">
          FORMULAR REZERVARE
        </div>
        <div className="w-[44.19rem] flex flex-col items-start justify-start gap-[2rem] text-[0.88rem] text-text-fields-grey-hf">
          <b className="self-stretch relative tracking-[0.15em] leading-[120%] uppercase flex items-center h-[1rem] shrink-0">
            SELECTEAZA COORDONATORUL
          </b>
          <div className="self-stretch flex flex-row items-start justify-start gap-[14.63rem] text-center text-[1rem] text-dark-navy">
            <div className="w-[9.25rem] flex flex-col items-center justify-start gap-[1.5rem]">
              <img
                className="relative rounded-[50%] w-[6rem] h-[6rem] object-cover"
                alt=""
                src="/img@2x.png"
              />
              <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
                ALEX HRISCA
              </div>
            </div>
            <div className="flex flex-col items-center justify-start gap-[1.5rem]">
              <img
                className="relative w-[6rem] h-[6rem] object-cover"
                alt=""
                src="/img1@2x.png"
              />
              <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
                ADELINA CSOLTI
              </div>
            </div>
          </div>
          <b className="relative tracking-[0.15em] leading-[120%] uppercase flex items-center w-[44.19rem] h-[1rem] shrink-0">
            aLEGE VARIANTA DORITA
          </b>
          <div className="w-[34.68rem] flex flex-col items-start justify-start py-[0rem] px-[1.5rem] box-border gap-[1rem] text-[1rem]">
            <div className="flex flex-row items-center justify-start gap-[1rem]">
              <div className="relative rounded-[50%] box-border w-[1.5rem] h-[1.5rem] border-[2px] border-solid border-text-fields-grey-hf" />
              <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[24.28rem] h-[1rem] shrink-0">
                Masaj parțial – 1 hr | 195 RON
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[1rem]">
              <div className="relative rounded-[50%] box-border w-[1.5rem] h-[1.5rem] border-[2px] border-solid border-text-fields-grey-hf" />
              <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[24.31rem] h-[1rem] shrink-0">
                Masaj general – 2 hr | 330 RON
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative box-border w-[46.19rem] h-[0.06rem] border-t-[1px] border-solid border-text-fields-grey-hf" />
    </div>
    );
  }

  return (
  <div>
    <div className="max-lg:hidden self-stretch flex flex-col items-center justify-start">
            <div className="flex flex-col items-center justify-center">
              <div className="self-stretch flex flex-row items-center justify-start gap-[1rem]">
                {/* <img
                  className="relative rounded-sm w-[0.83rem] h-[1.63rem]"
                  alt=""
                  src={final_img_path}
                /> */}
                <div className="flex flex-col items-center justify-center gap-[1.5rem]">
                  <img
                    className="relative rounded-lg w-[77rem] h-[33rem] object-cover"
                    alt=""
                    src={final_img_path}
                  />
                  {/* <img
                    className="relative w-[7rem] h-[1rem]"
                    alt=""
                    src="/group-18357.svg"
                  /> */}
                </div>
                {/* <img
                  className="relative rounded-sm w-[0.83rem] h-[1.63rem]"
                  alt=""
                  src="/vector-2.svg"
                /> */}
              </div>
            </div>
          </div>
          <div className="pt-[2rem] pb-[01rem] self-stretch flex flex-col items-center justify-start">
            <div className="w-[77rem] h-[4rem] flex flex-col items-center justify-center">
              <div className="self-stretch flex-1 flex flex-row items-center justify-center">
                <div className="flex-1 h-[4rem] flex flex-col items-start justify-center gap-[1rem]">
                  <div className="self-stretch relative tracking-[0.05em] leading-[120%] font-semibold flex items-center h-[2rem] shrink-0 text-[2rem]">
                    {name}
                  </div>
                  {/* <div className="h-[0.75rem] flex flex-row items-start justify-start gap-[0.25rem]">
                    <img
                      className="relative w-[0.75rem] h-[0.72rem]"
                      alt=""
                      src="/-icon-star1.svg"
                    />
                    <img
                      className="relative w-[0.75rem] h-[0.72rem]"
                      alt=""
                      src="/-icon-star1.svg"
                    />
                    <img
                      className="relative w-[0.75rem] h-[0.72rem]"
                      alt=""
                      src="/-icon-star1.svg"
                    />
                    <img
                      className="relative w-[0.75rem] h-[0.72rem]"
                      alt=""
                      src="/-icon-star1.svg"
                    />
                    <img
                      className="relative w-[0.75rem] h-[0.72rem]"
                      alt=""
                      src="/-icon-star1.svg"
                    />
                  </div> */}
                </div>
                <div className="w-[17.5rem] flex flex-col items-end justify-start gap-[1rem] text-[0.88rem] text-text-fields-grey-hf">
                  <div className="w-[17.5rem] flex flex-row items-center justify-start gap-[0.63rem]">
                    <b className="relative tracking-[0.15em] leading-[120%] uppercase">{`ORGANIZATOR: `}</b>
                    <div className="flex-1 relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-dark-navy text-right">
                      {organiser}
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[1rem] text-[1rem] text-dark-navy">
                    <img
                      className="relative w-[1.13rem] h-[1.5rem]"
                      alt=""
                      src="/icon-location.svg"
                    />
                    <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
                      BUCURESTI
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-start text-[1.5rem]">
            <div className="w-[77rem] flex flex-row items-center justify-center">
              <div className="flex flex-row items-center justify-center py-[0rem] pr-[0rem] pl-[4.5rem] gap-[4rem] flex-grow">
                <DetailsBlock />
                <div className="self-stretch flex flex-row items-start justify-start">
                  <div className="rounded-lg bg-light-purple w-[24.25rem] h-[30rem] flex flex-col items-start justify-between py-[3.5rem] px-[2rem] box-border">
                    <div className="self-stretch flex flex-col items-start justify-center gap-[3rem]">
                      <div className="w-[20.25rem] flex flex-col items-start justify-start gap-[1rem]">
                        <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center h-[1.5rem] shrink-0">{`Masaj terapeutic `}</div>
                        <div className="self-stretch flex flex-row items-start justify-start gap-[1rem] text-[1rem]">
                          <div className="flex flex-row items-start justify-start gap-[0.25rem]">
                            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Data:  `}</div>
                            <div className="self-stretch relative text-[0.88rem] tracking-[0.08em] leading-[120%] font-open-sans flex items-center w-[3.13rem] shrink-0">{`26 sep `}</div>
                          </div>
                          <div className="flex flex-row items-center justify-center gap-[0.25rem]">
                            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Ora: `}</div>
                            <div className="relative tracking-[0.08em] leading-[120%] font-open-sans">
                              11:00am
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-[5.13rem] flex flex-col items-start justify-center gap-[1rem] text-[1rem]">
                        <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[15rem]">
                          Numar de participanti
                        </div>
                        <div className="self-stretch rounded bg-white box-border h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] gap-[1rem] text-text-fields-grey-hf border-[1px] border-solid border-dark-navy">
                          <div className="flex-1 relative tracking-[0.08em] leading-[120%] flex items-center h-[2rem]">
                            o persoana
                          </div>
                          <img
                            className="relative w-[1.5rem] h-[0.91rem]"
                            alt=""
                            src="/-icon-chevrondown.svg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                      <div className="self-stretch flex flex-row items-center justify-start gap-[1.5rem]">
                        <div className="relative tracking-[0.1em] leading-[120%] font-semibold">{`Pret : `}</div>
                        <div className="flex-1 relative tracking-[0.1em] leading-[120%] font-semibold font-open-sans flex items-center h-[2rem]">
                          195RON
                        </div>
                      </div>
                      <div
                        className="self-stretch flex flex-col items-start justify-start cursor-pointer text-center text-[0.88rem] text-white"
                        // onClick={openFrame}
                      >
                        <div className="self-stretch rounded bg-tomato h-[2.25rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border">
                          <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                            ADAUGA IN COS
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start text-[1.5rem]">
            <div className="w-[73rem] flex flex-row items-start justify-start">
              <div className="flex-1 flex flex-row items-center justify-center py-[0rem] pr-[0rem] gap-[4rem]">
                <div className="w-[44.13rem] flex flex-col items-start justify-center gap-[1.5rem]">
                  <div className="relative tracking-[0.1em] leading-[120%] font-semibold flex items-center w-[39.5rem] h-[1.5rem] shrink-0">
                    LOCATIE
                  </div>
                  <img
                    className="relative w-[44.13rem] h-[25.31rem] object-cover"
                    alt=""
                    src="/img2@2x.png"
                  />
                  <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[43.94rem] h-[1rem] shrink-0">
                    str. Horatiu 28, Bucuresti 010834
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

  );

};

export default ProductDetails;
