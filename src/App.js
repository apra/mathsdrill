import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const shuffleArray = (arr) => arr.sort(() => (Math.random() - 0.5))

class Exercise {
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
    getRandomBetween(array) {
        let a = this.getRandomInt(0, array.length);  
    }

}
class Addition extends Exercise {
    //Difficulty goes from 0 to 1.
    constructor(difficulty) {
        super();
        this.difficulty = difficulty;
        this.riporti = Math.round(this.difficulty * 4);
        this.maxLen = 5
    }
    set setDifficulty(difficulty) {
        this.difficulty = difficulty
        this.riporti = Math.round(this.difficulty * 4);
    }
    get getRiporti() {
        return this.riporti
    }
    generateOperation() {
        let i = 0;
        let currentDigit = super.getRandomInt(1, 9);
        let newDigit = 0;
        let number0 = [];
        let number1 = [];
        while (i < this.riporti) {
            console.log(i)
            newDigit = super.getRandomInt(10 - currentDigit, 9);

            number0.push(currentDigit);
            number1.push(newDigit);

            currentDigit = super.getRandomInt(1, 9);
            i++;
        }
        let otherDigits0 = number0.length + super.getRandomInt(0, this.maxLen - number0.length)
        let otherDigits1 = number1.length + super.getRandomInt(0, this.maxLen - number1.length)
        let ten = super.getRandomInt(0, this.maxLen - number0.length)

        i = 0
        while (i < this.maxLen - this.riporti) {
            if (number0.length < otherDigits0)
                number0.push(super.getRandomDigit())
            if (number1.length < otherDigits1)
                number1.push(super.getRandomDigit())
            i++
        }
        console.log(number0)
        console.log(number1)
        i = 0
        let smallerNumber = (number0.length< number1.length)? number0.map((i)=>(i)) : number1.map((i)=>(i))
        let indexes = smallerNumber.map(function(digit) {
            return i++;
        })
        console.log(indexes)
        indexes = shuffleArray(indexes);

        let firstNumber = indexes.map(function(index) {
            return number0[index]
        })
        let secondNumber = indexes.map(function(index) {
            return number1[index]
        })
        let a = firstNumber.length;
        let b = secondNumber.length;
        while (a < number0.length) {
            firstNumber[a] = number0[a++]
        }
        while (b < number1.length) {
            firstNumber[b] = number1[b++]  
        }

        //number0 = shuffleArray(number0)
        //number1 = shuffleArray(number1)
        return [firstNumber, secondNumber]
    }
    toArray() {
        return this.generateOperation();
    }
    toString() {
        console.log(this.riporti)
        let operation = this.generateOperation();
        return parseInt(operation[0].join('')) + " + " + parseInt(operation[1].join(''));
    }
}
class App extends Component {
    constructor() {
        super()
        this.prova = new Addition(0.5);
    }
    render() {
        let operation = this.prova.toArray();
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>

                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>        
                <p>{operation[0]}  +</p>
                <p>{operation[1]}</p>
                <p>{this.prova.getRiporti}</p>
            </div>
                </div>
        );
    }
}


export default App;
