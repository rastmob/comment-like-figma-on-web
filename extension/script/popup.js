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
    fetch("https://clfow.herokuapp.com/comment/", {
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
  }
  if (!boolean) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  }
}
