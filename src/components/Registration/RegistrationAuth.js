export const authenticate = (data, next) => {
  if (typeof window !== "undefined" && data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("_id", data._id);

    next();
  }
};

// If we are using local storage this is a great way to check if there is a user

//  const isAuthenticated = () => {
//   if (typeof window == "undefined") {
//     return false;
//   }
//   if (localStorage.getItem("token")) {
//     return JSON.parse(localStorage.getItem("token"));
//   } else {
//     return false;
//   }
// };

export const signout = (next) => {
  if (typeof window !== "undefined") localStorage.clear();
  alert("You have signed out");
  next();
};
