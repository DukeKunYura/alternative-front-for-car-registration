import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useUpdatePersonMutation } from '../api/api';

/**
 * Компонент отвечает за редактирование информации о персоне
 */
export default function PersonEditor(props) {

    const {
        id,
        setIsEditingPerson,
        firstName,
        surname,
        patronymic,
        birthDate,
        passportNumber } = props;

    const [updatePerson, { isError }] = useUpdatePersonMutation();

    const handleEditPerson = async (values) => {
        await updatePerson({ id, ...values }).unwrap();
        setIsEditingPerson(false);
    };

    const formValidationSchema = Yup.object().shape({
        firstName: Yup.string().required(),
        surname: Yup.string().required(),
        patronymic: Yup.string().required(),
    });

    return (
        <Formik
            validationSchema={formValidationSchema}
            initialValues={{
                firstName: firstName,
                surname: surname,
                patronymic: patronymic
            }}
            onSubmit={(values, { setSubmitting }) => { handleEditPerson(values); setSubmitting(false); }}>
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
                                className="input is-static"
                                type="text"
                                value={birthDate}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Passport number</label>
                        <div className="control">
                            <input
                                className="input is-static"
                                type="text"
                                value={passportNumber}
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
                                onClick={() => { setIsEditingPerson(false) }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}