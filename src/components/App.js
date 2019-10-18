import React, { Component } from "react";
import '../assets/css/components/App.scss';

import Header from "../containers/Header";
import Display from "./Display";
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
            <Display>
                <FormulaDisplay />
                <OutputDisplay />
            </Display>
            <ControlsView />
          </div>
        );
    }
}

export default App;
