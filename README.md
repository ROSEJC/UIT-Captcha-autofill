# UIT CAPTCHA Solver

A Chrome extension that automatically solves text-based CAPTCHA questions on the UIT student academic results page.

## Features

- Automatically detects and solves text-based CAPTCHAs
- Extracts answers from parentheses in CAPTCHA labels
- Works on https://daa.uit.edu.vn/sinhvien/kqhoctap
- Manual solve button in extension popup

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the folder containing this extension
5. The extension should now be installed

## Usage

1. Navigate to the UIT student results page
2. The extension will automatically attempt to solve any CAPTCHAs on the page
3. Alternatively, click the extension icon and press "Solve CAPTCHAs on Page"

## How It Works

The extension monitors the page for CAPTCHA elements and extracts the answer from the label text when it's enclosed in parentheses (e.g., "What is 2+2? (4)"). It then fills the corresponding input field.

## Permissions

- `activeTab`: To access the current tab
- `scripting`: To inject scripts into web pages

## Compatibility

- Chrome (Manifest V3)
- Designed specifically for UIT's academic results page