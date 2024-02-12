if (RMComment?.comments) {
  RMComment.comments.forEach((data) => {
    if (document.querySelector(data.selector)) {
      var img = document.createElement("img");
      img.src = "https://www.rastmobile.com/assets/images/comments--v1.png";
      img.className = "RMCOMMENTIMG";
      img.setAttribute("title", data.comment);
      document.querySelector(data.selector).before(img);
    }
  });
}
