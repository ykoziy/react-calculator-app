import React from "react";
import { calculatorButtons } from "../constants/calculatorData";
import DigitButton from "../containers/DigitButton";
import OperationButton from "../containers/OperationButton";
import EqualsButton from "../containers/EqualsButton";

const ButtonModule = (idx, id, type, text) => {
    const digitButton = () => {
        return <DigitButton key={"btn-"+idx} id={id} type={type} text={text} />
    }
    const operationButton = () => {
        return <OperationButton key={"btn-"+idx} id={id} type={type} text={text} />
    }

    const equalsButton = () => {
        return <EqualsButton key={"btn-"+idx} id={id} type={type} text={text} />
    }

    return {
        digitButton: digitButton,
        operationButton: operationButton,
        equalsButton: equalsButton
    };
}

const Keypad = () => {
    let buttons = calculatorButtons.map((item, idx) => {
        let {id, type, text} = item;
        let btn = ButtonModule(idx, id, type, text);
        if (type === 'number' || type === 'decimal') {
            return btn.digitButton();
        } else if (type === 'operation' || type === 'clear-all') {
            return btn.operationButton();
        } else {
            return btn.equalsButton();
        }
    });

    return(
        <div className="buttons">
            {buttons}
        </div>
    );
}

export default Keypad;
