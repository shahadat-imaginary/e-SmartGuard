import http from "../axios/http-common";

class SupervisorsDataService {
  getAll() {
    return http.get("/supervisors");
  }

  get(id) {
    return http.get(`/supervisors/${id}`);
  }

  create(data) {
    return http.post("/supervisors", data);
  }

  update(id, data) {
    return http.put(`/supervisors/${id}`, data);
  }

  delete(id) {
    return http.delete(`/supervisors/${id}`);
  }

  deleteAll() {
    return http.delete(`/supervisors`);
  }

  findByTitle(title) {
    return http.get(`/supervisors?title=${title}`);
  }
}

export default new SupervisorsDataService();
