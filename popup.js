document.getElementById("downloadBtn").addEventListener("click", async () => {
  const statusDiv = document.getElementById("status");
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  statusDiv.innerText = "Scanning page for files...";

  // 1. Run the Universal Scraper
  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: scrapeAnyFileLinks,
  });

  const files = results[0].result;

  if (!files || files.length === 0) {
    statusDiv.innerText = "No common files found.";
    alert("No files (PPT, PDF, DOC, ZIP) found on this page.");
    return;
  }

  // 2. Confirm with User (Safety check so you don't download 100 junk files)
  const confirmed = confirm(`Found ${files.length} files. Download them all?`);
  if (!confirmed) {
    statusDiv.innerText = "Cancelled.";
    return;
  }

  // 3. Start Downloading
  statusDiv.innerText = `Found ${files.length} files. Starting...`;
  
  let count = 0;
  for (const file of files) {
    
    chrome.downloads.download({
      url: file.url,
      // Save in a folder named "Universal_Downloads"
      filename: `Universal_Downloads/${file.filename}`, 
      saveAs: false,
      conflictAction: "uniquify" // If file exists, it auto-renames it (e.g., file(1).pdf)
    });

    count++;
    await new Promise(r => setTimeout(r, 250)); // Slight delay to be polite to the server
    statusDiv.innerText = `Queued ${count}/${files.length}: ${file.filename}`;
  }

  statusDiv.innerText = "All downloads started!";
});

// --- THE UNIVERSAL SCRAPER ---
function scrapeAnyFileLinks() {
  // 1. Get ALL links on the page
  const allLinks = Array.from(document.querySelectorAll("a"));
  
  // 2. Define what counts as a "File"
  // You can add more extensions here if you want (e.g., .mp4, .jpg)
  const allowedExtensions = [".ppt", ".pptx", ".pdf", ".doc", ".docx", ".zip", ".rar", ".xls", ".xlsx"];
  
  // 3. Filter the links
  return allLinks.filter(link => {
    const href = link.href.toLowerCase();
    // Check if the link ends with any of our extensions
    // OR if it contains the special Moodle pattern (so your LMS still works!)
    return allowedExtensions.some(ext => href.split('?')[0].endsWith(ext)) || 
           href.includes("/mod/resource/view.php"); 
  }).map((link, index) => {
    
    // 4. Get a clean name
    let name = link.innerText.trim();
    if (!name) name = link.href.split("/").pop(); // If no text, use filename from URL
    
    // Clean illegal characters
    name = name.replace(/[:/\\*?"<>|]/g, "_").trim();
    
    // Ensure extension matches URL
    // (If the link doesn't look like a file but is one, we default to PDF or PPTX)
    if (!name.includes(".")) {
      const parts = link.href.split("/");
      const lastPart = parts[parts.length - 1].split("?")[0]; // remove ?query
      
      // Try to grab extension from URL
      if (lastPart.includes(".")) {
         const ext = lastPart.split(".").pop();
         if (ext.length < 5) name += "." + ext;
      } else {
         // Fallback default
         name += ".pptx"; 
      }
    }

    return { url: link.href, filename: name };
  });
}