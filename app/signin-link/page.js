import SignInWithLink from "../../src/components/form_components/SignInWithLink"


const SigninLinkPage = async({searchParams}) => {
    const sParams = await searchParams

  return (
    <SignInWithLink email={sParams?.email} />
  )
}

export default SigninLinkPage