import request from '@/utils/request'


/**
 *发布 
 * */ 
export async function publishBlog(data) {
    return await request.post('/api/blog', data)
}

/**
 * 修改
 * */ 
export async function reviseBlog({id,data}) {
    console.log(id,data)
    return await request.put(`/api/blog/${id}`,data)
}

/**
 * 删除
 * */ 
export async function deleteBlog(id) {
    return await request.delete(`/api/blog/${id}`)
}

/**
 * 分页获取
 * **/ 
export async function fetchallBlog(page = 1, limit = 10, categoryId = -1) {
    return await request.get('/api/blog', {
        params: {
            page,
            limit,
            categoryId
        }
    })
}

/**
 * 查询单个博客
 * */ 
export async function fecthBlog(id) {
    return await request.get(`/api/blog/${id}`)
}

