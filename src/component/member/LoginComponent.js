import { useState } from "react"
import LiItem from "../common/LiItem"
import {login} from "../../slices/loginSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import {loginPostAsync} from "../../slices/loginSlice"
import ResultModal from "../../component/common/ResultModal"

//const initState = {email : 'user0@aaa.com', pw : '1111'}
const initState = {email : '', pw : ''}



const LoginComponent = () =>{

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loginParam, setLoginParam] = useState({...initState})
    const [result, setResult] = useState(false)

    const fields = [
        {label : "Email", name : "email", value : loginParam.email },
        {label : "Password", name : "pw", value : loginParam.pw, type :"password" }
    ]

    const modalMsg = {
        success : {title : '로그인 성공', content : '메인 페이지로 이동', cbFn : ()=>navigate({pathname:'/'})},
        fail : {title : '로그인 실패', content : '아이디/비밀번호 확인', cbFn : ()=>setResult(false)}
    }

    const handleClickLogin = (e) => {
        // dispatch(login(loginParam)) 
        // unwrap - 로그인 처리후 결과값 받아 확인
        dispatch(loginPostAsync(loginParam))
        .unwrap()
        .then(data =>{
            console.log("after unwrap....")

            if(data.error){
                setResult('fail')
                setLoginParam(initState)
            }else {
                setResult('success')
            }
        }) 
        
    }


    // input바뀌면 state 실시간으로 업데이트 반영
    const handleChange = e => {
        const {name, value} = e.target
        setLoginParam(prevData =>({...prevData, [name] : value}))
    }

    return (
        <>
            { result && <ResultModal {...modalMsg[result]} />}
            <ul>
                {
                    fields.map( ({label, name, value, type}) =>
                        (<LiItem key={name}
                            name={name}
                            label={label}
                            type={type}
                            value={value} 
                            onChange={handleChange}
                        />
                    ))
                    
                }
            </ul>
            <div className="btnGroup" style={{textAlign : 'left'}}>
                <button type="button" className="btn" onClick={handleClickLogin}>로그인</button>
            </div>
        </>
        
    )

}

export default LoginComponent;