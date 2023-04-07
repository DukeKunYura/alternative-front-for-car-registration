import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPersonByIdQuery, useRegistrationMutation } from '../api/api';

export default function PersonPage() {
    const { id } = useParams();

    const [number, setNumber] = useState('');

    const { data = [], isSuccess } = useGetPersonByIdQuery(id.substring(1));
    // const [registration, { isLoading }] = useRegistrationMutation();

    const handleSubmit = async (e) => {
        // Отменяем стандартное поведение формы
        e.preventDefault();

        let response = await fetch(`http://localhost:8080/car_number${number}`);

        console.log(response);


        // Очищаем форму
        setNumber('');
    };

    return (
        <div>
            <h2>Person {id}</h2>
            {data.surname}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Номер автомобиля"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
                <button type="submit" disabled={false}>
                    Зарегистрировать автомобиль
                </button>
            </form>
        </div>
    );
}