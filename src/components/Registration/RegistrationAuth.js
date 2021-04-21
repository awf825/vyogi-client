export const authenticate = (data, next) => {
  if (typeof window !== "undefined" && data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("_id", data._id);
    localStorage.setItem("email", data.email);
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") localStorage.clear();
  next();
};
