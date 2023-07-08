import Whyme from "../components/Whyme";
import Herotext from "../components/Herotext";
import OurTeam from "../components/OurTeam";

const About = () => {
  return (
    <>
      <Herotext textt="Despre noi" />
      <section className=" bg-gray-100 py-20 px-20 ">
        <div className="container mx-auto grid grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-3">
              <h1 className="text-6xl font-semibold text-gray-700">
                Cine suntem noi?
              </h1>
              <p className="text-lg text-gray-700">
              SilverCare inseamna integrare, emotii pozitive, relatii noi si grija fata de seniori. 
              Serviciile noastre asigura reintegrarea in comunitate a seniorilor. Va punem la dispozitie o gama larga de optiuni, garantand siguranta domnilor si doamnelor de varsta a 3-a.
              </p>
              <p className="text-lg text-gray-700">Haideti sa ajutam seniorii sa isi regaseasca activitatile favorite!</p>
            </div>
          </div>
          <div>
            <img
              className="w-[80%] mx-auto"
              src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="team img"
            />
          </div>
        </div>
      </section>
      <OurTeam />
      <Whyme />
    </>
  );
};

export default About;
