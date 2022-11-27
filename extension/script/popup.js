chrome.storage.local.get("rmInject", function (result) {
  if (typeof result.rmInject == "boolean") {
    document.getElementById("check1").checked = result.rmInject;
  }
});

document.getElementById("check1").addEventListener("change", (event) => {
  chrome.storage.local.set({ rmInject: event.currentTarget.checked });
  chrome.storage.local.get("rmInject", function (result) {
    if (typeof result.rmInject == "boolean") {
      inject(result.rmInject);
    }
  });
});

function inject(boolean) {
  if (typeof boolean != "boolean") {
    console.log("Error : type is not boolean");
    return;
  }
  if (boolean) {
    // chrome.tabs.executeScript({ file: "script/index.js" });
  }
  if (!boolean) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  }
}
