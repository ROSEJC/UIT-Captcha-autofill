/**
 * CAPTCHA Solver Module
 * Handles finding and solving CAPTCHAs on UIT pages
 */
const CaptchaSolver = (function () {
    'use strict';

    /**
     * Configuration for UIT-specific CAPTCHA structure
     */
    const config = {
        // Multiple ways to find CAPTCHA elements
        selectors: {
            // The input field (most reliable selector)
            input: '#edit-english-captcha-answer, input[id*="captcha"], input[name*="captcha"]',
            // Container that holds both label and input
            container: '.form-item, .form-type-textfield',
            // Label element
            label: 'label, .form-item__label, .description'
        },
        debug: true
    };

    /**
     * Statistics tracking
     */
    const stats = {
        solved: 0,
        failed: 0
    };

    /**
     * Log message if debug is enabled
     */
    function log(...args) {
        if (config.debug) {
            console.log('[CaptchaSolver]', ...args);
        }
    }

    /**
     * Fill input with answer and trigger events
     * @param {HTMLInputElement} input - Input element to fill
     * @param {string} answer - Answer to fill
     */
    function fillInput(input, answer) {
        input.value = answer;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new Event('blur', { bubbles: true }));
    }

    /**
     * Find the label text for a CAPTCHA input
     * @param {HTMLInputElement} input - The CAPTCHA input element
     * @returns {string|null} The label text
     */
    function findLabelText(input) {
        // Method 1: Find label by 'for' attribute
        if (input.id) {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) {
                return label.textContent || label.innerText;
            }
        }

        // Method 2: Find label in parent container
        const container = input.closest('.form-item, .form-type-textfield, .captcha');
        if (container) {
            const label = container.querySelector('label, .form-item__label');
            if (label) {
                return label.textContent || label.innerText;
            }

            // Method 3: Check for description/text before input
            const description = container.querySelector('.description');
            if (description) {
                return description.textContent || description.innerText;
            }
        }

        // Method 4: Check previous sibling
        const prevSibling = input.previousElementSibling;
        if (prevSibling && prevSibling.tagName === 'LABEL') {
            return prevSibling.textContent || prevSibling.innerText;
        }

        return null;
    }

    /**
     * Solve all CAPTCHAs on the page
     * @returns {{solved: number, failed: number, total: number}} Results summary
     */
    function solveAll() {
        let solved = 0;
        let failed = 0;

        // Find all CAPTCHA input fields
        const inputs = document.querySelectorAll(config.selectors.input);
        log(`Found ${inputs.length} potential CAPTCHA input(s)`);

        inputs.forEach(input => {
            // Skip if already filled
            if (input.value) {
                log('Input already filled, skipping');
                return;
            }

            // Find the label text
            const labelText = findLabelText(input);
            if (!labelText) {
                log('Could not find label text for input');
                failed++;
                return;
            }

            log(`Label text: "${labelText.substring(0, 80)}..."`);

            // Extract answer
            const answer = AnswerExtractor.extract(labelText);
            if (answer) {
                fillInput(input, answer);
                solved++;
                stats.solved++;
                log(`✓ Solved: "${answer}"`);
            } else {
                failed++;
                stats.failed++;
                log(`✗ Could not extract answer`);
            }
        });

        log(`Results: ${solved} solved, ${failed} failed`);
        return { solved, failed, total: inputs.length };
    }

    /**
     * Get current statistics
     */
    function getStats() {
        return { ...stats };
    }

    // Public API
    return {
        solveAll,
        getStats,
        findLabelText,
        fillInput
    };
})();
