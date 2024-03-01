import axios_api from "../api/axios_api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArticleHead from "../components/ArticleHead";
import ArticleParagraph from "../components/ArticleParagraph";
import ArticlesOption from "../components/ArticlesOption";
const ArticlePage = () => {
  const id = useParams();
  const [currentArticle, setCurrentArticle] = useState();
  const [descriptionLength, setDescriptionLength] = useState(0);
  const get_article = () => {
    const url = `/get_article?id=${id.id}`;
    try {
      axios_api
        .get(url, {
          params: {
            // for category iterate through selectCategories and choose the name with the same raw
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            setCurrentArticle(response.data);
            console.log(response.data.description.length);
            setDescriptionLength(response.data.description.length);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (err) { }
  };

  useEffect(() => {
    get_article();
  }, []);

  return (
    <div className="pb-12">
      <div>
        <ArticleHead article={currentArticle} />
        <ArticlesOption topPx={835 + descriptionLength*0.29} />
      </div>
      <div>
        {currentArticle?.texts.map((data, index) => (
          <ArticleParagraph key={index} paragraphData={data} />
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;
