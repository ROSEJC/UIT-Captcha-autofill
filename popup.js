document.getElementById('switchAccountBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Redirect to the UIT DAA homepage for login
  await chrome.tabs.update(tab.id, { url: 'https://daa.uit.edu.vn/' });

  document.getElementById('status').textContent = 'Redirecting to login page...';

  // Close the popup after a short delay
  setTimeout(() => window.close(), 500);
});

// Switch Account - Redirect to homepage for login
document.getElementById('switchAccountBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Redirect to the UIT DAA homepage for login
  await chrome.tabs.update(tab.id, { url: 'https://daa.uit.edu.vn/' });

  document.getElementById('status').textContent = 'Redirecting to login page...';

  // Close the popup after a short delay
  setTimeout(() => window.close(), 500);
});