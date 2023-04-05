import { useState } from "react";
import { useCreateCarMutation } from '../api/api';

export default function NewCar() {
    const [name, setName] = useState('');
    const [personId, setPersonId] = useState('');
    const [createCar, { isLoading }] = useCreateCarMutation();

    const handleSubmit = async (e) => {
        // Отменяем стандартное поведение формы
        e.preventDefault();

        // Вызываем метод API для создания автомобиля
        await createCar({
            name,
            personId,
        });

        // Очищаем форму
        setName('');
        setPersonId('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Название автомобиля"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="ID персоны"
                value={personId}
                onChange={(e) => setPersonId(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
                Добавить автомобиль
            </button>
        </form>
    );
}