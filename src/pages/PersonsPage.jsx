import React, { useEffect, useState } from 'react';
import { setActiveLink } from '../slices/masterSlice';
import { useGetPersonsQuery } from '../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { setIsActivePersonAdder } from '../slices/masterSlice';
import { useNavigate } from 'react-router-dom';
import NewPerson from '../components/NewPerson';
import Loader from '../components/Loader';
import PersonCard from '../components/PersonCard';

export default function PersonsPage() {

    const state = useSelector((state) => state.master);

    const { data = [], isLoading, isSuccess } = useGetPersonsQuery();

    const [persons = [], setPersons] = useState();
    const [fullNameInput, setFullNameInput] = useState("");
    const [passportInput, setPassportInput] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleTransition = async () => {
        let person = await fetch(`http://localhost:8080/person_number?number=${passportInput}`).then((res) => res.json());
        if (person.id) {
            navigate(`/person/:${person.id}`);
        }
    }

    useEffect(() => {
        if (fullNameInput !== "") {
            let newArr = data.filter(item =>
                item.firstName.toLowerCase().includes(fullNameInput.toLowerCase())
                || item.surname.toLowerCase().includes(fullNameInput.toLowerCase())
                || item.patronymic.toLowerCase().includes(fullNameInput.toLowerCase()))
            setPersons(newArr);
        } else { setPersons(data) }
    }, [fullNameInput])

    useEffect(() => {
        if (isSuccess) {
            setPersons(data);
        }
    }, [data])

    useEffect(() => {
        dispatch(setActiveLink("persons"));
        dispatch(setIsActivePersonAdder(false));
    }, [])

    return (
        <div className="container">
            <div className="block">
                <div className="columns">
                    <div className="column is-three-quarters">
                        <input
                            className="input is-info"
                            type="text"
                            placeholder="Search"
                            value={fullNameInput}
                            onChange={(e) => { setFullNameInput(e.target.value) }}
                        />
                    </div>
                    <div className="column">
                        <div className="field has-addons">
                            <div className="control">
                                <input
                                    className="input is-info"
                                    type="text"
                                    placeholder="Find by passport"
                                    value={passportInput}
                                    onChange={(e) => { setPassportInput(e.target.value) }} />
                            </div>
                            <div className="control"
                                onClick={handleTransition}>
                                <a className="button is-info">
                                    Find
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {!state.isActivePersonAdder &&
                        <div className="box">
                            <div className="control">
                                <button className="button is-link is-light"
                                    onClick={() => { dispatch(setIsActivePersonAdder(true)) }}>Add new person</button>
                            </div>
                        </div>
                    }
                    {state.isActivePersonAdder && <NewPerson />}
                    {isLoading && <Loader />}
                    {persons.map(person => (
                        <div className="box"
                            key={person.id}
                            onClick={() => { navigate(`/person/:${person.id}`) }}>
                            <PersonCard person={person} />
                        </div>
                    ))}
                    {persons.length === 0 && !isLoading &&
                        <div className="box">
                            <h4 className="subtitle is-5">
                                The list is empty
                            </h4>
                        </div>
                    }
                </div>
            </div>
        </div >

    );
}