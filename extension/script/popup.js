console.log('popup.js loaded');

fetch("https://raw.githubusercontent.com/rastmob/comment-like-figma-on-web/main/extension/templates/popup.html" /*, options */)
  .then((response) => response.text())
  .then((html) => {
    console.log(html);
    let div = document.createElement('div');
    div.innerHTML = html.trim();
    document.body.appendChild(div);
  })
  .catch((error) => {
    console.warn(error);
  });

