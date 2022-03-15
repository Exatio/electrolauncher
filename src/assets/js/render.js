const myButton = document.getElementById("justbutton");

myButton.onclick = function() {
    alert("Test passed")
    myButton.className = "button is-primary is-medium is-loading"
};