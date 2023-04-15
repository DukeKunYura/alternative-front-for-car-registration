import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsActiveCarRegistration } from '../slices/masterSlice';
import { useGetPersonWithCarsByIdQuery, useRegistrationMutation } from '../api/api';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function PersonPage() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const state = useSelector((state) => state.master);

    const { data = [], isSuccess } = useGetPersonWithCarsByIdQuery(id.substring(1));
    const [registration, { isLoading }] = useRegistrationMutation();

    const handleAddCar = async (values) => {
        let car = await fetch(`http://localhost:8080/car_number?number=${values.number}`).then((res) => res.json());
        let pairId = { "personId": id.substring(1), "carId": car.id };
        await registration(pairId).unwrap();

        // navigate("/");
        dispatch(setIsActiveCarRegistration(false));

    }

    const formValidationSchema = Yup.object().shape({
        number: Yup.string().required().max(9)
    });

    return (
        <div>
            <h2>Person {id}</h2>
            {data.cars && data.cars.map(car =>
                <div>{car.number}</div>
            )}
            {data.surname}
            <button onClick={() => { dispatch(setIsActiveCarRegistration(true)) }}>Добавить авто</button>
            {state.isActiveCarRegistration &&
                <Formik
                    validationSchema={formValidationSchema}
                    initialValues={{ number: "" }}
                    onSubmit={(values, { setSubmitting }) => { handleAddCar(values); setSubmitting(false); }}>
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

        </div>
    );
}