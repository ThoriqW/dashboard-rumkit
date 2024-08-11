import Cookies from "js-cookie";

export const authToken = async () => {
  const savedAuth = Cookies.get("auth");
  if (savedAuth != undefined) {
    const { expiresAt } = await JSON.parse(savedAuth);
    if (Date.now() > expiresAt) {
      Cookies.remove("auth");
      window.location.reload();
    }
  } else {
    window.location.reload();
  }
};
