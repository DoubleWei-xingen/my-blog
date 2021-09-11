import request from '@/utils/request'

export async function fetchComments(page =1,limit=10,blogid=-1){
    return request.get('/api/comment',{
        params:{
            page,
            limit,
            blogid
        }
    })
}

export async function deleteComments(id){
    return request.delete(`/api/comment/${id}`)
}