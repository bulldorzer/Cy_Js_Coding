import { useEffect, useState } from "react"

import BasicLayout from "../../layout/BasicLayout"
import ResultModal from "../../component/common/ResultModal"

import useCustomLogin from "../../hook/useCustomLogin"

const CartPage = ()=>{

    const [result, setResult] = useState(false)
    const {isLogin, moveToLogin} = useCustomLogin()

    useEffect(()=>{
        if (!isLogin)  
            setResult(true) ;
    }, [isLogin])
    
    return (

        <BasicLayout>
            { result && 
                <ResultModal title={'로그인 필요'} content={'로그인 페이지로 이동합니다'} cbFn={moveToLogin} />}
            <div className="login">
                <h2>Cart</h2>
                
            </div>
        </BasicLayout>
    )
}

export default CartPage;