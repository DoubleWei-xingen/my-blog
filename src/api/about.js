import request from '@/utils/request'

export async function reviseAboutUrl({url}){
    return await  request.post('/api/about',{
        body:{
            url
        }
    })
}

export async function fetchAboutUrl(){
    return await request.get('/api/about')
}