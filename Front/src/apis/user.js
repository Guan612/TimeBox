import http from "./index";

export const registerAPI = (userInfo) => {
    return http.post("/users/register", userInfo)
}

export const loginAPI = (userInfo) => {
    return http.post("/users/login", userInfo)
}

export const changePasswordAPI = (userInfo) => {
    return http.post("/users/changepwd", userInfo)
}

export const getUserHanderImgAPI = () => {
    return http.get("/users/gethaderimg")
}