import BasicLayout from "../../layout/BasicLayout"
import useCustomLogin from "../../hook/useCustomLogin"
import { useEffect, useState } from "react"
import ResultModal from "../../component/common/ResultModal"
import { useSelector } from "react-redux"

const MyPage = ()=>{

    const [result, setResult] = useState(false)
    const {isLogin, moveToLogin} = useCustomLogin()

    // store의 loginSlice-리듀서를 통해 state 값 추출
    const email = useSelector( (state) => state.loginSlice.email)
    const nickname = useSelector( (state) => state.loginSlice.nickname)
 

    useEffect(()=>{
    
        if (!isLogin)  
            setResult(true) ;
    }, [isLogin])
    
    return (

        <BasicLayout>
            { result && 
                <ResultModal title={'로그인 필요'} content={'로그인 페이지로 이동합니다'} cbFn={moveToLogin} />}
            <div className="login">
                <h2>My Page</h2>
                <p>{nickname}님 환영합니다!</p>
                <p>{email}로 로그인 하였습니다!</p>
                
            </div>
        </BasicLayout>
    )
}

export default MyPage;