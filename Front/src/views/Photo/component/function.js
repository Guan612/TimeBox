import router from "@/router";
export const backindex = () => {
    //使用back方法返回上一级
    router.back();
}

export const toupdatecoll = (id) => {
    //使用push方法跳转到指定页面
    router.push({
        path: `/updatecoll/${id}`
    });
}