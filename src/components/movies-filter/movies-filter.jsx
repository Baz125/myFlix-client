import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { setFilter } from "../../redux/reducers/movies";

export const BooksFilter = () => {
    const filter = useSelector((state) => state.books.filter);
    const dispatch = useDispatch();

    return (
        <Form.Control
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
        />
    );
};