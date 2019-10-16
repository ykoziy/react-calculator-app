import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import History from "../components/History";
import ButtonPanel from "../components/ButtonPanel";

const ControlsView = ({isHistoryView, history}) => {
    return(
        <React.Fragment>
            {isHistoryView ? <History /> : <ButtonPanel />}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    isHistoryView: state.isHistoryView
});

export default connect (
    mapStateToProps
)(ControlsView);
