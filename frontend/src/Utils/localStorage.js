export const localStorageHandler = () => {
  const getTokenLocalStorage = () => {
    const myToken = localStorage.getItem("adminToken")
      ? localStorage.getItem("adminToken")
      : "";

    return myToken;
  };

  const setTokenLocalStorage = (token) => JSON.stringify(localStorage.setItem("adminToken", token));

  const removeTokenLocalStorage = () => localStorage.removeItem("adminToken");

  return {
    getTokenLocalStorage,
    setTokenLocalStorage,
    removeTokenLocalStorage,
  };
};
