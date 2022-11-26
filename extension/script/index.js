console.log('data');
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://192.168.100.12:4444/comment");
xhr.send();
xhr.onreadystatechange = function () {
  if (this.readyState === 4) {
    if ((this.status == 200) && (this.status < 300)) {
      console.log(this.responseText)
    }
  }
}
