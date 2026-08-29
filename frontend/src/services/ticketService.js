import axios from "axios";

const ticketService = {
  // GET /api/tickets
  getAll: () => {
    return axios.get("/api/tickets");
  },

  // POST /api/tickets
  create: (ticketData) => {
    return axios.post("/api/tickets", ticketData);
  },

  // PUT /api/tickets/{id}/resolve
  resolve: (ticketId) => {
    return axios.put(`/api/tickets/${ticketId}/resolve`);
  },

  // PUT /api/tickets/{id}/assign
  assign: (ticketId, technicianId) => {
    return axios.put(
      `/api/tickets/${ticketId}/assign`,
      { technicianId }
    );
  },
};

export default ticketService;