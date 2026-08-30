import api from "./api";

const ticketService = {

  getAll: () => {
    return api.get("/api/tickets");
  },

  create: (ticketData) => {
    return api.post("/api/tickets", ticketData);
  },

  resolve: (ticketId) => {
    return api.put(`/api/tickets/${ticketId}/resolve`);
  },

  assign: (ticketId, technicianId) => {
    return api.put(
      `/api/tickets/${ticketId}/assign`,
      { technicianId }
    );
  },

};

export default ticketService;