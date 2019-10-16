import React, { Component } from "react";
import {evaluate} from "mathjs";

import { isDigitAddable } from "../utils";
import Header from "./Header";
import History from "./History";
import OutputScreen from "./OutputScreen";
import FormulaDisplay from "../containers/FormulaDisplay";
import OutputDisplay from "../containers/OutputDisplay"
import ButtonPanel from "./ButtonPanel";


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


        return (
          <div id="calculator">
            <Header handleViewHistoryClick={this.handleViewHistoryClick} />
            <OutputScreen>
                <FormulaDisplay/>
                <OutputDisplay/>
            </OutputScreen>
            {this.state.isHistoryView && <History history={this.state.history} handleHistoryClick={this.handleHistoryClick}/>}
            {!this.state.isHistoryView && <ButtonPanel/>}
          </div>
        );
    }
}

export default App;
