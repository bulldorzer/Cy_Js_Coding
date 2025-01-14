import { Link } from "react-router-dom"

const PageConponent = ({serverData, movePage}) =>{

    
    const movePrevPage = ()=> movePage( {page : serverData.prevPage} )//이전 페이지 블록 이동
    const moveNextPage = ()=> movePage( {page : serverData.nextPage} )//다음 페이지 블록 이동

    return (
        <div className="pagination">
            { serverData.prev && <button type="button" onClick={movePrevPage}>Prev</button> }
            <span className="pageNumList">
                {
                    serverData.pageNumList.map( pageNum =>
                        <Link 
                            key={pageNum} 
                            onClick={ ()=> movePage( {page : pageNum} )}
                            className="pageNum"
                        >{pageNum}</Link>
                    )
                }
            </span>
            { serverData.next && <button type="button"onClick={moveNextPage}>Next</button> }
        </div>
    )
}

export default PageConponent;