import {FaDotCircle} from "react-icons/fa";
import {getCategoryColor} from "../../utils/utils";

const RoundedBorderBox = ({category, delay = "", children}) => {
    const borderColor = getCategoryColor(category)
    const color = getCategoryColor(category)
    return (<div
            style={{borderColor, color}}
            className={`border-2 flex text-sm w-min pl-1 pr-1.5 py-0.5 leading-4 font-semibold rounded-xl items-center flex-row flex-nowrap`}>
            <FaDotCircle
                className={`${delay} animate-pulse animate-infinite animate-duration-2000`}
                style={{
                    fontSize: "0.7em", alignSelf: "center"
                }}
            />
            {children}
        </div>)
}

export default RoundedBorderBox