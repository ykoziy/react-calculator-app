import React, { Component } from "react";

import Header from "../containers/Header";
import OutputScreen from "./OutputScreen";
import FormulaDisplay from "../containers/FormulaDisplay";
import OutputDisplay from "../containers/OutputDisplay";
import ControlsView from "../containers/ControlsView";

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
            <Header />
            <OutputScreen>
                <FormulaDisplay />
                <OutputDisplay />
            </OutputScreen>
            <ControlsView />
          </div>
        );
    }
}

export default App;
