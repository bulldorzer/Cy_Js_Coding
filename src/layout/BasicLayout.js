import Header from "../component/Header"

const BasicLayout = ({children}) => {
    return(
        <>
            <Header/>
            <div className="container">
                <main className="contentWrap">{children}</main>
            </div>
        </>
    )
}

export default BasicLayout;