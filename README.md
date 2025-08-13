# WCAG Compliance Checker Extension

## About The Project

This browser extension is a tool designed to analyze web pages for compliance with the Web Content Accessibility Guidelines (WCAG). It serves as an interface for researchers and developers to quickly assess the accessibility of websites against established standards. The tool was developed to support various research projects and proposals that require a programmatic and consistent method for accessibility evaluation.

The checker provides an automated scan of a given webpage, identifying elements that may not conform to specific WCAG success criteria. The results are presented in a clear, user-friendly interface, helping to pinpoint areas for improvement.

## Compliance Scope

This tool provides automated checks for a subset of success criteria within the following W3C Web Content Accessibility Guidelines versions:

* WCAG 2.0
* WCAG 2.1
* WCAG 2.2

### Disclaimer

It is important to note that automated tools can only detect a portion of accessibility issues. A complete conformance assessment requires manual testing by accessibility experts to evaluate all success criteria thoroughly. This tool should be used as a first-pass analysis and a guide for further investigation.

## Prerequisites

* Google Chrome web browser

## Installation and Running Instructions

To run this extension locally for development or testing, follow these steps to load it as an unpacked extension in Google Chrome.

1.  **Download the Source Code:** Clone this repository or download the project files to a directory on your local machine.

2.  **Open Chrome Extensions Page:** Launch the Google Chrome browser and navigate to the extensions management page by typing `chrome://extensions` in the address bar and pressing Enter. Alternatively, you can access it through the Chrome menu: `Extensions` > `Manage Extensions`.

3.  **Enable Developer Mode:** On the `chrome://extensions` page, locate the **Developer mode** toggle in the top-right corner and ensure it is switched on.

4.  **Load the Extension:**
    * Click the **Load unpacked** button that appears on the top-left of the page.
    * A file dialog will open. Navigate to the directory where you saved the project files.
    * Select the root folder of the extension (the folder that contains the `manifest.json` file) and click **Select Folder**.

5.  **Confirm Installation:** The WCAG Compliance Checker extension will now appear in your list of installed extensions.

## How to Use

1.  Navigate to the website you wish to analyze.
2.  Click on the WCAG Compliance Checker icon in your Chrome extensions toolbar.
    * *Note: If the icon is not visible, click the puzzle piece icon (`Extensions`) in the toolbar and click the pin icon next to the WCAG Compliance Checker to add it to your toolbar for easy access.*
3.  The extension's interface will open. Initiate the scan by clicking the primary "Run Analysis" or "Check Compliance" button.
4.  Wait for the analysis to complete.
5.  Review the generated report within the extension's interface to identify and understand any potential accessibility issues found on the page.

## License

This project is licensed under the [MIT License](LICENSE.md).
