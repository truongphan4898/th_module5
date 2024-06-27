import axios from "axios";

export const getAllBooks = async () =>{
    try {
        const res = await axios.get('http://localhost:3001/books');
        return res.data;
    }catch(err){}
}
export const addBook = async(book)=>{
    try{
        const res = await axios.post("http://localhost:3001/books",book)
        return res.data
    }catch (err){}
}