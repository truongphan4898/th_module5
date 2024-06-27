import {BrowserRouter, Route, Routes} from "react-router-dom";
import {BookList} from "./components/book/BookList";

import Master from "./pages/Master/Master";
import {CreateBook} from "./components/book/CreateBook";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Master/>}>
                        <Route path="/" element={<BookList/>}/>
                        <Route path="/create" element={<CreateBook/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default App;
