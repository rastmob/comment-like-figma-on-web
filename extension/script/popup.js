console.log('popup.js loaded');

fetch("https://raw.githubusercontent.com/rastmob/comment-like-figma-on-web/main/extension/templates/popup.html" /*, options */)
  .then((response) => response.text())
  .then((html) => {

    addScript('inject', "function sendComment() { let response =  fetch('https://clfow.herokuapp.com/comment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ address: window.location.href, comment: 'test', selector: 'test' }) }); }");

    // addScript('inject', "alert(); function sendComment() { $.ajax({ type: 'POST', url: 'http://192.168.100.12:4444/comment', data: { address: window.location.href, comment: 'test ' + new Date().getTime, selector: 'test ' }, success: success, dataType: dataType }); }");

    console.log(html);

    let div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);


  })
  .catch((error) => {
    console.warn(error);
  });


function addScript(inject, code) {
  var scriptNode = document.createElement('script');
  scriptNode.innerHTML = code;
  document.body.appendChild(scriptNode);
}