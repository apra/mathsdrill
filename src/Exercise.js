import React, { Component } from 'react';
import { Addition, Subtraction, Multiplication, Division } from './Services.js';

class Operation extends Component {
  constructor() {
    super()
    this.state = {
      mode: "hidden",
      left: -1
    }
  }
  render() {
    let operations = this.props.operations
    return (
      {/*
      <div className="operation sum-sub" key={u}>
        <div className="topPart">
          <div className="operandi">
            <span className="firstNumber">{operation[0]}</span>
            <span className="secondNumber">{operation[1]}</span>
          </div>
          <div className="operatore">X</div>
        </div>
        <div className="bottomPart">
          <div className="result">{operation[2]}</div>
        </div>
      </div>*/}
    )
  }
}


class Exercise extends Component {
  constructor() {
    super();
    console.log("before constructor")
    this.operation = {}
    this.startExercise = this.startExercise.bind(this);
    this.state = {
      mode: "hidden",
      left: -1
    }
    this.timer = 0
    console.log("after constructor")
  }

  startExercise(e) {
    //console.log("started new exercise")
    //console.log(e.target)
    this.setState(prevState => ({
      scene: "playing",
    }));
    this.timer = Date.now()
    //this.props.eventHandler(e);
  }
  answerOperation(e) {

  }
  componentWillUpdate() {

  }
  componentDidUpdate() {
    console.log(this.props)
  }
  parseOperation(settings) {
    let operationsID = settings.operation.split(',');
    let modes = settings.mode.split(',');
    let amounts = settings.amount.split(',');
    let operations = []
    for (let i = 0; i < operationsID.length; i++) {
      let mode = parseInt(modes[i], 10)
      let amount = parseInt(amounts[i], 10)
      switch (parseInt(operationsID[i], 10)) {
        case 0:
          operations[i] = new Addition(settings.difficulty);
          break;
        case 1:
          operations[i] = new Subtraction(settings.difficulty, mode);
          break;
        case 2:
          operations[i] = new Multiplication(settings.difficulty);
          break;
        case 3:
          operations[i] = new Division(settings.difficulty, mode);
          break;
        default:
          operations[i] = new Addition(0.5);
      }
    }
    return operations
  }
  render() {
    let settings = this.props.settings;
    this.operations = this.parseOperation(settings)
    this.amounts = this.props.settings.amount.split(',').map((amount) => {
      return parseInt(amount, 10);
    });
    this.elements = []
    let j = 0;
    let e = 0;
    for (let a in this.operations) {
      for (let i = 0; i < this.amounts[a]; i++) {
        this.elements[e++] = [this.operations[a].toArray(), this.operations[a].operatore];
      }

    }

    console.log(settings)
    console.log(this.operations)
    return (
      <div className="exercise">
        <div onClick={this.startExercise}> Start</div>
        {this.elements.map(function (operation, u) {
          console.log(operation)
          return (
            <div className="prova" key={u}>
              <div className="operation sum-sub" key={u}>
                <div className="topPart">
                  <div className="operandi">
                    <span className="firstNumber">{operation[0][0]}</span>
                    <span className="secondNumber">{operation[0][1]}</span>
                  </div>
                  <div className="operatore">{operation[1]}</div>
                </div>
                <div className="bottomPart">
                  <div className="result">{operation[0][2]}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Exercise;