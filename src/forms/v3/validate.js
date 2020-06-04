import { sleep } from "../utils/utils";

export const checkIfExist = (id) => sleep(1000).then(() => id === '1');

export const asyncValidate = (values) => {
    return checkIfExist(values.id).then((exists) => {
        const errors = {};
        if (exists) {
            errors.id = 'id exists';
        }

        return errors;
    });
};

export const validate = (values) => {
    const errors = {};
    if (!values.id) {
        errors.id = 'id required';
    }
    if (!values.name) {
        errors.name = 'name required';
    }
    return errors;
}
