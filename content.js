(function() {
  'use strict';

  // Knowledge base for common CAPTCHA questions
  const knowledgeBase = {
    'secure shell': 'ssh',
    'ssh': 'ssh',
    'hypertext transfer protocol': 'http',
    'http': 'http',
    'https': 'https',
    'file transfer protocol': 'ftp',
    'ftp': 'ftp',
    'domain name system': 'dns',
    'dns': 'dns',
    'transmission control protocol': 'tcp',
    'tcp': 'tcp',
    'user datagram protocol': 'udp',
    'udp': 'udp',
    'internet protocol': 'ip',
    'ip': 'ip',
    'secure sockets layer': 'ssl',
    'ssl': 'ssl',
    'transport layer security': 'tls',
    'tls': 'tls',
    'uniform resource locator': 'url',
    'url': 'url',
    'application programming interface': 'api',
    'api': 'api',
    'cascading style sheets': 'css',
    'css': 'css',
    'hypertext markup language': 'html',
    'html': 'html',
    'structured query language': 'sql',
    'sql': 'sql',
    'extensible markup language': 'xml',
    'xml': 'xml',
    'javascript object notation': 'json',
    'json': 'json'
  };

  function extractAnswer(labelText) {
  
    const parenMatch = labelText.match(/\(([^)]+)\)/);
    if (parenMatch) {
      return parenMatch[1].trim();
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