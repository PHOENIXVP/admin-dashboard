const login = async (username, password) => {
  try {
    const response = await API.post("/login", { username, password });
    localStorage.setItem("accessToken", response.data.accessToken);
    alert("Logged in!");
  } catch (err) {
    console.error("Login failed", err);
  }
};

const logout = async () => {
  try {
    await API.post("/logout");
    localStorage.removeItem("accessToken");
    alert("Logged out!");
  } catch (err) {
    console.error("Logout failed", err);
  }
};