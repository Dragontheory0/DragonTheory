document.addEventListener("DOMContentLoaded", () => {
    // Manejo de registro
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const regUsername = document.getElementById("regUsername").value;
            const regPassword = document.getElementById("regPassword").value;

            const users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[regUsername]) {
                document.getElementById("registerError").style.display = "block";
            } else {
                users[regUsername] = { password: regPassword, votos: {} };
                localStorage.setItem("users", JSON.stringify(users));
                alert("Registro exitoso. Ahora puedes iniciar sesión.");
                registerForm.reset();
                document.getElementById("registerError").style.display = "none";
            }
        });
    }

    // Manejo de inicio de sesión
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[username] && users[username].password === password) {
                localStorage.setItem("loggedIn", username);
                alert(`Inicio de sesión exitoso. Bienvenido, ${username}`);
                window.location.href = "index.html";
            } else {
                document.getElementById("loginError").style.display = "block";
            }
        });
    }

    // Cargar teorías y canales solo si no están en localStorage
    if (!localStorage.getItem("teorias")) {
        const teorias = [
            {
                id: 1,
                titulo: "Goku traicionado y encerrado en la habitacion del tiempo por 10 mil años",
                descripcion: "Explora cómo Goku aumenta su poder en Dragon Ball.",
                url: "https://youtu.be/Q6_IEhYqMS8?si=_UuzifRp_hsujXDF",
                imagen: "https://img.youtube.com/vi/Q6_IEhYqMS8/0.jpg",
                votos: [],
                totalVotantes: 0
            },
            {
                id: 2,
                titulo: "Goku encerrado en la habitacion del tiempo|El Dios dragon",
                descripcion: "Investiga los secretos detrás de Freezer y su raza.",
                url: "https://youtu.be/P2f4cT8Fqxs?si=PzXLvANc_1hPErKs",
                imagen: "https://img.youtube.com/vi/P2f4cT8Fqxs/0.jpg",
                votos: [],
                totalVotantes: 0
            },
            {
                id: 3,
                titulo: "Goku encerrado por 2 millones de años en la habitacion del tiempo",
                descripcion: "Una teoría que explora el papel de las Dragon Balls en distintos universos.",
                url: "https://youtu.be/0qDIqcbbuLU?si=9oG8z_DTiPesHRB-",
                imagen: "https://img.youtube.com/vi/0qDIqcbbuLU/0.jpg",
                votos: [],
                totalVotantes: 0
            },
            {
                id: 4,
                titulo: "[Realista] QHPS Goku era traicionado en la habitacion del tiempo",
                descripcion: "Teoría sobre los viajes en el tiempo y sus consecuencias.",
                url: "https://youtu.be/YtRlyTPf3RE?si=RTi8EEKYxUjh2gbz",
                imagen: "https://img.youtube.com/vi/YtRlyTPf3RE/0.jpg",
                votos: [],
                totalVotantes: 0
            }
        ];
        localStorage.setItem("teorias", JSON.stringify(teorias));
    }

    if (!localStorage.getItem("canales")) {
        const canales = [
            {
                id: 1,
                nombre: "Gokku Teorías 3.0",
                descripcion: "Canal sobre teorías del universo Dragon Ball.",
                url: "https://youtube.com/@gokkuteorias?si=VRYFdlM9ere7m6ka",
                imagen: "https://yt3.ggpht.com/ytc/AKedOLQj2G5fQFHYu0q3JjTZc5HHfkrK6hrIu7MeV61R=s88-c-k-c0x00ffffff-no-rj",
                votos: [],
                totalVotantes: 0
            },
            {
                id: 2,
                nombre: "Skinox Teorías DBS",
                descripcion: "Canal especializado en Dragon Ball Super y sus teorías.",
                url: "https://youtube.com/@skinoxteoriasdbs?si=OYukj6zxpz9OI3JL",
                imagen: "https://yt3.ggpht.com/ytc/AKedOLQTmMjbP9B-2IHB3enNlgDP2hDPWwzVeL8ts2Rxm4w=s88-c-k-c0x00ffffff-no-rj",
                votos: [],
                totalVotantes: 0
            },
            {
                id: 3,
                nombre: "El Zurdo",
                descripcion: "Canal con teorías profundas sobre el universo Dragon Ball.",
                url: "https://youtube.com/@thezurdo689?si=hT9WzoY9zAdA9zkH",
                imagen: "https://yt3.ggpht.com/ytc/AKedOLQSt_6QzLQUX7ObaJ1zRl1sfStgKw4h0uDNjIVgs9c=s88-c-k-c0x00ffffff-no-rj",
                votos: [],
                totalVotantes: 0
            },
            {
                id: 4,
                nombre: "Drak Teorías DBS",
                descripcion: "Análisis y teorías sobre Dragon Ball Super.",
                url: "https://youtube.com/@drakteoriasdbs?si=0KjlEkUCFefIi9fz",
                imagen: "https://yt3.ggpht.com/ytc/AKedOLTZKJdBR4b6N5fmw5QTYjl5_i56_dha1qSoQjFq=s88-c-k-c0x00ffffff-no-rj",
                votos: [],
                totalVotantes: 0
            }
        ];
        localStorage.setItem("canales", JSON.stringify(canales));
    }

    const teorias = JSON.parse(localStorage.getItem("teorias"));
    const canales = JSON.parse(localStorage.getItem("canales"));

    const teoriasContainer = document.getElementById("lista-teorias");
    const canalesContainer = document.getElementById("lista-canales");

    // Mostrar teorías y canales
    if (teoriasContainer) {
        mostrarItems(teorias, teoriasContainer, "teoria");
    }
    if (canalesContainer) {
        mostrarItems(canales, canalesContainer, "canal");
    }

    function mostrarItems(items, container, tipo) {
        if (!container) return;

        container.innerHTML = "";
        items.forEach(item => {
            const promedio = calcularPromedio(item.votos);
            const div = document.createElement("div");
            div.className = tipo;
            div.innerHTML = `
                <h3>${item.titulo || item.nombre}</h3>
                <p>${item.descripcion}</p>
                <img src="${item.imagen}" alt="Imagen de ${item.titulo || item.nombre}" width="200">
                <p>Promedio: ${promedio.toFixed(1)} / 5</p>
                <div>${mostrarEstrellas(promedio)}</div>
                <button onclick="votar(${item.id}, '${tipo}')">Votar</button>
                <br>
                <a href="${item.url}" target="_blank">Ver en YouTube</a>
            `;
            container.appendChild(div);
        });
    }
});

// Función para calcular promedio
function calcularPromedio(votos) {
    if (votos.length === 0) return 0;
    const total = votos.reduce((acc, v) => acc + v, 0);
    return total / votos.length;
}

// Mostrar estrellas
function mostrarEstrellas(promedio) {
    const estrellasLlenas = Math.floor(promedio);
    const vacias = 5 - estrellasLlenas;
    return "★".repeat(estrellasLlenas) + "☆".repeat(vacias);
}

// Función para votar
function votar(id, tipo) {
    const usuario = localStorage.getItem("loggedIn");
    if (!usuario) {
        alert("Por favor, inicia sesión para votar.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users"));
    const datos = tipo === "teoria" ? "teorias" : "canales";
    const items = JSON.parse(localStorage.getItem(datos));

    const voto = parseInt(prompt("Califica con estrellas (1-5):"));
    if (isNaN(voto) || voto < 1 || voto > 5) {
        alert("Voto inválido. Debe ser un número entre 1 y 5.");
        return;
    }

    if (users[usuario].votos[id]) {
        alert("Ya has votado por este elemento.");
        return;
    }

    const item = items.find(el => el.id === id);
    item.votos.push(voto);
    item.totalVotantes++;
    users[usuario].votos[id] = true;

    localStorage.setItem(datos, JSON.stringify(items));
    localStorage.setItem("users", JSON.stringify(users));
    alert("Gracias por tu voto.");
    location.reload();
}