import api from "./api";

const panelService = {
  // GET /api/panels/site/{siteId}
  getBySite: (siteId) => {
    return api.get(`/api/panels/site/${siteId}`);
  },

  // GET /api/panels/{id}
  getById: (id) => {
    return api.get(`/api/panels/${id}`);
  },

  // POST /api/panels
  createPanel: (panelData) => {
    return api.post("/api/panels", panelData);
  },

  // PUT /api/panels/{id}
  updatePanel: (id, panelData) => {
    return api.put(`/api/panels/${id}`, panelData);
  },

  // DELETE /api/panels/{id}
  deletePanel: (id) => {
    return api.delete(`/api/panels/${id}`);
  },
};

export default panelService;