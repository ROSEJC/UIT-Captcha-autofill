# UIT CAPTCHA Autofill

A Chrome extension that auto-fills UIT **text-based CAPTCHA** inputs when the answer is embedded in the label text inside parentheses.

Example: `What is 2+2? (4)` → fills `4`.

## What It Does

- Detects CAPTCHA containers (elements with `.captcha` or classes containing `captcha`)
- Reads the `label` text and extracts the first parenthesized value
- Fills the associated text input and triggers `input`/`change` events
- Re-runs automatically when the page updates (via `MutationObserver`)

## Supported Site(s)

Currently configured to run on:

- `https://daa.uit.edu.vn/*`
- `https://student.uit.edu.vn/*`


## Installation (Unpacked)

1. Download or clone this repository
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked** and select this project folder

## Usage

1. Visit `https://daa.uit.edu.vn/`
2. When a text CAPTCHA appears, the extension auto-fills it if it contains an answer in parentheses
3. Optional: click the extension icon and use **Switch Account** to clear UIT cookies (sign out) and redirect to the DAA login page

## Project Files

- `content.js`: CAPTCHA extraction + autofill logic
- `popup.html` / `popup.js`: popup UI (currently includes “Switch Account”)
- `manifest.json`: Chrome Manifest V3 configuration
- `modules/`: present in repo but not currently injected by `manifest.json`

## Permissions

Declared in `manifest.json`:

- `activeTab`: access the currently active tab
- `tabs`: read/update the active tab URL from the popup
- `scripting`: declared (not currently used by `content.js`)

## Compatibility

- Chrome (Manifest V3)
