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
    console.log(":::Page Complete");
    chrome.storage.local.get("rmInject", function (result) {
      if (typeof result.rmInject == "boolean" && result.rmInject) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
          fetch("https://clfow.herokuapp.com/comment/get", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ address: tabs[0].url }),
          })
            .then((response) =>
              response.status == 200 ? response.text() : null
            )
            .then((data) => {
              console.log(data);
              if (data) {
                chrome.tabs.executeScript(
                  {
                    code: "var RMComment = " + data + ";",
                  },
                  function () {
                    chrome.tabs.executeScript({ file: "script/page-load.js" });
                  }
                );
              }
            });
        });
      }
    });
  }
});
