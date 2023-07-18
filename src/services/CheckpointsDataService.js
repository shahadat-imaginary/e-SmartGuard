import http from "../axios/http-common";

class CheckpointsDataService {
  getAll() {
    return http.get("/checkpoints");
  }

  get(id) {
    return http.get(`/checkpoints/${id}`);
  }

  create(data) {
    return http.post("/checkpoints", data);
  }

  update(id, data) {
    return http.put(`/checkpoints/${id}`, data);
  }

  delete(id) {
    return http.delete(`/checkpoints/${id}`);
  }

  deleteAll() {
    return http.delete(`/checkpoints`);
  }

  findByTitle(title) {
    return http.get(`/checkpoints?title=${title}`);
  }
}

export default new CheckpointsDataService();
