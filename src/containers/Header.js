import React from "react";
import PropTypes from 'prop-types';
import '../assets/css/components/Header.scss';
import { connect } from 'react-redux';
import { toggleHistoryView } from '../actions'

const Header = ({toggleHistoryView}) => {
    return(
        <div className="header">
            <button className="history-button" onClick={toggleHistoryView}>
              <i className="fas fa-history fa-lg"></i>
            </button>
        </div>
    );
}
Header.propTypes = {
    toggleHistoryView: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    toggleHistoryView: () => dispatch(toggleHistoryView())
});

export default connect(
    null,
    mapDispatchToProps
)(Header);
