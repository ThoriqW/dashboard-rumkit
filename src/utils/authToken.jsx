import Cookies from "js-cookie";

export const authToken = () => {
  const savedAuth = Cookies.get("auth");
  if (savedAuth) {
    const { expiresAt } = JSON.parse(savedAuth);
    if (Date.now() > expiresAt) {
      Cookies.remove("auth");
    }
  }
};
