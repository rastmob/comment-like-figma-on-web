if (RMComment && RMComment.comments) {
  RMComment.comments.forEach((data) => {
    console.log(data);
    if (document.querySelector(data.selector)) {
      console.log(document.querySelector(data.selector));
      var img = document.createElement("img");
      img.src = "https://img.icons8.com/color/512/comments--v1.png";
      img.className = "RMCOMMENTIMG";
      img.setAttribute("title", data.comment);
      document.querySelector(data.selector).after(img);
    }
  });
} else {
  console.log("Comment Null");
}
