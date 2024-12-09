chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`);
    if (command === "reloadExtension") {
      chrome.tabs.reload();
      chrome.runtime.reload();
    }
  });
