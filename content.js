(function () {
  'use strict';

  function extractAnswer(labelText) {
    // Find all matches with parentheses
    const matches = [...labelText.matchAll(/\(([^)]+)\)/g)];
    if (matches.length > 0) {
      // Get the last match's capturing group (index 1)
      const lastMatch = matches[matches.length - 1];
      return lastMatch[1].trim();
    }

    return null;
  }

  function solveCaptcha() {
    // Find CAPTCHA containers
    const captchaContainers = document.querySelectorAll('.captcha, [class*="captcha"]');

    captchaContainers.forEach(container => {
      // Find the label with the question
      const label = container.querySelector('label');
      if (!label) return;

      const labelText = label.textContent || label.innerText;

      // Find the input field
      const input = container.querySelector('input[type="text"]');
      if (!input || input.value) return; // Skip if already filled

      // Extract and fill answer
      const answer = extractAnswer(labelText);
      if (answer) {
        input.value = answer;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));

        console.log(`CAPTCHA solved: "${labelText.substring(0, 50)}..." → "${answer}"`);
      }
    });
  }

  // Run immediately
  solveCaptcha();

  // Watch for dynamic content
  const observer = new MutationObserver(() => {
    solveCaptcha();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();