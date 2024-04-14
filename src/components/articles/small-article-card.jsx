import RoundedBorderBox from "../layout/rounded-border-box";
import {getArticleDate} from "../../utils/utils";

const SmallArticleCard = ({article}) => {
    const {title, description, category, date_uploaded, } = article

    return (
        <div className={"flex flex-1 flex-col p-5 space-y-2.5"}>
            <section className={"flex flex-row space-x-2.5"}>
                <RoundedBorderBox category={category}>
                    <time
                        className={"text-md pl-[4px] pb-[1px] self-center text-nowrap"}>{getArticleDate(date_uploaded)}</time>
                </RoundedBorderBox>
                <RoundedBorderBox category={category} delay={"animate-delay-[1000ms]"}>
                    <div className={`text-md pl-[4px] pb-[1px] self-center text-nowrap`}>{category}</div>
                </RoundedBorderBox>
            </section>
            <span className={"text-lg line-clamp-2 font-semibold"}>{title}</span>
            <span className={"line-clamp-3"}>{description}</span>
        </div>
    )
}

export default SmallArticleCard