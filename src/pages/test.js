import { useEffect, useState } from "react";
import BasicLayout from "../layout/BasicLayout";

function AboutPage (){

    // input + state 같이 사용할 때 ( state값을 input에 실시간 반영하고 싶을 때)
    // ㄴ onChange 이벤트 = 값을 실시간으로 업데이트해서 반영하는 함수를 작성해라
    const [pno, setPno] = useState(0)
    const [arr, setArr] = useState([1,2,3])
    const [obj, setObj] = useState( { title : 'test', age : 0})

    const handleChange = (e)=>{
        const {name, value} = e.target
        
        setPno(() => { return value } ) 

        setArr(prevData =>{
            prevData.map((item, i) => (i===index) ? value : item )
        })
  
        setObj( prevData =>{ // 매개변수 : 최신 state 상태
            const copy = {...prevData}
            copy[name] = value; // 줄이면  {...prevData, [name] : value}
            return copy
        })

        
    }

    // useEffect 
    useEffect(()=>{
        
        const timer = setInterval(()=>{
            console.log(`${pno}값 - 3초 무한반복`)
        }, 3000)

        return ()=>{
            console.log('이전 작업 청소!')
            clearInterval(timer)
        }

    },[pno])

    return(
        <BasicLayout>
            <div className="mainPage">
                <h2>About Page</h2>
                <p>값 <input value={pno} onChange={handleChange}/></p>

                <p>이름<input name="title" value={obj.title} onChange={handleChange}/></p>
                
                <p>나이<input name="age" value={obj.age} type="number" onChange={handleChange}/></p>
                
                
            </div>
        </BasicLayout>
    )

}

export default AboutPage;


            // 배열 함수 : push()-마지막 추가, unshift() - 첫번째 값 추가 / splice() : 특정위치에 추가
            // splice( 삽입할 인덱스위치, 삭제할갯수, 삽입할 값들)
