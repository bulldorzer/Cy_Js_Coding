
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"

import ModifyComponent from "../../component/todo/ModifyComponent";
import ResultModal from "../../component/common/ResultModal"

import useCustomLogin from "../../hook/useCustomLogin"


const ModifyPage = () => {

    const [result, setResult] = useState(false)
    const {isLogin, moveToLogin} = useCustomLogin()

    const {tno} = useParams() // url에서 tno 추출

    useEffect(()=>{
        if (!isLogin)  
            setResult(true) ;
    }, [isLogin])

    return(
        <>
        { result && 
                <ResultModal title={'로그인 필요'} content={'로그인 페이지로 이동합니다'} cbFn={moveToLogin} />}
            <h3>Todo Modify Page...{tno}</h3>
            <ModifyComponent tno={tno}/>
        </>        
    )
}
export default ModifyPage;

