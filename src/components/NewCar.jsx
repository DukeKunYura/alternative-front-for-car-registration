import React from 'react';
import { useCreateCarMutation } from '../api/api';
import { useDispatch } from 'react-redux';
import { setIsActiveCarAdder } from '../slices/masterSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function NewCar() {
    const [createCar, { isLoading }] = useCreateCarMutation();

    const dispatch = useDispatch();

    const handleAddCar = async (values) => {
        await createCar(values).unwrap();

        // navigate("/");
        dispatch(setIsActiveCarAdder(false));

    }

    const formValidationSchema = Yup.object().shape({
        number: Yup.string().required().max(9),
        brand: Yup.string().required(),
        model: Yup.string().required(),
        color: Yup.string().required(),
    });

    return (
        <Formik
            validationSchema={formValidationSchema}
            initialValues={{ number: "", brand: "", model: "", color: "" }}
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
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-info" type="submit" disabled={props.isSubmitting}>Submit</button>
                        </div>
                        <div className="control">
                            <button
                                className="button is-link is-light"
                                type="button"
                                onClick={() => { dispatch(setIsActiveCarAdder(false)) }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
}