import http from "../axios/http-common";

class ReportsDataService {
  getAll() {
    return http.get("/reports");
  }

  get(id) {
    return http.get(`/reports/${id}`);
  }

  create(data) {
    return http.post("/reports", data);
  }

  update(id, data) {
    return http.put(`/reports/${id}`, data);
  }

  delete(id) {
    return http.delete(`/reports/${id}`);
  }

  deleteAll() {
    return http.delete(`/reports`);
  }

  findByTitle(title) {
    return http.get(`/reports?title=${title}`);
  }
}

export default new ReportsDataService();
