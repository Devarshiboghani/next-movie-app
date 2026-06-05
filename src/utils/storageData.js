export const getStorageData = () => {
  try {
    return JSON.parse(sessionStorage.getItem("movies")) || [];
  } catch {
    return [];
  }
};

export const setStorageData = (data) => {
  try {
    sessionStorage.setItem("movies", JSON.stringify(data));
  } catch {}
};
