import React, { Component } from "react";

import Header from "../containers/Header";
import OutputScreen from "./OutputScreen";
import FormulaDisplay from "../containers/FormulaDisplay";
import OutputDisplay from "../containers/OutputDisplay";
import ControlsView from "../containers/ControlsView";

class App extends Component {
  render() {
    return <CalculatorApp />;
  }
}

class CalculatorApp extends React.Component {
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
