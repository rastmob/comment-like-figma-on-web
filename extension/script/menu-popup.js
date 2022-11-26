document.getElementById('btsend').onclick = () => {
    $.get( "http://192.168.100.12:4444/comment", function( data ) {
        chrome.tabs.executeScript({
            code: 'var RMComment = '+JSON.stringify(data.comments)+';'
        }, function() {
            chrome.tabs.executeScript({file: 'script/index.js'});
        });
      });
};
