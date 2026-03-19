onClickSingIn = () => {
    const nameInput = document.getElementById("nameinput");
    const passwordInput = document.getElementById("passwordinput");

    if (nameInput.value === "admin" && passwordInput.value === "admin123") {
        window.location.href = "./dashboard.html";
    } else {
        alert("Invalid username or password");
    }
}

document.getElementById("signinbutton").addEventListener("click", onClickSingIn);