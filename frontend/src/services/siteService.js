import axios from "axios";

const siteService = {

  getAll: () => {
    return axios.get("/api/sites");
  },

  getById: (id) => {
    return axios.get(`/api/sites/${id}`);
  },

  create: (siteData) => {
    return axios.post("/api/sites", siteData);
  },

  update: (id, siteData) => {
    return axios.put(`/api/sites/${id}`, siteData);
  },

  delete: (id) => {
    return axios.delete(`/api/sites/${id}`);
  },

};

export default siteService;