import axios from 'axios';
import Cookies from "js-cookie";

export const createTransaccion = async(body) => {
    try{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transactions/create`,body,{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            }
        })
        return res
    }
    catch(err){
        return err.response.data.error
    }

}