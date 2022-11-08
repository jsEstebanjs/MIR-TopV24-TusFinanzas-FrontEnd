import axios from "axios";

export const validateToken = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (err) {
    return false;
  }
};
