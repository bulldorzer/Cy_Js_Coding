import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react"; // 컴포넌트 로딩 최적화

import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";
import memberRouter from "./memberRouter";
import boardRouter from "./boardRouter";


const Loading = <div>Loding...</div>
const Main = lazy(()=> import( "../pages/MainPage"))
const About = lazy(()=> import( "../pages/AboutPage"))
const TodoIndex = lazy(()=> import( "../pages/todo/IndexPage"))
const ProductsIndex = lazy(()=> import( "../pages/products/IndexPage"))
const BoardIndex = lazy(()=> import( "../pages/board/IndexPage"))


const root = createBrowserRouter([
    {
        path : "",
        element : <Suspense fallback={Loading}><Main/></Suspense>
    }, 
    {
        path : "about",
        element : <Suspense fallback={Loading}><About/></Suspense>
    }, 
    {
        path : "todo",
        element : <Suspense fallback={Loading}><TodoIndex/></Suspense>,
        children : todoRouter()
    }, 
    {
        path : "products",
        element : <Suspense fallback={Loading}><ProductsIndex/></Suspense>,
        children : productsRouter()
    }, 
    {
        path : "board",
        element : <Suspense fallback={Loading}><BoardIndex/></Suspense>,
        children : boardRouter()
    }, 
    {
        path : "member",
        children : memberRouter()
    }


])

export default root;

