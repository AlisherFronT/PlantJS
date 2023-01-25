const name = document.querySelector(".name");
const email = document.querySelector(".email");
const image = document.querySelector(".image");
const password = document.querySelector(".password");
const error = document.querySelector(".error");
const register = document.querySelector(".register");

window.addEventListener("load", () => {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([]))
    }
})

register.addEventListener("click", (event) => {
    event.preventDefault();

    if (name.value !== "" && email.value !== "" && image.value !== "" && password !== "") {
        const allUsers = JSON.parse(localStorage.getItem("users"));
        const user = allUsers.find(item => item.email === email.value);
        if (user) {
            error.innerHTML = "Данный пользователь существует!";
        } else {
            localStorage.setItem("users", JSON.stringify([
                ...allUsers,
                {
                    name: name.value,
                    email: email.value,
                    image: image.value,
                    password: password.value
                }
            ]))
            
            window.open("../pages/auth.html", "_self")
        }
            name.value = "";
            email.value = "";
            image.value = "";
            password.value = "";
    } else {
        error.innerHTML = "Все поля должны быть заполнены!";
    }
})
