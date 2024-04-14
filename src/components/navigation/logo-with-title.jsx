import Image from "next/image";
import Link from "next/link";

const LogoWithTitle = ({toggleNav}) => {
    return (
        <Link href="/" className="group mr-4 inline-flex items-center p-2 rounded-md"
              onClick={toggleNav}>
            <Image src={"/news_500x500.png"} className={"pointer-events-none"}
                   alt={"Pictograma Stiri Pe Bune"} width={60} height={60} priority/>
            <div className={"flex text-yellow-500 group-hover:text-amber-500 duration-300 flex-col text-2xl font-bold tracking-wide"}>
                <span>Stiri</span>
                <span>Pe Bune</span>
            </div>
        </Link>
    )
}

export default LogoWithTitle