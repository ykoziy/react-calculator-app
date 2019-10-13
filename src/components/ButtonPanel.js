import React from "react";
import PropTypes from 'prop-types';

const ButtonPanel = (props) => {
    return(
        <div className="buttons">
            {props.children}
        </div>
    );
}
ButtonPanel.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default ButtonPanel;