import {fetchArticlesByPage} from "../../../../server/services/cache-handler";
import {isPositiveInteger} from "../../../../utils/utils";
import {notFound, redirect} from 'next/navigation';
import ArticlesGrid from "../../../../components/articles/articles-grid";
import TwoToOneGrid from "../../../../components/layout/two-to-one-grid";
import SecondaryGrid from "../../../../components/layout/secondary-grid";
import MainWrapper from "../../../../components/layout/main-wrapper";

const Page = async ({params}) => {
    const {page_number} = params
    if (!isPositiveInteger(page_number) || Number(page_number) < 1)  return redirect(`/`)

    const paginated_articles = await fetchArticlesByPage(Number(page_number), 30)
    if (paginated_articles.error) return redirect("/")
    if (Object.keys(paginated_articles.articles).length === 0) {
        if (Number(page_number) > 1) return redirect(`/`)
        return notFound()
    }
    const latest_paginated_articles = await fetchArticlesByPage(1, 20)

    return (
        <MainWrapper>
            <TwoToOneGrid>
                <SecondaryGrid paginated_articles={latest_paginated_articles} title={`Fii la curent`}/>
                <ArticlesGrid paginated_articles={paginated_articles} params={params}/>
            </TwoToOneGrid>
        </MainWrapper>
    )
}

export default Page
