import Herotext from "../components/Herotext";
const Contact = () => {
  const couses = [,
    {
      title: "Plângeri și reclamații",
      desc: "Luăm în serios satisfacția clienților și ne străduim să rezolvăm orice reclamație într-un mod prompt și eficient.",
      phn: "+40 766 551 409",
    },
    {
      title: "Returnări",
      desc: "Returnări fără probleme. Înțelegem că uneori produsele pur și simplu nu corespund nevoilor.",
      phn: "+40 766 551 409",
    },
    {
      title: "Marketing",
      desc: "Echipa noastră de marketing lucrează în colaborare cu furnizorii de servicii pentru a-i ajuta să crească și să obțină succesul dorit.",
      phn: "+40 761 148 821",
    },
  ];
  return (
    <section>
      <Herotext textt="Contactează-ne" />
      <div className="py-16 ">
        <h2 className="text-5xl text-gray-700 font-semibold text-center pb-5 ">
          Suntem aici pentru tine
        </h2>
        <div className="md:flex max-d:flex-row w-[85%] mx-auto gap-5 md:py-10 px-0">
          {couses &&
            couses.map((cause, index) => {
              return (
                <div key={index} className="text-center bg-gray-100 rounded-lg max-md:mt-10 md:flex md:flex-col gap-3 py-10 px-5">
                  <h3 className="text-gray-900 font-semibold text-2xl">
                    {cause.title}
                  </h3>
                  <p className="text-lg text-gray-700">{cause.desc}</p>
                  <a
                    href={`tel:${cause.phn}`}
                    className="text-sky-500 font-semibold text-xl"
                  >
                    {cause.phn}
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
