import axios from "axios";

const siteService = {
  // GET /api/sites
  getAll: () => {
    return axios.get("/api/sites");
  },

  // GET /api/sites/{id}
  getById: (id) => {
    return axios.get(`/api/sites/${id}`);
  },

  // POST /api/sites
  create: (siteData) => {
    return axios.post("/api/sites", siteData);
  },

  // PUT /api/sites/{id}
  update: (id, siteData) => {
    return axios.put(`/api/sites/${id}`, siteData);
  },

  // DELETE /api/sites/{id}
  delete: (id) => {
    return axios.delete(`/api/sites/${id}`);
  },
};

export default siteService;