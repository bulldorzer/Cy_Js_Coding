import { Outlet } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";


function IndexPage (){
    
    return(
        <BasicLayout>
            <div className="board content"> 
                <Outlet/>
            </div>
        </BasicLayout>
    )

}

export default IndexPage;

