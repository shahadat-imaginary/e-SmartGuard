import http from "../axios/http-common";

class PatrolsDataService {
  getAll() {
    return http.get("/patrols");
  }

  get(id) {
    return http.get(`/patrols/${id}`);
  }

  create(data) {
    return http.post("/patrols", data);
  }

  update(id, data) {
    return http.put(`/patrols/${id}`, data);
  }

  delete(id) {
    return http.delete(`/patrols/${id}`);
  }

  deleteAll() {
    return http.delete(`/patrols`);
  }

  findByTitle(title) {
    return http.get(`/patrols?title=${title}`);
  }
}

export default new PatrolsDataService();
