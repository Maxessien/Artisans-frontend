import ClientLogin from "./clientPage"
import {redirect} from "next/navigation"
import {getUserServerSide} from "../../src/utils/auth.server"


export const metadata = {
  title: "Lasu Mart-Login"
}

const Login = async ()=>{
    const {user} = await getUserServerSide()
    if (user) {
        redirect("/explore")
        return
    }
	return (
		<>
		<ClientLogin />
		</>
	)
}

export default Login