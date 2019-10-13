import React from "react";

const Header = ({handleViewHistoryClick}) => {
    return(
        <div className="header">
            <button className="history-button" onClick={handleViewHistoryClick}><i className="fas fa-history fa-lg"></i></button>
        </div>
    );
}

Header.propTypes = {
    handleViewHistoryClick: PropTypes.func.isRequired
};

export default Header;
