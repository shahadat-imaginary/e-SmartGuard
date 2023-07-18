import http from "../axios/http-common";

class GuardsDataService {
  getAll() {
    return http.get("/guards");
  }

  get(id) {
    return http.get(`/guards/${id}`);
  }

  create(data) {
    return http.post("/guards", data);
  }

  update(id, data) {
    return http.put(`/guards/${id}`, data);
  }

  delete(id) {
    return http.delete(`/guards/${id}`);
  }

  deleteAll() {
    return http.delete(`/guards`);
  }

  findByTitle(title) {
    return http.get(`/guards?title=${title}`);
  }
}

export default new GuardsDataService();
