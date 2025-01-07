const isAuth = () => {
  return localStorage.getItem("Authorization") !== null;
};

export const Utils = {
  isAuth,
};
