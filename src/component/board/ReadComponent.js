import { useEffect, useState } from "react"
import {getOneView} from "../../api/boardApi";

import LiItem from "../common/LiItem";
import ButtonGroup from "../../component/common/ButtonGroup"
import useCustomLogin from "../../hook/useCustomLogin"
import useCustomMove from '../../hook/useCustomMove'

const initState = {
    bno: 0,
    title: "",
    writer: "",
    viewCount: 0,
    postDate: ""
};

const ReadComponent = ({bno})=>{

    
    const [post, setPost] = useState(initState)
    

    useEffect(()=>{
        getOneView(bno).then( data =>{
            setPost( () => data ? data : initState )
        }).catch((err) => {
            console.error("Error fetching post:", err);
            setPost(initState); // 오류 발생 시 초기화
        });
    }, [bno])

    
    const {moveToList, moveToModify} = useCustomMove();
    const fields = [
        {label : 'Title', name : 'title' },
        {label : 'Writer', name : 'writer'},
        {label : 'View Count', name : 'viewCount'},
        {label : 'Post Date', name : 'postDate'}
    ]
    const buttons = [
        {label : '목록', className : 'list', onClick : ()=> moveToList() },
        {label : '수정', className : 'modify', onClick : ()=> moveToModify(bno) }
    ]

    return (
        <>
            <ul className="read item">
                {
                    fields.map(({label, name})=> {
                        
                        let data = post[name] || "";

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
                <li className="readOnly">
                    <span className="labelWrap">내용</span>
                    <span className="dataWrap">
                        <textarea name="content" value={post.content} readOnly={true}></textarea>
                    </span>
                </li>
            </ul>
            <ButtonGroup buttons={buttons}/>
        </>
    )
}


export default ReadComponent;




// import {getOne} from '../../api/todoApi'
    /*
    useEffect(()=>{

        getOne(bno).then( data =>{
            console.log(data)
            setTodo(data)
        }).catch((error)=>{
            console.error(error)
        })
    },[bno])
*/