import React from 'react';
import validate from "./validate";
import useForm from "./useForm";

const FormTwo = () => {
    const initialValues = {
        firstName: '',
        lastName: ''
    };
    const { handleSubmit, handleChange, handleBlur, values, errors, touched, valid } = useForm({
        initialValues, validate
    });

    const onSubmit = (values) => {
        alert(JSON.stringify(values));
    }

    return (
        <div>
            <h1>Form Two</h1>
            <div>
                <label>first Name</label>
                <input
                    required
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
            <button
                disabled={!valid}
                onClick={handleSubmit(onSubmit)}>
                Submit
            </button>
        </div>
    );
}


export default FormTwo;