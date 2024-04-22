import { useState } from 'react';

const useFormValidation = (initialState, validationRules) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const validateForm = () => {
        const validationErrors = validate(values, validationRules);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    return {
        values,
        errors,
        handleChange,
        validateForm
    };
};

const validate = (values, validationRules) => {
    let errors = {};
    for (let key in validationRules) {
        const rule = validationRules[key];
        if (rule.required && !values[key]) {
            errors[key] = `${key} is required`;
        } else if (rule.minLength && values[key].length < rule.minLength) {
            errors[key] = `${key} must be at least ${rule.minLength} characters long`;
        } else if (rule.pattern && !rule.pattern.test(values[key])) {
            errors[key] = `Invalid ${key}`;
        }
    }
    return errors;
};

export default useFormValidation;
