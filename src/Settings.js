import React, { Component } from 'react';

class OperationList extends Component {
  constructor() {
    super();
    this.addOperation = this.addOperation.bind(this);
  }
  operationNumbertoName(number) {
    let string = ''
    switch (number) {
      case 0:
        string = 'Addition'
        break;
      case 1:
        string = 'Subtraction'
        break;
      case 2:
        string = 'Multiplication'
        break;
      case 3:
        string = 'Division'
        break;
      default:
        string = ''
        break;
    }
    return string;
  }
  addOperation(id, mode, amount) {
    this.props.addOperation(id, mode, amount)
  }
  render() {
    let operations = this.props.settings.operation.split(',').map((operation) => {
      return parseInt(operation, 10);
    });
    let self = this;
    console.log(operations)
    return (
      <div className="operationList">
        <ul>
          {operations.map(function (operation, key) {
            let name = self.operationNumbertoName(operation);

            return (
              <li key={key}> <p className="name"> {name} </p> <span className="options">Options</span> <span className="remove">Remove</span> </li>
            )

          })}
          <li className="newOperation">
            <span onClick={(e) => { this.addOperation(0, 0, 10) }}>SUM</span>
            <span onClick={(e) => { this.addOperation(1, 0, 10) }}>SUB</span>
            <span onClick={(e) => { this.addOperation(2, 0, 10) }}>MUL</span>
            <span onClick={(e) => { this.addOperation(3, 0, 10) }}>DIV</span>
          </li>
        </ul>
      </div>
    )
  }
}


class Settings extends Component {
  constructor() {
    super();
    this.addOperation = this.addOperation.bind(this);

  }
  parseUpdateSettings(e, inputSettings) {
    if (inputSettings === {} || inputSettings === undefined) {
      console.error("Nothing was defined for settings, something went wrong.")
      return null;
    }
    console.log(e)
    console.log(inputSettings)
    let settings = inputSettings;
    if (settings.difficulty !== undefined) {

    }
    for (let a in settings) {

    }
  }
  addOperation(id, mode, amount) {
    this.props.addOperation(id, mode, amount);
  }
  render() {

    let difficulty = this.props.difficulty;
    return (
      <div className="settings">
        <div className="difficulty">
          <p className="name">Difficulty</p>
          <ul className="difficultySelector">
            <li onClick={(e) => { this.parseUpdateSettings(e, { difficulty: 0.2 }) }} className={(difficulty === 0.2) ? 'selected' : ''}>Easy</li>
            <li onClick={(e) => { this.parseUpdateSettings(e, { difficulty: 0.5 }) }} className={(difficulty === 0.5) ? 'selected' : ''}>Medium</li>
            <li onClick={(e) => { this.parseUpdateSettings(e, { difficulty: 1 }) }} className={(difficulty === 1) ? 'selected' : ''}>Hard</li>
          </ul>
        </div>
        <div className="operations">
          <p className="name">Exercise</p>
          <ul>
            <li>
              <OperationList parse={this.parseUpdateSettings} addOperation={this.addOperation} settings={this.props.settings} />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Settings;