import axios from "axios";

export const getAllGenres = async() =>{
    try{
        const res = await axios.get('http://localhost:3001/genres');
        return res.data;
    }catch(error){}
}