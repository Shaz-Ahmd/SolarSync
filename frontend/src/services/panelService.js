import axios from "axios";

const panelService = {
  // GET /api/panels/site/{siteId}
  getBySite: (siteId) => {
    return axios.get(`/api/panels/site/${siteId}`);
  },

  // GET /api/panels/{id}
  getById: (id) => {
    return axios.get(`/api/panels/${id}`);
  },

  // POST /api/panels
  createPanel: (panelData) => {
    return axios.post("/api/panels", panelData);
  },

  // PUT /api/panels/{id}
  updatePanel: (id, panelData) => {
    return axios.put(`/api/panels/${id}`, panelData);
  },

  // DELETE /api/panels/{id}
  deletePanel: (id) => {
    return axios.delete(`/api/panels/${id}`);
  },
};

export default panelService;