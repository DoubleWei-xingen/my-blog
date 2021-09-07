import request from '@/utils/request'

export async function fetchBanner(){
    return await request.get('/api/banner')
}

export async function setBanner(data){
    return await request.post('/api/banner',data);
}