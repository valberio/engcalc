document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("addButton");
    const subsButton = document.getElementById("subsButton");
    const timesButton = document.getElementById("timesButton");
    const divisionButton = document.getElementById("divisionButton");
    const resultElement = document.getElementById("result");



    addButton.addEventListener("click", function() {
        const num1 = parseFloat(document.getElementById("num1").value);
        const num2 = parseFloat(document.getElementById("num2").value);
        if (!isNaN(num1) && !isNaN(num2)) {
            const sum = num1 + num2;
            resultElement.textContent = `Resultado: ${sum}`;
        } else {
            resultElement.textContent = "Please enter valid numbers";
        }
    });
    subsButton.addEventListener("click", function() {
        const num1 = parseFloat(document.getElementById("num1").value);
        const num2 = parseFloat(document.getElementById("num2").value);
        if (!isNaN(num1) && !isNaN(num2)){
            const substraction = num1 - num2;
            resultElement.textContent = `Resultado: ${substraction}`
        }
        else {
            resultElement.textContent = "Ingrese números válidos";
        }
    });
    timesButton.addEventListener("click", function() {
        const num1 = parseFloat(document.getElementById("num1").value);
        const num2 = parseFloat(document.getElementById("num2").value);
       if (!isNaN(num1) && !isNaN(num2)) {
        const result = num1 * num2;
        resultElement.textContent = `Resultado: ${result}`; 
       }
       else{ 
        resultElement.textContent = "Ingrese números válidos";          
       }
    });
    divisionButton.addEventListener("click", function() {
        const num1 = parseFloat(document.getElementById("num1").value);
        const num2 = parseFloat(document.getElementById("num2").value);
        if (!isNaN(num1) && !isNaN(num2)){
            const dividend = num1 / num2;
            resultElement.textContent = `Resultado: ${dividend}`;
        }
        else {
            resultElement.textContent = "Ingrese números válidos";
        }
    })
});
