import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HistoryItem from "./HistoryItem";
import HistoryBody from "./HistoryBody";
import HistoryFooter from "../containers/HistoryFooter";

const History = ({history}) => {
    let listItems = <h5>There's no history yet</h5>;
    if(history.length > 0) {
        listItems = history.map((i, idx) => {
            return <HistoryItem key={"hist-"+idx}/>;
        });
    }
    return(
        <div className="history">
            <HistoryBody>
                {listItems}
            </HistoryBody>
            <HistoryFooter/>
        </div>
    );
}
History.propTypes = {
    history: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    history: state.history
});

export default connect(
    mapStateToProps
)(History);
