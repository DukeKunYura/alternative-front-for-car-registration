import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
//import { useUpdatePersonMutation } from '../redux/personApi';

/**
 * Компонент отвечает за редактирование информации о персоне
 */
export default function CarEditor(props) {

    const {
        id,
        setIsEditingCar,
        brand,
        model,
        color,
        number } = props;

    //const [updatePerson, { isError }] = useUpdatePersonMutation();

    const navigate = useNavigate();

    const editCar = async (id, values) => {
        let response = await fetch(`http://localhost:8080/person?passport=${values.passportNumber}`);
        if (response.ok) {
            if (passport === values.passportNumber) {
                await updatePerson({ passport, ...values }).unwrap();
                setIsEditingPerson(false);
            } else {
                alert("Passport number is already exists")
            }
        } else {
            await updatePerson({ passport, ...values }).unwrap();
            setIsEditingPerson(false);
            navigate("/");
        }
    }

    const handleEditCar = (values) => {
        editCar(passport, values);
    }

    const formValidationSchema = Yup.object().shape({
        brand: Yup.string().required(),
        model: Yup.string().required(),
        color: Yup.string().required(),
    });

    return (
        <Formik
            validationSchema={formValidationSchema}
            initialValues={{
                brand: brand,
                model: model,
                color: color
            }}
            onSubmit={(values, { setSubmitting }) => { handleEditCar(values); setSubmitting(false); }}>
            {(props) => (

                <form className="box" onSubmit={props.handleSubmit}>
                    <div className="field">
                        <label className="label">Brand</label>
                        <div className="control">
                            <input
                                className={props.errors.brand && props.touched.brand ? "input is-danger" : "input"}
                                placeholder='Input brand'
                                type="text"
                                name="brand"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.brand}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Model</label>
                        <div className="control">
                            <input
                                className={props.errors.model && props.touched.model ? "input is-danger" : "input"}
                                placeholder='Input model'
                                type="text"
                                name="model"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.model}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Color</label>
                        <div className="control">
                            <input
                                className={props.errors.color && props.touched.color ? "input is-danger" : "input"}
                                placeholder='Input color'
                                type="text"
                                name="color"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.color}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Number</label>
                        <div className="control">
                            <input
                                className="input is-static"
                                type="text"
                                value={number}
                                readOnly
                            />
                        </div>
                    </div>
                    <br />
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-info" type="submit" disabled={props.isSubmitting}>Submit</button>
                        </div>
                        <div className="control">
                            <button
                                className="button is-link is-light"
                                type='button'
                                onClick={() => { setIsEditingCar(false) }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}