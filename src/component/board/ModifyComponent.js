import { useEffect, useState } from "react";
import { getOneModify, deleteOne, putOne } from "../../api/boardApi";
import useCustomMove from "../../hook/useCustomMove";
import ResultModal from "../common/ResultModal";
import LiItem from "../common/LiItem";
import ButtonGroup from "../../component/common/ButtonGroup"

const initState = {
    bno: 0,
    title: "",
    writer: "",
    viewCount: 0,
    postDate: ""
};

const ModifyComponent = ({ bno }) => {
    const [post, setPost] = useState({ ...initState });
    const { moveToList, moveToRead } = useCustomMove();
    const [result, setResult] = useState(null);

    // 게시물 가져오기
    useEffect(() => {
        getOneModify(bno)
            .then((data) => {
                setPost(data ? data : initState);
            })
            .catch((err) => {
                console.error("Error fetching post:", err);
                setPost(initState);
            });
    }, [bno]);

    // 입력 필드 변경 처리
    const handleChangePost = (e) => {
        const { name, value } = e.target;
        setPost((prevData) => ({ ...prevData, [name]: value }));
    };

    // 게시물 수정
    const handleClickModify = () => {
        putOne(post)
            .then((data) => {
                console.log("Modify result:", data);
                setResult("modify");
            })
            .catch((err) => {
                console.error("Error modifying post:", err);
                setResult(null);
            });
    };

    // 게시물 삭제
    const handleClickDelete = () => {
        deleteOne(bno)
            .then((data) => {
                console.log("Delete result:", data);
                setResult("delete");
            })
            .catch((err) => {
                console.error("Error deleting post:", err);
                setResult(null);
            });
    };

    // 모달 닫기 및 이동
    const closeModal = () => {
        setResult(null); // 상태 초기화
        result === "modify" ? moveToRead(bno) : moveToList();
    };

    const fields = [
        { label: "작성자", name: "writer", type: "text", value: post.writer, type : "text", readOnly : true},
        { label: "조회수", name: "viewCount", type: "text", value: post.viewCount, type : "text", readOnly : true},
        { label: "작성일", name: "postDate", type: "date", value : post.postDate, type : "text", readOnly : true},
        { label: "제목", name: "title", type: "text", value : post.title, onChange : handleChangePost }
    ];

    const buttons = [
        {label : '취소', className : 'cancle', onClick : ()=> moveToRead(bno) },
        {label : '수정', className : 'modify', onClick : handleClickModify },
        {label : '삭제', className : 'delete', onClick : handleClickDelete }
    ]

    return (
        <>
            {result && <ResultModal title={"처리 결과"} content={result} cbFn={closeModal} />}
            <ul className="modify item">
                {fields.map((field) => (
                    <LiItem key={field.name} {...field} />
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

export default ModifyComponent;
