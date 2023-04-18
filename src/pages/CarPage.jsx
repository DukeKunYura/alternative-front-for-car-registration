import React, { useEffect, useState } from 'react';
import { setActiveLink } from '../slices/masterSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetCarWithPersonsByIdQuery, useDeleteCarMutation } from '../api/api';
import Loader from '../components/Loader';
import CarEditor from '../components/CarEditor';
import PersonInfoString from '../components/PesonInfoString';


export default function CarPage() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const [isEditingCar, setIsEditingCar] = useState(false);

    const { data = [], isLoading, isSuccess } = useGetCarWithPersonsByIdQuery(id.substring(1));
    const [deleteCar] = useDeleteCarMutation();

    const navigate = useNavigate();

    const handleDeleteCar = async (id) => {
        await deleteCar(id).unwrap();
        navigate("/cars");
    }

    useEffect(() => {
        dispatch(setActiveLink("cars"));
        setIsEditingCar(false);
    }, [])

    return (
        <>
            <article className="panel is-primary">
                <p className="panel-heading">
                    Car
                </p>
                {isLoading && <><Loader /></>}
                {!isLoading && !isSuccess &&
                    <div className="box">
                        <h4 className="subtitle is-5">
                            No such car
                        </h4>
                        <br />
                        <a href="#" className="item"
                            onClick={() => { navigate("/") }}>
                            Back
                        </a>
                    </div>
                }
                {isSuccess &&
                    <>
                        {isEditingCar &&
                            <CarEditor
                                brand={data.brand}
                                model={data.model}
                                color={data.color}
                                number={data.number}
                                setIsEditingCar={setIsEditingCar}
                                id={id.substring(1)} />}
                        {!isEditingCar &&
                            <div className="box">

                                <div className="field">
                                    <label className="label">Brand</label>
                                    <div className="control">
                                        <input className="input is-static" type="text"
                                            value={data.brand || " "} readOnly />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Model</label>
                                    <div className="control">
                                        <input className="input is-static" type="text"
                                            value={data.model || " "} readOnly />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Color</label>
                                    <div className="control">
                                        <input className="input is-static" type="text"
                                            value={data.color || " "} readOnly />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Number</label>
                                    <div className="control">
                                        <input className="input is-static" type="text"
                                            value={data.number || " "} readOnly />
                                    </div>
                                </div>
                                <br />
                                <footer className="card-footer">
                                    <a href="#" className="card-footer-item"
                                        onClick={() => { setIsEditingCar(true) }}>Edit car</a>
                                    <a href="#" className="card-footer-item"
                                        onClick={() => { handleDeleteCar(data.id) }}>Delete car</a>
                                </footer>
                            </div>}
                        <table className="table is-fullwidth">
                            <tbody>
                                <tr>
                                    <td>
                                        <h4 className="subtitle is-5" id="1">Owners:</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="columns">
                                            <div className="column is-four-fifths">
                                                <div className="columns">
                                                    <div className="column">
                                                        <h4 className="subtitle is-5">passport</h4>
                                                    </div>
                                                    <div className="column">
                                                        <h4 className="subtitle is-5">first name</h4>
                                                    </div>
                                                    <div className="column">
                                                        <h4 className="subtitle is-5">patronymic</h4>
                                                    </div>
                                                    <div className="column">
                                                        <h4 className="subtitle is-5">surname</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="column">
                                                <a href="#" className="item"></a>
                                            </div>
                                            <div className="block">
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {data.persons && data.persons.map(person => (
                                    <PersonInfoString
                                        key={person.id}
                                        id={person.id}
                                        passportNumber={person.passportNumber}
                                        surname={person.surname}
                                        firstName={person.firstName}
                                        patronymic={person.patronymic} />
                                ))}
                            </tbody>
                        </table>
                    </>}
            </article>
        </>
    );
}