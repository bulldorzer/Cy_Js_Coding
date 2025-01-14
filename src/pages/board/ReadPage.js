import {useParams} from "react-router-dom";

import ReadComponent from "../../component/board/ReadComponent";


function ReadPage (){


    const {bno} = useParams() 
    
    return(
        <>
            <h3>Board Read Page - {bno}</h3>
            <ReadComponent bno={bno}></ReadComponent>
        </>
    )
}

export default ReadPage;

