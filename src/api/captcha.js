import request from '@/utils/request';

export async function fetchcaptcha(){
    return await request.get("/res/captcha");
}