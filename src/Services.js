//const shuffleArray = (arr) => arr.sort(() => (Math.random() - 0.5))
class Exercise {
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min === max)
      return max;

    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }
}
class Pythagoras extends Exercise {
  constructor(exerciseLength) {
    super();
    this.numbers = []
    let i = 0
    for (let a = 2; a < 13; a++) {
      for (let b = a; b < 13; b++) {
        this.numbers[i++] = [a, b, a * b]
      }
    }
    this.cacheSize = 20;
    this.cache = [];

    this.exerciseLength = exerciseLength
    /*this.useCache = false
    if (this.exerciseLength > this.numbers.length) {
      this.useCache = true
    }*/
  }

  newOperation() {
    if (this.cache.length === this.cacheSize/* && this.useCache*/) {
      this.numbers.push(this.cache.pop())
    }

    let index = super.getRandomInt(0, this.numbers.length - 1)
    let numbers = this.numbers[index]

    //if (this.useCache) {
      this.cache.push(numbers)
    //}

    this.numbers.splice(index, 1);
    return numbers;
  }
  toArray() {
    return this.newOperation();
  }

  newExercise() {
    let exercise = []
    for (let a = 0; a < this.exerciseLength; a++) {
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

    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }
  getRandomDigit() {
    return Math.floor(Math.random() * 10);
  }
  coinFlip() {
    return (Math.floor(Math.random() * 2) === 0);
  }
  toNumber(arr) {
    if (typeof arr === "number") {
      return arr
    } else {
      return parseInt(arr.slice(0).reverse().join(''), 10);
    }  
  }
  toArray(number) {
    let string = '' + number
    return string.split('').slice(0).reverse()
  }
  //https://jsfiddle.net/JamesOR/RC7SY/
  getAllFactorsFor(remainder) {
    var factors = [], i;

    for (i = 2; i <= remainder; i++) {
      while ((remainder % i) === 0) {
        factors.push(i);
        let temp = []
        for (let a = 0; a < factors.length - 1; a++) {
          temp[a] = factors[factors.length - 1] * factors[a];
        }
        console.log(temp)
        factors = factors.concat(temp)
        remainder /= i;
      }
    }

    return factors;
  }
  //https://stackoverflow.com/questions/28575416/finding-out-if-two-numbers-are-relatively-prime
  gcd(a, b) {
    let t;
    while (b !== 0) {
      t = a;
      a = b;
      b = t % b;
    }
    return a;
  }
  relativelyPrime(a, b) {
    return this.gcd(a, b) === 1;
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
    let firstNumber = super.toNumber(numbers[0]);
    let secondNumber = super.toNumber(numbers[1]);
    let result = firstNumber + secondNumber;
    return [firstNumber, secondNumber, result]
  }
}
class Subtraction extends Operation {
  constructor(difficulty, negative) {
    super();
    this.difficulty = Math.min(Math.max(difficulty, 0.2), 1);
    this.negative = (negative === 0)? false : true;
    this.maxLen = 10
    this.maxRiporti = 5
    this.maxDifficulty = this.maxLen + this.maxRiporti
  }
  get operatore() {
    return "-";
  }
  generateNonNegativeOperation() {
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
    let result = (super.toNumber(firstNumber) - super.toNumber(secondNumber));
    if (result < 0) {
      firstNumber.push(super.getRandomInt(1, 9))
    }
    return [firstNumber, secondNumber]
  }
  generateOperation() {
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

    let firstNumber = super.toNumber(numbers[0]);
    let secondNumber = super.toNumber(numbers[1]);
    let result = firstNumber - secondNumber;

    return [firstNumber, secondNumber, result]
  }
}
class Multiplication extends Operation {
  //Difficulty goes from 0 to 1.
  constructor(difficulty, mode) {
    super();
    this.difficulty = Math.min(Math.max(difficulty, 0.2), 1);
    this.length1 = (this.difficulty >= 0.5) ? 2 : 1;
    this.length0 = Math.round((this.difficulty * 6) - 2)

    //Adding Pythagoras table
    this.mode = mode; //mode = 0 normal, mode = 1 Pythagoras
    this.numbers = []
    let i = 0
    for (let a = 2; a < 13; a++) {
      for (let b = a; b < 13; b++) {
        this.numbers[i++] = [a, b]
      }
    }
    this.cacheSize = 20;
    this.cache = [];

  }
  get operatore() {
    return "X";
  }
  generatePythagoras() {
    if (this.cache.length === this.cacheSize/* && this.useCache*/) {
      this.numbers.push(this.cache.pop())
    }

    let index = super.getRandomInt(0, this.numbers.length - 1)
    let numbers = this.numbers[index]

    //if (this.useCache) {
      this.cache.push(numbers)
    //}

    this.numbers.splice(index, 1);
    return numbers;
  }
  generateOperation() {

    let firstNumber = []
    let secondNumber = []

    firstNumber[0] = super.getRandomDigit()
    secondNumber[0] = super.getRandomDigit()

    for (let a = 1; a < this.length0; a++) {
      firstNumber[a] = super.getRandomInt(1, 9)
    }
    for (let a = 1; a < this.length1; a++) {
      secondNumber[a] = super.getRandomInt(1, 9)
    }

    return [firstNumber, secondNumber]
  }
  toArray() {

    let numbers = (this.mode === 0) ? this.generateOperation() : this.generatePythagoras();
    let firstNumber = super.toNumber(numbers[0]);
    let secondNumber = super.toNumber(numbers[1]);
    let result = firstNumber * secondNumber;
    return [firstNumber, secondNumber, result]
  }
}
class Division extends Operation {
  constructor(difficulty, mode) {
    super()
    //Mode:
    //0 : extact division
    //1 : approximate division
    this.mode = mode
    this.difficulty = this.difficulty = Math.min(Math.max(difficulty, 0.2), 1);


  }
  get operatore() {
    return "/"
  }
  generateFraction() {
    let firstNumber = super.getRandomInt(1, this.difficulty * 200)
    let secondNumber = super.getRandomInt(1, this.difficulty * 200)

    return [super.toArray(firstNumber), super.toArray(secondNumber)]
  }
  generateOperationPerfect() {
    let digit0 = Math.max(1, Math.round(this.difficulty * 4));
    let firstNumber = []
    let secondNumber = null
    while (secondNumber === null) {
      firstNumber[0] = super.getRandomInt(1, 9)
      secondNumber = null
      for (let a = 0; a < digit0; a++) {
        firstNumber[a] = super.getRandomDigit();
      }
      secondNumber = this.createSecondNumber(firstNumber)
      console.log(secondNumber)
      if (secondNumber !== null) {
        console.log(super.toArray(secondNumber))
      }
    }
    return [firstNumber, super.toArray(secondNumber)]

  }
  createSecondNumber(firstNumber) {
    let dividendo = super.toNumber(firstNumber);
    console.log(dividendo)
    let factors = super.getAllFactorsFor(dividendo);
    console.log(factors)
    if (factors.length <= 2) {
      return null;
    }
    return factors[super.getRandomInt(0, factors.length - 2)]
  }
  generateOperation() {
    let digit0 = Math.max(1, Math.round(this.difficulty * 4));
    let digit1 = super.getRandomInt(1, Math.max(1, this.difficulty * 2));
    let firstNumber = [super.getRandomInt(1, 9)]
    let secondNumber = [super.getRandomInt(1, 9)]
    for (let a = 0; a < digit0; a++) {
      firstNumber[a] = super.getRandomDigit();
    }
    for (let a = 0; a < digit1; a++) {
      secondNumber[a] = super.getRandomDigit();
    }
    return [firstNumber, secondNumber]
  }
  toArray() {
    let numbers = []
    if (this.mode === 0) {
      numbers = this.generateOperationPerfect();
    } else if (this.mode === 1) {
      numbers = this.generateOperation();
    } else {
      numbers = this.generateFraction();
    }
    let firstNumber = super.toNumber(numbers[0]);
    let secondNumber = super.toNumber(numbers[1]);
    let result = 0
    if (this.mode === 0) {
      result = firstNumber / secondNumber;
    } else if (this.mode === 1) {
      result = Math.round(firstNumber / secondNumber)
    } else {
      result = [firstNumber, secondNumber]
      let gcd = super.gcd(firstNumber, secondNumber)
      while (gcd !== 1) {
        result[0] /= gcd
        result[1] /= gcd
        gcd = super.gcd(result[0], result[1])
      }
    }
    return [firstNumber, secondNumber, result]
  }


}

export { Addition, Subtraction, Division, Multiplication, Pythagoras }