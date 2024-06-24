let habitos = [];

// Función para añadir un hábito
const agregarHabito = (nombre) => {
    const nuevoHabito = {
        id: Date.now(),
        nombre,
        progreso: []
    };
    habitos.push(nuevoHabito);
    guardarHabitos();
    renderHabitos();
};

// Función para eliminar un hábito por ID
const eliminarHabito = (id) => {
    habitos = habitos.filter(h => h.id !== id);
    guardarHabitos();
    renderHabitos();
};

// Función para eliminar todos los hábitos
const eliminarTodosHabitos = () => {
    habitos = [];
    guardarHabitos();
    renderHabitos();
};

// Función para guardar hábitos en localStorage
const guardarHabitos = () => {
    localStorage.setItem('habitos', JSON.stringify(habitos));
};

// Función para cargar hábitos desde localStorage
const cargarHabitos = () => {
    const habitosGuardados = localStorage.getItem('habitos');
    if (habitosGuardados) {
        habitos = JSON.parse(habitosGuardados);
    }
};

// Función para renderizar los hábitos en el DOM
const renderHabitos = () => {
    const listaHabitos = document.getElementById('habit-list');
    listaHabitos.innerHTML = '';
    habitos.forEach(habito => {
        const li = document.createElement('li');
        li.textContent = habito.nombre;

        const btnProgreso = document.createElement('button');
        btnProgreso.textContent = 'Registrar Progreso';
        btnProgreso.onclick = () => registrarProgreso(habito.id);
        li.appendChild(btnProgreso);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('delete');
        btnEliminar.onclick = () => eliminarHabito(habito.id);
        li.appendChild(btnEliminar);

        listaHabitos.appendChild(li);
    });
    renderGrafico();
};

// Función para registrar el progreso del hábito
const registrarProgreso = (id) => {
    const habito = habitos.find(h => h.id === id);
    if (habito) {
        habito.progreso.push(new Date().toLocaleDateString());
        guardarHabitos();
        renderHabitos();
    }
};

// Función para renderizar el gráfico de progreso
const renderGrafico = () => {
    const ctx = document.getElementById('habit-chart').getContext('2d');
    const labels = habitos.map(h => h.nombre);
    const data = habitos.map(h => h.progreso.length);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Progreso de Hábitos',
                data: data,
                backgroundColor: '#222',
                borderColor: 'lightblue',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// Manejador del formulario
document.getElementById('habit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('habit-name').value;
    agregarHabito(nombre);
    document.getElementById('habit-form').reset();
});

// Manejador del botón de borrar todos los hábitos, confirm('¿Estás seguro de que deseas eliminar todos los hábitos?')
document.getElementById('clear-habits').addEventListener('click', () => {
    if (Swal.fire({
        title: "¿Está seguro?",
        text: "¿Estás seguro de que deseas eliminar todos los hábitos?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Si, borrar todos los hábitos!",
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: "¡Eliminado!",
            text: "Se han eliminado todos los hábitos.",
            icon: "success"
            });
        }
        })) 
        {
        eliminarTodosHabitos();
    }
});

// Inicializar el gráfico al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarHabitos();
    renderHabitos();
    renderGrafico();
});

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