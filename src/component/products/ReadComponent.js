import { useEffect, useState } from "react"
import {getOne} from "../../api/productsApi";
import {API_SERVER_PORT} from '../../api/todoApi'

import useCustomMove from '../../hook/useCustomMove'
import LiItem from '../../component/common/LiItem'


const host = API_SERVER_PORT;

// 초기값 객체
const initState = { 
    ptno : 0,  
    pname : '', 
    pdesc : '', 
    price : '',
    delFlag : true, 
    uploadFileNames : []
}

const ReadComponent = ({pno})=>{

    const [product, setProduct] = useState(initState)

    useEffect(()=>{
        getOne(pno).then( data =>{
            
            setProduct( () => data ? data : initState )
        })
    }, [pno])


    const {moveToList, moveToModify} = useCustomMove();

    const fields = [
        {label : 'Name', name : 'pname' },
        {label : 'Price', name : 'price'},
        {label : 'Description', name : 'pdesc'},
    ]

    return (
        <>
            <ul className="read item">
                {
                    fields.map(({label, name })=> {
                        
                        let data = product[name];
                        
                        return (
                            <LiItem 
                                key={name}  
                                label={label}
                                name={name}
                                value={data}
                                readOnly={true}
                            />
                    )}) 
                }

                <li>
                {
                    product.uploadFileNames.map((imgFile, i)=>(
                        <span key={i}>
                            <img src={`${host}/api/products/view/s_${imgFile}`} />
                        </span>
                    ))
                }
                </li>
            </ul>
            <div className="btnGroup">
                <button type="button" className="btn" onClick={()=>{ moveToList() }}>목록</button>
                <button type="button" className="btn" onClick={()=>{ moveToModify(pno) }}>수정</button>
            </div>
        </>
    )
}


export default ReadComponent;



