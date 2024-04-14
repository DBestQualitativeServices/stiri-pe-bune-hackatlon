import Link from "next/link";
import {capitalizeFirstLetter, getCategoryColor} from "../../utils/utils";
import { usePathname } from 'next/navigation'


const NavListItem = ({link, toggleNav}) => {
    const backgroundColor = getCategoryColor(link?.toLowerCase());
    const color = getCategoryColor(link?.toLowerCase())
    const pathname = usePathname()

    return (
        <Link href={`/categorie/${link}`} onClick={toggleNav}
              className={"group relative flex lg:w-min text-lg lg:text-md text-gray-600 hover:text-gray-800 text-nowrap px-2 flex-col focus:text-gray-800 justify-center font-semibold py-1 rounded-md"}>
            <div className={"self-start flex"}>
                <span style={{color}}
                    className={"self-center group-hover:scale-110 group-hover:ease-in-out transition duration-[250ms]"}>
                    {capitalizeFirstLetter(link.replaceAll("_", " "))}
                </span>
            </div>
            <span style={{backgroundColor}}
                className={`${pathname.includes(link) ? "lg:w-[100%]" : "lg:group-hover:w-[100%]"} absolute self-center lg:group-hover:w-[100%] w-0 transition-all transform duration-300 bottom-0 h-[3px] rounded-full bg-yellow-500`}/>
        </Link>
    )
}

export default NavListItem