import api from "./api";

const siteService = {
  // GET /api/sites
  getAll: () => {
    return api.get("/api/sites");
  },

  // POST /api/sites
  create: (siteData) => {
    return api.post("/api/sites", siteData);
  },

  // GET /api/sites/{id}
  getById: (id) => {
    return api.get(`/api/sites/${id}`);
  },
};

export default siteService;