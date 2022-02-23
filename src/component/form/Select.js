import React from 'react';
import {Field,ErrorMessage} from 'formik'
import TextError from './TextError';

function Select(props) {
    const {name, options,label} = props
    console.log("options", options);
    return (
        <div>
            <label name={name} htmlFor={name}>{label}</label>
            <Field as ="select" name={name} {...props} >
           {props.children}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
}

export default Select;