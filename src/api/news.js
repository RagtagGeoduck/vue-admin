import {service} from "@/utils/request.js"

/*
    列表
*/

/*
    新增
*/

/*
    编辑
*/

/*
    删除
*/

/*
    添加一级分类
*/
export function addFirstCategory(data){
    return service.request({
        method: "post",
        url:"/news/addFirstCategory/",
        data
    })
}