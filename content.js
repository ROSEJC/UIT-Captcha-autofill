/**
 * UIT CAPTCHA Solver - Content Script
 * Automatically detects and solves CAPTCHAs by exploiting the 'alt' attribute vulnerability.
 */
(function () {
  'use strict';

  /**
   * Main function to scan the page for CAPTCHAs and autofill the answers.
   */
  function solveCaptcha() {
    // Select all images where the 'alt' attribute starts with "captcha:"
    const captchaImages = document.querySelectorAll('img[alt^="captcha:"]');

    if (captchaImages.length === 0) {
      return;
    }

    captchaImages.forEach(img => {
      // Extract the raw answer from the 'alt' attribute
      const altText = img.getAttribute('alt');
      const answer = altText.replace('captcha:', '').trim();

      if (answer) {
        // Locate the CAPTCHA input field by its known ID
        const input = document.getElementById('edit-english-captcha-answer');

        if (input) {
          // Use the native HTMLInputElement setter to bypass framework-level overrides (e.g., React/Vue)
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
          nativeInputValueSetter.call(input, answer);

          // Dispatch standard input and change events to notify the page of the update
          input.dispatchEvent(new Event('input', {
            bubbles: true
          }));
          input.dispatchEvent(new Event('change', {
            bubbles: true
          }));

          // Manually trigger focus and blur to satisfy any additional validation logic
          input.focus();
          input.blur();

          console.log(`[UIT-Solver] Successfully autofilled: "${answer}"`);
        } else {
          console.error("[UIT-Solver] Answer found but input field '#edit-english-captcha-answer' is missing.");
        }
      }
    });
  }

  /**
   * Initialization: Ensure the script runs after the DOM is fully loaded.
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', solveCaptcha);
  } else {
    // If the DOM is already ready, execute immediately
    solveCaptcha();
  }

  /**
   * Dynamic Content Monitoring: 
   * Observes changes to the DOM to re-run the solver if a new CAPTCHA is injected.
   */
  const observer = new MutationObserver((mutations) => {
    // debounce or throttle could be added here if performance becomes an issue
    solveCaptcha();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();