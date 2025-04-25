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
    const resultadoDiv = document.getElementById("resultado");

    try {
        const response = await fetch(`https://3c16-181-209-119-222.ngrok-free.app/api/v1/token/${uid}`);
        const texto = await response.text();

        console.log("Código de estado:", response.status);
        console.log("Respuesta:", texto);

        if (response.status === 200) {
            resultadoDiv.textContent = "✅ UID válido. Redirigiendo...";
            setTimeout(() => {
                window.location.href = "bienvenido-querido.html";
            }, 1500);
        } else if (response.status === 401) {
            resultadoDiv.textContent = "❌ UID no registrado. Redirigiendo...";
            setTimeout(() => {
                window.location.href = "lapeor-no-tas-registrado-mi-loco.html";
            }, 1500);
        } else {
            resultadoDiv.textContent = "⚠️ Error inesperado. Código: " + response.status;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        resultadoDiv.textContent = "❌ Error al conectar con el servidor.";
    }
}

// Leer UID desde la URL
const params = new URLSearchParams(window.location.search);
const uid = params.get("uid");

if (uid) {
    console.log("UID recibido:", uid);
    validarUID(uid);
} else {
    /*
    const resultadoDiv = document.getElementById("resultado");
    if (resultadoDiv) {
        resultadoDiv.textContent = "⚠️ No se proporcionó ningún UID.";
    }*/
}
