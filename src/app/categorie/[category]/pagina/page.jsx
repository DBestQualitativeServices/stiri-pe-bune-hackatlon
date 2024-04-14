import {redirect} from 'next/navigation';
import {fetchCategories} from "../../../../server/services/cache-handler";

const Page = async ({params}) => {
    const {category} = params
    const categories_list = await fetchCategories()
    if (categories_list.error || !categories_list.includes(category)) return redirect("/")
    return redirect(`/categorie/${category}`)
}

export default Page