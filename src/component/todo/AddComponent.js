import { useState } from "react";
import {postAdd} from '../../api/todoApi'

import useCustomMove from '../../hook/useCustomMove'

import ResultModal from '../../component/common/ResultModal'
import ButtonGroup from "../common/ButtonGroup";
import LiItem from "../common/LiItem";

const initState = { title : '', writer : '', dueDate : '' }

const AddComponent = () =>{

    const [todo, setTodo] = useState({...initState})
    const [showResult, setShowResult] = useState(null)

    const {moveToList} = useCustomMove()
    
    const handleChangeTodo = (e) => {
        const {name, value} = e.target; 
        setTodo((prevTodo)=> ( { ...prevTodo, [name] : value} ) )          
    }

    const handleClickAdd = (e) => {
        
        postAdd(todo).then( result =>{  // {"RESULT" : "SUCESS"}
            console.log(result)
            setTodo({...initState})
            setShowResult(result.TNO) // = true = 모달 보임 = 결과값 설정

        }).catch(e=>{
            console.error(e)
        })        
    }

    const closeModal = ()=>{
        setShowResult(null) // = false = 모달 닫음
    }

    const fields = [
        {label : 'Writer', name : 'writer' },
        {label : 'Title', name : 'title',   },
        {label : 'Due Date', name : 'dueDate', type : 'date'}
    ]

    const buttons = [
        {label : '취소', className : 'cancle', onClick : ()=> moveToList() },
        {label : '글쓰기', className : 'add', onClick : handleClickAdd }
    ]

    return (
        <>
            
            { showResult &&
                <ResultModal 
                    title={'Add Result'} 
                    content={`New ${showResult} Added`}
                    cbFn={closeModal} /> 
            }
            <ul  className="add item">
                {
                    fields.map( ({label, name, type}) => (
                        <LiItem 
                            key={name} 
                            label={label}
                            name={name}
                            type={type}
                            value={todo[name]}
                            onChange = {handleChangeTodo} 
                        />
                    ))
                }
            </ul>
            <ButtonGroup buttons={buttons}/>
        </>
    )


}


export default AddComponent;


/*


const handleChangeTodo = (e) => {

        todo[e.target.name] = e.target.value;    
}

    1) e = 이벤트 발생한 대상과 그에 관련된 모든 정보 담김
    2) e.target = 이벤트 발생한 그 요소 (DOM 요소, 해당 태그만 선택)
    3) 태그 안에 있는 속성(Attribute) 값을 추출하려면? 
    - e.target.name = title / e.target.value = ''
    4) todo [] 괄호를 쓴 이유
    - 객체의 key값을 동적으로 설정하려고

*/