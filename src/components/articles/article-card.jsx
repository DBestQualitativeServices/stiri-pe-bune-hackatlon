import {getArticleDate} from "../../utils/utils";
import RoundedBorderBox from "../layout/rounded-border-box";
import Link from "next/link";

const ArticleCard = ({article, withContent}) => {
    const {title, content, category, latest_version_date_uploaded, all_versions_urls} = article

    const parsedUrls = JSON.parse(all_versions_urls)

    return (
        <div className={"flex flex-1 flex-col p-5 space-y-2.5"}>
            <section className={"flex flex-row space-x-2.5"}>
                {latest_version_date_uploaded && (
                    <RoundedBorderBox category={category}>
                        <time
                            className={"text-md pl-[4px] pb-[1px] self-center text-nowrap"}>{getArticleDate(latest_version_date_uploaded)}</time>
                    </RoundedBorderBox>
                )}
                <RoundedBorderBox category={category} delay={"animate-delay-[1000ms]"}>
                    <Link href={`/categorie/${category}/pagina/1`}
                          className={`text-md pl-[4px] pb-[1px] self-center text-nowrap`}>{category.replaceAll("_", " ")}</Link>
                </RoundedBorderBox>
            </section>
            <span className={"text-lg line-clamp-2 font-semibold"}>{title}</span>
            {withContent && (
                <span className={"line-clamp-3"}>{content}</span>
            )}
            {parsedUrls && parsedUrls.length > 0 && (
                <div className={"flex italic flex-col"}>
                    <span>{parsedUrls.length > 1 ? "Surse" : "Sursa"}</span>
                    {parsedUrls.map((url) => (
                            <a href={url} target={"_blank"} className={"line-clamp-1"}>{url}</a>
                        )
                    )}
                </div>
            )}
        </div>
    )
}

export default ArticleCard