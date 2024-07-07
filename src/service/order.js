import http from "./config";
const order = {
  create_order: (data) => http.post("/order", data),
  getall: () => http.get("/order/all",{ params: { page: 1, limit: 100 } }),
  get: (params) => http.get("/order/all", { params }),
  delete: (id)=> http.delete("order", {params:{id}}),
  update: (data)=> http.put(`order`, data),

};
export default order;
