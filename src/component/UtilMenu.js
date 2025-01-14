import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"

import {logout} from "../slices/loginSlice"
import useCustomLogin from "../hook/useCustomLogin"


const UtilMenu = ()=>{

    const loginState = useSelector(state => state.loginSlice)
    
    const {doLogout, moveToPath} = useCustomLogin()

    const handleClickLogout = (e) => {
        e.preventDefault()
        doLogout()
        alert('로그아웃 되었습니다')
        moveToPath('/')
    }

    return(
        <div className="utilMenu">
            {
                loginState.email 
                    ? <>
                        <Link to={"#"} onClick={handleClickLogout} >로그아웃</Link>
                        <Link to={"/member/mypage"}>마이페이지</Link></>
                    : <> 
                        <Link to={"/member"}>로그인</Link>
                        <Link to={"/signup"}>회원가입</Link> </>
            }
            <Link to={"/member/cart"}>장바구니</Link>
        </div>
    )
}

export default UtilMenu;