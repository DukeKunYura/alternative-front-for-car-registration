import { useGetPersonsQuery } from '../api/api';
import { useNavigate } from 'react-router-dom';


export default function Persons() {
    const { data, error, isLoading } = useGetPersonsQuery();

    const navigate = useNavigate();

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка при загрузке списка персон.</div>;

    return (
        <ul>
            {data.map((person) => (
                <li
                    key={person.id}
                    onClick={() => { navigate(`/person/:${person.id}`) }}
                >
                    {person.firstName + " " + person.surname}
                </li>
            ))}
        </ul>
    );
}