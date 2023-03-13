import axios from "axios";

const baseUrlDolar= 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
// const apiKey = '';

export const getDolar = async () => {
    try{
        const {data} = await axios.get(baseUrlDolar);
        return data;
    }catch(error){
        throw error;
    }
}