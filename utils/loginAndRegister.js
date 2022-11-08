import axios from 'axios';

export const loginAndRegister = async(url,info) => {
    try{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${url}`,{
        ...info
        })
        return res
    }
    catch(err){
        return err.response.data.data
    }

}