import api from "./api";

const siteService = {

  // GET /api/sites
  getAll: () => {
    return api.get("/api/sites");
  },

  // GET /api/sites/{id}
  getById: (id) => {
    return api.get(`/api/sites/${id}`);
  },

  // POST /api/sites
  create: (siteData) => {
    return api.post("/api/sites", siteData);
  },

  // PUT /api/sites/{id}
  update: (id, siteData) => {
    return api.put(`/api/sites/${id}`, siteData);
  },

  // DELETE /api/sites/{id}
  delete: (id) => {
    return api.delete(`/api/sites/${id}`);
  },

};

export default siteService;