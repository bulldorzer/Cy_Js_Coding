import { useEffect, useState } from "react"
import {getList} from '../../api/productsApi'
import {API_SERVER_PORT} from '../../api/todoApi'

import useCustomMove from '../../hook/useCustomMove'
import useCustomLogin from "../../hook/useCustomLogin"

import FetchingModal from "../common/FetchingModal"
import PageComponent from "../common/PageComponent"



const host = API_SERVER_PORT;


// 초기값 객체
const initState = {
    dtoList : [],
    pageNumList : [],
    pageRequestDTO : null,
    prev : false, 
    next : false, 
    totalCount : 2,
    prevPage : 0,
    nextPage : 0,
    totalPage : 1,
    current : 1
}

const ListComponent = ()=>{

    const {exceptionHandel} = useCustomLogin()
    const {page, size, refresh, moveToList, moveToRead} = useCustomMove()

    const [serverData, setServerData] = useState(initState)
    const [fetching, setFetching] = useState(false)

    

    useEffect( ()=>{

        setFetching(true)
        
        // 서버에 데이터 요청
        getList( {page, size} ).then( data => {
            setServerData(()=> data ? data : initState)
            setFetching(false)
            
        }).catch( err => exceptionHandel(err))
        
    },[page, size])

    
    
    return (
        <>
            { fetching && <FetchingModal/>}
            <ul className="list">
                {
                    
                    serverData.dtoList.map( product =>(
                        <li key={product.pno} onClick={()=>moveToRead(product.pno)}>
                            <p>{product.pno}</p>
                            <div>
                                {/* 이미지경로?.[0] || "기본이미지.jpg" */}
                                {/* 서버폴더 upload에 s_default.jpg로 기본 이미지 저장 */}
                                <img 
                                    src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                                    alt="product"
                                    className=""
                                />
                            </div>
                            <p>이름 : {product.pname}</p>
                            <p>가격 : {product.price}</p>
                        </li>
                    ))

                }
            </ul>
            <PageComponent serverData={serverData} movePage={moveToList}/>
        </>
        
    )
}

export default ListComponent;


