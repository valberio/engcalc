// determinantSpec.js

// Import your determinant function and any other necessary functions
const { determinant, matrixIsSquare } = require('./matrix_calculator'); // Update with your actual file name

describe('determinant function', () => {
    // Test case for a 2x2 matrix
    it('should calculate the determinant of a 2x2 matrix', () => {
        const matrix = [
            [1, 2],
            [3, 4]
        ];
        expect(determinant(matrix)).toBe(-2);
    });

    // Test case for a 3x3 matrix
    it('should calculate the determinant of a 3x3 matrix', () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        expect(determinant(matrix)).toBe(0);
    });

    // Test case for a non-square matrix
    it('should return undefined for a non-square matrix', () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        expect(determinant(matrix)).toBeUndefined();
    });
});

// Test case for the matrixIsSquare function
describe('matrixIsSquare function', () => {
    // Test case for a square matrix
    it('should return true for a square matrix', () => {
        const squareMatrix = [
            [1, 2],
            [3, 4]
        ];
        expect(matrixIsSquare(squareMatrix)).toBeTrue();
    });

    // Test case for a non-square matrix
    it('should return false for a non-square matrix', () => {
        const nonSquareMatrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        expect(matrixIsSquare(nonSquareMatrix)).toBeFalse();
    });
});
