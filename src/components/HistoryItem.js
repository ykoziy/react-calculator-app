import React from 'react';
import PropTypes from 'prop-types';

const HistoryItem = ({expression, result, handleHistoryClick}) => {
    return (
        <div className="history-item" onClick={handleHistoryClick}>
            <div className="history-item-expression">
                {expression}
            </div>
            <div className="history-item-result">
                {result}
            </div>
        </div>
    );
}
HistoryItem.propTypes = {
    expression: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    handleHistoryClick: PropTypes.func.isRequired
};

export default HistoryItem;