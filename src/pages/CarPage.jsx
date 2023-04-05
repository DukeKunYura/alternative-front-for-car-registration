import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCarByIdQuery } from '../api/api';

export default function CarPage() {
    const { id } = useParams();

    const { data = [], isSuccess } = useGetCarByIdQuery(id);


    //Здесь нужно получить данные о человеке с заданным id

    return (
        <div>
            <h2>Car {id}</h2>
            {data.surname}
        </div>
    );
}