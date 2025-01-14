import { useState, useEffect } from "react";
import { postAdd } from "../../api/boardApi";

import useCustomMove from "../../hook/useCustomMove";

import ResultModal from "../common/ResultModal";
import LiItem from "../common/LiItem";
import ButtonGroup from "../common/ButtonGroup";
import { useSelector } from "react-redux";

const initState = { title: "", writer: "", dueDate: "" };

const AddComponent = () => {


    const [post, setPost] = useState({ ...initState });
    const [result, setResult] = useState(null);

    const { moveToList } = useCustomMove();

    const writer = useSelector( state => state.loginSlice.nickname)

    useEffect (()=>{
        setPost((prevPost) => ({
            ...prevPost,
            writer : writer,
            postDate: new Date().toISOString().split("T")[0],
        }));
    },[])
    


    const handleChangePost = (e) => {
        const { name, value } = e.target;
        setPost((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleClickAdd = (e) => {
        if (!post.writer ||  !post.title || !post.content ||!post.postDate) {
            alert("모든 필드를 입력하세요!");
            return;
        }

        postAdd(post)
            .then((result) => {
                console.log(result);
                setPost({ ...initState });
                setResult(result.RESULT); // 체크 - 응답 구조에 맞게 수정
                moveToList()
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const closeModal = () => {
        setResult(null); // 모달 닫기
    };

    

    const fields = [
        { label: "작성자", name: "writer", type: "text", value: writer},
        { label: "작성일", name: "postDate", type: "date", value : post.postDate},
        { label: "제목", name: "title", type: "text", value : post.title }        
    ];

    const buttons = [
        {label : '취소', className : 'cancle', onClick : ()=> moveToList() },
        {label : '글쓰기', className : 'add', onClick : handleClickAdd }
    ]

    return (
        <>
            {result && (
                <ResultModal
                    title={"Add Result"}
                    content={`New ${result} Added`}
                    cbFn={closeModal}
                />
            )}
            <ul className="add item">
                {fields.map(({ label, name, type, value }) => (
                    <LiItem
                        key={name}
                        label={label}
                        name={name}
                        type={type}
                        value={value}
                        onChange={handleChangePost}
                    />
                ))}
                <li>
                    <span className="labelWrap">내용</span>
                    <span className="dataWrap">
                        <textarea name="content" value={post.content} onChange={handleChangePost}></textarea>
                    </span>
                </li>
            </ul>
            <ButtonGroup buttons={buttons}/>
        </>
    );
};

export default AddComponent;
