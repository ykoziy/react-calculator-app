import React from "react";
import PropTypes from 'prop-types';

const Button = ({id, type, text, handleButtonClick}) => {
    let btnClasses = type;
    if(btnClasses === undefined) {
        btnClasses = "btn";
    } else {
        btnClasses = "btn " + btnClasses;
    }
    return(
        <button id={id} className={btnClasses} onClick={handleButtonClick}>{text}</button>
    );
}
Button.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    handleButtonClick: PropTypes.func.isRequired
};

export default Button;