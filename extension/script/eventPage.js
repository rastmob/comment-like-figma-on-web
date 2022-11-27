const menuItem = {
  id: "addComment-CLFW",
  title: "Add Comment",
  contexts: ['all'],
}

chrome.contextMenus.create(
  menuItem,
  contextMenuCallback,
);

chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId == "addComment-CLFW") {

    var menuItemOptions = {
      type: "basic",
      iconUrl: "images/favicon-32x32.png",
      title: "",
      message: ""
    };
    chrome.notifications.create('createComment-CLFW', menuItemOptions);

    console.log('clickData: ', clickData);
    console.log('clickData.pageUrl: ', clickData.pageUrl);


    chrome.tabs.executeScript({
       file: 'script/popup.js'
     }, function (results) {
      // chrome.tabs.sendMessage(tab.id, {"message": "need to update tab", "tab": tab.id});
     console.log(results);

    }); 
  }
});

function contextMenuCallback() {
  console.log('contextMenuCallback');
}