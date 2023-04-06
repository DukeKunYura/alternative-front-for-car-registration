import { useState } from "react";
import { useCreateCarMutation } from '../api/api';

export default function NewCar() {
    const [number, setNumber] = useState('');
    const [brand, setBrand] = useState('');
    const [createCar, { isLoading }] = useCreateCarMutation();

    const handleSubmit = async (e) => {
        // Отменяем стандартное поведение формы
        e.preventDefault();

        // Вызываем метод API для создания автомобиля
        await createCar({
            number,
            brand,
        });

        // Очищаем форму
        setNumber('');
        setBrand('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Номер автомобиля"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="Бренд автомобиля"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
                Добавить автомобиль
            </button>
        </form>
    );
}