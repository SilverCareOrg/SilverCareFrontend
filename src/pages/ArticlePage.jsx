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
  const [isLoading, setIsLoading] = useState(true);
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
            setDescriptionLength(response.data.description.length);
            // Sort current article texts by position
            response.data.texts.sort((a, b) => (a.position > b.position) ? 1 : -1);
            setIsLoading(false);
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
      {isLoading ?
        <div className="flex items-center justify-center p-24">
          <p className="text-3xl">Încărcăm articolul.</p>
        </div>
        :
        <>
          <div>
            <ArticleHead article={currentArticle} />
            <ArticlesOption topPx={835 + descriptionLength * 0.29} />
          </div>
          <div>
            {currentArticle?.texts.map((data, index) => (
              <ArticleParagraph key={index} paragraphData={data} />
            ))
            }
          </div>
        </>
      }
    </div>
  );
};

export default ArticlePage;
