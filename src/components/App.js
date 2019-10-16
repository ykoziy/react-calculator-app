import React, { Component } from "react";

import Header from "../containers/Header";
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
