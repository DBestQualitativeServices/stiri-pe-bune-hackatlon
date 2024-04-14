import {isPositiveInteger, sanitizeUrl} from "../../../utils/utils";
import {redirect} from "next/navigation";
import {fetchArticleById, fetchArticlesByPage} from "../../../server/services/cache-handler";
import MainWrapper from "../../../components/layout/main-wrapper";
import SecondaryGrid from "../../../components/layout/secondary-grid";
import TwoToOneGrid from "../../../components/layout/two-to-one-grid";
import DedicatedArticlePage from "../../../components/articles/dedicated-article-page";

const Page = async ({params}) => {
    const {article_ref} = params
    const articleId = (article_ref.split("-")[article_ref.split("-").length - 1])

    if (!isPositiveInteger(articleId)) return redirect("/")

    const articleData = await fetchArticleById(articleId)
    if (!articleData || articleData.error || !articleData[articleId]) return redirect("/")

    const corectPath = `${sanitizeUrl(articleData[articleId].title)}-${articleId}`;
    if (corectPath !== article_ref) return redirect(`/articol/${corectPath}`);

    const latest_paginated_articles = await fetchArticlesByPage(1, 20)

    return (
        <MainWrapper>
            <TwoToOneGrid>
                <SecondaryGrid paginated_articles={latest_paginated_articles} title={`Fii la curent`}/>
                <DedicatedArticlePage article={articleData[articleId]}/>
            </TwoToOneGrid>
        </MainWrapper>
    )
}

export default Page