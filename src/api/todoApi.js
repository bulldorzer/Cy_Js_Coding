import jwtAxios from "../util/jwtUtil";

export const API_SERVER_PORT = "http://localhost:8081";

const prefix = `${API_SERVER_PORT}/api/todo`;

// 책 - 131p
// Read(상세) 페이지 데이터
export const getOne = async (tno) =>{
    try {
        const res = await jwtAxios.get(`${prefix}/list/${tno}`)
        return res.data
    } catch(error){
        console.log(error)
    }
    
}

// List 페이지 데이터
// http://localhost:3000/todo/list?page=1&size=10
export const getList = async (pageParam) =>{

    try {
        const {page, size} = pageParam
        const res = await jwtAxios.get(`${prefix}/list`, {params: { page, size}})
        // 쿼리스트링 생성 : {params: { page, size} --> /list?page=1&size=10
        return res.data
    } catch(error){
        console.log(error)
    }
    
}

// 책162p - 추가기능
export const postAdd = async (todo) =>{
    const res = await jwtAxios.post( `${prefix}/`, todo)
    return res.data
}

// 수정 -> 177p(중간)- ModifyComponent 수정
export const putOne = async (todo) => { // 객체 정보 전부다 넘어옴
    const res = await jwtAxios.put(`${prefix}/${todo.tno}`, todo)
    return res.data
}


// 책 170P 
// 삭제 -> 177p(2/3지점) - ModifyComponent 수정
export const deleteOne = async (tno) => { // 삭제할 게시물 번호(tno)만 넘어옴
    const res = await jwtAxios.delete(`${prefix}/${tno}`)
    return res.data
}












