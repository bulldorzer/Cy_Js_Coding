import {useParams} from "react-router-dom";
import ReadComponent from "../../component/todo/ReadComponent";

function ReadPage (){

    const {tno} = useParams() 
    
    return(
        <>
            <h3>Todo Read Page - {tno}</h3>
            <ReadComponent tno={tno}></ReadComponent>
        </>
    )
}

export default ReadPage;

