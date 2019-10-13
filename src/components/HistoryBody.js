import React from 'react';
import PropTypes from 'prop-types';

const HistoryBody = (props) => {
    return(
        <div className="history-body">
            {props.children}
        </div>
    );
}
HistoryBody.propTypes = {
    children: PropTypes.node.isRequired
};

export default HistoryBody;