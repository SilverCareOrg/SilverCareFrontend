import ArticleHead from "../components/ArticleHead";
import ArticleParagraph from "../components/ArticleParagraph";
import ArticlesOption from "../components/ArticlesOption";
const ArticlePage = () => {
  return (
    <div className="pb-12">
      <div>
        <ArticleHead />
        <ArticlesOption topPx={925} />
      </div>
      <div>
        <ArticleParagraph />
        <ArticleParagraph />
        <ArticleParagraph />
      </div>
    </div>
  );
};

export default ArticlePage;
