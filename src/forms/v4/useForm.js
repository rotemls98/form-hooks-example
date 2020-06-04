import { useCallback, useEffect, useRef, useState } from "react";
import { isEmpty } from "../utils/utils";

const useForm = ({ initialValues = {}, validate, asyncValidate, asyncBlurFields = [] }) => {
    const initial = useRef(initialValues);
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});
    const [asyncValidatingField, setAsyncValidatingField] = useState(null);
    const [asyncErrors, setAsyncErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

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

    const initialize = useCallback((initialValues) => {
        if (!initialValues) {
            setValues(initial.current);
        } else {
            initial.current = initialValues;
            setValues(initialValues);
        }
    }, []);

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

    const asyncValidateFields = () => {
        return asyncValidate(values).then((errors) => {
            if (!isEmpty(errors)) {
                setAsyncErrors(errors);
                return false;
            }
            setAsyncValidatingField(null);
            return true;
        });
    }

    const errors = validate ? validate(values) : {};
    const valid = isEmpty(errors) && isEmpty(asyncErrors);

    const handleSubmit = (onSubmit) =>
        (e) => {
            setSubmitting(true);
            if (e && typeof e.preventDefault === 'function') {
                e.preventDefault();
            }
            if (asyncValidate) {
                e.persist();
                asyncValidateFields().then((asyncValid) => {
                    if (asyncValid && valid) {
                        Promise.resolve(onSubmit(values, e))
                            .finally(() => setSubmitting(false));
                    }
                    else {
                        setSubmitting(false);
                    }
                })
            } else if (valid) {
                Promise.resolve(onSubmit(values, e))
                    .finally(() => setSubmitting(false));
            } else {
                setSubmitting(false);
            }
        };

    const dirty = !!Object.keys(initial.current).find((key) => initial.current[key] !== values[key]);
    const pristine = !dirty;

    return {
        values,
        setValues,
        handleChange,
        handleBlur,
        handleSubmit,
        initialize,
        errors,
        asyncErrors,
        submitting,
        valid,
        dirty,
        pristine,
        touched
    }
};

export default useForm;