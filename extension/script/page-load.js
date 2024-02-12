if (RMComment?.comments) {
  RMComment.comments.forEach((data) => {
    const element = document.querySelector(data.selector);
    if (element) {
      var img = document.createElement("img");
      img.src = "https://www.rastmobile.com/assets/images/comments--v1.png";
      img.className = "RMCOMMENTIMG";
      img.setAttribute("title", "Click to view comment");
      img.setAttribute("alt", "Comment icon"); // Improved accessibility
      img.style.cursor = "pointer"; // Change cursor on hover to indicate clickability

      // Event listener to show comment popup
      img.addEventListener('click', function() {
        showCommentPopup(data.comment);
      });

      element.before(img);
    }
  });
}
function showCommentPopup(dataComment) {
  // Check if an existing popup is open, remove it
  const existingPopup = document.getElementById('commentPopup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create the popup container
  var popup = document.createElement("div");
  popup.id = "commentPopup";
  popup.className = "comment-popup";

  var commentHtml = `
<div class="comment-content">
    <h3>Comment:</h3>
    <p>${dataComment}</p>
</div>
`;

  // Safely inject HTML into the popup. Ensure commentHtml is sanitized if from an untrusted source.
  popup.innerHTML = commentHtml; // Now supports HTML content

  // Basic styling for the popup, adjust as needed
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = " rgba(255, 255, 255, 0.18);";
  popup.style.padding = "20px";
  popup.style.border = "1px solid #ccc";
  popup.style.borderRadius = "5px";
  popup.style.zIndex = "10000"; // Ensure it's above other elements
  popup.style.boxShadow = "0 4px 6px rgba(0,0,0,.1)";
  popup.style.maxWidth = "80%"; // Prevents the popup from being too wide
  popup.style.maxHeight = "80vh"; // Limits the height and adds scroll for overflow
  popup.style.overflowY = "auto"; // Adds scroll for long content

  // Optionally, add a close button to the HTML string or here
// Create and style the close button
var closeButton = document.createElement("button");
closeButton.innerText = "Close";
closeButton.className = "close-button"; // Apply the CSS class
closeButton.onclick = function() {
    popup.remove();
};


  // Append the close button outside the HTML content to avoid overriding it
  popup.appendChild(closeButton);

  // Append the popup to the body
  document.body.appendChild(popup);
}
