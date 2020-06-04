const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'first name is required';
    }
    else if (values.firstName.length > 20) {
        errors.firstName = 'first name is invalid';
    }

    if (!values.lastName) {
        errors.lastName = 'second name is required';
    }

    return errors;
}

export default validate;