import RecommendationSidebar from "../../../src/components/page_layouts/RecommendationSidebar";
import { fetchTrendingProducts } from "../../../src/utils/fetchingHelpers";

export const metadata = {
    title: "Lasu Mart-Chat"
}

const ChatsLayout = async({children})=>{
    const recommended = await fetchTrendingProducts()

    return (
        <>
        <div className="md:grid md:gap-2 grid-cols-[70%_30%] gap-2 max-h-[calc(100vh-300px)] h-[calc(100vh-300px)] w-screen">
            {children}
            <RecommendationSidebar products={recommended} layoutStyle="hidden md:block" />
        </div>
        </>
    )
}

export default ChatsLayout