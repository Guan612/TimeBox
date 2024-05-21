import http from "./index";

//获取照片列表
export const getPhotoListAPI = () => {
    return http.get("/photos");
}

//获取照片集详情
export const getPhotoCollectionAPI = (pCId) => {
    return http.get(`/photos/${pCId}`);
}

//添加照片集
export const addPhotoCollectionAPI = (data) => {
    return http.post("/photos", data);
}

//修改照片集
export const updatePhotoCollectionAPI = (pCId, data) => {
    return http.put(`/photos/${pCId}`, data);
}

//删除照片集
export const deletePhotoCollectionAPI = (pCId) => {
    return http.delete(`/photos/${pCId}`);
}
//添加照片集照片
export const addPhotoCollectionPhotoAPI = (data) => {
    return http.post("/photos/clphoto/", data);
}

//删除照片集照片
export const deletePhotoCollectionPhotoAPI = (pId) => {
    return http.delete(`/photos/clphoto/${pId}`);
}

//上传照片
export const uploadPhotoAPI = (data) => {
    return http.post("/photos/upload", data,{
        Headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

//删除照片
export const deletePhotoAPI = (pId) => {
    return http.delete(`/photos/photo/${pId}`);
}

//搜索照片集
export const searchPhotoCollectionAPI = (keyword) => {
    return http.get(`/photos/search?keyword=${keyword}`);
}

//照片集照片上传人
export const uploaderAPI = (pCId) => {
    return http.get(`/photos/${pCId}/owner`);
}

//查找本人照片
export const findMyPhotoAPI = () => {
    return http.get('/photos/myphoto');
}

//查找本人照片集
export const findMyPhotoCollAPI = () => {
    return http.get('/photos/mycoll');
}

//筛选照片
export const filterPhotoAPI = (data) => {
    return http.get("/photos/photoseleter",data)   
}