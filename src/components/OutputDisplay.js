import React from "react";
import PropTypes from 'prop-types';

const OutputDisplay = (props) => {
    let output  = props.result;
    if(props.result === "")
    {
        output = "0"
    }
    return(
        <div id="display">{output}</div>
    );
}
OutputDisplay.propTypes = {
    result: PropTypes.any.isRequired
};

export default OutputDisplay;