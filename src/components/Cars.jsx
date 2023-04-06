import { useGetCarsQuery } from '../api/api';
import { useNavigate } from 'react-router-dom';


export default function Cars() {
    const { data, error, isLoading } = useGetCarsQuery();

    const navigate = useNavigate();

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка при загрузке списка автомобилей.</div>;

    return (
        <ul>
            {data.map((car) => (
                <li
                    key={car.id}
                    onClick={() => { navigate(`/car/:${car.id}`) }}
                >
                    {car.number + " " + car.brand}
                </li>
            ))}
        </ul>
    );
}