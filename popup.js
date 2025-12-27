// Switch Account - Clear browsing data and redirect based on current site
document.getElementById('switchAccountBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  document.getElementById('status').textContent = 'Logging out...';

  try {
    // Determine which site the user is on
    const currentUrl = tab.url || '';
    let redirectUrl = 'https://daa.uit.edu.vn/'; // default

    if (currentUrl.includes('student.uit.edu.vn')) {
      redirectUrl = 'https://student.uit.edu.vn/';
    } else if (currentUrl.includes('daa.uit.edu.vn')) {
      redirectUrl = 'https://daa.uit.edu.vn/';
    }

    // Clear cookies and localStorage for UIT domains
    await chrome.browsingData.remove({
      origins: [
        'https://daa.uit.edu.vn',
        'https://student.uit.edu.vn'
      ]
    }, {
      cookies: true,
      localStorage: true
    });

    // Redirect to the appropriate login page
    await chrome.tabs.update(tab.id, { url: redirectUrl });

    document.getElementById('status').textContent = 'Redirecting to login page...';

    // Close the popup after a short delay
    setTimeout(() => window.close(), 500);
  } catch (error) {
    document.getElementById('status').textContent = 'Error: ' + error.message;
    console.error('Switch account error:', error);
  }
});