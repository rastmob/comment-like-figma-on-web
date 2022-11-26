RMComment.forEach(data => {
    document.getE
    console.log(data);
    if (document.querySelector(data.selector)) {
        document.querySelector(data.selector).style.background='red';
    }
});
