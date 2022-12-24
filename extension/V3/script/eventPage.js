const menuItem = {
    id      : "addComment-CLFW-V3",
    title   : "Add Comment",
    contexts: ["all"],
};
chrome.contextMenus.create(menuItem, contextMenuCallback);

chrome.contextMenus.onClicked.addListener((clickData) => {
    if (clickData.menuItemId == "addComment-CLFW-V3") {
        var menuItemOptions = {
            type   : "basic",
            iconUrl: "images/favicon-32x32.png",
            title  : "",
            message: "",
        };
        chrome.notifications.create("createComment-CLFW", menuItemOptions);
        chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
            chrome.scripting.executeScript(
                {
                    target: {tabId: tab.id},
                    files : ['script/index.js'],
                })
        })
    }
});

function contextMenuCallback() {
    console.log("contextMenuCallback");
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
        console.log(":::Page Complete");
        chrome.storage.local.get("rmInject", function (result) {
            console.log("rmInject", result);
            if (typeof result.rmInject == "boolean" && result.rmInject) {
                console.log(":::Page result.rmInject");
                chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
                    fetch("https://clfowapi.rastmobile.com/comment/get", {
                        method : "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body   : JSON.stringify({address: tabs[0].url}),
                    })
                        .then((response) => {
                            console.log("loggg::::", response);
                            return response.status == 200 ? response.text() : null;
                        })
                        .then((data) => {
                            console.log(data);
                            if (data && JSON.parse(data).status == 200) {
                                chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
                                    chrome.tabs.executeScript(
                                        {
                                            code: "var RMComment = " + data + ";",
                                        },
                                        function () {
                                            chrome.tabs.executeScript({
                                                target: {tabId: tab.id},
                                                file: "script/page-load.js"
                                            });
                                        }
                                    );
                                });
                            } else {
                                console.log(`ERR : ${JSON.parse(data).status}`);
                            }
                        });
                });
            }
        });
    }
});
