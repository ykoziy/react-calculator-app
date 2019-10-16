import React from "react";
import PropTypes from 'prop-types';
import HistoryItem from "./HistoryItem";
import HistoryBody from "./HistoryBody";
import HistoryFooter from "../containers/HistoryFooter";

const History = ({history, handleHistoryDelete, handleHistoryClick}) => {
    let listItems = <h5>There's no history yet</h5>;
    if(history.length > 0) {
        listItems = history.map((i, idx) => {
            return <HistoryItem key={"hist-"+idx} expression={i.expression} result={i.result} handleHistoryClick={handleHistoryClick}/>;
        });
    }
    return(
        <div className="history">
            <HistoryBody>
                {listItems}
            </HistoryBody>
            <HistoryFooter history={history} handleHistoryDelete={handleHistoryDelete}/>
        </div>
    );
}
History.propTypes = {
    history: PropTypes.array.isRequired,
    handleHistoryDelete: PropTypes.func.isRequired,
    handleHistoryClick: PropTypes.func.isRequired
};

export default History;