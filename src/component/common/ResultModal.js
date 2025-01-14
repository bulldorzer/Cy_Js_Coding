// cbFn : CallBackFunction
const ResultModal = ({title, content, cbFn}) => {

    const handleClick = ()=>{ 
        if(cbFn) cbFn()
        
    }

    return(
        <div onClick={handleClick} className="result modal">
            <h2>{title}</h2>
            <p>{content}</p>
            <button className="btn" onClick={handleClick}>닫기</button>
        </div>
    )

}

export default ResultModal;