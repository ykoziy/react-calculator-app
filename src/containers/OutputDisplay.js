import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const OutputDisplay = ({result}) => {
    let output = result;
    if(result === "")
    {
        output = "0"
    }
    return(
        <div className="output">{output}</div>
    );
}
OutputDisplay.propTypes = {
    result: PropTypes.any.isRequired
};

const mapStateToProps = (state) => ({
    result: state.result
});

export default connect(
    mapStateToProps
)(OutputDisplay);
