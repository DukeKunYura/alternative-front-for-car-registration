import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPersonByIdQuery } from '../api/api';

export default function PersonPage() {
    const { id } = useParams();

    const { data = [], isSuccess } = useGetPersonByIdQuery(id);


    //Здесь нужно получить данные о человеке с заданным id

    return (
        <div>
            <h2>Person {id}</h2>
            {data.number}
        </div>
    );
}