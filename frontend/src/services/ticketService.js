import axios from "axios";

const ticketService = {

  getAll: () => {
    return axios.get(
      "/api/tickets"
    );
  },

  create: (ticketData) => {
    return axios.post(
      "/api/tickets",
      ticketData
    );
  },

  resolve: (ticketId) => {
    return axios.put(
      `/api/tickets/${ticketId}/resolve`
    );
  },

  assign: (
    ticketId,
    technicianId
  ) => {
    return axios.put(
      `/api/tickets/${ticketId}/assign`,
      { technicianId }
    );
  },

};

export default ticketService;