import AuthFormField from './../../src/components/form_components/AuthFormField';

const ForgotPassword = ()=>{
    return (
        <>
        <div className="form_page_section">
            <h1>Forgot Password</h1>
            <AuthFormField submitFunction={()=>null} email buttonText="Reset" />
        </div>
        </>
    )
}

export default ForgotPassword