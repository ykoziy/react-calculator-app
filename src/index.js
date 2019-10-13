import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style.scss';

import * as serviceWorker from './serviceWorker';

const MAX_DIGITS = 16;

const getLength = (item) => {
    const re = /\d/g;
    return ((item || "").match(re) || []).length;
}

const isDigitAddable = (digit, output) => {
    if((digit === "0" && output === "")) {
        return false;
    }
    if(getLength(output) === MAX_DIGITS) {
        return false;
    }
    return true;
}

const App = () => {
    return <CalculatorApp />;
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
            let result = eval(formula).toString();
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

    handleHistoryDelete = (event) => {
        this.setState({
            history: []
        });
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
            {this.state.isHistoryView && <History history={this.state.history} handleHistoryDelete={this.handleHistoryDelete} handleHistoryClick={this.handleHistoryClick}/>}
            {!this.state.isHistoryView && <ButtonPanel>{buttons}</ButtonPanel>}
          </div>
        );
    }
}

const Header = ({handleViewHistoryClick}) => {
    return(
        <div className="header">
            <button className="history-button" onClick={handleViewHistoryClick}><i className="fas fa-history fa-lg"></i></button>
        </div>
    );
}
Header.propTypes = {
    handleViewHistoryClick: PropTypes.func.isRequired
};

const History = ({history, handleHistoryDelete, handleHistoryClick}) => {
    let listItems = <h5>There's no history yet</h5>;
    if(history.length > 0) {
        listItems = history.map((i, idx) => {
            return <HistoryItem key={"hist-"+idx} expression={i.expression} result={i.result} handleHistoryClick={handleHistoryClick}/>;
        });
    }
    return(
        <div className="history">
            <HistoryBody>
                {listItems}
            </HistoryBody>
            <HistoryFooter history={history} handleHistoryDelete={handleHistoryDelete}/>
        </div>
    );
}
History.propTypes = {
    history: PropTypes.array.isRequired,
    handleHistoryDelete: PropTypes.func.isRequired,
    handleHistoryClick: PropTypes.func.isRequired
};

const HistoryBody = (props) => {
    return(
        <div className="history-body">
            {props.children}
        </div>
    );
}
HistoryBody.propTypes = {
    children: PropTypes.node.isRequired
};

const HistoryItem = ({expression, result, handleHistoryClick}) => {
    return (
        <div className="history-item" onClick={handleHistoryClick}>
            <div className="history-item-expression">
                {expression}
            </div>
            <div className="history-item-result">
                {result}
            </div>
        </div>
    );
}
HistoryItem.propTypes = {
    expression: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    handleHistoryClick: PropTypes.func.isRequired
};

const HistoryFooter = ({history, handleHistoryDelete}) => {
    return (
        <div className="history-footer">
            {(history.length > 0) && <button className="history-button" onClick={handleHistoryDelete}><i className="far fa-trash-alt fa-lg"></i></button>}
        </div>
    );
}
HistoryFooter.propTypes = {
    history: PropTypes.array.isRequired,
    handleHistoryDelete: PropTypes.func.isRequired
};
const OutputScreen = (props) => {
    return(
        <div id="result" className="output">
            {props.children}
        </div>
    );
}
OutputScreen.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
};

const FormulaDisplay = (props) => {
    return(
        <div id="history-display">{props.formula}</div>
    );
}
FormulaDisplay.propTypes = {
    formula: PropTypes.string.isRequired
};

const OutputDisplay = (props) => {
    let output  = props.result;
    if(props.result === "")
    {
        output = "0"
    }
    return(
        <div id="display">{output}</div>
    );
}
OutputDisplay.propTypes = {
    result: PropTypes.any.isRequired
};

const ButtonPanel = (props) => {
    return(
        <div className="buttons">
            {props.children}
        </div>
    );
}
ButtonPanel.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
};

const Button = ({id, type, text, handleButtonClick}) => {
    let btnClasses = type;
    if(btnClasses === undefined) {
        btnClasses = "btn";
    } else {
        btnClasses = "btn " + btnClasses;
    }
    return(
        <button id={id} className={btnClasses} onClick={handleButtonClick}>{text}</button>
    );
}
Button.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    handleButtonClick: PropTypes.func.isRequired
};

const calculatorButtons = [
    {
        id:"clear",
        type:"clear-all",
        text:"AC"
    },
    {
        id:"divide",
        type:"operation",
        text:"/"
    },
    {
        id:"multiply",
        type:"operation",
        text:"*"
    },
    {
        id:"seven",
        text:"7"
    },
    {
        id:"eight",
        text:"8"
    },
    {
        id:"nine",
        text:"9"
    },
    {
        id:"four",
        text:"4"
    },
    {
        id:"five",
        text:"5"
    },
    {
        id:"six",
        text:"6"
    },
    {
        id:"one",
        text:"1"
    },
    {
        id:"two",
        text:"2"
    },
    {
        id:"three",
        text:"3"
    },
    {
        id:"zero",
        text:"0"
    },
    {
        id:"subtract",
        type:"operation",
        text:"-"
    },
    {
        id:"decimal",
        type:"decimal",
        text:"."
    },
    {
        id:"add",
        type:"operation",
        text:"+"
    },
    {
        id:"equals",
        type:"operation equals",
        text:"="
    },
];

ReactDOM.render(<App />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();