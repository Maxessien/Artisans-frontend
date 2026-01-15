import ClientRegister from "./clientPage"
import {redirect} from "next/navigation"
import {getUserServerSide} from "../../src/utils/auth.server"


export const metadata = {
  title: "Lasu Mart-Register"
}

const Register = async ()=>{
    const {user} = await getUserServerSide()
    if (user) {
        redirect("/explore")
        return
    }
	return (
		<>
		<ClientRegister />
		</>
	)
}

export default Register