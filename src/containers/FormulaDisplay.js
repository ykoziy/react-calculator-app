import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FormulaDisplay = ({formula}) => {
    return(
        <div className="formula">{formula}</div>
    );
}
FormulaDisplay.propTypes = {
    formula: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    formula: state.formula
});

export default connect(
    mapStateToProps
)(FormulaDisplay);
