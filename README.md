# 🚀 LMS Universal File Downloader

**Stop clicking "Save As" twenty times.** This Chrome Extension automatically scans any webpage (optimized for Moodle/LMS) for downloadable resources like PowerPoint presentations, PDFs, and Word documents, and downloads them all with a single click.

## ✨ Features

* **📦 Batch Downloading:** Downloads all files on a page instantly.
* **🧠 Smart Renaming:** Automatically renames files based on the link text (e.g., converts `view.php?id=123` to `Chapter 1 - Intro to Security.pptx`).
* **🌐 Universal Mode:** Works on any website, not just LMS platforms.
* **📂 Organized:** Saves all files into a tidy subfolder (`LMS_Downloads`) to keep your Downloads folder clean.
* **🛡️ Safe & Private:** Runs entirely in your browser. No data is sent to external servers.

## 🛠️ How to Install

Since this extension is for developer/personal use, you load it manually:

1.  **Clone or Download** this repository to your computer.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Toggle **Developer mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the folder where you downloaded this code.
6.  That's it! The extension icon should appear in your toolbar.

## 📖 How to Use

1.  Navigate to your university course page (or any page with files).
2.  Click the **Extension Icon** in your browser toolbar.
3.  Click **"Find & Download Files"**.
4.  (First time only) Chrome will ask permission to download multiple files. Click **Allow**.
5.  Watch your files download automatically!

## ⚙️ permissions Explained

* `activeTab`: To scan the current page for links.
* `scripting`: To inject the smart-renaming logic into the page.
* `downloads`: To save files directly to your computer without opening new tabs.

## 🤝 Contributing

Feel free to fork this project and submit pull requests if you want to add support for more file types or specific LMS platforms!
