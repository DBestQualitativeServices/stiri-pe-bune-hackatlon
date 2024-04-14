import Underline from "../layout/underline";
import {getArticleDate} from "../../utils/utils";
import RoundedBorderBox from "../layout/rounded-border-box";
import Link from "next/link";

const DedicatedArticlePage = ({article}) => {
    const {title, content, headline, category, all_versions_urls, latest_version_date_uploaded} = article

    const parsedUrls = JSON.parse(all_versions_urls)

    return (
        <article className={"lg:row-start-1 col-span-2 w-full flex flex-col space-y-5"}>
            <div className={"flex flex-col mb-5"}>
                <h1 className={"relative w-full flex flex-col tracking-wide pb-8 text-xl font-bold text-black col-span-2"}>
                <span className={"relative w-full px-5 lg:px-10"}>
                    {title}
                </span>
                    <Underline category={category}/>
                </h1>
                <h2 className={"relative w-full flex flex-col tracking-wide text-xl font-bold text-black col-span-2"}>
                <span className={"relative text-gray-800 w-full px-5 lg:px-10"}>
                    {headline}
                </span>
                </h2>
            </div>
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
            <span className={"text-gray-800 text-lg font-semibold"}>
                {content}
            </span>
            {parsedUrls.length > 0 && (
                <div className={"flex italic flex-col"}>
                    <span>{parsedUrls.length > 1 ? "Surse" : "Sursa"}</span>
                    {parsedUrls.map((url) => (
                            <p>{url}</p>
                        )
                    )}
                </div>
            )}
        </article>
    )
}

export default DedicatedArticlePage