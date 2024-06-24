
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
            window.location = "main.html" 
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

// Función para guardar la preferencia de modo claro en localStorage
const guardarModoClaro = () => {
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem('modoclaro', 'true');
        modoClaroBoton.textContent = "🌙";
    } else {
        localStorage.setItem('modoclaro', 'false');
        modoClaroBoton.textContent = "☀️";
    }
};

// Función para cargar la preferencia de modo claro desde localStorage
const cargarModoClaro = () => {
    const modoclaroGuardado = localStorage.getItem('modoclaro');
    if (modoclaroGuardado === 'true') {
        document.body.classList.add("light-mode");
        modoClaroBoton.textContent = "🌙";
    } else {
        document.body.classList.remove("light-mode");
        modoClaroBoton.textContent = "☀️";
    }
};

// Función para alternar el modo claro/oscuro
const alternarModoClaro = () => {
    document.body.classList.toggle("light-mode");
    guardarModoClaro();
};

// Asignar evento de clic al botón de modo claro/oscuro
modoClaroBoton.addEventListener('click', alternarModoClaro);

// Cargar la preferencia de modo claro al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarModoClaro();
});