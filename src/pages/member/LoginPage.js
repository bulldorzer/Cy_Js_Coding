import BasicLayout from "../../layout/BasicLayout"
import LoginComponent from "../../component/member/LoginComponent"

const LoginPage = ()=>{
    return (

        <BasicLayout>
            <div className="login">
                <h2>Login Page</h2>
                <LoginComponent/>
            </div>
        </BasicLayout>
    )
}

export default LoginPage;