import axios from 'axios';

export const loginAndRegister = async(url) => {
    try{
        const res = await axios.post(url)
        return res
    }
    catch(err){
        console.log(err)
    }

}