import React, { useState } from 'react';
import { useCreatePersonMutation } from '../api/api.js';


export default function NewPerson() {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [createPerson, { isLoading }] = useCreatePersonMutation();

    const handleSubmit = async (e) => {
        // Отменяем стандартное поведение формы
        e.preventDefault();

        // Вызываем метод API для создания персоны
        await createPerson({
            firstName,
            surname,
        });

        // Очищаем форму
        setFirstName('');
        setSurname('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                placeholder="Имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Фамилия"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
                Добавить персону
            </button>
        </form>
    );
}
