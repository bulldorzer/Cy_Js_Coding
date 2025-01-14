import jwtAxios from "../util/jwtUtil";

import {API_SERVER_PORT} from './todoApi'

const host = `${API_SERVER_PORT}/api/products`

export const getOne = async (pno) =>{
    const res = await jwtAxios.get(`${host}/list/${pno}`)
    return res.data
}


// 비동기 함수
export const postAdd = async (product) => {

    try {
        const header = { headers: { "Content-Type": "multipart/form-data" } };
        const res = await jwtAxios.post(`${host}/`, product, header);
        console.log("API Response:", res.data); // 응답 데이터 확인
        return res.data;
        
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

export const getList = async (pageParam) =>{

    try {

        const {page, size} = pageParam;
        
        const res = await jwtAxios.get(`${host}/list`, {params : {page, size}});

        return res.data
    } catch(error) {
        console.error(error)
    }
    
}

export const putOne = async (pno,product) => { 
    console.log(pno)
    const res = await jwtAxios.put(`${host}/${pno}`, product)
    return res.data
}


export const deleteOne = async (pno) => { // 삭제할 게시물 번호(tno)만 넘어옴
    const res = await jwtAxios.delete(`${host}/${pno}`)
    return res.data
}
