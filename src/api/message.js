import request from '@/utils/request'

export async function fetchMessage(page =1,limit=10){
    return request.get('/api/message',{
        params:{
            page,
            limit
        }
    })
}

export async function deleteMessage(id){
    return request.delete(`/api/message/${id}`)
}