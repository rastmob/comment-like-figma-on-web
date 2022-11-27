console.log("::: index.js loaded");

var modalOpen = false;
var modalId = "RModal";
var modalClass = "RModal";
// const modalId = new Date().getTime() + "-RModal";
document.body.innerHTML += `
    <div id="${modalId}" class="${modalClass}">
      <label for="comment-text">Please enter your comment:</label>
      <textarea class="form-control" id="${modalClass}-comment-text" rows="6"></textarea>
      <button id="${modalId}-submit" type="button" class="btn btn-primary mt-3 w-100 submit-btn">Submit</button>
    </div>`;
document.getElementById(`${modalId}-submit`).addEventListener("click", () => {
  console.log(
    "::: Comment",
    document.getElementById(`${modalClass}-comment-text`).value
  );
  console.log("Submit");
});

window.addEventListener("scroll", (e) => {
  document.getElementById(modalId).style.display = "none";
  modalOpen = false;
});

document.querySelectorAll("*").forEach((el, i) => {
  el.addEventListener("mouseover", (event) => {
    if (!modalOpen) {
      event.target.classList.add("hoverElRM");
      document.querySelector(".hoverElRM").addEventListener(
        "contextmenu",
        function (e) {
          if (!modalOpen && document.getElementById(modalId)) {
            document.getElementById(modalId).style.display = "block";
            modalOpen = true;
          }
          e.preventDefault();
        },
        false
      );
    } else {
      event.target.classList.remove("hoverElRM");
    }
  });

  el.addEventListener("mouseout", (event) => {
    event.target.classList.remove("hoverElRM");
  });
});
