import { useDispatch, useSelector } from "react-redux"
import { createSearchParams, Navigate, useNavigate } from "react-router-dom"
import {loginPostAsync, logout} from "../slices/loginSlice"

const useCustomLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginState = useSelector(state => state.loginSlice)
    const isLogin = loginState.email ? true : false

    const doLogin = async (loginParam) => {
        const action = await dispatch(loginPostAsync(loginParam))
        return action.paylod
    }

    const doLogout = ()=>{
        dispatch(logout())
    }

    const moveToPath = (path) => {
        navigate({pathname : path}, {replace:true})
    }

    const moveToLogin = () => {
        navigate({pathname : '/member/login'}, {replace:true})
    }

    const moveToLoginReturn = () => {
        return <Navigate replace to="/member/login/"></Navigate>
    }

    const exceptionHandel = (ex)=>{ // 예외객체가 ex에 담아온다
        const errorMsg = ex.response.data.errorMsg
        const errorStr = createSearchParams({error : errorMsg}).toString()
        // 에러 메시지를 url의 쿼리 문자열로 변환
        // ex) error=REQUIRE_LOGIN 형태

        console.log(ex)

        if(errorMsg === 'REQUIRE_LOGIN'){
            alert('로그인 해야 합니다')
            navigate({pathname : '/member/login', search : errorStr})
            return
            // 이동경로 : /member/login?error=REQUIRE_LOGIN
        }

        if(ex.response.data.error === 'ERROR_ACCESSDENIED'){
            alert("해당 메뉴를 사용할 수 있는 권한이 없습니다")
            navigate({pathname : '/member/login', search:errorStr})
            return
        }

    }

    return {loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn, exceptionHandel}
}

export default useCustomLogin;