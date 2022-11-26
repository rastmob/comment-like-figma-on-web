document.getElementById('btsend').onclick = () => {
    chrome.tabs.executeScript({file: 'script/index.js'});
};
