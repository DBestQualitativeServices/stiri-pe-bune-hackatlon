import ArticleCard from "./article-card";
import Pagination from "../layout/pagination";
import {getCategoryColor} from "../../utils/utils";
import Underline from "../layout/underline";

const ArticlesGrid = ({paginated_articles, category}) => {
    const color = getCategoryColor(category?.toLowerCase())

    return (
        <div className={"grid  grid-cols-2 col-span-2 gap-5"}>
            <h1 className={"relative flex flex-col tracking-wide pb-8 text-2xl font-bold text-black col-span-2"}>
                <span style={{color}}
                      className={"pl-5 lg:pl-10"}>{category ? category.replaceAll("_", " ") : "Ultimele Articole"}{" - "}{`Pagina ${paginated_articles.pagination.current_page}`}</span>
                <Underline category={category}/>
            </h1>
            {Object.values(paginated_articles.articles).map((article, index) => {
                const styles = index === 0 || index % 11 === 0 ? "col-span-2 lg:h-[180px]" : "col-span-2 md:col-span-1"
                return (
                    <div key={index} className={`${styles} h-[220px] flex rounded-xl bg-gray-50 shadow-2xl`}>
                        <ArticleCard article={article} withContent={true}/>
                    </div>
                )
            })}
            <div className={"flex w-full col-span-2 justify-center pt-5 pb-10"}>
                <Pagination currentPage={paginated_articles.pagination.current_page}
                            hasNexPage={paginated_articles.pagination.has_next_page}
                            category={category}/>
            </div>
        </div>
    )
}

export default ArticlesGrid