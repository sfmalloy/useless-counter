isSpacePressed = false;
isCtrlPressed = false;

window.onload = () => { 
    setCountVisibility(false);
    document.addEventListener("keydown", event => {
        if (document.getElementById("setCount").style.display === "none") {
            if (event.key === "Control") {
                isCtrlPressed = true;
            } else if (!isCtrlPressed) {
                if (event.key === " " && !isSpacePressed) {
                    isSpacePressed = true;
                    add();
                } else if (event.key === "c") {
                    setCountVisibility(true, event);
                } else if (event.key == "r") {
                    reset(event);
                }
            }
        } else {
            if (event.key === "Escape") {
                setCountVisibility(false);
            }
        }
    });
    
    document.addEventListener("keyup", event => {
        if (event.key === " ") {
            isSpacePressed = false;
        } else if (event.key === "Control") {
            isCtrlPressed = false;
        }
    });

    document.getElementById("countButton").addEventListener("click", event => {
        add();
        document.getElementById("countButton").blur();
    });

    document.getElementById("setCountButton").addEventListener("click", () => {
        setCountVisibility(true);
    });

    document.getElementById("resetButton").addEventListener("click", () => {
        document.getElementById("number").innerHTML = "0";
        document.getElementById("resetButton").blur();
        setCountVisibility(false);
    });

    document.getElementById("newCount").addEventListener("keydown", event => {
        if (event.key === "Enter" && isInt(document.getElementById("newCount").value)) {
            setCount();
        }
    });
}

function setCountVisibility(visibility, event) {
    var display = visibility ? "flex" : "none";
    document.getElementById("setCount").style.display = display;
    if (typeof event !== "undefined")
        event.preventDefault();

    if (visibility) {
        document.getElementById("newCount").focus();
        document.getElementById("confirmButton").addEventListener("click", () => {
            if (isInt(document.getElementById("newCount").value))
                setCount();
        });
    }
}

function isInt(value) {
    return !isNaN(value) && Number.isInteger(parseInt(value)) && value[value.length - 1] != '.';
}

function reset(event) {
    document.getElementById("number").innerHTML = "0";
    document.getElementById("newCount").value = "";
    document.getElementById("resetButton").blur();
    setCountVisibility(false, event);
}

function add() {
    var num = parseInt(document.getElementById("number").innerHTML) + 1;
    document.getElementById("number").innerHTML = num;
}

function setCount() {
    document.getElementById("number").innerHTML = document.getElementById("newCount").value;
    document.getElementById("newCount").value = "";
    document.getElementById("newCount").blur();
    setCountVisibility(false);
}
