import BasicLayout from "../../layout/BasicLayout";
import { Outlet, useNavigate } from "react-router-dom";
import { useCallback } from "react";


const IndexPage = () => {

    const navigate = useNavigate()

    const handleClickList = useCallback(()=>{
        navigate({pathname : 'list'})
    })
    const handleClickAdd = useCallback(()=>{
        navigate({pathname : 'add'})
    })

    return (
        <BasicLayout>
            <div className="menu">
                <button onClick={handleClickList}>LIST</button>
                <button onClick={handleClickAdd}>Add</button>
            </div>
            <div className="products content"> 
                <Outlet/>
            </div>
        </BasicLayout>
    )

}

export default IndexPage;