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
