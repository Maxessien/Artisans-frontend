import { authApi } from "../../../src/axiosApiBoilerplates/authApi";
import AllChats from "../../../src/components/chat_components/AllChats";
import { getServerAuthToken } from "../../../src/utils/authHelpers";
import logger from "../../../src/utils/logger";

const AllChatsPage = async()=>{
    const token = await getServerAuthToken()
    const allChats = await authApi(token).get("/chat")
    logger.info("Fetched chats", { count: allChats.data.length, data: allChats.data })

    return <AllChats userChats={allChats.data} />
}

export default AllChatsPage