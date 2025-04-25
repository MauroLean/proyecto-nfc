const btnInicio = document.getElementById("btn-sign-in");
const btnRegistro = document.getElementById("btn-sign-up");
const container = document.querySelector(".container");

btnInicio?.addEventListener("click", () => {
    container.classList.remove("toggle");
});

btnRegistro?.addEventListener("click", () => {
    container.classList.add("toggle");
});

async function validarUID(uid) {
    try {
        const response = await fetch(`https://d64c-181-209-119-222.ngrok-free.app/api/v1/token/${uid}`);
        console.log("Status de respuesta:", response.status); // Muestra el código de respuesta HTTP

        if (response.status === 401) {
            // UID no registrado
            console.log("UID no registrado. Mostrando alerta...");
            alert("Tarjeta NFC no registrada.");
            // window.location.href = "https://campusvirtual.unp.edu.ar/"; // Descomentar si quieres redirigir
        } else if (response.ok) {
            // UID válido
            console.log("UID válido. Redirigiendo...");
            alert("Tarjeta NFC encontrada. Redireccionando...");
            
            // window.location.href = "http://127.0.0.1:5500/index.html"; // Redirigir si es necesario
        } else {
            alert("Error inesperado.");
        }
    } catch (error) {
        console.error("Error al verificar UID:", error);
        alert("No se pudo conectar al servidor.");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const uid = params.get("uid");

    console.log("UID desde URL:", uid);

    if (uid) {
        validarUID(uid);
    } else {
        console.log("No hay UID en la URL.");
    }
});
