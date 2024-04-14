import ArticleCard from "../articles/article-card";
import {getCategoryColor} from "../../utils/utils";



const SecondaryGrid = ({ paginated_articles, title, category }) => {
    const backgroundColor = getCategoryColor(category?.toLowerCase());

    return (
        <div className={`bg-gray-50 shadow-2xl row-start-2 lg:row-start-1 col-span-2 lg:col-span-1 w-full rounded-xl`}>
            <div
                style={{ backgroundColor }}
                className={`flex w-full justify-center px-5 py-5 text-2xl text-white rounded-t-xl font-semibold`}
            >
                <span>{title}</span>
            </div>
            {!paginated_articles.error &&
                Object.values(paginated_articles.articles).map((article, index) => (
                    <div key={index} className={`flex flex-col`}>
                        <ArticleCard article={article} withContent={false} />
                    </div>
                ))}
        </div>
    );
};

export default SecondaryGrid;
