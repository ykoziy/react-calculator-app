import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import History from "../containers/History";
import Keypad from "../components/Keypad";

const ControlsView = ({isHistoryView}) => {
    return(
        <React.Fragment>
            {isHistoryView ? <History /> : <Keypad />}
        </React.Fragment>
    );
}

ControlsView.propTypes = {
    isHistoryView: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    isHistoryView: state.isHistoryView
});

export default connect (
    mapStateToProps
)(ControlsView);
