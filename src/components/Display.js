import React from "react";
import PropTypes from 'prop-types';
import '../assets/css/components/Display.scss';

const OutputScreen = (props) => {
    return(
        <div className="display">
            {props.children}
        </div>
    );
}
OutputScreen.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default OutputScreen;
