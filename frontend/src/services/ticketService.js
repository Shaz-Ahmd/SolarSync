import api from "./api";

const ticketService = {

  /*
   * GET ALL TICKETS
   */
  getAll: () => {
    return api.get("/api/tickets");
  },

  /*
   * CREATE / REPORT TICKET
   */
  create: (ticketData) => {
    return api.post(
      "/api/tickets",
      ticketData
    );
  },

  /*
   * START WORK
   *
   * Technician uses this when actually beginning
   * maintenance work.
   */
  startWork: (ticketId) => {
    return api.patch(
      `/api/tickets/${ticketId}/start`
    );
  },

  /*
   * RESOLVE TICKET
   *
   * Technician uses this after completing the work.
   */
  resolve: (ticketId) => {
    return api.patch(
      `/api/tickets/${ticketId}/resolve`
    );
  },

  /*
   * ASSIGN TECHNICIAN
   *
   * Admin only.
   */
  assign: (ticketId, technicianId) => {
    return api.put(
      `/api/tickets/${ticketId}/assign`,
      null,
      {
        params: {
          technicianId,
        },
      }
    );
  },

};

export default ticketService;