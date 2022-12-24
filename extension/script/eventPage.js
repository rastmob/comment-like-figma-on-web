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
  console.log("changeInfo.status", changeInfo.status);
  console.log("tab.status", tab.status);
  if (changeInfo.status === "complete") {
    console.log(":::Page Complete");
    chrome.storage.local.get("rmInject", function (result) {
      console.log("rmInject", result);
      if (typeof result.rmInject == "boolean" && result.rmInject) {
        console.log(":::Page result.rmInject");
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
          chrome.tabs.executeScript(
            {
              code: "temp=window.rmloaded;window.rmloaded=true;temp",
            },
            function (rmloaded) {
              console.log("rmloaded", rmloaded);
              if (!rmloaded[0]) {
                fetch("https://clfowapi.rastmobile.com/comment/get", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ address: tabs[0].url }),
                })
                  .then((response) => {
                    console.log("loggg::::", response);
                    return response.status == 200 ? response.text() : null;
                  })
                  .then((data) => {
                    console.log(data);
                    if (data && JSON.parse(data).status == 200) {
                      chrome.tabs.executeScript(
                        {
                          code: "window.RMComment = " + data + ";",
                        },
                        () => {
                          chrome.tabs.executeScript({
                            file: "script/page-load.js",
                          });
                        }
                      );
                    } else {
                      console.log(`ERR : ${JSON.parse(data).status}`);
                    }
                  });
              }
            }
          );
        });
      }
    });
  }
});
