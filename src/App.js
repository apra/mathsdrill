import React, { Component } from 'react';
import { Addition, Subtraction, Multiplication, Division, Pythagoras } from './Services.js';
import Exercise from './Exercise.js';
import Settings from './Settings.js'
import './App.css';


class App extends Component {
  constructor() {
    super()
    this.addition = new Addition(1);
    this.subtraction = new Subtraction(0.2, true);
    this.pythagoras = new Pythagoras({ exerciseLength: 5 })
    this.multiplication = new Multiplication(0.2)
    this.division = new Division(0.5, 2);
    this.state = {
      //0: addition, 1: subtraction, 2: multiplication, 3: division
      operation: "0",
      mode: "0",
      amount: "20",
      difficulty: 0.5
    }
    this.updateSettings = this.updateSettings.bind(this);
    this.addOperation = this.addOperation.bind(this);
  }
  updateSettings(inputSettings) {
    console.log("updating State")

    this.setState(prevState => ({
      operation: inputSettings.operation || prevState.operation,
      mode: inputSettings.mdoe || prevState.mode,
      difficulty: inputSettings.difficulty || prevState.difficulty,
      amount: inputSettings.amount || prevState.amount,
      scene: inputSettings.scene || prevState.scene,
    }))
  }
  addOperation(operationID, mode, amount) {
    this.setState(prevState => ({
      operation: prevState.operation+","+operationID,
      mode: prevState.mode+","+mode,
      amount: prevState.amount+","+amount,
    }))
  }
  render() {
    //let operation = this.prova.toArray();
    let operations = []
    for (let i = 0; i < 1; i++) {
      operations[i] = this.subtraction.toArray();
    }
    let operatore = this.addition.operatore
    let sub = this.addition.toArray()

    let exercise = this.pythagoras.newExercise();

    let mul = this.multiplication.toArray();
    let div = this.division.toArray();
    return (
      <div className="App">
        <Settings settings={this.state} updateSettings={this.updateSettings} addOperation={this.addOperation}/>
        <Exercise settings={this.state} eventHandler={this.updateSettings} />

        {operations.map(function (operation, u) {
          return (
            <div className="operation sum-sub" key={u}>
              <div className="topPart">
                <div className="operandi">
                  <span className="firstNumber">{operation[0]}</span>
                  <span className="secondNumber">{operation[1]}</span>
                </div>
                <div className="operatore">{operatore}</div>
              </div>
              <div className="bottomPart">
                <div className="result">{operation[2]}</div>
              </div>
            </div>
          )
        })}
        <div className="operation sum-sub">
          <div className="topPart">
            <div className="operandi">
              <span className="firstNumber">{sub[0]}</span>
              <span className="secondNumber">{sub[1]}</span>
            </div>
            <div className="operatore">{this.subtraction.operatore}</div>
          </div>
          <div className="bottomPart">
            <div className="result">{sub[2]}</div>
          </div>
        </div>
        <div className="operation sum-sub">
          <div className="topPart">
            <div className="operandi">
              <span className="firstNumber">{mul[0]}</span>
              <span className="secondNumber">{mul[1]}</span>
            </div>
            <div className="operatore">{this.multiplication.operatore}</div>
          </div>
          <div className="bottomPart">
            <div className="result">{mul[2]}</div>
          </div>
        </div>
        <div className="operation sum-sub">
          <div className="topPart">
            <div className="operandi">
              <span className="firstNumber">{div[0]}</span>
              <span className="secondNumber">{div[1]}</span>
            </div>
            <div className="operatore">{this.division.operatore}</div>
          </div>
          <div className="bottomPart">
            <div className="result">{div[2][0]} / {div[2][1]}</div>
          </div>
        </div>
        {exercise.map(function (operation, u) {
          return (
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
            </div>
          )
        })}
      </div>
    );
  }
}


export default App;
