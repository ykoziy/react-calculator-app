import React from "react";
import PropTypes from 'prop-types';
import { calculatorButtons } from "../constants/calculatorData";
import Button from "./Button";

const ButtonPanel = (props) => {
    let buttons = calculatorButtons.map((i, idx) => {
        let eventHandler;
        return <Button key={"btn-"+idx} id={i.id} type={i.type} text={i.text} />
    });
    return(
        <div className="buttons">
            {buttons}
        </div>
    );
}
ButtonPanel.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default ButtonPanel;