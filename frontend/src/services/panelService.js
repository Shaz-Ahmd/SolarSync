import axios from "axios";

const panelService = {

  getBySite: (siteId) => {
    return axios.get(
      `/api/panels/site/${siteId}`
    );
  },

  getById: (id) => {
    return axios.get(
      `/api/panels/${id}`
    );
  },

  createPanel: (panelData) => {
    return axios.post(
      "/api/panels",
      panelData
    );
  },

  updatePanel: (id, panelData) => {
    return axios.put(
      `/api/panels/${id}`,
      panelData
    );
  },

  deletePanel: (id) => {
    return axios.delete(
      `/api/panels/${id}`
    );
  },

};

export default panelService;