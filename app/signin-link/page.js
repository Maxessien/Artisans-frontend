import SignInWithLink from "../../src/components/form_components/SignInWithLink"
import { notFound } from 'next/navigation';


const SigninLinkPage = async({searchParams}) => {
    const sParams = await searchParams

    //Condition To disable page visit while page still in progress
    const pageNotReady = true

    if (pageNotReady) return notFound()
  return (
    <SignInWithLink email={sParams?.email} />
  )
}

export default SigninLinkPage