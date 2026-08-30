import api from "./api";

const ticketService = {

  // GET /api/tickets
  getAll: () => {
    return api.get("/api/tickets");
  },

  // POST /api/tickets
  create: (ticketData) => {
    return api.post("/api/tickets", ticketData);
  },

  // PUT /api/tickets/{id}/resolve
  resolve: (ticketId) => {
    return api.put(`/api/tickets/${ticketId}/resolve`);
  },

  // PUT /api/tickets/{id}/assign
  assign: (ticketId, technicianId) => {
    return api.put(
      `/api/tickets/${ticketId}/assign`,
      { technicianId }
    );
  },

};

export default ticketService;