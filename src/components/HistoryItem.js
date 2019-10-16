import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectHistoryItem } from '../actions'

const HistoryItem = ({expression, result, selectHistoryItem}) => {
    const handleItemClick = () => {
        selectHistoryItem({
            formula: expression,
            previousResult: result,
            result: result,
        });
    }

    return (
        <div className="history-item" onClick={handleItemClick}>
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
    selectHistoryItem: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    selectHistoryItem: (obj) => dispatch(selectHistoryItem(obj))
});

export default connect(
    null,
    mapDispatchToProps
)(HistoryItem);
