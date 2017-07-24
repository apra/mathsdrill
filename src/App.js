import React, { Component } from 'react';
import './App.css';

//const shuffleArray = (arr) => arr.sort(() => (Math.random() - 0.5))
class Exercise {
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min === max)
      return max;

    return Math.floor(Math.random() * (max + 1 - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
}
class Pythagoras extends Exercise{
  constructor(noptions) {
    super()
    let options = noptions || {}
    this.numbers = []
    let i = 0
    for (let a = 2; a < 13; a++) {
      for (let b = a; b < 13; b++) {
        this.numbers[i++] = [a, b, a*b]
      }
    }
    this.cacheSize = 20;
    this.cache = [];

    this.exerciseLength = options.exerciseLength || 30
    this.useCache = false
    if (this.exerciseLength > this.numbers.length) {
      this.useCache = true
    }
  }

  newOperation() {
    if (this.cache.length === this.cacheSize && this.useCache) {
      this.numbers.push(this.cache.pop())
    }

    let index = super.getRandomInt(0, this.numbers.length-1)
    let numbers = this.numbers[index]
    
    if (this.useCache) {
      this.cache.push(numbers)
    }

    this.numbers.splice(index, 1);
    return numbers;
  }

  newExercise() {
    let exercise = []
    for (let a = 0; a < this.exerciseLength; a++){
      exercise[a] = this.newOperation();
    }
    return exercise;
  }
}
class Operation {
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min === max)
      return max;

    return Math.floor(Math.random() * (max + 1 - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  getRandomDigit() {
    return Math.floor(Math.random() * 10);
  }
  coinFlip() {
    return (Math.floor(Math.random() * 2) === 0);
  }

}
class Addition extends Operation {
  //Difficulty goes from 0 to 1.
  constructor(difficulty) {
    super();
    this.difficulty = Math.min(Math.max(difficulty, 0.2), 1);

    this.maxLen = 10
    this.maxRiporti = 5
    this.maxDifficulty = this.maxLen + this.maxRiporti
  }
  get operatore() {
    return "+";
  }
  generateOperation() {
    console.log("New operation")
    //D is the effective difficulty (it's not descriptive but doesn't waste space)
    let D = Math.round(this.difficulty * this.maxDifficulty);
    //The number of carries in the operation 
    let carry = super.getRandomInt(1, this.maxRiporti * this.difficulty);
    //The number of digits in the number
    let nDigit = Math.max(D - carry, 3)

    //If there arent enough digits
    if (nDigit + carry < D) {
      nDigit = D - carry
    }

    //Number of digits in first number
    let nDigit0 = Math.floor(nDigit / 2)
    //Digits in secon number
    let nDigit1 = nDigit - nDigit0;

    let remain = Math.min(nDigit0, nDigit1)
    let firstNumber = []
    let secondNumber = []
    let Digit = super.getRandomDigit();
    let newDigit = -1;
    let carryLeft = carry;
    console.log(carry)
    while (remain > 0) {
      //If Digit is 0 then I can't have a carry
      if (Digit === 0 && carryLeft >= 0) {
        Digit = super.getRandomInt(1, 9)
      }
      if (super.coinFlip() === true && (remain - carryLeft) > 0) {
        newDigit = super.getRandomInt(0, 10 - Digit - 1)
      } else {
        newDigit = super.getRandomInt(10 - Digit, 9)
        carryLeft--
      }
      firstNumber.push(Digit)
      secondNumber.push(newDigit)
      Digit = super.getRandomDigit();
      remain--;
    }

    let l = firstNumber.length
    for (let j = l; j < nDigit0; j++) {
      firstNumber[j] = super.getRandomInt(1, 9)
    }
    l = secondNumber.length
    for (let j = l; j < nDigit1; j++) {
      secondNumber[j] = super.getRandomInt(1, 9)
    }

    return [firstNumber, secondNumber]
  }
  toArray() {
    let numbers = this.generateOperation()
    let firstNumber = parseInt(numbers[0].reverse().join(''), 10);
    let secondNumber = parseInt(numbers[1].reverse().join(''), 10)
    let result = firstNumber + secondNumber;
    return [firstNumber, secondNumber, result]
  }
  toString() {
    let operation = this.generateOperation();
    return parseInt(operation[0].join(''), 10) + " + " + parseInt(operation[1].join(''), 10);
  }
}
class Subtraction extends Operation {
  constructor(difficulty, negative) {
    super();
    this.difficulty = Math.min(Math.max(difficulty, 0.2), 1);
    this.negative = negative
    this.maxLen = 10
    this.maxRiporti = 5
    this.maxDifficulty = this.maxLen + this.maxRiporti
  }
  get operatore() {
    return "-";
  }
  generateNonNegativeOperation() {
    console.log("New operation")
    //D is the effective difficulty (it's not descriptive but doesn't waste space)
    let D = Math.round(this.difficulty * this.maxDifficulty);
    //The number of carries in the operation 
    let carry = super.getRandomInt(1, this.maxRiporti * this.difficulty);
    //The number of digits in the number
    let nDigit = Math.max(D - carry, 4)

    //If there arent enough digits
    if (nDigit + carry < D) {
      nDigit = D - carry
    }

    //Number of digits in first number
    let nDigit0 = Math.round(nDigit / 2)
    if (nDigit0 < nDigit / 2) {
      nDigit0 = nDigit0 + 1
    }
    //Digits in secon number
    let nDigit1 = nDigit - nDigit0;

    let remain = Math.min(nDigit0, nDigit1)
    let firstNumber = []
    let secondNumber = []
    let Digit = super.getRandomInt(1, 9);
    let newDigit = -1;
    let carryLeft = carry;
    console.log(carry)
    while (remain > 0) {
      //If Digit is 9 then I can't have a carry
      if (Digit === 9 && (carryLeft) >= 0) {
        Digit = super.getRandomInt(1, 8)
      }
      if (Digit === 0) {
        carryLeft--
      }
      if (super.coinFlip() === true && (remain - carryLeft) > 0) {
        newDigit = super.getRandomInt(0, Digit)
      } else {
        newDigit = super.getRandomInt(Digit + 1, 9)
        carryLeft--
      }
      firstNumber.push(Digit)
      secondNumber.push(newDigit)
      Digit = super.getRandomDigit();
      remain--;
    }

    let l = firstNumber.length
    for (let j = l; j < nDigit0; j++) {
      firstNumber[j] = super.getRandomInt(1, 9)
    }
    l = secondNumber.length
    console.log(l)
    for (let j = l; j < nDigit1; j++) {
      console.log(j)
      secondNumber[j] = super.getRandomInt(1, 9)
    }
    let result = (parseInt(firstNumber.slice(0).reverse().join(''), 10) - parseInt(secondNumber.slice(0).reverse().join(''), 10))
    if (result < 0) {
      firstNumber.push(super.getRandomInt(1, 9))
    }
    return [firstNumber, secondNumber]
  }
  generateOperation() {
    console.log("New operation")
    //D is the effective difficulty (it's not descriptive but doesn't waste space)
    let D = Math.round(this.difficulty * this.maxDifficulty);
    //The number of carries in the operation 
    let carry = super.getRandomInt(1, this.maxRiporti);
    //The number of digits in the number
    let nDigit = Math.max(D - carry, 3)

    //If there arent enough digits
    if (nDigit + carry < D) {
      nDigit = D - carry
    }

    //Number of digits in first number
    let nDigit0 = Math.floor(nDigit / 2)
    //Digits in secon number
    let nDigit1 = nDigit - nDigit0;

    let remain = Math.max(nDigit0, nDigit1)
    let firstNumber = []
    let secondNumber = []
    let Digit = super.getRandomDigit();
    let newDigit = -1;
    let carryLeft = carry;
    console.log(carry)
    while (remain > 0) {
      //If Digit is 9 then I can't have a carry
      if (Digit === 9 && (remain - carryLeft) <= 0) {
        Digit = super.getRandomInt(0, 8)
      }
      if (super.coinFlip() === true && (remain - carryLeft) > 0) {
        newDigit = super.getRandomInt(0, Digit)
      } else {
        newDigit = super.getRandomInt(Digit + 1, 9)
        carryLeft--
      }
      firstNumber.push(Digit)
      secondNumber.push(newDigit)
      Digit = super.getRandomDigit();
      remain--;
    }

    let l = firstNumber.length
    for (let j = l; j < nDigit0; j++) {
      firstNumber[j] = super.getRandomInt(1, 9)
    }
    l = secondNumber.length
    for (let j = l; j < nDigit1; j++) {
      secondNumber[j] = super.getRandomInt(1, 9)
    }

    return [firstNumber, secondNumber]
  }
  toArray() {
    let numbers = [];
    if (!this.negative) {
      numbers = this.generateNonNegativeOperation()
    } else {
      numbers = this.generateOperation()
    }

    let firstNumber = parseInt(numbers[0].slice(0).reverse().join(''), 10);
    let secondNumber = parseInt(numbers[1].slice(0).reverse().join(''), 10)
    let result = firstNumber - secondNumber;

    return [firstNumber, secondNumber, result]
  }
}
class Multiplication extends Operation {
  //Difficulty goes from 0 to 1.
  constructor(difficulty, mode) {
    super();
    this.difficulty = Math.min(Math.max(difficulty, 0.2), 1);
    this.mode = mode;
    this.maxLen = 10
    this.maxRiporti = 5
    this.maxDifficulty = this.maxLen + this.maxRiporti
  }
  get operatore() {
    return "+";
  }
  generatePythagoras() {
    let firstNumber = super.getRandomInt(1, 9)
    let secondNumber = super.getRandomInt(1,9)
  }
  generateOperation() {
    console.log("New operation")
    //D is the effective difficulty (it's not descriptive but doesn't waste space)
    let D = Math.round(this.difficulty * this.maxDifficulty);
    //The number of carries in the operation 
    let carry = super.getRandomInt(1, this.maxRiporti * this.difficulty);
    //The number of digits in the number
    let nDigit = Math.max(D - carry, 3)

    //If there arent enough digits
    if (nDigit + carry < D) {
      nDigit = D - carry
    }

    //Number of digits in first number
    let nDigit0 = Math.floor(nDigit / 2)
    //Digits in secon number
    let nDigit1 = nDigit - nDigit0;

    let remain = Math.min(nDigit0, nDigit1)
    let firstNumber = []
    let secondNumber = []
    let Digit = super.getRandomDigit();
    let newDigit = -1;
    let carryLeft = carry;
    console.log(carry)
    while (remain > 0) {
      //If Digit is 0 then I can't have a carry
      if (Digit === 0 && carryLeft >= 0) {
        Digit = super.getRandomInt(1, 9)
      }
      if (super.coinFlip() === true && (remain - carryLeft) > 0) {
        newDigit = super.getRandomInt(0, 10 - Digit - 1)
      } else {
        newDigit = super.getRandomInt(10 - Digit, 9)
        carryLeft--
      }
      firstNumber.push(Digit)
      secondNumber.push(newDigit)
      Digit = super.getRandomDigit();
      remain--;
    }

    let l = firstNumber.length
    for (let j = l; j < nDigit0; j++) {
      firstNumber[j] = super.getRandomInt(1, 9)
    }
    l = secondNumber.length
    for (let j = l; j < nDigit1; j++) {
      secondNumber[j] = super.getRandomInt(1, 9)
    }

    return [firstNumber, secondNumber]
  }
  toArray() {
    let numbers = this.generateOperation()
    let firstNumber = parseInt(numbers[0].reverse().join(''), 10);
    let secondNumber = parseInt(numbers[1].reverse().join(''), 10)
    let result = firstNumber + secondNumber;
    return [firstNumber, secondNumber, result]
  }
  toString() {
    let operation = this.generateOperation();
    return parseInt(operation[0].join(''), 10) + " + " + parseInt(operation[1].join(''), 10);
  }
}
class App extends Component {
  constructor() {
    super()
    this.addition = new Addition(1);
    this.subtraction = new Subtraction(0.2, true);
    this.pythagoras = new Pythagoras({exerciseLength: 500})
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
    console.log(exercise)
    return (
      <div className="App">
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
