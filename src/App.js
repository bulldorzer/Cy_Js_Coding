import { RouterProvider } from "react-router-dom";
import root from "./router/root";
import './css/App.css';
import { useEffect } from "react";
import { removeCookie } from "./util/cookieUtil";

function App(){

    /* 
    // 브라우저 종료되면 쿠키 삭제
    useEffect(()=>{

        const deleteCookie = ()=> removeCookie("member")
        window.addEventListener('beforeunload', deleteCookie)
        return ()=>{
            window.removeEventListener("beforeunload", deleteCookie)
        }
    },[]) 
    */

    return(
       <RouterProvider router={root}/>
    )
}

export default App;