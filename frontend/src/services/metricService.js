import api from "./api";

const metricService = {
  // POST /api/metrics/batch
  ingestBatch: (batchData) => {
    return api.post("/api/metrics/batch", batchData);
  },

  // GET /api/metrics/recent
  getRecent: () => {
    return api.get("/api/metrics/recent");
  },

  // GET /api/metrics/analytics
  getEfficiencyReport: () => {
    return api.get("/api/metrics/analytics");
  },
};

export default metricService;