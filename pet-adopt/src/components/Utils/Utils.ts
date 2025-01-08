const isAuth = () => {
  return localStorage.getItem("Authorization") !== null;
};

const getBaseUrl = (withPort: boolean): string => {
  const baseUrl = process.env.REACT_APP_BE_BASE_URL as string;
  if (withPort) {
    const port = process.env.REACT_APP_BE_PORT as string;
    return `${baseUrl}:${port}`;
  }
  return process.env.REACT_APP_BE_BASE_URL as string;
};

const getBaseImagePath = () => {
  return process.env.REACT_APP_BASE_IMAGES_PATH as string;
};

const isAdmin = (): boolean => {
  const roles = localStorage.getItem("roles");
  return roles?.includes("ADMIN") || false;
};

export const Utils = {
  isAuth,
  getBaseUrl,
  getBaseImagePath,
  isAdmin,
};
