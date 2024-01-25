import React from "react";
import SearchBox from "./SearchBox";

const ArticlesOption = () => {
  return (
    <div className="absolute top-[435px] right-[5vw] min-[1350px]:block hidden max-w-[300px]">
      <p className="text-3xl">Cauta articolul potrivit</p>
      <div className="py-8">
        <SearchBox text="Cauta un articol" path="articles" />
      </div>

      <p className="text-3xl pb-4">Categorii</p>
      <div className="flex flex-col gap-2">
        <a href="/articles" className="text-lg">
          Sanatate
        </a>
        <a href="/articles" className="text-lg">
          Sport
        </a>
        <a href="/articles" className="text-lg">
          Evenimente
        </a>
        <a href="/articles" className="text-lg">
          Lorem50
        </a>
        <a href="/articles" className="text-lg">
          Lorem50
        </a>
        <a href="/articles" className="text-lg">
          Lorem50
        </a>
      </div>
      <p className="text-3xl pt-8 pb-4">Articole populare</p>
      <div className="flex flex-col gap-2">
        <p className="text-lg">Este un edge case</p>
        <p className="text-lg">unde sunt prea multe cuvinte</p>
        <p className="text-lg">intr-un titlu si ar arata</p>
        <p className="text-lg">foare foarte ciudat</p>
        <p className="text-lg">plus ca si poza ia spatiu</p>
        <p className="text-lg">facem altceva cu spatiu asta</p>
        <p className="text-lg">
          Imbunatatirea sănătății seniorilor. Un ghid cuprinzător pentru
          bunăstarea în anii de aur. PLUS O POZA CARE SI AIA ARE 50x50 PX PLUS
          NUMELE AUTORULUI
        </p>
      </div>
      <p className="text-3xl pt-8 pb-4">Arhive</p>
      <div className="flex flex-col gap-2">
        <a href="/articles" className="text-lg">
          Ianuarie
        </a>
        <a href="/articles" className="text-lg">
          Februarie
        </a>
        <a href="/articles" className="text-lg">
          Martie
        </a>
        <a href="/articles" className="text-lg">
          Aprilie
        </a>
        <a href="/articles" className="text-lg">
          Mai
        </a>
        <a href="/articles" className="text-lg">
          Iunie
        </a>
        <a href="/articles" className="text-lg">
          Iulie
        </a>
        <a href="/articles" className="text-lg">
          August
        </a>
        <a href="/articles" className="text-lg">
          Septembrie
        </a>
        <a href="/articles" className="text-lg">
          Octombrie
        </a>
        <a href="/articles" className="text-lg">
          Noiembrie
        </a>
        <a href="/articles" className="text-lg">
          Decembie
        </a>
      </div>
    </div>
  );
};

export default ArticlesOption;
