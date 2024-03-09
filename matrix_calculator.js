//TO-DO//
/* -Add last operation on top of the history, format it better
*/


document.addEventListener("DOMContentLoaded", () => {
    const matrixInputsContainerA = document.querySelector("#matrixInputsA .matrix-input-container");
    const matrixInputsContainerB = document.querySelector("#matrixInputsB .matrix-input-container");
    const resultMatrix = document.querySelector("#result .matrix-input-container");
    const historyCol = document.getElementById("history");
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
        row.classList.add("row", "p-1", "matrix-display-row");
        
        for(let j = 0; j < columnCount; j++){
            const cell = document.createElement("input");
            cell.classList.add("col", "mx-1");
            cell.readOnly = true;
            cell.addEventListener("keyup", handleArrowKeys);
            row.appendChild(cell);
        }
        return row;
    }

    function createInputRow(rowCount, colCount) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row", "p-1", "matrix-input-row");
        for (let j = 0; j < colCount; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.classList.add("col", "mx-1");
            input.addEventListener("input", fillInWith0Placeholder);
            input.addEventListener("keyup", handleArrowKeys);
            rowDiv.appendChild(input);
        }
        return rowDiv;
    }

    document.getElementById("additionButton").addEventListener("click", () => {performAddition();})
                                                                                    
    document.getElementById("substractionButton").addEventListener("click", function() {
        performSubstraction();
        checkEqualRowsAndCols(getMatrixA(), getMatrixB());
    })
    document.getElementById("multiplicationButton").addEventListener("click", function() {
        performMultiplication();
        checkEqualRowsAndCols(getMatrixA(), getMatrixB());
    })
    document.getElementById("determinant-A").addEventListener("click", function(){
        const matrixA = getMatrixA();
        const detA = determinant(matrixA);
        writeDeterminantResult(matrixA, detA);
    })
    document.getElementById("determinant-B").addEventListener("click", function(){
        const matrixB = getMatrixB();
        const detB = determinant(matrixB);
        writeDeterminantResult(matrixB, detB);
    })
    document.getElementById("clean-matrixA").addEventListener("click", () => {cleanMatrix(matrixInputsContainerA);});
    document.getElementById("clean-matrixB").addEventListener("click", () => {cleanMatrix(matrixInputsContainerB);});


    function handleArrowKeys(event) {

        const currentInput = event.target;
        const currentRow = currentInput.closest(".matrix-input-row");
        const currentRowCells = Array.from(currentRow.querySelectorAll("input"));
        const currentIndex = currentRowCells.indexOf(currentInput);

        let matrixOfEvent;
        let numericalMatrixOfEvent;

        if (matrixInputsContainerA.contains(currentInput)){
            matrixOfEvent = matrixInputsContainerA;
            numericalMatrixOfEvent = getMatrixA();
        }
        else if (matrixInputsContainerB.contains(currentInput)){
            matrixOfEvent = matrixInputsContainerB;
            numericalMatrixOfEvent = getMatrixB();
        }

        let rows = Array.from(matrixOfEvent.querySelectorAll(".matrix-input-row"));
        const currentRowIndex = rows.indexOf(currentRow);
        let nextRowIndex; 
        let nextIndex = currentIndex;
        let nextRow = currentRow;
        let nextRowCells = currentRowCells;
        if (event.key == "ArrowLeft"){
            nextIndex = Math.max(0, currentIndex - 1);
            console.log(`Ultima columna vacia ${lastColIsEmpty(numericalMatrixOfEvent)} ${currentRowCells.length}`);
            if (isLastInputRowEmpty(matrixOfEvent) && (currentRowCells.length > 3)){
                rows.forEach(row => {
                    const rowCells = Array.from(row.querySelectorAll("input"));
                    const lastCell = rowCells[rowCells.length - 1];
                    
                    if (lastCell) {
                        lastCell.remove();
                    }
                });
            }
            console.log(isLastInputRowEmpty(matrixOfEvent));
            nextRowCells[nextIndex].focus();
            nextRowCells[nextIndex].select();

        }
        else if (event.key == "ArrowRight"){
            console.log(`${currentRowCells.length} ${currentIndex}`)
            if (currentRowCells.length == (currentIndex + 1)){
                const colCount = matrixOfEvent.querySelector(".matrix-input-row")?.childElementCount + 1 || 2;
                const inputRows = matrixOfEvent.querySelectorAll(".matrix-input-row");
                inputRows.forEach(row => {
                    const input = document.createElement("input");
                    input.addEventListener("keyup", handleArrowKeys);
                    input.addEventListener("input", fillInWith0Placeholder);
                    input.classList.add("col", "mx-1");
                    row.appendChild(input);
                    });
            }
            
            nextIndex = currentIndex + 1;
            nextRowCells = Array.from(currentRow.querySelectorAll("input"));
            console.log(`${nextIndex}`);
            nextRowCells[nextIndex].focus();
            nextRowCells[nextIndex].select();
        }
        else if (event.key == "ArrowUp"){
            nextRowIndex = Math.max(0, currentRowIndex - 1);
            nextRow = rows[nextRowIndex];
            nextRowCells = Array.from(nextRow.querySelectorAll("input"));
            
            if (lastRowIsEmpty(numericalMatrixOfEvent) && (rows.length > 3)){
                removeLastRow(matrixOfEvent);
            }
            nextRowCells[nextIndex].focus();
            nextRowCells[nextIndex].select();

        }
        else if (event.key == "ArrowDown"){

            console.log(`${(rows.length - 1)} ${currentRowIndex}`);
            if ((rows.length - 1) == currentRowIndex){
                const rowCount = matrixOfEvent.childElementCount + 1;
                const colCount = matrixOfEvent.querySelector(".matrix-input-row")?.childElementCount || 2;
                const inputRow = createInputRow(rowCount, colCount);
                matrixOfEvent.appendChild(inputRow);
            }

            rows = Array.from(matrixOfEvent.querySelectorAll(".matrix-input-row"));

            nextRowIndex = Math.min(rows.length - 1, currentRowIndex + 1);
            nextRow = rows[nextRowIndex];
            nextRowCells = Array.from(nextRow.querySelectorAll("input"));
            nextRowCells[nextIndex].focus();
            nextRowCells[nextIndex].select();
        }

        console.log(`current index cell ${currentIndex} current row index ${currentRowIndex} next index cell ${nextIndex} next row index ${nextRowIndex}`);

    }

    function fillInWith0Placeholder(event){
        const currentInput = event.target;
        const currentRow = currentInput.closest(".matrix-input-row");
        let currentMatrix;

        if (matrixInputsContainerA.contains(currentInput)){
            currentMatrix = matrixInputsContainerA;
        }
        else if (matrixInputsContainerB.contains(currentInput)){
            currentMatrix = matrixInputsContainerB;
        }

        const rows = Array.from(currentMatrix.querySelectorAll(".matrix-input-row"));
        const currentRowCells = Array.from(currentRow.querySelectorAll("input"));
        const currentIndex = currentRowCells.indexOf(currentInput);
        const currentRowIndex = rows.indexOf(currentRow);

        for (let i = 0; i < currentIndex; i++){
            if (currentRowCells[i].value == ''){
                currentRowCells[i].value = "0";
            }   
        }
        for (let i = 0; i < currentRowIndex; i++){
            const cellsInRow = Array.from(rows[i].querySelectorAll("input"));
            for (let j = 0; j <= currentIndex; j++){
                if(cellsInRow[j].value == ''){
                    cellsInRow[j].value = "0";
                }
                
            }
        }
    }
    
    function performAddition(){
        const A = getMatrixA();
        const B = getMatrixB();
        canOperate = checkEqualRowsAndCols(A, B);

        if (canOperate){
            const result = addMatrixes(A, B);
            console.log(`El resultado de la operacion es ${result}`);
            showMatrixOnResult(result);
        }
        else{
            alert('The matrixes should be of the same dimension!');
        }
    }

    function performSubstraction(){
        const A = getMatrixA();
        const B = getMatrixB();

        canOperate = checkEqualRowsAndCols(A, B);

        if (canOperate){
            const result = substractMatrixes(A, B);
            console.log(`El resultado de la resta es ${result}`);
            showMatrixOnResult(result);
        }
        else{
            alert('The matrixes should be of the same dimension!');
        }

    }

    function performMultiplication(){
        const A = getMatrixA();
        const B = getMatrixB();

        canOperate = checkEqualRowsAndCols(A, B);

        if (canOperate){
            const result = multiplyMatrixes(A, B);
            console.log(`El resultado de la multiplicacion es ${result}`);
            showMatrixOnResult(result);
        }
        else{
            alert('The matrixes should be of the same dimension!');
        }

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
                if (!isNaN(cellValue)){
                    row.push(cellValue);
                }
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
                if (!isNaN(cellValue)){
                    row.push(cellValue);
                }
                //row.push(isNaN(cellValue) ? 0 : cellValue);
            }
            matrix.push(row);
        }
        
        console.log(`Matrix B is ${matrix}`);
        return matrix;       
    }

    function trimMatrix(matrix){

        while(lastRowIsEmpty(matrix)){
            matrix.pop()
        }
        while(lastColIsEmpty(matrix)){
            for(let i = 0; i < matrix.length; i++){
                matrix[i].pop();
            }
        }
        return matrix;
    }

    function cleanMatrix(matrixContainer){
        console.log("clean matrix");
        const rows = Array.from(matrixContainer.querySelectorAll(".matrix-input-row"));

        for (let i = 0; i < rows.length; i++){
            const cells = Array.from(rows[i].querySelectorAll("input"));
            for (let j = 0; j < cells.length; j++){
                cells[j].value = '';
            }
        }
    }

    function lastColIsEmpty(matrix){

        const length = matrix[0].length;

        const temp = matrix.every(row => (row[length - 1] === 0) || (row[length - 1] === undefined));
        console.log(matrix, temp, length); 
        return temp;
    }
    
    function lastRowIsEmpty(matrix){
        const length = matrix.length;
        const temp =  matrix[length - 1].every(cell => cell === 0);
        console.log(matrix,temp);
        return temp;
    }

    function isLastInputRowEmpty(matrixInputContainer) {
        const rows = matrixInputContainer.children;
        var isEmpty = false;
    
        for (let i = 0; i < rows.length; i++) {
            const inputs = rows[i].querySelectorAll('input');
            const lastInput = inputs[inputs.length - 1];

            if (lastInput.value.trim() === "" ||lastInput.value.trim() === "0") {
                isEmpty = true;
            }
            else{
                isEmpty = false;
                break;
            }
        }
    
        return isEmpty;
    }
    

    function removeLastRow(matrixHTMLContainer){
        
        const rows = Array.from(matrixHTMLContainer.querySelectorAll(".matrix-input-row"));
        const cells = Array.from(rows[rows.length - 1].querySelectorAll("input"));
        cells.forEach(cell => cell.remove());
        rows[rows.length - 1].remove();
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
        recordOperationInHistory(matrixA, "+", result, matrixB);
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
        recordOperationInHistory(matrixA, "-", result, matrixB);
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

        recordOperationInHistory(matrixA, "x", result, matrixB);

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

    function ammountOfRows(matrix){
        return matrix.length;
    }
    function ammountOfCols(matrix){
        return matrix[0].length;
    }

    function checkEqualRowsAndCols(matrixA, matrixB){
        console.log(`Matrix A has ${ammountOfRows(matrixA)} rows and ${ammountOfRows(matrixB)} cols`);
        console.log(`Matrix B has ${ammountOfRows(matrixB)} rows and ${ammountOfCols(matrixB)} cols`);
        
        canOperationsBePerfomed = ((ammountOfRows(matrixA) == ammountOfRows(matrixB)) && (ammountOfCols(matrixA) == ammountOfCols(matrixB)));
        console.log(`Can operations be perfomed: ${canOperationsBePerfomed}`);
        return canOperationsBePerfomed;
    }

    function htmlObjectOutOfMatrix(matrix){
        const table = document.createElement("table");

        for (let i = 0; i < matrix.length; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < matrix[i].length; j++) {
                const cell = document.createElement("td");
                cell.textContent = matrix[i][j];
                row.appendChild(cell);
            }

            table.appendChild(row);
        }
        return table
    }

    function recordOperationInHistory(matrixA, operation, matrixResult, matrixB){

        const rowHistory = document.createElement("div");
        let firstChild = historyCol.firstChild;
        rowHistory.classList.add("row");

        const table = htmlObjectOutOfMatrix(matrixA);

        rowHistory.appendChild(table);

        const operationText = document.createElement("h4");
        operationText.textContent = operation;
        rowHistory.appendChild(operationText);

        const tableB = htmlObjectOutOfMatrix(matrixB);
        rowHistory.appendChild(tableB);

        const result = document.createElement("h4");
        result.textContent = "=";
        rowHistory.appendChild(result);
        
        const tableResult = htmlObjectOutOfMatrix(matrixResult);
        rowHistory.appendChild(tableResult); 
        
        historyCol.insertBefore(rowHistory, firstChild);
    }

    function matrixIsSquare(matrix){
        return matrix.length === matrix[0].length;
    }

    // Function to calculate the minor of a matrix
function minor(matrix, row, col) {
    return matrix.filter((_, i) => i !== row)
                 .map(row => row.filter((_, j) => j !== col));
}

// Function to calculate the determinant of a matrix using cofactors
function determinant(matrix) {
    if (matrix.length !== matrix[0].length) {
        throw new Error("Matrix must be square.");
    }

    // Base case for 2x2 matrix
    if (matrix.length === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    for (let i = 0; i < matrix.length; i++) {
        const cofactor = matrix[0][i] * determinant(minor(matrix, 0, i));
        det += (i % 2 === 0 ? 1 : -1) * cofactor;
    }
    return det;
}

    function writeDeterminantResult(matrix, determinant){
        const rowHistory = document.createElement("div");
        rowHistory.classList.add("row");
        let firstChild = historyCol.firstChild;

        const matrixHTML = htmlObjectOutOfMatrix(matrix);
        rowHistory.appendChild(matrixHTML);

        const result = document.createElement("h4");
        result.textContent = "=";
        rowHistory.appendChild(result);

        const detHTML = document.createElement("h4");
        detHTML.textContent = determinant;
        rowHistory.appendChild(detHTML);

        historyCol.insertBefore(rowHistory, firstChild);
    }
})

//TO DO: perform operations on dimensions different than 3x3