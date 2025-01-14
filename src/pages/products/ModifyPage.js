
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"

import ModifyComponent from "../../component/products/ModifyComponent";
import ResultModal from "../../component/common/ResultModal"

import useCustomLogin from "../../hook/useCustomLogin"


const ModifyPage = () => {

    const [result, setResult] = useState(false)
    const {isLogin, moveToLogin} = useCustomLogin()

    const {pno} = useParams() 

    useEffect(()=>{
        if (!isLogin)  
            setResult(true) ;
    }, [isLogin])

    
    
    return(
        <>
        { result && 
                <ResultModal title={'로그인 필요'} content={'로그인 페이지로 이동합니다'} cbFn={moveToLogin} />}
            <h3>Product Modify Page...{pno}</h3>
            <ModifyComponent pno={pno}/>
        </>        
    )
}
export default ModifyPage;

