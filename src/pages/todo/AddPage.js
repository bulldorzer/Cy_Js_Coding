import AddComponent from "../../component/todo/AddComponent";
import useCustomLogin from "../../hook/useCustomLogin"
import { useEffect, useState } from "react"
import ResultModal from "../../component/common/ResultModal"


function AddPage (){

    const [result, setResult] = useState(false)
    const {isLogin, moveToLogin} = useCustomLogin()

    useEffect(()=>{
            if (!isLogin)  
                setResult(true) ;
        }, [isLogin])


    return(
        <>

            <h3>Todo Add Page</h3>
            { result && 
                <ResultModal title={'로그인 필요'} content={'로그인 페이지로 이동합니다'} cbFn={moveToLogin} />}
            <AddComponent/>

        </>        
    )

}

export default AddPage;

