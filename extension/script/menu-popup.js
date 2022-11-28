document.getElementById('btsend').onclick = () => {
    $.get( "https://clfow.herokuapp.com/comment", function( data ) {
        chrome.tabs.executeScript({
            code: 'var RMComment = '+JSON.stringify(data.comments)+';'
        }, function() {
            chrome.tabs.executeScript({file: 'script/index.js'});
        });
      });
};
