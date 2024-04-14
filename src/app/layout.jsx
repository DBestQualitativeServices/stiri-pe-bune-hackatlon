import "server-only"

import "./globals.css";
import Navigation from "../components/navigation/navigation";
import {fetchCategories} from "../server/services/cache-handler";

export const metadata = {
    title: "Stiri Pe Bune",
    description: "Ultimele stiri redactate pe bune",
};

export const dynamic = 'force-dynamic'

export default async function RootLayout({children}) {
    const categories = await fetchCategories()

    return (
        <html lang="en">
        <body>
        <Navigation categories={categories}/>
        {children}
        </body>
        </html>
    );
}
