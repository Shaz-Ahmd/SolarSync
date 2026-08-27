import api from "./api";

const authService = {
  login: async (userData) => {
    const response = await api.post("/api/auth/login", userData);

    if (response.data) {
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );
    }

    return response.data;
  },

  logout: () => {
    localStorage.removeItem("user");
  },
};

export default authService;