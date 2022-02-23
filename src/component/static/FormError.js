import React from 'react'

function FormError(props) {
    return (
        <div className="text-danger">
            {props.children}
        </div>
    )
}

export default FormError
