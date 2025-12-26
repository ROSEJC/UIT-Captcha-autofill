document.getElementById('solveBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const event = new CustomEvent('solveCaptcha');
      document.dispatchEvent(event);
      
      const captchas = document.querySelectorAll('.captcha input[type="text"]');
      return captchas.length;
    }
  }, (results) => {
    const count = results[0].result;
    document.getElementById('status').textContent = 
      `Found ${count} CAPTCHA field(s). Check the page!`;
  });
});