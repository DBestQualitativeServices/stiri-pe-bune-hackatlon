import {getCategoryColor} from "../../utils/utils";

const Underline = ({category}) => {
    const backgroundColor = getCategoryColor(category?.toLowerCase());
    const borderColor = getCategoryColor(category?.toLowerCase())

    return (
        <span style={{borderColor}}
              className={"absolute bottom-0 w-full flex items-center justify-center h-8 border-x-[4px] border-black"}>
              <span style={{backgroundColor}} className={"w-full h-[4px] bg-black"}/>
        </span>
    )
}

export default Underline