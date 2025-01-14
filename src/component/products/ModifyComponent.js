import { useEffect, useRef, useState } from "react";
import { getOne, deleteOne, putOne } from "../../api/productsApi";
import {API_SERVER_PORT} from '../../api/todoApi'

import useCustomMove from '../../hook/useCustomMove'
import ResultModal from "../common/ResultModal";
import LiItem from "../common/LiItem";

const host = API_SERVER_PORT;


const initState = { 
    pno : 0,  
    pname : '', 
    pdesc : '', 
    price : '',
    delFlag : true, 
    uploadFileNames : []
}

const ModifyComponent = ({pno}) =>{
    
    const [product, setProduct] = useState({...initState}) // 현재 데이터
    const [result, setResult] = useState(null) // 처리결과

    const {moveToList, moveToRead} = useCustomMove() // 페이지 이동 기능

    const uploadRef = useRef(); // 업로드 input 요소 선택
    
    // 컴포넌트 생성(마운트) 될때, 의존성 배열(state, 파라미터) 의 값이 바뀔때 --> 실행
    // clean Up (return()=>{}) 구문이 있다면? 
    // ㄴ 컴포넌트 소멸(언마운트)될 때, 값이 바뀌어서 effect 구문 실행되기 직전에 ( 기존에 실행한 작업 청소)

    useEffect(()=>{
        getOne(pno).then( data =>{
            setProduct(()=> data )
        })

    }, [pno])

   
    const handleChangeProduct = (e) => {
        const {name, value} = e.target
        setProduct( prevProduct => ({...prevProduct, [name]: value} ))
    }

    // 293쪽
    const handleClickModify = () => {

        const formData = new FormData();

        // 신규추가 이미지 목록 - form데이터에 담음
        const files = uploadRef.current.files // useRef 선택된 요소(current)의 첨부파일(files) 배열로 추출
        for(const file of files){ // 첨부된 파일에서 값을 하나씩 뽑아서 files라는 key값으로 첨부함
            formData.append("files", file) // 배열
        }

        // 기존 데이터
        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.price)
        formData.append("delFlag", product.delFlag)

        // 기존 이미지 목록을 담음
        for(const file of product.uploadFileNames){ // 기존파일
            formData.append("uploadFileNames", file)
        }
    
        putOne(pno, formData).then( data =>{
            console.log("modify result : " + data)
            setResult('modify')
        })        
    }

    //295쪽 
    const handleClickDelete = () => {
        deleteOne(pno).then(data =>{
            setResult('delete')
        })
    }

    // 289쪽
    const deleteOldImages = (imageName) => {
        const resultFileNames = product.uploadFileNames.filter(fileName=> fileName != imageName)
        setProduct( prevProduct => ({
            ...prevProduct, 
            uploadFileNames : resultFileNames
        }))
    }

    const closeModal = ()=>{ //  닫기 누르면 페이지 이동
        result === 'modify' 
            ? moveToRead(pno) 
            : result === 'delete'
                 ? moveToList({page : 1}) 
                 : moveToList() ;
    }

    const fields = [
        {label : 'Name', name : 'pname', value : product.pname, type : 'text', readOnly : true },
        {label : 'Description', name : 'pdesc', value : product.pdesc, onChange : handleChangeProduct },
        {label : 'Price', name : 'price', value : product.price, onChange: handleChangeProduct, type : 'number'}
    ]

    return (
        <>
            {result&& 
                <ResultModal title={'처리결과'} content={result} cbFn={closeModal}/>}
                <ul className="modify item">
                {
                    fields.map( field =>( 
                        <LiItem key={field.name} {...field} /> 
                    ))
                }
                <li>
                    <span>첨부 이미지</span>
                    <span>
                        <input 
                            ref={uploadRef}
                            type="file"
                            multiple={true}
                        />
                    </span>
                </li>
                <li>
                { product.uploadFileNames.map((imgFile, i)=>(
                    <span key={i}>
                        <img src={`${host}/api/products/view/s_${imgFile}`}/>
                        <button className="btn" onClick={()=>deleteOldImages(imgFile)}>삭제</button>
                    </span>
                ))} 
                </li>
            </ul>
            <div className="btnGroup">
                <button type="button" className="btn" onClick={moveToList}>목록</button>
                <button type="button" className="btn" onClick={handleClickModify}>수정</button>
                <button type="button" className="btn" onClick={handleClickDelete}>삭제</button>
                
            </div>
        </>
    )
}



export default ModifyComponent;

