import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const BasicMenu = ()=>{

    const loginState = useSelector(state => state.loginSlice)

    return(
        <nav className="gnb">
            <Link to={"/"}>home</Link>
            <Link to={"/about"}>about</Link>
            {
                // loginState.email && 
                    <>
                        <Link to={"/todo"}>todo</Link>
                        <Link to={"/products"}>products</Link>
                        <Link to={"/board"}>고객게시판</Link>
                    </>
            }
        </nav>
    )
}

export default BasicMenu;