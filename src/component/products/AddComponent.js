
import { useRef, useState } from "react";
import { postAdd } from '../../api/productsApi'

import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";

import useCustomMove from "../../hook/useCustomMove"

const initState = {
    pname : '',
    pdesc : '',
    price : 0,
    files : []
}

const AddComponent = () =>{

    const uploadRef = useRef() // getElementById()
    const {moveToList} = useCustomMove();
    
    const [product, setProduct] = useState({...initState})
    const [fetching, setFetching] = useState(false)
    const [result, setResult] = useState(null)

    const acceptFiles = ".jpg,.jpeg,.gif,.bmp,.png";

    const handleChangeProduct = (e)=>{
        const {name, value} = e.target
        setProduct( prevItem => ({...prevItem, [name] : value}) )
    }


    const handleClickAdd = async (e) => {

        setFetching(true)
        
        const files = uploadRef.current.files
        const formData = new FormData();
        console.log(fetching)

        // 첨부파일 정보 읽어서 저장
        for( const file of files){
            formData.append("files", file)
        }

        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.price)

        formData.forEach( (v, k)=> console.log(k, v) )

        await postAdd(formData).then(data =>{
            setFetching(false)
            setResult(data.result)
        }); // product로 받음, 앞에 순서 끝나고 나 처리

    }

    const closeModal = () => {
        setResult(null);
        moveToList({page:1})
    }

    return (
        <>
            { fetching && <FetchingModal/>}
            { result && <ResultModal
                title={'Product Add Result'}
                content={`${result}번 등록 완료`}
                cbFn={closeModal}
                />}
            <ul>
                <li>
                    <span>Prodcut Name</span>
                    <span>
                        <input 
                            name="pname"
                            type="text"
                            value={product.pname}
                            onChange={handleChangeProduct}
                            
                        />
                    </span>
                </li>
                <li>
                    <span>Description</span>
                    <span>
                        <textarea 
                            name="pdesc"
                            value={product.pdesc}
                            rows="4"
                            onChange={handleChangeProduct}
                        >{product.pdesc}</textarea>
                    </span>
                </li>
                <li>
                    <span>Price</span>
                    <span>
                        <input
                            name="price"
                            type="number"
                            value={product.price}
                            onChange={handleChangeProduct}
                        />
                    </span>
                </li>
                <li>
                    <span>Files</span>
                    <span>
                        <input
                            ref={uploadRef}
                            name="files"
                            type="file"
                            multiple={true}
                            accept={acceptFiles}
                        />
                    </span>
                </li>
            </ul>
            <div className="btnGroup">
                <button type="button" className="btn" >목록</button>
                <button type="button" className="btn" onClick={handleClickAdd}>등록</button>
            </div>

        </>
    )
}

export default AddComponent;
