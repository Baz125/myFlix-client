import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { setFilter } from "../../redux/reducers/movies";

export const MoviesFilter = () => {
    const filter = useSelector((state) => state.movies.filter);//should this be movies.filter or just .filter?
    const dispatch = useDispatch();

    return (
        <Form.Control
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
            style={{ backgroundColor: '#696969', color: 'black', marginBottom: '30px', borderColor: '#D9CB9E' }}
        />
    );
};