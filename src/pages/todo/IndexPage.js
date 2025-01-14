import { Link, Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import { useCallback } from "react";


function IndexPage (){

    const navigate = useNavigate()

    const handleClickList = useCallback(()=>{
        navigate({pathname : 'list'})
    })

    const handleClickAdd = useCallback(()=>{
        navigate({pathname : 'add'})
    })

    const handleClickRead = useCallback(()=>{
        navigate({pathname : 'read/33'})
    })

    return(
        <BasicLayout>
            <div className="todo content"> 
                <Outlet/>
            </div>
        </BasicLayout>
    )

}

export default IndexPage;

