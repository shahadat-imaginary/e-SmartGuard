import http from "../axios/http-common";

class RoutecheckpointsDataService {
  getAll() {
    return http.get("/routecheckpoints");
  }

  get(id) {
    return http.get(`/routecheckpoints/${id}`);
  }

  create(data) {
    return http.post("/routecheckpoints", data);
  }

  update(id, data) {
    return http.put(`/routecheckpoints/${id}`, data);
  }

  delete(id) {
    return http.delete(`/routecheckpoints/${id}`);
  }

  deleteAll() {
    return http.delete(`/routecheckpoints`);
  }

  findByTitle(title) {
    return http.get(`/routecheckpoints?title=${title}`);
  }
}

export default new RoutecheckpointsDataService();
