import { useGetCarsQuery } from '../api/api';

export default function Cars() {
    const { data, error, isLoading } = useGetCarsQuery();

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка при загрузке списка автомобилей.</div>;

    return (
        <ul>
            {data.map((car) => (
                <li key={car.id}>
                    <strong>{car.name}</strong> (зарегистрирован на {car.persons.join(', ')})
                </li>
            ))}
        </ul>
    );
}