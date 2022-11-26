const menuItem = {
  id: "addComment-CLFW",
  title: "Add Comment",
  contexts: ['all'],
}

chrome.contextMenus.create(menuItem);

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
  }
});