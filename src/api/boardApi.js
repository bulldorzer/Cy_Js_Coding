import jwtAxios from "../util/jwtUtil";

export const API_SERVER_PORT = "http://localhost:8080";

const prefix = `${API_SERVER_PORT}/api/board`;

export const getOneView = async (bno) =>{
    try {
        const res = await jwtAxios.get(`${prefix}/list/${bno}?incrementView=true`)
        console.log(res.data)
        return res.data
    } catch(error){
        console.log(error)
    }
    
}

export const getOneModify = async (bno) =>{
    try {
        const res = await jwtAxios.get(`${prefix}/list/${bno}?incrementView=false`)
        console.log(res.data)
        return res.data
    } catch(error){
        console.log(error)
    }
    
}

export const getList = async (pageParam) =>{

    try {
        const {page, size} = pageParam
        const res = await jwtAxios.get(`${prefix}/list`, {params: { page, size}})
        return res.data
    } catch(error){
        console.log(error)
    }
    
}

export const postAdd = async (board) =>{
    const res = await jwtAxios.post( `${prefix}/`, board)
    return res.data
}

export const putOne = async (board) => { 
    const res = await jwtAxios.put(`${prefix}/${board.bno}`, board)
    return res.data
}


export const deleteOne = async (bno) => { // 삭제할 게시물 번호(bno)만 넘어옴
    const res = await jwtAxios.delete(`${prefix}/${bno}`)
    return res.data
}












