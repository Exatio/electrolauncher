const myButton = document.getElementById("justbutton");
const exitButton = document.getElementById("exit");

myButton.onclick = function() {
    alert("Test passed")
    myButton.className = "button is-primary is-medium is-loading"
};

exitButton.onclick = function() {
    window.close();
};