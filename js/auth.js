const email = document.querySelector(".email");
const password = document.querySelector(".password");
const error = document.querySelector(".error");
const login = document.querySelector(".login");

window.addEventListener("load", () => {
    if (localStorage.getItem("access_token") === "true") {
        window.open("../index.html", "_self")
    }
})

login.addEventListener("click", (event) => {
    event.preventDefault();
    if (email.value !== "" && password.value !== "") {
        const allUser = JSON.parse(localStorage.getItem("users"))
        const user = allUser.find(item => item.email === email.value && item.password === password.value)
        console.log(user);
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            localStorage.setItem("access_token", "true");
            window.open("../index.html", "_self")
        } else {
            error.innerHTML = "Данный пользователь не существует!"
        }
    } else {
        error.innerHTML = "Все поля должны быть заполнены!"
    }
})