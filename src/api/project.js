import request from '@/utils/request'

// 获取所有的项目
export async function fetchProject(){
    return request.get('/api/project')
}

// 修改项目
export async function reviseProject(id,data){
    return request.put(`/api/project/${id}`,data)
}

// 添加项目 
export async function addProjiect(data){
    return request.post('/api/project',data)
}

// 删除项目
export async function deleteProject(id){
    return request.delete(`/api/project/${id}`)
}