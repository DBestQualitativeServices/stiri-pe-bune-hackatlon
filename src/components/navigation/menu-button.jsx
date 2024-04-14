"use client"

const MenuButton = ({isNavOpen, toggleNav}) => {
    return (
        <button type={"button"} onClick={() => toggleNav()}
                className={"group self-center h-[40px] w-[40px] p-2 lg:hidden rounded-md"}>
            <div className={"flex flex-col items-center justify-center gap-1.5"}>
                <span
                    className={`${isNavOpen ? "-rotate-45 translate-y-2.5" : ""} h-1 w-7 rounded-full bg-yellow-500 transition duration-500`}/>
                <span
                    className={`${isNavOpen ? "w-0" : "w-7"} h-1 rounded-full bg-yellow-500 transition-all duration-500`}/>
                <span
                    className={`${isNavOpen ? "rotate-45 -translate-y-2.5" : ""} h-1 w-7 rounded-full bg-yellow-500 duration-500`}/>
            </div>
        </button>
    )
}

export default MenuButton