import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveLink } from '../slices/masterSlice';
import { useParams } from 'react-router-dom';
import { useGetCarByIdQuery } from '../api/api';

export default function CarPage() {

    const dispatch = useDispatch();

    const { id } = useParams();

    const { data = [], isSuccess } = useGetCarByIdQuery(id);

    useEffect(() => {
        dispatch(setActiveLink("cars"))
    }, [])


    //Здесь нужно получить данные о человеке с заданным id

    return (
        <div>
            <h2>Car {id}</h2>
            {data.surname}
        </div>
    );
}