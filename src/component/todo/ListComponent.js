import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {getList} from '../../api/todoApi'

import PageComponent from "../common/PageComponent"
import ButtonGroup from "../common/ButtonGroup"

import useCustomLogin from "../../hook/useCustomLogin"
import useCustomMove from '../../hook/useCustomMove'


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

const ListComponent = ({tno})=>{

    const {page, size, refresh, moveToList, moveToRead} = useCustomMove()
    const [serverData, setServerData] = useState(initState)

    const navigate = useNavigate()

    const {exceptionHandel} = useCustomLogin()

    const handleClickAdd = ()=> navigate({pathname : '/todo/add'})

    useEffect(()=>{
        // 서버에 데이터 요청
        getList( {page, size} ).then( data => {
            setServerData(()=> data ? data : initState)
        }).catch(err => exceptionHandel)
        
    },[page, size])

    const buttons = [
        {label : '글쓰기', className : 'add', onClick : handleClickAdd }
    ]

    return (
        <>
            <ul className="list">
                <li className="header">
                    <span className="tno">No.</span>
                    <span className="title">제목</span>
                    <span className="writer">작성자</span>
                    <span className="dueDate">작성일</span>
                </li>
                {
                    serverData.dtoList.map( todo => (
                        <li key={todo.tno} onClick={()=>{ moveToRead(todo.tno) }}>
                            <span className="tno">{todo.tno}</span>
                            <span className="title">{todo.title}</span>
                            <span className="writer">{todo.writer}</span>
                            <span className="dueDate">{todo.dueDate}</span>
                        </li>
                    ))
                }
            </ul>
            <PageComponent serverData={serverData} movePage={moveToList}/>
            <ButtonGroup buttons={buttons}/>
        </>
        
    )
}

export default ListComponent;


