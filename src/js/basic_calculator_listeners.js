
class Calculator{

    constructor(){
        this.current_value = 0;
    }

    getResult(){
        return this.current_value;
    }

    add(number){
        this.current_value += number;
    }

    subtract(number){
        this.current_value -= number;
    }

    multiply(number){
        this.current_value *= number;
    }

    divide(number){
        this.current_value /= number;
    }
}
const calculator = new Calculator();

document.getElementById("addButton").addEventListener("click", () => {
    const number = parseFloat(document.getElementById("input_number").value);
    calculator.add(number);
})

document.getElementById("subsButton").addEventListener("click", () => {
    const number = parseFloat(document.getElementById("input_number").value);
    calculator.subtract(number);
})

document.getElementById("timesButton").addEventListener("click", () =>{
    const number = parseFloat(document.getElementById("input_number").value);
    calculator.multiply(number);
})

document.getElementById("divisionButton").addEventListener("click", () => {
    const number = parseFloat(document.getElementById("input_number").value);
    calculator.divide(number);
})

document.getElementById("getResult").addEventListener("click", () =>{
    const number = calculator.getResult();
    document.getElementById("result").textContent = `Result: ${number}`;
})

