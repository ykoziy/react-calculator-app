import React from "react";
import PropTypes from 'prop-types';
import '../assets/css/components/Display.scss';

const OutputScreen = (props) => {
    return(
        <div id="result" className="output">
            {props.children}
        </div>
    );
}
OutputScreen.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default OutputScreen;
