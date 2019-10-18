import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../assets/css/components/History/Footer.scss';
import { clearHistory } from '../actions';

const HistoryFooter = ({history, clearHistory}) => {
    return (
        <div className="history-footer">
            {
                (history.length > 0) &&
                <button className="history-button" onClick={clearHistory}>
                    <i className="far fa-trash-alt fa-lg"></i>
                </button>
            }
        </div>
    );
}
HistoryFooter.propTypes = {
    history: PropTypes.array.isRequired,
    clearHistory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    history: state.history
});

const mapDispatchToProps = (dispatch) => ({
  clearHistory: () => dispatch(clearHistory())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryFooter);
