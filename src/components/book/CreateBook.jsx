import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addBook } from "../service/Book-service";
import { getAllGenres } from "../service/GenreBook_Service";
import * as Yup from "yup";

export function CreateBook() {
    const [genre, setGenre] = useState([]);
    const navigate = useNavigate();

    const getAllGe = async () => {
        try {
            const res = await getAllGenres();
            setGenre(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllGe();
    }, []);

    const handleSubmit = async (values) => {
        try {
            const newBook = { ...values, genres: JSON.parse(values.genres) };
            await addBook(newBook);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const validationSchema = Yup.object({
        code: Yup.string()
            .matches(/^BO-\d{4}$/, "Mã sách phải đúng định dạng BO-XXXX.")
            .required("Mã sách là bắt buộc."),
        name: Yup.string()
            .max(100, "Tên sách không được dài quá 100 ký tự.")
            .required("Tên sách là bắt buộc."),
        dateAdded: Yup.date()
            .max(new Date(), "Ngày nhập sách không được lớn hơn ngày hiện tại.")
            .required("Ngày nhập sách là bắt buộc."),
        quantity: Yup.number()
            .integer("Số lượng phải là số nguyên.")
            .positive("Số lượng phải lớn hơn 0.")
            .required("Số lượng là bắt buộc."),
        genres: Yup.string().required("Thể loại là bắt buộc."),
    });

    if (!genre) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="d-flex w-100 justify-content-center align-items-center bg-light">
                <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                    <Formik
                        initialValues={{
                            code: "",
                            name: "",
                            genres: JSON.stringify(genre[0]),
                            dateAdded: "",
                            quantity: ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleSubmit(values);
                        }}
                    >
                        <Form>
                            <div className="form-group">
                                <label>Book Code</label>
                                <Field type="text" name="code" className="form-control" required />
                                <ErrorMessage name="code" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Name</label>
                                <Field type="text" name="name" className="form-control" required />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </div>

                            <div className="form-group">
                                <label>Genres</label>
                                <Field as="select" name="genres" className="form-control" required>
                                    {genre.map((g) => (
                                        <option key={g.id} value={JSON.stringify(g)}>{g.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="genres" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label>Date Added</label>
                                <Field type="date" name="dateAdded" className="form-control" required />
                                <ErrorMessage name="dateAdded" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label>Quantity</label>
                                <Field type="number" name="quantity" className="form-control" required />
                                <ErrorMessage name="quantity" component="div" className="text-danger" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to="/" className="btn btn-primary m-3">Back</Link>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
}
