export const getTokenFromLocalStorage = () => {
  const tokenData = localStorage.getItem("token");
  if (tokenData) {
    const token = JSON.stringify(tokenData);
    return token;
  } else {
    return null;
  }
};
