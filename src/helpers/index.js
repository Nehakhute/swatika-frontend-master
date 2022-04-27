export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("authToken");
  return token;
};
