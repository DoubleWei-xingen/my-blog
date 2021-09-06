import request from '@/utils/request'

export async function fetchBanner(){
    return await request.get('/api/banner')
}