/**
 * Answer Extractor Module
 * Handles extracting answers from various CAPTCHA formats
 */
const AnswerExtractor = (function () {
    'use strict';

    /**
     * Extract the LAST parentheses content (the actual answer)
     * Handles cases like: "How many months? (in words)(twelve)" → "twelve"
     * @param {string} text - Label text
     * @returns {string|null} Extracted answer
     */
    function extractLastParentheses(text) {
        // Find all parentheses matches
        const matches = text.match(/\(([^)]+)\)/g);
        if (matches && matches.length > 0) {
            // Get the last match and remove parentheses
            const lastMatch = matches[matches.length - 1];
            return lastMatch.slice(1, -1).trim();
        }
        return null;
    }

    /**
     * Try to extract answer by solving math
     * @param {string} text - Label text containing math expression
     * @returns {string|null} Calculated answer
     */
    function extractByMath(text) {
        if (typeof MathSolver !== 'undefined') {
            const result = MathSolver.solve(text);
            if (result) {
                console.log(`[AnswerExtractor] Math solved: ${result}`);
                return result;
            }
        }
        return null;
    }

    /**
     * Extract answer from CAPTCHA label text
     * Priority: Last parentheses > Math solving
     * @param {string} labelText - The CAPTCHA label text
     * @returns {string|null} Extracted answer or null
     */
    function extract(labelText) {
        // Strategy 1: Get the LAST parentheses content
        const parenAnswer = extractLastParentheses(labelText);
        if (parenAnswer) {
            console.log(`[AnswerExtractor] Found in parentheses: "${parenAnswer}"`);
            return parenAnswer;
        }

        // Strategy 2: Math solving (for questions without parentheses answer)
        const mathAnswer = extractByMath(labelText);
        if (mathAnswer) {
            return mathAnswer;
        }

        console.log(`[AnswerExtractor] No answer found in: "${labelText.substring(0, 60)}..."`);
        return null;
    }

    // Public API
    return {
        extract,
        extractLastParentheses,
        extractByMath
    };
})();
