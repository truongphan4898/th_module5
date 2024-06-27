import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllBooks} from "../service/Book-service";

export function BookList() {
    const [books, setBooks] = useState([]);

    const getAll = async () =>{
        try{
            const res = await getAllBooks();
            const sortedGenres = res.sort((a, b) => b.quantity - a.quantity);

            setBooks(sortedGenres);
        }catch (err){}
    }

    useEffect(() => {
        getAll()
    },[])

    if (!books){
        return <div>Loading...</div>;
    }
    return (

            <>
                <div className={"mb-3"}>
                    <h2>Book List</h2>
                    <Link to={"/create"} className={"btn btn-warning"}>Create</Link>

                    <table className={'table table-hover'}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>BookCode</th>
                            <th>Name</th>
                            <th>Genre</th>
                            <th>DateAdd</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.code}</td>
                                <td>{book.name}</td>
                                <td>{book.genres.name}</td>
                                <td>{book.dateAdded}</td>
                                <td>{book.quantity}</td>
                            </tr>

                        ))}
                        </tbody>
                    </table>
                </div>
            </>
    )
}