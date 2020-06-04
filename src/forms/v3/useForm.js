import { useEffect, useState } from "react";
import { isEmpty } from "../utils/utils";

const useForm = ({ initialValues = {}, validate, asyncValidate, asyncBlurFields = [] }) => {
        const [values, setValues] = useState(initialValues);
        const [touched, setTouched] = useState({});
        const [asyncValidatingField, setAsyncValidatingField] = useState(null);
        const [asyncErrors, setAsyncErrors] = useState({});

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
            setAsyncErrors(asyncErrors => {
                const errors = { ...asyncErrors };
                delete errors[name];
                return errors;
            });
        };

        const handleBlur = (e) => {
            const { name } = e.target;
            setTouched(prevTouched => ({ ...prevTouched, [name]: true }));

            if (asyncValidate) {
                const isAsyncField = !!asyncBlurFields.find(field => field === name);
                if (isAsyncField) {
                    setAsyncValidatingField(name);
                }
            }
        };

        useEffect(() => {
            if (asyncValidatingField) {
                asyncValidate(values).then((errors) => {
                    if (!isEmpty(errors)) {
                        setAsyncErrors(errors);
                    }
                    setAsyncValidatingField(null);
                });
            }
        }, [asyncValidatingField, values, asyncValidate]);

        const errors = validate ? validate(values) : {};
        const valid = isEmpty(errors) && isEmpty(asyncErrors);

        const asyncValidateFields = () => {
            return asyncValidate(values).then((errors) => {
                if (!isEmpty(errors)) {
                    setAsyncErrors(errors);
                    return false;
                }
                return true;
            });
        }

        const handleSubmit = (onSubmit) => {
            return (e) => {
                if (e && typeof e.preventDefault === 'function') {
                    e.preventDefault();
                }
                if (asyncValidate) {
                    e.persist();
                    asyncValidateFields().then((asyncValid) => {
                        if (asyncValid && valid) {
                            onSubmit(values, e);
                        }
                    })
                }
                else if (valid) {
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
            asyncErrors,
            valid,
            touched
        }
    }
;

export default useForm;