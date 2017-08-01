import React, { Component } from 'react';
import { Addition, Subtraction, Multiplication, Division } from './Services.js';
/*
* TODO
*  There should be a list of all actual operations
*  but not generated here, here there should only be
*  a list of the numbers and results, the app should
*  give to Exercise the actual list of operations, so
*  that it an be scrambled properly and so that there
*  can be metadata attached, like the fact that it's
*  a right or a wrong answer and if it's visible or not
*
*  Every operation should not be visible, if not for
*  the only one which is being asked right now
*  so the scanning through all the array can be
*  reduced to scanning through only the operations up
*  to the one which is displayed
*/
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
      visible: 0,
      points: 0
    }
    this.timer = 0
    console.log("after constructor")
    this.submitResult = this.submitResult.bind(this);
  }

  startExercise(e, elements) {
    //console.log("started new exercise")
    //console.log(e.target)
    /*let visibilities = []
    visibilities[0] = true
    for (let i = 1; i < elements.length; i++) {
      visibilities[i] = false
    }*/

    this.setState(prevState => ({
      scene: "playing",
      points: 0,
      visible: 0
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
          operations[i] = {};
      }
    }
    return operations
  }
  submitResult(e, result, element) {
    console.log(e.target.value)
    let point = (result===parseInt(e.target.value,10))? 1 : 0
    this.setState(prevState => {
      console.log(element)
      /*let visibilities = prevState.visibility;
      visibilities[element] = false
      if (element + 1 < visibilities.length) {
        visibilities[element + 1] = true;
      }
      console.log(prevState.points)*/
    
      return ({
        points: prevState.points + point,
        visible: element+1
      })
    })
    return true;
  }

  componentDidUpdate() {
    if(this.resultInput)
      this.resultInput.focus();   
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

    let self = this;

    console.log(settings)
    console.log(this.operations)
    return (
      <div className="exercise">
        {this.state.points}
        <div onClick={(e) => {
          this.startExercise(e, self.elements)
        }}> Start</div>
        {this.elements.map(function (operation, u, array) {
          console.log(self.state.visible)
          if (self.state.visible === u) {
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
                    <input onKeyPress={(e) => {
                      if (e.key == 'Enter') {
                        self.submitResult(e, operation[0][2], u)
                      }  
                    }} className="result" ref={(input) => { self.resultInput = input; }} />
                  </div>
                </div>
              </div>
            )
          } else {
            return ("");
          }
        })}
      </div>
    );
  }
}

export default Exercise;