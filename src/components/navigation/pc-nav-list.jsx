import NavListItem from "./nav-list-item";

const PcNavList = ({navList}) => {
    return (
        <ul className="hidden lg:flex ml-auto flex-row">
            {navList.length && navList.map((link, index) => {
                if (index < 7) return (
                    <li key={`pc-${index}-${link}`} className={`text-lg`}>
                        <NavListItem link={link}/>
                    </li>
                )
            })}
        </ul>
    )
}

export default PcNavList