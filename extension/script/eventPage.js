const menuItem = {
  id: "addComment-CLFW",
  title: "Add Comment",
  contexts: ["all"],
};
chrome.contextMenus.create(menuItem, contextMenuCallback);

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == "addComment-CLFW") {
    var menuItemOptions = {
      type: "basic",
      iconUrl: "images/favicon-32x32.png",
      title: "",
      message: "",
    };
    chrome.notifications.create("createComment-CLFW", menuItemOptions);
    chrome.tabs.executeScript({
      file: "script/index.js",
    });
  }
});

function contextMenuCallback() {
  console.log("contextMenuCallback");
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    chrome.storage.local.get("rmInject", function (result) {
      if (typeof result.rmInject == "boolean" && result.rmInject) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
          fetch("http://localhost:4444/comment/", {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          })
            .then((response) => response.text())
            .then((data) => {
              chrome.tabs.executeScript(
                {
                  code: "var RMComment = " + data + ";",
                },
                function () {
                  chrome.tabs.executeScript({ file: "script/page-load.js" });
                }
              );
            });
        });
      }
    });
  }
});
