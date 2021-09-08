import request from '@/utils/request'

/**
 * 添加分类
 * */ 
export async function addBlogType(data){
    return await request.post('/api/blogtype',data)
}

/**
 * 修改分类
 * */ 
export async function reviseBlog({id,data}){
    return await request.put(`/api/blogtype/${id}`,data)
}

/**
 * 删除分类
 * */ 
export async function deleteBlog(id){
    return await request.delete(`/api/blogtype/${id}`)
}

export async function getBlogType(){
    return await request.get('/api/blogtype')
}

export async function getOneBlogType(id){
    return await request.get(`/api/blogtype/${id}`)
}

