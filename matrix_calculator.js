//TO-DO//
/* -Cast a matrix to the result display
*/


document.addEventListener("DOMContentLoaded", () => {
    const matrixInputsContainerA = document.querySelector("#matrixInputsA .matrix-input-container");
    const matrixInputsContainerB = document.querySelector("#matrixInputsB .matrix-input-container");
    const resultMatrix = document.querySelector("#result .matrix-input-container");
    createFirstMatrixes();

    function createFirstMatrixes(){
        let rows = 3;
        let columns = 3;
        
        for (let counter = 0; counter < rows; counter ++){
            const inputRowA = createInputRow(rows, columns);
            const inputRowB = createInputRow(rows, columns);
            const displayRowResult = createDisplayRow(rows, columns);

            matrixInputsContainerA.appendChild(inputRowA);
            matrixInputsContainerB.appendChild(inputRowB);
            resultMatrix.appendChild(displayRowResult);
        }   
    }

    function createDisplayRow(columnCount){
        const row = document.createElement("div");
        row.classList.add("matrix-display-row");

        for(let j = 0; j < columnCount; j++){
            const cell = document.createElement("input");
            cell.readOnly = true;
            cell.value = 0;
            cell.addEventListener("keydown", handleArrowKeys);
            row.appendChild(cell);
        }
        return row;
    }

    function createInputRow(rowCount, colCount) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("matrix-input-row");
        for (let j = 0; j < colCount; j++) {
            const input = document.createElement("input");
            input.value = 0;
            input.addEventListener("keydown", handleArrowKeys);
            rowDiv.appendChild(input);
        }
        return rowDiv;
    }

    document.querySelector("input").addEventListener("keydown", handleArrowKeys);

    document.querySelector("#matrixInputsA .add-row").addEventListener("click", () => {
        const rowCount = matrixInputsContainerA.childElementCount + 1;
        const colCount = matrixInputsContainerA.querySelector(".matrix-input-row")?.childElementCount || 2;
        const inputRow = createInputRow(rowCount, colCount);
        matrixInputsContainerA.appendChild(inputRow);
    });

    document.querySelector("#matrixInputsA .add-column").addEventListener("click", () => {
        const colCount = matrixInputsContainerA.querySelector(".matrix-input-row")?.childElementCount + 1 || 2;
        const inputRows = matrixInputsContainerA.querySelectorAll(".matrix-input-row");
        inputRows.forEach(row => {
            const input = document.createElement("input");
            row.appendChild(input);
        });
    });

    document.getElementById("additionButton").addEventListener("click", () => {performAddition();})
    document.getElementById("substractionButton").addEventListener("click", () => {performSubstraction();})
    document.getElementById("multiplicationButton").addEventListener("click", () => {performMultiplication();})

    function handleArrowKeys(event) {
        const input = event.target;
        const row = input.closest(".matrix-input-row");
        const rowInputs = Array.from(row.querySelectorAll("input"));
        const currentIndex = rowInputs.indexOf(input);
        let nextIndex = currentIndex;

        if (event.key === "ArrowLeft") {
            nextIndex = Math.max(0, currentIndex - 1);
        } else if (event.key === "ArrowRight") {
            nextIndex = Math.min(rowInputs.length - 1, currentIndex + 1);
        } else if (event.key === "ArrowUp") {
            const rowIndex = Array.from(matrixInputsContainerA.children).indexOf(row);
            const prevRow = matrixInputsContainerA.children[rowIndex - 1];
            if (prevRow) {
                nextIndex = Math.min(prevRow.querySelectorAll("input").length - 1, currentIndex);
            }
            console.log("Arriba presionado");
        } else if (event.key === "ArrowDown") {
            const rowIndex = Array.from(matrixInputsContainerA.children).indexOf(row);
            const nextRow = matrixInputsContainerA.children[rowIndex + 1];
            if (nextRow) {
                nextIndex = Math.min(nextRow.querySelectorAll("input").length - 1, currentIndex);
            }
            console.log("Abajo presionado");
        }

        rowInputs[nextIndex].focus();
    }

    function performAddition(){
        const A = getMatrixA();
        const B = getMatrixB();
        
        const result = addMatrixes(A, B);
        console.log(`El resultado de la operacion es ${result}`);
        showMatrixOnResult(result);
    }

    function performSubstraction(){
        const a = getMatrixA();
        const b = getMatrixB();

        const result = substractMatrixes(a, b);
        console.log(`El resultado de la resta es ${result}`);
        showMatrixOnResult(result);
    }

    function performMultiplication(){
        const a = getMatrixA();
        const b = getMatrixB();

        const result = multiplyMatrixes(a, b);
        console.log(`El resultado de la multiplicacion es ${result}`);
        showMatrixOnResult(result);
    }

    function getMatrixA(){

        const matrix = []

        const qRows = matrixInputsContainerA.children.length;
        const rows = matrixInputsContainerA.children;

        for(let i = 0; i < qRows; i++) {
            const row = [];
            const qCols = rows[i].children.length;
            const cols = rows[i].children;

            for (let j = 0; j < qCols; j++) {
                const cellValue = parseFloat(cols[j].value);
                row.push(cellValue);
            }
            matrix.push(row);
        }
        
        console.log(`Matrix A is ${matrix}`);
        return matrix;
    }

    function getMatrixB(){
        const matrix = []

        const qRows = matrixInputsContainerB.children.length;
        const rows = matrixInputsContainerB.children;

        for(let i = 0; i < qRows; i++) {
            const row = [];
            const qCols = rows[i].children.length;
            const cols = rows[i].children;

            for (let j = 0; j < qCols; j++) {
                const cellValue = parseFloat(cols[j].value);
                row.push(cellValue);
            }
            matrix.push(row);
        }
        
        console.log(`Matrix B is ${matrix}`);
        return matrix;       
    }

    function addMatrixes(matrixA, matrixB){
        const result = [];

        for (let r = 0; r < matrixA.length; r++)
        {
            const row = []; 
            
            for (let c = 0; c < matrixA[r].length; c++){
                row.push(matrixA[r][c] + matrixB[r][c]);
            }
            result.push(row);
        }
        return result;
    }

    function substractMatrixes(matrixA, matrixB){
        const result = [];

        for (let r = 0; r < matrixA.length; r++)
        {
            const row = []; 
            
            for (let c = 0; c < matrixA[r].length; c++){
                row.push(matrixA[r][c] - matrixB[r][c]);
            }
            result.push(row);
        }
        return result;
    }

    function multiplyMatrixes(matrixA, matrixB){
        const result = [];

        for (let i = 0; i < matrixA.length; i++) {
            const resultRow = [];
            for (let j = 0; j < matrixB[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < matrixA[i].length; k++) {
                    sum += matrixA[i][k] * matrixB[k][j];
                }
                resultRow.push(sum);
            }
            result.push(resultRow);
        }
        return result;
    }
    
    function showMatrixOnResult(matrix){

        const resultRows = resultMatrix.children;
        //adequate rows and columns
        for (let r = 0; r < matrix.length; r++){
            const resultCols = resultRows[r].children;
            for (let c = 0; c < matrix[r].length; c++){
                resultCols[c].value = matrix[r][c];
            }
        }
    }
});

//TO DO: dimension checks