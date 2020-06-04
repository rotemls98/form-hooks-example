import React from 'react';
import useForm from "./useForm";

const FormOne = () => {
    const initialValues = {
        firstName: '',
        gender: 'male',
        digits: [1]
    };

    const { handleSubmit, handleChange, values } = useForm({ initialValues });

    const onSubmit = (values) => {
        console.log(values);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Form One</h1>
            <div>
                <label>Name</label>
                <input
                    name='name'
                    onChange={handleChange}
                    value={values.name}/>
            </div>
            <div>
                <input
                    type="radio"
                    onChange={handleChange}
                    checked={values.gender === 'male'}
                    value='male' name="gender"/>
                Male
                <input
                    type="radio"
                    onChange={handleChange}
                    checked={values.gender === 'female'}
                    value='female'
                    name="gender"/>
                Female
            </div>
            <div>
                <label>favorite digits</label>
                <select
                    onChange={handleChange}
                    name='digits'
                    multiple={true}
                    value={values.digits}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) =>
                        <option key={value} value={value}>{value}</option>
                    )}
                </select>
            </div>
            <button type='submit' onClick={handleSubmit(onSubmit)}>Submit</button>
        </form>
    );
}


export default FormOne;

