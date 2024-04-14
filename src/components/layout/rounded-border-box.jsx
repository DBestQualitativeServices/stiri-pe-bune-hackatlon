import {FaDotCircle} from "react-icons/fa";

const RoundedBorderBox = ({category, delay = "", children}) => {
    return (
        <div
            style={category.toLowerCase() === "categoria_0" ? {borderColor: "#65a30d", color: "#65a30d"} : category.toLowerCase() === "categoria_1" ? {borderColor: "#06b6d4", color: "#06b6d4"} : category.toLowerCase() === "categoria_2" ? {borderColor: "#9333ea", color: "#9333ea"} : category.toLowerCase() === "categoria_3" ? {borderColor: "#e11d48", color: "#e11d48"} : category.toLowerCase()==="categoria_4" ? {borderColor: "#ea580c", color: "#ea580c"} : category.toLowerCase()==="categoria_5" ? {borderColor: "#14b8a6", color: "#14b8a6"} : {borderColor: "#64748b", color: "#64748b"}}
            className={`border-2 flex text-sm w-min pl-1 pr-1.5 py-0.5 leading-4 font-semibold rounded-xl items-center flex-row flex-nowrap`}>
            <FaDotCircle className={`${delay} animate-pulse animate-infinite animate-duration-2000`}
                         style={{fontSize: "0.7em", alignSelf: "center"}}/>
            {children}
        </div>
    )
}

export default RoundedBorderBox