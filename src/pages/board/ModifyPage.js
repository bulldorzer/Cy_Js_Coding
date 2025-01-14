
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"

import ModifyComponent from "../../component/board/ModifyComponent";
import ResultModal from "../../component/common/ResultModal"

import useCustomLogin from "../../hook/useCustomLogin"

const ModifyPage = () => {

    const [result, setResult] = useState(false)
    const {isLogin, moveToLogin} = useCustomLogin()

    const {bno} = useParams() 

    useEffect(()=>{
        if (!isLogin)  
            setResult(true) ;
    }, [isLogin])


    return(
        <>
        { result && 
                <ResultModal title={'로그인 필요'} content={'로그인 페이지로 이동합니다'} cbFn={moveToLogin} />}
            <h3>Board Modify Page...{bno}</h3>
            <ModifyComponent bno={bno}/>
        </>        
    )
}
export default ModifyPage;

