import axios from "axios";

export const validateToken = async () => {
  try {
    const res = await axios.get("http://localhost:8080/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (err) {
    return false;
  }
};
