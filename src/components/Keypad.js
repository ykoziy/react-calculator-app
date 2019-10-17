import React from "react";
import { calculatorButtons } from "../constants/calculatorData";
import Button from "../containers/Button";

const Keypad = () => {
    let buttons = calculatorButtons.map((i, idx) => {
        return <Button key={"btn-"+idx} id={i.id} type={i.type} text={i.text} />
    });
    return(
        <div className="buttons">
            {buttons}
        </div>
    );
}

export default Keypad;
