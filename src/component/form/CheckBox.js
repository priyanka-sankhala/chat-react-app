import React from 'react';
import {Field,ErrorMessage} from 'formik'
import TextError from './TextError';
function CheckBox(props) {
    const {name} = props
    return (
        <div>
            <label name={name} htmlFor={name} />
            <Field name={name} id={name} />
            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
}

export default CheckBox;