/** In-memory access token store (synced with AuthContext). */
let accessToken = null;
let refreshHandler = null;
let logoutHandler = null;

export const tokenStore = {
  get: () => accessToken,
  set: (token) => {
    accessToken = token;
  },
  clear: () => {
    accessToken = null;
  },
  setRefreshHandler: (fn) => {
    refreshHandler = fn;
  },
  setLogoutHandler: (fn) => {
    logoutHandler = fn;
  },
  refresh: async () => {
    if (refreshHandler) return refreshHandler();
    throw new Error("Auth not initialized");
  },
  logout: () => {
    if (logoutHandler) logoutHandler();
  },
};
