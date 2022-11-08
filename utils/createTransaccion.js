import axios from 'axios';

export const createTransaccion = async(body) => {
    try{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transactions/create`,body,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        return res
    }
    catch(err){
        return err
    }

}