import api from "./api";

const panelService = {

  getBySite: (siteId) => {
    return api.get(`/api/panels/site/${siteId}`);
  },

  getById: (id) => {
    return api.get(`/api/panels/${id}`);
  },

  createPanel: (panelData) => {
    return api.post("/api/panels", panelData);
  },

  updatePanel: (id, panelData) => {
    return api.put(`/api/panels/${id}`, panelData);
  },

  deletePanel: (id) => {
    return api.delete(`/api/panels/${id}`);
  },

};

export default panelService;