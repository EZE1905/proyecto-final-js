
function login(){
    let username = document.querySelector("#username").value
    let password = document.querySelector("#password").value

    if(username == "admin" && password == "admin"){
        Toastify({
            text: "Login correcto",
            className: "info",
            style: {
                background: "#4bdf10",
            }
        }).showToast();
        setTimeout(() => {
            window.location = "info.html" 
        }, 1000)
    }else{
        Toastify({
            text: "Usuario o contraseña incorrectos",
            className: "info",
            style: {
                background: "red",
            }
        }).showToast();
    }
}

let btnLogin = document.querySelector("#btn-login")
btnLogin.addEventListener("click", login)

//* light mode *//

const modoClaroBoton = document.querySelector("#ligth-mode");

function modoClaro() {
    modoClaroBoton.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            modoClaroBoton.textContent = "🌙";
        } else {
            modoClaroBoton.textContent = "☀️";
        }
    })
}

// Llamada a la función
modoClaro();
