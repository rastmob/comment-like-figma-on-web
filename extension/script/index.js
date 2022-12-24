console.log("::: index.js loaded");

var modalOpen = false;
var modalId = "RModal";
var modalClass = "RModal";
var selector = null;
var submit = false;
// const modalId = new Date().getTime() + "-RModal";
document.body.innerHTML += `
    <div id="${modalId}" class="${modalClass}">
      <textarea id="${modalClass}-comment-text" name="text" class="comment-input" placeholder="Comment"></textarea>
      <button id="${modalId}-submit" type="button">Submit</button>
    </div>`;
document.getElementById(`${modalId}-submit`).addEventListener("click", () => {
  console.log(
    "::: Comment",
    document.getElementById(`${modalClass}-comment-text`).value
  );
  fetch("https://clfowapi.rastmobile.com/comment/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: window.location.href,
      comment: document.getElementById(`${modalClass}-comment-text`).value,
      selector: selector,
    }),
  })
    .then(function (res) {
      console.log(res);
      window.location.reload();
    })
    .catch(function (res) {
      console.log(res);
      window.location.reload();
    });
  console.log("Submit");
  document.getElementById(modalId).style.display = "none";
  submit = true;
});

window.addEventListener("scroll", (e) => {
  if (!submit) {
    document.getElementById(modalId).style.display = "none";
    modalOpen = false;
  }
});

document.querySelectorAll("*").forEach((el, i) => {
  el.addEventListener("mouseover", (event) => {
    if (!modalOpen) {
      selector = generateQuerySelector(event.target).replaceAll(":", "\\:");
      console.log(selector);
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

var generateQuerySelector = function (el) {
  if (el.tagName.toLowerCase() == "html") return "HTML";
  var str = el.tagName;
  str += el.id != "" ? "#" + el.id : "";
  if (el.className && typeof el.className === "string") {
    var classes = el.className
      .split(/\s/)
      .filter((data) => data != "hoverElRM");
    for (var i = 0; i < classes.length; i++) {
      str += "." + classes[i];
    }
  }
  if (str.endsWith(".")) {
    str = str.slice(0, -1);
  }
  return (generateQuerySelector(el.parentNode) + " > " + str)
    .replaceAll(". ", " ")
    .replaceAll("..", ".")
    .replaceAll("  ", " ");
};
