import {getArticleDate, sanitizeUrl} from "../../utils/utils";
import RoundedBorderBox from "../layout/rounded-border-box";
import Link from "next/link";

const ArticleCard = ({article, withContent}) => {
    const {id, title, content, category, latest_version_date_uploaded} = article

    return (
        <Link href={`/articol/${sanitizeUrl(title)}-${id}`}
              className={"flex flex-1 flex-col p-5 space-y-2.5"}>
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
        </Link>
    )
}

export default ArticleCard