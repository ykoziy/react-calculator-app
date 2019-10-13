import React from "react";
import PropTypes from 'prop-types';

const HistoryFooter = ({history, handleHistoryDelete}) => {
    return (
        <div className="history-footer">
            {(history.length > 0) && <button className="history-button" onClick={handleHistoryDelete}><i className="far fa-trash-alt fa-lg"></i></button>}
        </div>
    );
}
HistoryFooter.propTypes = {
    history: PropTypes.array.isRequired,
    handleHistoryDelete: PropTypes.func.isRequired
};

export default HistoryFooter;