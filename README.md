# UIT CAPTCHA Autofill Extension - Version 2.0

A powerful browser extension designed to automatically detect and solve CAPTCHAs on UIT (University of Information Technology) platforms by exploiting data vulnerabilities and solving logical expressions.

## Key Features

- **'alt' Attribute Exploitation**: Automatically detects and extracts CAPTCHA answers
- **Arithmetic Math Solver**: Includes a standard `MathSolver` module to evaluate addition, subtraction, multiplication, and division problems directly from the UI.
- **Smart Extraction**: Intelligent logic to identify answers enclosed in parentheses `(answer)` within label descriptions.
- **Advanced Input Injection**: Uses `nativeInputValueSetter` techniques to bypass property overrides from modern JavaScript frameworks like React or Vue, ensuring the value is correctly registered.
- **Real-time Monitoring**: Utilizes `MutationObserver` to detect and solve new CAPTCHAs dynamically when the page content changes without requiring a refresh.
- **Quick Account Switch**: Integrated popup feature to clear UIT session cookies and LocalStorage, allowing for instant logout and account switching.

## Installation (Chrome / Edge / Chromium)

1. Download or clone this repository to your local machine.
2. Navigate to `chrome://extensions/` in your browser.
3. Enable **Developer mode** using the toggle in the top right corner.
4. Click the **Load unpacked** button.
5. Select the root folder of this project.

## Project Structure

- `manifest.json`: Extension configuration and permission declarations (Manifest V3).
- `content.js`: Main execution script that orchestrates the detection and solving logic.
- `modules/`:
    - `mathSolver.js`: Core logic for parsing and evaluating mathematical expressions.
    - `answerExtractor.js`: Handles pattern matching for various answer formats (parentheses, etc.).
    - `captchaSolver.js`: Middleware module that connects data extraction with input filling.
- `popup.html/.js`: UI and logic for the extension menu (includes the Switch Account tool).

## Supported Domains

- `https://daa.uit.edu.vn/*`
- `https://student.uit.edu.vn/*`

## Disclaimer

This extension is created for educational purposes and security research (vulnerability analysis). Please use it responsibly and in accordance with your university's policies.

---
**Version:** 2.0  
**Platform:** Manifest V3 (Chrome & Firefox Compatible)  
***Tác giả không chịu trách nhiệm cho bất kỳ khiếu nại hoặc thiệt hại nào phát sinh từ việc sử dụng công cụ này.***
