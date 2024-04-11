export const checkAuthentication = async () => {
  try {
    const response = await fetch(`${window.ENVIRONMENT.api}/`, {
      method: "GET",
      mode: "cors",
      credentials: "include", // Include credentials such as cookies
    });

    const responseJSON = await response.json();
    if (response.ok && responseJSON.isAuthenticated) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};
