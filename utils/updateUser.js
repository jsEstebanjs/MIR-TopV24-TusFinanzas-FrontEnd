import axios from "axios";
import Cookies from "js-cookie";

export const updateUser = async (body, reset = false) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      { ...body, resetPicture: reset },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return res;
  } catch (err) {
    return false;
  }
};
