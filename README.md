# UIT CAPTCHA Autofill

A browser extension that auto-fills UIT **text-based CAPTCHA** inputs when the answer is embedded in the label text inside parentheses.

Example: `What is 2+2? (4)` fills `4`.

## What It Does

- Detects CAPTCHA containers (elements with `.captcha` or classes containing `captcha`)
- Reads the `label` text and extracts the last parenthesized value
- Fills the associated text input and triggers `input`/`change` events
- Re-runs automatically when the page updates (via `MutationObserver`)

## Supported Site(s)

- `https://daa.uit.edu.vn/*`
- `https://student.uit.edu.vn/*`

## Install on Chrome (unpacked)

1. Download or clone this repository.
2. Open `chrome://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select this project folder.

## Install on Firefox (temporary, unsigned)

Firefox requires signing for permanent installs. For development and testing, load it temporarily:

0. Download [uit_captcha_solver-1.0.zip](blob:https://github.com/9a7014be-d162-4e37-ae35-d39f2df9ca78)
1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...**.
3. Upload the zip file

This works until the browser restarts. On release Firefox you cannot install it permanently without signing. Developer Edition/Nightly can disable signing via `xpinstall.signatures.required=false` (about:config), or you can submit to addons.mozilla.org to get a signed XPI.

## Usage

1. Visit `https://daa.uit.edu.vn/`.
2. When a text CAPTCHA appears, the extension auto-fills it if it contains an answer in parentheses.
3. Optional: click the extension icon and use **Switch Account** to clear UIT cookies and redirect to the login page.

## Project Files

- `content.js`: CAPTCHA extraction and autofill logic.
- `popup.html` / `popup.js`: popup UI (includes Switch Account).
- `manifest.json`: WebExtension manifest (Chrome/Firefox friendly).
- `modules/`: shared helpers for solving/extracting answers.

## Permissions

Declared in `manifest.json`:

- `activeTab`: access the active tab.
- `tabs`: read/update the active tab URL from the popup.
- `browsingData`: clear site data when switching accounts (popup).

## Compatibility

- Chrome (Manifest V3).
- Firefox (Manifest V3; load temporarily or sign for permanent install).
