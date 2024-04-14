"use client"

import NavListItem from "./nav-list-item";
import {useEffect} from "react";

const MobileNavList = ({navList, toggleNav}) => {
    useEffect(() => {
        const listItems = document.querySelectorAll('.mobile-nav-list li');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('opacity-100', entry.isIntersecting);
                entry.target.classList.toggle('opacity-0', !entry.isIntersecting);
            });
        });

        listItems.forEach(item => observer.observe(item));

        return () => observer.disconnect();
    }, [])

    return (
        <ul className="lg:hidden flex mr-auto flex-col items-start divide-y divide-gray-300 mobile-nav-list">
            {navList.length > 0 && navList.map((link, index) => (
                <li key={`mobile-${index}-${link}`} className="w-full py-2  transition-all duration-[1000ms]">
                    <NavListItem link={link} toggleNav={toggleNav}/>
                </li>
            ))}
        </ul>
    );
};

export default MobileNavList;