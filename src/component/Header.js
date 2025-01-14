
import BasicMenu from "./BasicMenu";
import UtilMenu from "./UtilMenu";

function Header(){

    return (
        <header className="header">
            <h1 className='logo'>Blog</h1>
            <BasicMenu/>
            <UtilMenu/>
        </header>
    )
}

export default Header;