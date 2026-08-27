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

  // PUT /api/tickets/{ticketId}/assign?technicianId={technicianId}
  assign: (ticketId, technicianId) => {
    return api.put(
      `/api/tickets/${ticketId}/assign?technicianId=${technicianId}`
    );
  },

  // PATCH /api/tickets/{ticketId}/resolve
  resolve: (ticketId) => {
    return api.patch(`/api/tickets/${ticketId}/resolve`);
  },
};

export default ticketService;