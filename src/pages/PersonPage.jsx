import React, { useEffect, useState } from 'react';
import { setActiveLink } from '../slices/masterSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsActiveCarRegistration } from '../slices/masterSlice';
import { useGetPersonWithCarsByIdQuery, useDeletePersonMutation, useRegistrationMutation } from '../api/api';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Loader from '../components/Loader';
import PersonEditor from '../components/PersonEditor';
import CarInfoString from '../components/CarInfoString';


export default function PersonPage() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const state = useSelector((state) => state.master);

    const [isEditingPerson, setIsEditingPerson] = useState(false);
    const [age, setAge] = useState(null);

    const { data = [], isSuccess } = useGetPersonWithCarsByIdQuery(id.substring(1));
    const [deletePerson] = useDeletePersonMutation();
    const [registration, { isLoading }] = useRegistrationMutation();

    const navigate = useNavigate();

    const handleRegistrationCar = async (values) => {
        const host = import.meta.env.VITE_REACT_APP_HOST;
        const port = import.meta.env.VITE_REACT_APP_PORT;
        let car = await fetch(`http://${host}:${port}/car_number?number=${values.number}`).then((res) => res.json());
        let pairId = { "personId": id.substring(1), "carId": car.id };
        await registration(pairId).unwrap();
        dispatch(setIsActiveCarRegistration(false));
    }

    const handleDeletePerson = async (id) => {
        await deletePerson(id).unwrap();
        navigate("/persons");
    }

    useEffect(() => {
        const getAge = async () => {
            const host = import.meta.env.VITE_REACT_APP_HOST;
            const port = import.meta.env.VITE_REACT_APP_PORT;
            let age = await fetch(`http://${host}:${port}/person_age?id=${id.substring(1)}`).then((res) => res.json());
            return age;
        };
        getAge().then((res) => setAge(res));
        dispatch(setActiveLink("persons"));
        dispatch(setIsActiveCarRegistration(false));
        setIsEditingPerson(false);
    }, [])

    const formValidationSchema = Yup.object().shape({
        number: Yup.string().required().max(9)
    });

    return (
        <>
            <article className="panel is-primary">
                <p className="panel-heading">
                    Person
                </p>
                {isLoading && <><Loader /></>}
                {!isLoading && !isSuccess &&
                    <div className="box">
                        <h4 className="subtitle is-5">
                            No such person
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
                        {isEditingPerson &&
                            <PersonEditor
                                firstName={data.firstName}
                                surname={data.surname}
                                patronymic={data.patronymic}
                                birthDate={data.birthDate}
                                passportNumber={data.passportNumber}
                                setIsEditingPerson={setIsEditingPerson}
                                id={id.substring(1)} />}
                        {!isEditingPerson &&
                            <div className="box">

                                <div className="field">
                                    <label className="label">Surname</label>
                                    <div className="control">
                                        <input className="input is-static" type="text"
                                            value={data.surname || " "} readOnly />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">First name</label>
                                    <div className="control">
                                        <input className="input is-static" type="text"
                                            value={data.firstName || " "} readOnly />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Patronymic</label>
                                    <div className="control">
                                        <input className="input is-static" type="text"
                                            value={data.patronymic || " "} readOnly />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Date of birth</label>
                                    <div className="control">
                                        <input className="input is-static" type="text"
                                            value={data.birthDate + " (age: " + age + ")"|| " "} readOnly />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Passport number</label>
                                    <div className="control">
                                        <input className="input is-static" type="text"
                                            value={data.passportNumber || " "} readOnly />
                                    </div>
                                </div>
                                <br />
                                <footer className="card-footer">
                                    {!state.isActiveCarRegistration &&
                                        <a href="#1" onClick={() => { dispatch(setIsActiveCarRegistration(true)) }}
                                            className="card-footer-item">Registration car</a>}
                                    {state.isActiveCarRegistration &&
                                        <a href="#" onClick={() => { dispatch(setIsActiveCarRegistration(false)) }}
                                            className="card-footer-item">Cancel registration</a>}
                                    <a href="#" className="card-footer-item"
                                        onClick={() => { setIsEditingPerson(true) }}>Edit person</a>
                                    <a href="#" className="card-footer-item"
                                        onClick={() => { handleDeletePerson(data.id) }}>Delete person</a>
                                </footer>
                            </div>}
                        {state.isActiveCarRegistration &&
                            <Formik
                                validationSchema={formValidationSchema}
                                initialValues={{ number: "" }}
                                onSubmit={(values, { setSubmitting }) => { handleRegistrationCar(values); setSubmitting(false); }}>
                                {(props) => (
                                    <form className="box" onSubmit={props.handleSubmit}>
                                        <div className="field">
                                            <label className="label">Number</label>
                                            <div className="control">
                                                <input
                                                    className={props.errors.number && props.touched.number ? "input is-danger" : "input"}
                                                    placeholder='Input number'
                                                    type="text"
                                                    name="number"
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    value={props.values.number}
                                                />
                                            </div>
                                        </div>
                                        <div className="field is-grouped">
                                            <div className="control">
                                                <button className="button is-info" type="submit" disabled={props.isSubmitting}>Submit</button>
                                            </div>
                                            <div className="control">
                                                <button
                                                    className="button is-link is-light"
                                                    type="button"
                                                    onClick={() => { dispatch(setIsActiveCarRegistration(false)) }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        }

                        <table className="table is-fullwidth">
                            <tbody>
                                <tr>
                                    <td>
                                        <h4 className="subtitle is-5" id="1">Cars:</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="columns">
                                            <div className="column is-four-fifths">
                                                <div className="columns">
                                                    <div className="column">
                                                        <h4 className="subtitle is-5">number</h4>
                                                    </div>
                                                    <div className="column">
                                                        <h4 className="subtitle is-5">brand</h4>
                                                    </div>
                                                    <div className="column">
                                                        <h4 className="subtitle is-5">model</h4>
                                                    </div>
                                                    <div className="column">
                                                        <h4 className="subtitle is-5">color</h4>
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
                                {data.cars && data.cars.map(car => (
                                    <CarInfoString
                                        key={car.id}
                                        id={car.id}
                                        number={car.number}
                                        brand={car.brand}
                                        model={car.model}
                                        color={car.color} />
                                ))}
                            </tbody>
                        </table>
                    </>}
            </article>
        </>
    );
}