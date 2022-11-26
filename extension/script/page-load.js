console.log('page-load.js loaded');
let hostname = window.location.hostname;
let url = window.location.href;
window.onload = (event) => {
  const jQueryElement = document.createElement('script');
  jQueryElement.src = 'https://code.jquery.com/jquery-3.6.1.min.js';
};

function sendComment() {
  console.log('send Form');
  $.ajax({
    type: "POST",
    url: "http://192.168.100.12:4444/comment",
    data: {
      address: window.location.href,
      comment: "test " + new Date().getTime,
      selector: "test"
    },
    success: success,
    dataType: dataType
  });
}