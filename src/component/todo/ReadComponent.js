import { useEffect, useState } from "react"
import {getOne} from "../../api/todoApi";

import useCustomMove from '../../hook/useCustomMove'
import LiItem from "../common/LiItem";
import ButtonGroup from "../../component/common/ButtonGroup"

// 초기값 객체
const initState = {
    tno : 0,
    title : 'Test',
    writer : 'Test',
    dueDate : null,
    complete : false
}

const ReadComponent = ({tno})=>{

    const [todo, setTodo] = useState(initState)

    useEffect(()=>{
        getOne(tno).then( data =>{
            
            setTodo( () => data ? data : initState )
        })
    }, [tno])

    
    const {moveToList, moveToModify} = useCustomMove();
    const fields = [
        {label : 'Title', name : 'title' },
        {label : 'Writer', name : 'writer'},
        {label : 'Due Date', name : 'dueDate'},
        {label : 'Complete', name : 'complete' }
    ]

    const buttons = [
        {label : '목록', className : 'list', onClick : ()=> moveToList() },
        {label : '수정', className : 'modify', onClick : ()=> moveToModify(tno) }
    ]

    return (
        <>
            <ul className="read item">
                {
                    fields.map(({label, name})=> {
                        
                        let data = todo[name];
                        if(name == 'complete'){
                            data = todo['complete'] ? 'Complete' : 'Not Yet'
                        }

                        return (
                            <LiItem 
                                key={name}  
                                label={label}
                                name={name}
                                value={data}
                                readOnly={true}
                            />
                    )}) 
                }
            </ul>
            <ButtonGroup buttons={buttons}/>
        </>
    )
}


export default ReadComponent;




// import {getOne} from '../../api/todoApi'
    /*
    useEffect(()=>{

        getOne(tno).then( data =>{
            console.log(data)
            setTodo(data)
        }).catch((error)=>{
            console.error(error)
        })
    },[tno])
*/