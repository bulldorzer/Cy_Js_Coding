import { useEffect, useState } from "react";
import { getOne, deleteOne, putOne } from "../../api/todoApi";

import useCustomMove from '../../hook/useCustomMove'
import ResultModal from "../common/ResultModal";
import LiItem from "../common/LiItem";
import ButtonGroup from "../../component/common/ButtonGroup"


const initState = { 
    tno : 0,  
    title : '', 
    writer : '', 
    dueDate : '', 
    complete : false 
}

const ModifyComponent = ({tno}) =>{

    const [todo, setTodo] = useState({...initState})

    const {moveToList, moveToRead} = useCustomMove()
    const [result, setResult] = useState(null)
    
    useEffect(()=>{
        getOne(tno).then(data =>{
            setTodo(()=> data ? data : initState)
        })
    }, [tno])

    // ()=> 실행할문장; 
    // ()=> 리턴될 값; 
    // ()=> ({}) - // 리턴값이 객체 형태인경우
    
    const handleChangeTodo = (e) => {

        const {name, value} = e.target
        
        setTodo( prevTodo => ({
            ...prevTodo, 
            [name]: name=="complete" ? value === "Y" : value
        } ))
    }

    // [name] : key값을 동기적으로 설정
      // name속성이 complete이면, value === "true"의 결과값(true/false을 저장

    const handleClickModify = () => {
    
        putOne(todo).then( data =>{
            console.log("modify result : " + data)
            setResult('Modify')
        })        
    }

    const handleClickDelete = () => {

        deleteOne(tno).then( data => {
            console.log('delete result' + data);
            setResult('Delete')
        })
        
    }

    const closeModal = ()=>{ //  닫기 누르면 페이지 이동
        
        if(result === 'Delete'){
            moveToList()
        } else {
            moveToRead(tno)
        }
    }

    const fields = [
        {label : 'Writer', name : 'writer', value : todo.writer, type : 'text', readOnly : true },
        {label : 'Title', name : 'title', value : todo.title, onChange : handleChangeTodo },
        {label : 'Due Date', name : 'dueDate', value : todo.dueDate, onChange: handleChangeTodo, type : 'date'}
    ]

    const buttons = [
        {label : '취소', className : 'cancle', onClick : ()=> moveToRead(tno) },
        {label : '수정', className : 'modify', onClick : handleClickModify },
        {label : '삭제', className : 'delete', onClick : handleClickDelete }
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
                <li className="complete">
                    <span className="labelWrap">Complete</span>
                    <span className="dataWrap">
                        <label>
                            <input 
                                type="radio" name="complete" 
                                value="Y"
                                onChange={handleChangeTodo} 
                                checked={todo.complete == true}
                                ></input>Yes</label>
                        <label>
                            <input 
                                type="radio" name="complete" 
                                value="N" 
                                onChange={handleChangeTodo} 
                                checked={todo.complete == false}
                            ></input>No</label>
                    </span>
                </li>   
            </ul>
            <ButtonGroup buttons={buttons}/>
        </>
    )
}



export default ModifyComponent;

