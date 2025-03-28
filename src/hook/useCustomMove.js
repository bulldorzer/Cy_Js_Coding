import { useState } from "react";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";

const getNum = (param , defaultValue)=>{
    return ( param ) ? parseInt(param) : defaultValue;
}


const useCustomMove = () => {

    const navigate = useNavigate()
    
    const [refresh, setRefresh] = useState(false)


    const [queryParams] = useSearchParams()
    
    const page = getNum( queryParams.get('page'), 1);
    const size = getNum( queryParams.get('size'), 10);

    const queryDefault = createSearchParams({page, size}).toString()
    
    // 리스트 화면 이동
    const moveToList = ( pageParam ) => {

        let queryStr = ''

        if(pageParam){
            const pageNum = getNum( pageParam.page , 1)
            const sizeNum = getNum( pageParam.size , 10)
            queryStr = createSearchParams( { page : pageNum, size : sizeNum } ).toString()
            
        } else {
            queryStr = queryDefault
        }

        navigate( { pathname : `../list`, search : queryStr} )

        setRefresh(!refresh)
    }

    
    // 수정 화면 이동
    const moveToModify = (num) => {
        navigate({
            pathname : `../modify/${num}`,
            search : queryDefault
        } )
    }

    // 조회(상세) 페이지 이동
    const moveToRead = (num) =>{
        console.log(queryDefault)
        navigate({
            pathname : `../read/${num}`,
            search : queryDefault
        })
    }

    return {moveToList, moveToModify,moveToRead, page, size, refresh}

}

export default useCustomMove;