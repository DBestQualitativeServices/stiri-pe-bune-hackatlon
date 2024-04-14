import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import Link from "next/link";

const Pagination = ({currentPage, category}) => {
    const disabledButtonStyle = " cursor-not-allowed opacity-30 pointer-events-none";
    const enabledButtonStyle = " cursor-pointer hover:bg-yellow-500 hover:text-white hover:scale-110 ";
    const standardStyles = " h-10 w-10 rounded-lg bg-slate-200 p-2 duration-300 flex items-center justify-center";

    const previousPageHref = category ? `/categorie/${category}/${currentPage - 1}` : `/ultimele-articole/${currentPage - 1}`
    const nextPageHref = category ? `/categorie/${category}/${currentPage + 1}` : `/ultimele-articole/${currentPage + 1}`

    return (
        <section className="h-auto w-full">
            <div
                className="mt-5 flex font-thin font-poppins text-gray-800 flex-row items-center justify-center space-x-2">
                <Link href={previousPageHref}
                      className={`${currentPage <= 1 ? disabledButtonStyle : enabledButtonStyle} ${standardStyles}`}>
                    <FaAngleLeft/>
                </Link>
                <div
                    className="h-[48px] flex items-center justify-center text-lg rounded-lg bg-slate-200 px-4 py-2">
                    <span>Pagina {currentPage}</span>
                </div>
                <Link href={nextPageHref}
                      className={`${disabledButtonStyle} ${standardStyles}`}>
                    <FaAngleRight/>
                </Link>
            </div>
        </section>
    );
};

export default Pagination;
