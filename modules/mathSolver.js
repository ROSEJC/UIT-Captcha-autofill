/**
 * Math Expression Solver Module
 * Handles parsing and evaluating simple arithmetic expressions
 */
const MathSolver = (function () {
    'use strict';

    /**
     * Supported operators with their symbols
     */
    const OPERATORS = {
        ADD: ['+'],
        SUBTRACT: ['-'],
        MULTIPLY: ['*', 'x', 'X', '×'],
        DIVIDE: ['/', '÷']
    };

    /**
     * Normalize math expression to standard format
     * @param {string} expression - Raw math expression
     * @returns {string} Normalized expression with standard operators
     */
    function normalize(expression) {
        return expression
            .replace(/×/g, '*')
            .replace(/x/gi, '*')
            .replace(/÷/g, '/')
            .replace(/\s+/g, '')
            .replace(/[=?]/g, '');
    }

    /**
     * Check if expression is safe to evaluate
     * @param {string} expression - Normalized expression
     * @returns {boolean} True if expression only contains safe characters
     */
    function isSafe(expression) {
        return /^[\d+\-*/().]+$/.test(expression);
    }

    /**
     * Evaluate a normalized math expression
     * @param {string} expression - Math expression to evaluate
     * @returns {string|null} Result as string, or null if evaluation fails
     */
    function evaluate(expression) {
        try {
            const normalized = normalize(expression);

            if (!isSafe(normalized)) {
                return null;
            }

            const result = Function('"use strict"; return (' + normalized + ')')();

            if (typeof result === 'number' && isFinite(result)) {
                return Number.isInteger(result) ? result.toString() : result.toFixed(2);
            }
        } catch (e) {
            console.log('[MathSolver] Evaluation failed:', e.message);
        }
        return null;
    }

    /**
     * Extract math expression from text
     * @param {string} text - Text containing potential math expression
     * @returns {string|null} Extracted expression or null
     */
    function extract(text) {
        const pattern = /(\d+)\s*([+\-*×x÷/])\s*(\d+)/i;
        const match = text.match(pattern);
        return match ? match[0] : null;
    }

    /**
     * Solve math expression found in text
     * @param {string} text - Text containing math expression
     * @returns {string|null} Calculated result or null
     */
    function solve(text) {
        const expression = extract(text);
        if (expression) {
            const result = evaluate(expression);
            if (result) {
                console.log(`[MathSolver] Solved: "${expression}" = ${result}`);
                return result;
            }
        }
        return null;
    }

    // Public API
    return {
        evaluate,
        extract,
        solve,
        normalize,
        isSafe
    };
})();
