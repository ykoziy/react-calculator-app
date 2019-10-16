import React, { Component } from "react";
import {evaluate} from "mathjs";

import { isDigitAddable } from "../utils"
import { calculatorButtons } from "../constants/calculatorData"
import Header from "./Header";
import History from "./History";
import OutputScreen from "./OutputScreen";
import FormulaDisplay from "./FormulaDisplay";
import OutputDisplay from "./OutputDisplay"
import ButtonPanel from "./ButtonPanel";
import Button from "./Button"

class App extends Component {
  render() {
    return (
      <CalculatorApp />
    );
  }
}

class CalculatorApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formula: "",
            evaluated: false,
            previousResult: "",
            result: "",
            isHistoryView: false,
            history: []
        };
    }

    handleOperationClick = (event) => {
        const userInput = event.currentTarget.textContent;
        const {evaluated, previousResult} = this.state;
        let {formula} = this.state;
        let newFormula = formula.concat(userInput);

        if(evaluated) {
            this.setState({
                formula: previousResult + userInput,
                result: userInput,
                evaluated: false
            });
            return;
        }

        if(this.state.result === "" && (/[*/+]/).test(userInput)) {
            newFormula = "0" + userInput;
        }

        if(userInput === "-") {
            newFormula = newFormula.replace(/-{2}|\+-$/,userInput);
        } else {
            newFormula = newFormula.replace(/[*+\-/]{2,}$/,userInput);
        }

        this.setState({
            formula: newFormula,
            result: userInput
        });
    };

    handleNumberClick = (event) => {
        let {result, formula} = this.state;
        const {evaluated} = this.state;
        let userInput = event.currentTarget.textContent;
        let newFormula = formula.concat(userInput);

        if(evaluated) {
            this.setState({
                formula: userInput !== "0" ? userInput : "",
                result: userInput === "0" ? "" : userInput,
                evaluated: false
            });
            return;
        }

        if(!isDigitAddable(userInput, result)) {
            this.setState({
                result: result
            });
            return;
        }

        if( (/[*+\-/]0$/).test(formula)) {
            newFormula = formula.slice(0, -1) + userInput;
        } else {
            if(!(/[*+\-/]/).test(result))
            {
                userInput = result + userInput;
            }
        }

        this.setState({
            formula: newFormula,
            result: userInput
        });
    };

    handleDecimalClick = (event) => {
        let {result, formula} = this.state;
        let userInput = event.currentTarget.textContent;
        if(this.state.evaluated === true) {
            this.setState({
                formula: "0.",
                result: "0.",
                evaluated: false
            });
        } else if(!result.includes(".")) {
            let newFormula = "";
            if((/[*+\-/]$/).test(formula) || (result === "" && formula === "")) {
                userInput = "0.";
                newFormula = formula + "0.";
            }else {
                userInput = formula.match(/(\d*)$/)[0] + ".";
                newFormula = formula + ".";
            }
            this.setState({
                formula: newFormula,
                result: userInput
            });
        }

    }

    handleClearClick = (event) => {
        this.setState({
            formula: "",
            evaluated: false,
            previousResult: "",
            result: ""
        });
    }

    handleEqualsClick = (event) => {
        let {formula} = this.state;
        if(this.state.evaluated === false && formula !== "") {
            formula = formula.replace((/[*+\-/]*$/), "");
            let result = evaluate(formula).toString();
            let newFormula = formula.concat("=" + result);
            let historyItem = {
                expression: newFormula,
                result: result
            };
            this.setState({
                formula: newFormula,
                result: result.toString(),
                previousResult: result.toString(),
                evaluated: true,
                history: [historyItem, ...this.state.history]
            });
        }
    }

    handleViewHistoryClick = (event) => {
        this.setState(prevState => ({
            isHistoryView: !prevState.isHistoryView
        }));
    }

    handleHistoryClick = (event) => {
        let expression = event.currentTarget.firstChild.textContent;
        let result = event.currentTarget.lastChild.textContent
        this.setState(prevState => ({
            formula: expression,
            evaluated: true,
            previousResult: result,
            result: result,
            isHistoryView: !prevState.isHistoryView
        }));
    }

    render() {
        let buttons = calculatorButtons.map((i, idx) => {
            let eventHandler;
            if(i.type !== undefined) {
                if(i.type.includes("clear-all")) {
                    eventHandler = this.handleClearClick;
                } else if(i.type.includes("equals")) {
                    eventHandler = this.handleEqualsClick;
                } else if(i.type === "operation") {
                    eventHandler = this.handleOperationClick;
                } else if(i.type === "decimal") {
                    eventHandler = this.handleDecimalClick;
                }
            } else {
                eventHandler = this.handleNumberClick;
            }
            return <Button key={"btn-"+idx} id={i.id} type={i.type} text={i.text} handleButtonClick={eventHandler}/>
        });

        return (
          <div id="calculator">
            <Header handleViewHistoryClick={this.handleViewHistoryClick} />
            <OutputScreen>
                <FormulaDisplay formula={this.state.formula}/>
                <OutputDisplay result={this.state.result}/>
            </OutputScreen>
            {this.state.isHistoryView && <History history={this.state.history} handleHistoryClick={this.handleHistoryClick}/>}
            {!this.state.isHistoryView && <ButtonPanel>{buttons}</ButtonPanel>}
          </div>
        );
    }
}

export default App;
