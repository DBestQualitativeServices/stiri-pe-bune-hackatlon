import {fetchArticlesByPage, fetchCategories} from "../../../server/services/cache-handler";
import {redirect} from "next/navigation";
import ArticlesGrid from "../../../components/articles/articles-grid";
import TwoToOneGrid from "../../../components/layout/two-to-one-grid";
import SecondaryGrid from "../../../components/layout/secondary-grid";
import MainWrapper from "../../../components/layout/main-wrapper";

const Page = async ({params}) => {
    const {category} = params
    const categories_list = await fetchCategories()
    if (categories_list.error || !categories_list.includes(category)) return redirect("/")

    const paginated_articles = await fetchArticlesByPage(1, 30, category)
    if (paginated_articles.error || Object.keys(paginated_articles.articles).length === 0) return redirect("/")

    const latest_paginated_articles = await fetchArticlesByPage(1, 20, category)

    return (
        <MainWrapper>
            <TwoToOneGrid>
                <SecondaryGrid paginated_articles={latest_paginated_articles}
                               title={`Ultimile articole din ${category.replaceAll("_", " ")}`} category={category}/>
                <ArticlesGrid paginated_articles={paginated_articles} category={category}/>
            </TwoToOneGrid>
        </MainWrapper>
    )
}

export default Page
