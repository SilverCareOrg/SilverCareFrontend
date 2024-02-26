import React from "react";
import SearchBox from "./SearchBox";
import axios_api from "../api/axios_api";
import { useState, useEffect } from "react";

const ArticlesOption = ({ topPx }) => {
  const [categories, setCategories] = useState([]);
  const handleArticleCategory = async () => {
    axios_api
      .get("/get_articles_types", {
        withCredentials: true,
        headers: {
          //   'X-CSRFToken': `${localStorage.getItem('csrftoken')}`, // Set the CSRF token in the request headers
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type":
            "multipart/form-data;  boundary=----WebKitFormBoundaryEXAMPLE",
        },
      })
      .then((response) => {
        // Handle the response
        if (response.status === 200) {
          const json = response.data;
          for (let i = 0; i < json.length; i++) {
            let category = json[i];
            setCategories((prevCategories) => {
              return [...prevCategories, category];
            });
          }
        } else {
          console.log("Failed to create service.");
        }
      })
      .catch((error) => {
        // Handle errors
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    if (categories.length === 0) {
      handleArticleCategory();
    }
  }, []);

  return (
    <div
      style={{ top: `${topPx}px` }}
      className={`absolute max-[1350px]:left-[calc(1050px+(100vw-1350px-20px))] min-[1350px]:left-[calc(1050px+(100vw-1350px-(100vw-1350px+30px)/2))] 
min-[1300px]:block hidden max-w-[250px] `}
    >
      <p className="text-2xl">Cauta articolul potrivit</p>
      <div className="py-8">
        <SearchBox searchWidth={235} text="Cauta un articol" path="articles" />
      </div>

      <p className="text-2xl pb-4">Categorii</p>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <a key={category} href={`/articles?${category[0]}`} className="text-lg">
            {category[1]}
          </a>
        ))}
      </div>
      <p className="text-2xl pt-8 pb-4">Articole populare</p>
      <div key='articole-populare' className="flex flex-col gap-2">
        <p className="text-lg">articol1</p>
        <p className="text-lg">articol2</p>
        <p className="text-lg">articol3</p>
        <p className="text-lg">articol4</p>
        <p className="text-lg">articol5</p>
        <p className="text-lg">articol6</p>
        <p className="text-lg">articol7</p>
      </div>
      {/* <p className="text-2xl pt-8 pb-4">Arhive</p> */}
      {/* <div key='arhive' className="flex flex-col gap-2"> */}
      {/*   <a href="/articles" className="text-lg"> */}
      {/*     Ianuarie */}
      {/*   </a> */}
      {/*   <a href="/articles" className="text-lg"> */}
      {/*     Februarie */}
      {/*   </a> */}
      {/*   <a href="/articles" className="text-lg"> */}
      {/*     Martie */}
      {/*   </a> */}
      {/*   <a href="/articles" className="text-lg"> */}
      {/*     Aprilie */}
      {/*   </a> */}
      {/*   <a href="/articles" className="text-lg"> */}
      {/*     Mai */}
      {/*   </a> */}
      {/*   <a href="/articles" className="text-lg"> */}
      {/*     Iunie */}
      {/*   </a> */}
      {/*   <a href="/articles" className="text-lg"> */}
      {/*     Iulie */}
      {/*   </a> */}
      {/*   <a href="/articles" className="text-lg"> */}
      {/*     August */}
      {/*   </a> */}
      {/*   <a href="/articles" className="text-lg"> */}
      {/*     Septembrie */}
      {/*   </a> */}
      {/*   <a href="/articles" className="text-lg"> */}
      {/*     Octombrie */}
      {/*   </a> */}
      {/*   <a href="/articles" className="text-lg"> */}
      {/*     Noiembrie */}
      {/*   </a> */}
      {/*   <a href="/articles" className="text-lg"> */}
      {/*     Decembie */}
      {/*   </a> */}
      {/* </div> */}
    </div>
  );
};

export default ArticlesOption;
