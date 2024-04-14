import {notFound} from 'next/navigation';
import {fetchArticlesByPage} from "../server/services/cache-handler";
import TwoToOneGrid from "../components/layout/two-to-one-grid";
import ArticlesGrid from "../components/articles/articles-grid";
import SecondaryGrid from "../components/layout/secondary-grid";
import MainWrapper from "../components/layout/main-wrapper";

export default async function Page() {
    const paginated_articles = await fetchArticlesByPage(1, 50)
    if (paginated_articles.error || Object.keys(paginated_articles.articles).length === 0) {
        return notFound()
    }
    const latest_paginated_articles = await fetchArticlesByPage(1, 20)

    return (
        <MainWrapper>
            <TwoToOneGrid>
                <SecondaryGrid paginated_articles={latest_paginated_articles} title={`Fii la curent`}/>
                <ArticlesGrid paginated_articles={paginated_articles}/>
            </TwoToOneGrid>
        </MainWrapper>
    )
}
