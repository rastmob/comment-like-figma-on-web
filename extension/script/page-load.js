if (RMComment?.comments) {
  RMComment.comments.forEach((data) => {
    if (document.querySelector(data.selector)) {
      var img = document.createElement("img");
      img.src = "https://img.icons8.com/color/512/comments--v1.png";
      img.className = "RMCOMMENTIMG";
      img.setAttribute("title", data.comment);
      document.querySelector(data.selector).before(img);
    }
  });
}
