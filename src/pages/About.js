import Whyme from "../components/Whyme";
import Herotext from "../components/Herotext";
import OurTeam from "../components/OurTeam";
import puzzle_family from "../animations/puzzle-family-gray.json";
import Lottie from "lottie-react";

const About = () => {
  return (
    <>
      <Herotext textt="Despre noi" />
      <section className=" bg-gray-100 py-5 px-5 ">

        {/* Desktop view */}
        <div className="max-lg:hidden container mx-auto grid grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-3">
              <h1 className="text-6xl font-semibold text-gray-700">
                Cine suntem noi?
              </h1>
              <p className="text-lg text-gray-700">
              Eldie inseamna integrare, emotii pozitive, relatii noi si grija fata de seniori. 
              Serviciile noastre asigura reintegrarea in comunitate a seniorilor. Va punem la dispozitie o gama larga de optiuni, garantand siguranta domnilor si doamnelor de varsta a 3-a.
              </p>
              <p className="text-lg text-gray-700">Haideti sa ajutam seniorii sa isi regaseasca activitatile favorite!</p>
            </div>
          </div>
          <div>
            <Lottie animationData={puzzle_family} />
          </div>
        </div>

        {/* Mobile view */}
        <div className="lg:hidden grid-rows-2">
          <div>
            <Lottie animationData={puzzle_family} />
          </div>
          <div className="mt-6 flex justify-center">
            <div className="flex flex-col gap-3">
              <h1 className=" text-center text-4xl font-semibold text-gray-700">
                Cine suntem noi?
              </h1>
              <p className="mt-2 text-center text-lg text-gray-700">
              Eldie înseamnă integrare, emoții pozitive, relații noi și grija față de seniori. 
              Serviciile noastre asigură reintegrarea în comunitate a seniorilor. Vă punem la dispoziție o gamă largă de opțiuni, garantând siguranța domnilor si doamnelor de vârsta a 3-a.
              </p>
              <p className="text-center text-lg text-gray-700">Haideți să ajutăm seniorii să își regăsească activitățile favorite!</p>
            </div>
          </div>
        </div>

      </section>
      <OurTeam />
      <Whyme />
    </>
  );
};

export default About;
