import {fetchArticlesByPage, fetchCategories} from "../../../../../server/services/cache-handler";
import {isPositiveInteger} from "../../../../../utils/utils";
import {redirect} from 'next/navigation';
import ArticlesGrid from "../../../../../components/articles/articles-grid";
import TwoToOneGrid from "../../../../../components/layout/two-to-one-grid";
import SecondaryGrid from "../../../../../components/layout/secondary-grid";
import MainWrapper from "../../../../../components/layout/main-wrapper";


const Page = async ({params})=>{
    const {category, page_number} = params
    const categories_list = await fetchCategories()

    if (categories_list.error || !categories_list.includes(category)) return redirect("/")
    if (!isPositiveInteger(page_number) || Number(page_number) < 1) return redirect(`/categorie/${category}`)

    const paginated_category_articles = await fetchArticlesByPage(Number(page_number), 30, category)
    if (paginated_category_articles.error) {
        if (Number(page_number) > 1) return redirect(`/categorie/${category}`)
        return redirect("/")
    }
    if (Object.keys(paginated_category_articles.articles).length === 0) {
        if (Number(page_number) > 1) return redirect(`/categorie/${category}`)
        return redirect("/")
    }

    const latest_paginated_articles = await fetchArticlesByPage(1, 20, category)

    return (
        <MainWrapper>
            <TwoToOneGrid>
                <SecondaryGrid paginated_articles={latest_paginated_articles}
                               title={`Ultimile articole din ${category.replaceAll("_", " ")}`} category={category}/>
                <ArticlesGrid paginated_articles={paginated_category_articles} category={category}/>
            </TwoToOneGrid>
        </MainWrapper>
    )
}

export default Page
