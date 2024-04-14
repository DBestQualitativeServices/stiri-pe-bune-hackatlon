"use client"

import {useRef, useState} from "react";
import LogoWithTitle from "./logo-with-title";
import MenuButton from "./menu-button";
import MobileNavList from "./mobile-nav-list";
import PcNavList from "./pc-nav-list";

const handleNavToggle = (ref, toggleNav, isNavOpen = true) => {
    if (ref) ref.current.scrollTo({top: 0, behavior: 'smooth'})
    toggleNav(!isNavOpen)
}

const Navbar = ({categories}) => {
    const [isNavOpen, toggleNav] = useState(false);
    const navRef = useRef(null);

    return (
        <nav id="animated-navbar"
             className="z-50 fixed top-0 flex-no-wrap flex w-full lg:h-[100px] bg-white shadow-lg items-center justify-between py-2 lg:flex-wrap lg:justify-start">
            <div className="flex w-full flex-wrap items-center justify-between px-4">
                <div className={"flex flex-1 lg:flex-none justify-between"}>
                    <LogoWithTitle toggleNav={() => handleNavToggle(navRef, toggleNav)}/>
                    <MenuButton isNavOpen={isNavOpen} toggleNav={() => handleNavToggle(navRef, toggleNav, isNavOpen)}/>
                </div>

                <div ref={navRef} style={{willChange: "transform"}}
                     className={`${isNavOpen ? 'max-h-[50vh]' : 'max-h-0'} duration-[500ms] lg:max-h-none overflow-y-auto transition-all transform flex-grow basis-[100%] items-center lg:!flex lg:basis-auto`}>
                    <MobileNavList navList={categories} isNavOpen={isNavOpen}
                                   toggleNav={() => handleNavToggle(navRef, toggleNav, isNavOpen)}/>
                    <PcNavList navList={categories}/>
                </div>
            </div>
        </nav>
    );
}

export default Navbar

{/*<header className="bg-white shadow">*/
}
{/*    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">*/
}
{/*        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>*/
}
{/*    </div>*/
}
{/*</header>*/
}
{/*<main>*/
}
{/*    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">*/
}
{/*        /!* <!-- Replace with your content --> *!/*/
}
{/*        <div className="px-4 py-6 sm:px-0">*/
}
{/*            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>*/
}
{/*        </div>*/
}
{/*        /!* <!-- /End replace --> *!/*/
}
{/*    </div>*/
}
{/*</main>*/
}
// <Link href="/public" className="mr-4 inline-flex items-center">
//     <Image src={"/news_500x500.png"} className={"pointer-events-none"}
//            alt={"Medcorp Logo"} width={90} height={90} priority/>
//     <div className={"flex flex-col text-3xl font-bold"}>
//         <span>Stiri</span>
//         <span>Pe Bune</span>
//     </div>
// </Link>