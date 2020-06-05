import { useState } from "react";
import { isEmpty } from "../utils/utils";

const useForm = ({ initialValues = {}, validate }) => {
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { type, name } = e.target;

        const getValue = () => {
            if (type === 'checkbox') {
                return e.target.checked;
            } else if (type === 'select-multiple') {
                return Array.from(e.target.selectedOptions).map(o => o.value);
            }
            return e.target.value;
        }

        const value = getValue();
        setValues(prevValues => ({ ...prevValues, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prevTouched => ({ ...prevTouched, [name]: true }));
    };

    const errors = validate ? validate(values) : {};
    const valid = isEmpty(errors);

    const handleSubmit = (onSubmit) => {
        return (e) => {
            if (e && typeof e.preventDefault === 'function') {
                e.preventDefault();
            }
            if (valid) {
                onSubmit(values, e);
            }
        }
    };

    return {
        values,
        setValues,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        valid,
        touched
    }
};

export default useForm;