import { useState, useEffect } from "react";
import axios_api from "../api/axios_api";
import { ArticleBar } from "../components/ArticleBar";
import ArticlesOption from "../components/ArticlesOption";
import DisplayArticle from "../components/DisplayArticle";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const get_all_articles = () => {
    try {
      axios_api
        .get("/get_articles", {
          params: {},
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            const json = response.data;
            console.log(json);
            setArticles(json);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (err) {}
  };

  useEffect(() => {
    get_all_articles();
    console.log(articles);
  }, []);

  return (
    <div>
      <ArticleBar />
      <div className="">
        <div>
          {articles.map((article) => (
            <DisplayArticle article={article} />
          ))}
        </div>
      </div>
      <ArticlesOption topPx={435} />
    </div>
  );
};

export default Articles;
