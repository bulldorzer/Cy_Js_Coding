import { useEffect, useState } from "react";
import useCustomMove from '../../hook/useCustomMove';
import PageComponent from "../common/PageComponent";
import { getList } from '../../api/boardApi';
import useCustomLogin from "../../hook/useCustomLogin"
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../common/ButtonGroup";

const initData = {
    bno: 0,
    title: '',
    writer: '',
    viewCount: 0,
    postDate: '',
    complete: false,
};

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 2,
    prevPage: 0,
    nextPage: 0,
    totalPage: 1,
    current: 1,
};

const ListComponent = ({ bno }) => {
    const { page, size, moveToList, moveToRead } = useCustomMove();

    const [serverData, setServerData] = useState(initState);

    const {exceptionHandel} = useCustomLogin()

    const navigate = useNavigate()
    const handleClickAdd = ()=> navigate({pathname : '/board/add'})

    useEffect(() => {
        getList({ page, size })
            .then((data) => setServerData(data || initState))
            .catch((err) => exceptionHandel);
    }, [page, size]);

    const handleKeyDown = (event, bno) => {
        if (event.key === "Enter" || event.key === " ") {
            moveToRead(bno);
        }
    };

    const buttons = [
        {label : '글쓰기', className : 'add', onClick : handleClickAdd }
    ]

    return (
        <>
            <ul className="list">
                <li className="header">
                    <span className="bno">No.</span>
                    <span className="title">제목</span>
                    <span className="writer">작성자</span>
                    <span className="viewCount">조회수</span>
                    <span className="postDate">작성일</span>
                </li>
                {serverData.dtoList.map((post) => (
                    <li
                        key={post.bno}
                        onClick={() => moveToRead(post.bno)}
                        onKeyDown={(e) => handleKeyDown(e, post.bno)}
                        tabIndex={0}
                    >
                        <span className="bno">{post.bno}</span>
                        <span className="title">{post.title}</span>
                        <span className="writer">{post.writer}</span>
                        <span className="viewCount">{post.viewCount || 0}</span>
                        <span className="postDate">{post.postDate}</span>
                    </li>
                ))}
            </ul>
            <PageComponent serverData={serverData} movePage={moveToList} />
            <ButtonGroup buttons={buttons}/>
            
        </>
    );
};

export default ListComponent;
