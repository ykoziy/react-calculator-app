import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import History from "../containers/History";
import ButtonPanel from "../components/ButtonPanel";

const ControlsView = ({isHistoryView}) => {
    return(
        <React.Fragment>
            {isHistoryView ? <History /> : <ButtonPanel />}
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
