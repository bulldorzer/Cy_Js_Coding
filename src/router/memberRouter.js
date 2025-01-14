import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>

const Login = lazy(()=> import( '../pages/member/LoginPage'))
const Cart = lazy(()=> import( '../pages/member/CartPage'))
const MyPage = lazy(()=> import( '../pages/member/MyPage'))

const memberRouter = () => {
    return [
        {
            path : "",
            element : <Navigate replace to="login"/>
        },
       {
            path : "login",
            element : <Suspense fallback={Loading}><Login/></Suspense>
        },
        {
            path : "logout",
            element : <Navigate replace to="login"/>
        },
        {
            path : "cart",
            element : <Suspense fallback={Loading}><Cart/></Suspense>
        },
        {
            path : "mypage",
            element : <Suspense fallback={Loading}><MyPage/></Suspense>
        }
    ]
}

export default memberRouter;