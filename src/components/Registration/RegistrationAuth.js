const authenticate = (data, next) => {
  if ((typeof window !== "undefined") && (data.token)) {
    localStorage.setItem("jwt", JSON.stringify(data.token));
    next();
  }
};

// If we are using local storage this is a great way to check if there is a user

//  const isAuthenticated = () => {
//   if (typeof window == "undefined") {
//     return false;
//   }
//   if (localStorage.getItem("jwt")) {
//     return JSON.parse(localStorage.getItem("jwt"));
//   } else {
//     return false;
//   }
// };

const signout = (next) => {
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  next();
};

export default {
  authenticate,
  signout,
};
