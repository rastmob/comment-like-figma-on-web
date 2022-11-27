JSON.parse(RMComment.comments).comments.forEach((comment) => {
  console.log(comment);
  if (document.querySelector(comment.selector)) {
    console.log(document.querySelector(comment.selector));
  }
});
