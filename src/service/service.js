import http from './config'
const service = {
    create_service: (data)=> http.post("/service",data),
    getall:()=>http.get("/service/all",{ params: { page: 1, limit: 100 } } ),
    get:(params)=>http.get("/service/all" , {params}),
    delete: (id)=> http.delete("service", {params:{id}}),
    update: (data)=> http.put(`service`, data),
}
export default service