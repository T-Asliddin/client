import http from "./config";
const client = {
  get: (params) => http.get("/client/all", { params }),
  delete: (params)=> http.delete("client", {params}),
  
};
export default client;