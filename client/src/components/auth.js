export const checkAuthentication = async () => {
  try {
    // Construct the URL with the UserId query parameter

    const token = localStorage.getItem("token");
    const urlWithUserId = new URL(`${window.ENVIRONMENT.api}/`);

    const response = await fetch(`${urlWithUserId}`, {
      method: "GET",
      mode: "cors", // Ensure that CORS is enabled on your Express server
      credentials: "include", // Include credentials such as cookies
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Specify the content type of the request body
      },
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