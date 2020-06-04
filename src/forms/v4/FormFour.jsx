import React, { useEffect } from "react";
import useForm from "./useForm";
import validate from "./validate";
import { sleep } from "../utils/utils";

const FormFour = () => {
    const initialValues = {
        firstName: '',
        lastName: ''
    };
    const { handleSubmit, handleChange, handleBlur, values, errors, touched, valid, pristine, submitting, initialize } =
        useForm({ initialValues, validate });

    const onSubmit = (values) => {
        return sleep(1000).then(() => console.log(values));
    }

    useEffect(() => {
        sleep(1000).then(() => {
            initialize({firstName: 'Rotem', lastName: 'Sasson'});
        });
    }, [initialize]);

    return (
        <div>
            <h1>Form Four</h1>
            <div>
                <label>first Name</label>
                <input
                    name='firstName'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}/>
                {errors.firstName && touched.firstName && errors.firstName}
            </div>
            <div>
                <label>last Name</label>
                <input
                    required
                    name='lastName'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}/>
                {errors.lastName && touched.lastName && errors.lastName}
            </div>
            <button disabled={pristine || !valid || submitting} onClick={handleSubmit(onSubmit)}>
                {
                    submitting ?
                    'loading...' :
                    'Submit'
                }
            </button>
        </div>
    );
}

export default FormFour;