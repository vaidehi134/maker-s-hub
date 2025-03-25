const StorageService = {
  saveToken: (token) => {
    localStorage.setItem("auth_token", token);
  },

  getToken: () => {
    return localStorage.getItem("auth_token");
  },

  saveUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", StorageService.getUserRole());
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getUserRole: () => {
    const user = StorageService.getUser();
    const role = user.role === "CLIENT" ? "CLIENT" : "CRAFTER";
    return user ? role : null;
  },

  getUserId: () => {
    const user = StorageService.getUser();
    return user.userId;
  },

  logOut: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    console.log("token : ", StorageService.getToken());
    console.log("user : ", StorageService.getUser());
  },
};

export default StorageService;
