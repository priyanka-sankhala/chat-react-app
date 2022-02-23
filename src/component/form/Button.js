import React from 'react';
import { Button as BootstrapButton } from "react-bootstrap";
function Button(props) {
    const {name, type} = props
    return (
        <div>
           <BootstrapButton type={type} {...props}>
               {name}
           </BootstrapButton>
        </div>
    );
}

export default Button;