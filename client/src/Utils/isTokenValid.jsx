export const isTokenValid = () => {
  return localStorage.getItem("token") === "true";
};