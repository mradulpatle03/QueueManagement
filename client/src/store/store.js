import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// load persisted user from localStorage (if any)
const persistedUser = (() => {
  try {
    const raw = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!raw || !token) return undefined;
    return { user: JSON.parse(raw), token };
  } catch (e) {
    return undefined;
  }
})();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: persistedUser ? { user: persistedUser.user, token: persistedUser.token } : { user: null, token: null },
  },
});
