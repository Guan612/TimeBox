import http from "./index";

//获取照片列表
export const getPhotoListAPI = ()=>{
    return http.get("/photos");
}

//获取照片集详情
export const getPhotoCollectionAPI = (pCId)=>{
    return http.get(`/photos/${pCId}`);
}

//添加照片集
export const addPhotoCollectionAPI = (data)=>{
    return http.post("/photos",data);
}

//修改照片集
export const updatePhotoCollectionAPI = (pCId,data)=>{
    return http.put(`/photos/${pCId}`,data);
}

//删除照片集
export const deletePhotoCollectionAPI = (pCId)=>{
    return http.delete(`/photos/${pCId}`);
}