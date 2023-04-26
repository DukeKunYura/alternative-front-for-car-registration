import React, { useEffect, useState } from 'react';
import { setActiveLink } from '../slices/masterSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PersonCard from '../components/PersonCard';

export default function FindPage() {

    const [persons = [], setPersons] = useState();
    const [isActiveInput, setIsActiveInput] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleFindPersons = async (values) => {
        let url = "http://localhost:8080/persons_with_params";
        let params = [];

        if (values.firstName) {
            params.push("name=" + values.firstName);
        }
        if (values.surname) {
            params.push("surname=" + values.surname);
        }
        if (values.patronymic) {
            params.push("patronymic=" + values.patronymic);
        }
        if (values.birthDate) {
            params.push("birth_date=" + values.birthDate);
        }
        if (values.minAge) {
            params.push("min_age=" + values.minAge);
        }
        if (values.maxAge) {
            params.push("max_age=" + values.maxAge);
        }
        if (params.length > 0) {
            url += "?" + params.join("&");
        }

        let result = await fetch(url).then((res) => res.json());
        if (result) {
            setPersons(result)
        }
        setFirstName(values.firstName);
        setSurname(values.surname);
        setPatronymic(values.patronymic);
        setBirthDate(values.birthDate)
        setMinAge(values.minAge);
        setMaxAge(values.maxAge);
        setIsActiveInput(false);
    }

    useEffect(() => {
        dispatch(setActiveLink("find"))
    }, [])

    const formValidationSchema = Yup.object().shape({
        firstName: Yup.string().required(),
        surname: Yup.string().required(),
        patronymic: Yup.string().required(),
    });

    return (
        <div className="container">
            <div className="block">
                {!isActiveInput &&
                    <div>
                        {<div className="box">
                            <div className="control">
                                <button className="button is-link is-light"
                                    onClick={() => { setIsActiveInput(true) }}>Return to input</button>
                            </div>
                        </div>}
                        {persons.length !== 0 &&
                            persons.map(person => (
                                <div className="box"
                                    key={person.id}
                                    onClick={() => { navigate(`/person/:${person.id}`) }}>
                                    <PersonCard person={person} />
                                </div>
                            ))}
                        {persons.length === 0 &&
                            <div className="box">
                                <h4 className="subtitle is-5">
                                    The list is empty
                                </h4>
                            </div>
                        }
                    </div>
                }
                {isActiveInput &&
                    <Formik
                        //validationSchema={formValidationSchema}
                        initialValues={{
                            firstName,
                            surname,
                            patronymic,
                            birthDate,
                            minAge,
                            maxAge
                        }}
                        onSubmit={(values, { setSubmitting }) => { handleFindPersons(values); setSubmitting(false); }}>
                        {(props) => (

                            <form className="box" onSubmit={props.handleSubmit}>
                                <div className="field">
                                    <label className="label">Surname</label>
                                    <div className="control">
                                        <input
                                            className={props.errors.surname && props.touched.surname ? "input is-danger" : "input"}
                                            placeholder='Input surname'
                                            type="text"
                                            name="surname"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.surname}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">First name</label>
                                    <div className="control">
                                        <input
                                            className={props.errors.firstName && props.touched.firstName ? "input is-danger" : "input"}
                                            placeholder='Input first name'
                                            type="text"
                                            name="firstName"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.firstName}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Patronymic</label>
                                    <div className="control">
                                        <input
                                            className={props.errors.patronymic && props.touched.patronymic ? "input is-danger" : "input"}
                                            placeholder='Input patronymic'
                                            type="text"
                                            name="patronymic"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.patronymic}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Date of birth</label>
                                    <div className="control">
                                        <input
                                            className={props.errors.age && props.touched.age ? "input is-danger" : "input"}
                                            placeholder='Input date of birth'
                                            type="date"
                                            name="birthDate"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.birthDate}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Age</label>
                                    <div className="columns">
                                        <div className="column">
                                            <input
                                                className={props.errors.age && props.touched.age ? "input is-danger" : "input"}
                                                placeholder='Input min age'
                                                type="number"
                                                min={0}
                                                name="minAge"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.minAge}
                                            />
                                        </div>
                                        <div className="column">
                                            <input
                                                className={props.errors.age && props.touched.age ? "input is-danger" : "input"}
                                                placeholder='Input max age'
                                                type="number"
                                                min={1}
                                                name="maxAge"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.maxAge}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-info" type="submit" disabled={props.isSubmitting}>Find</button>
                                    </div>
                                    {/* <div className="control">
                                        <button
                                            className="button is-link is-light"
                                            type='button'
                                            onClick={() => { setIsActiveInput(false) }}>
                                            Cancel
                                        </button>
                                    </div> */}
                                    <div className="control">
                                        <button
                                            className="button is-link is-light"
                                            type='button'
                                            onClick={() => {
                                                props.resetForm({
                                                    values: {
                                                        firstName: "",
                                                        surname: "",
                                                        patronymic: "",
                                                        birthDate: "",
                                                        minAge: "",
                                                        maxAge: ""
                                                    }
                                                })
                                            }}>
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                }
            </div>
        </div >

    );
}