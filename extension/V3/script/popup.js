chrome.storage.local.get("rmInject", function (result) {
  if (typeof result.rmInject == "boolean") {
    document.getElementById("getCommentCheckBox").checked = result.rmInject;
  }
});

document
  .getElementById("getCommentCheckBox")
  .addEventListener("change", (event) => {
    chrome.storage.local.set({ rmInject: event.currentTarget.checked });
    chrome.storage.local.get("rmInject", function (result) {
      inject(result.rmInject);
    });
  });

function inject(boolean) {
  if (typeof boolean != "boolean") {
    console.log("Error : type is not boolean");
    return;
  }
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
}
