import React from "react";
import { calculatorButtons } from "../constants/calculatorData";
import Button from "../containers/Button";
import DigitButton from "../containers/DigitButton";

const ButtonModule = (idx, id, type, text) => {
    const digitButton = () => {
        return <DigitButton key={"btn-"+idx} id={id} type={type} text={text} />
    }
    const operationButton = () => {
        //return <OperationButton key={"btn-"+idx} id={id} type={type} text={text} />
        return "WIP"
    }

    return {
        digitButton: digitButton,
        operationButton: operationButton
    };
};

const Keypad = () => {
    let buttons = calculatorButtons.map((i, idx) => {
        let btn = ButtonModule(idx, i.id, i.type, i.text);
        if (i.type === 'number' || i.type === 'decimal') {
            return btn.digitButton();
        } else {
            return <Button key={"btn-"+idx} id={i.id} type={i.type} text={i.text} />
        }
    });

    return(
        <div className="buttons">
            {buttons}
        </div>
    );
}

export default Keypad;
