import React from 'react';
import { asyncValidate, validate } from "./validate";
import useForm from "../v3/useForm";


const FormThree = () => {
    const initialValues = { id: '', name: '' };
    const asyncBlurFields = ['id'];

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, valid, asyncErrors, } = useForm({
        initialValues, asyncValidate, validate, asyncBlurFields
    });

    const onSubmit = (values) => {
        alert(JSON.stringify(values));
    }

    const errorId = errors.id ? errors.id : (asyncErrors.id ? asyncErrors.id : null);

    return (
        <div>
            <h1>Form Three</h1>
            <div>
                <label>Id</label>
                <input
                    required
                    name='id'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.id}/>
                {errorId && touched.id && errorId}
            </div>
            <div>
                <label>Name</label>
                <input
                    required
                    name='name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}/>
                {errors.name && touched.name && errors.name}
            </div>
            <button disabled={!valid} onClick={handleSubmit(onSubmit)}>Submit</button>
        </div>
    );
}

export default FormThree;