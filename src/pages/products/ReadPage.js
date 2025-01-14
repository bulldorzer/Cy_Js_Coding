import {useParams} from "react-router-dom";
import ReadComponent from "../../component/products/ReadComponent";

function ReadPage (){

    const {pno} = useParams() 
    
    return(
        <>
            <h3>Products Read Page - {pno}</h3>
            <ReadComponent pno={pno}></ReadComponent>
        </>
    )
}

export default ReadPage;

