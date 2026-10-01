document.addEventListener("DOMContentLoaded", () => {
// Modal de bienvenida en el index (SOLO PRIMERA VISITA EN LA WEB)
//const sirve para darle un valor o palabra para que cuando sea utilizado la variable no pueda ser reasignado posteriormente
const modal = document.getElementById('welcomeModal');//Llamo el id del modal
const button = document.getElementById('closeBtn');//y al botón 

    if (modal && button) {
        if (localStorage.getItem('visited')) {//Si tu no has visitado la página anteriormente te saldra el modal
            modal.style.display = 'none';//pero si ya la has visitado, NO te mostrara el modal nuevamente
        }
        button.addEventListener('click', () => {//Cuando des click el modal desaparecera y mostrara el index
            modal.style.display = 'none';
            localStorage.setItem('visited', 'true');//Guardara en el almacenamiento el navegador en que se visito la pagina, por lo que si vuelves a entrar  desde el mismo navegador no te saldra el modal
        });
    }

//Validación del formulario de contacto
const formContacto = document.querySelector(".formulario-contacto");//Busca la clase del formulario y const le da un nuevo nombre, para llamarlo facilmente
    if (formContacto) {
        const emailInput = document.getElementById("email");//Busca el id del email
        formContacto.addEventListener("submit", (e) => {//Al formulario 

            let formValido = true;//Variable local para saber si cumple los requisitos del campo de email 
            if (!validarCorreo(emailInput.value.trim())) {//Si la variable tiene espacios
                emailInput.classList.add("input-error");//Añade del css el error
                formValido = false;//si esta el error, recurrira al id del css
            } else {
                emailInput.classList.remove("input-error");//si se corrige el error, validara el correo como valido
            }

            if (!formValido) {//Si el formulario sigue teniendo errores se cancela el envio 
                e.preventDefault();
            }
        });

        emailInput.addEventListener("input", () => {
            if (validarCorreo(emailInput.value.trim())) {//si el usuario no tiene errores desde un principio quita el id de error
                emailInput.classList.remove("input-error");
            }
        });
    }
function validarCorreo(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//Expresión establecida para validar el email
    return regex.test(email);//vuelve la variable a true o false
}
// Valición del registro, copie la validación del email pero agrege que buscara los id de las contraseñas
const formRegistro = document.querySelector(".fom-registro form");
    if (formRegistro) {
        const emailInput = document.getElementById("email");
        const contrasenaInput = document.getElementById("contraseña");
        const repetirContrasenaInput = document.getElementById("repetir-contraseña");

        formRegistro.addEventListener("submit", (e) => {

            let formValido = true;
            if (!validarCorreo(emailInput.value.trim())) {
                emailInput.classList.add("input-error");
                formValido = false;
            } else {
                emailInput.classList.remove("input-error");
            }

            //Este if hace el mismo proceso que el del email pero le pide que verifique que ambas contraseñas sean iguales
            if (contrasenaInput.value !== repetirContrasenaInput.value || contrasenaInput.value === "") {
                contrasenaInput.classList.add("input-error");
                repetirContrasenaInput.classList.add("input-error");
                formValido = false;
            } else {
                contrasenaInput.classList.remove("input-error");
                repetirContrasenaInput.classList.remove("input-error");
            }

            if (!formValido) {
                e.preventDefault();
            }
        });

        emailInput.addEventListener("input", () => {
            if (validarCorreo(emailInput.value.trim())) {
                emailInput.classList.remove("input-error");
            }
        });

        const limpiarContrasenas = () => {//si el usuario escribe igual la contraseñas en ambos campos, elimina el error
            if (contrasenaInput.value === repetirContrasenaInput.value) {
                contrasenaInput.classList.remove("input-error");
                repetirContrasenaInput.classList.remove("input-error");
            }
        };

        contrasenaInput.addEventListener("input", limpiarContrasenas);
        repetirContrasenaInput.addEventListener("input", limpiarContrasenas);
    }

//Galeria - ampliación de las imagenes
const destacadaCards = document.querySelectorAll(".destacada-card");//Llama la clase de los contenedores de las imagenes

    if (destacadaCards.length > 0) {//Comprueba que por lo menos haya una tarjeta

        const lightbox = document.createElement("div");
        //Añade la clase y de la tributos a esta
        lightbox.classList.add("lightbox-overlay");
        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-modal", "true");
        lightbox.setAttribute("aria-label", "Imagen ampliada");

        const lightboxImg = document.createElement("img");//Llama las imagenes que seran ampliadas
        lightboxImg.setAttribute("alt", "Imagen ampliada");

        const closeBtn = document.createElement("button");
        closeBtn.classList.add("lightbox-close");
        closeBtn.innerHTML = "✕";//Agrega del html la x para cerrar la imagen
        closeBtn.setAttribute("aria-label", "Cerrar imagen");
        //Es como si insertara un boton dentro de la imagen para que sirva la función 
        lightbox.appendChild(closeBtn);
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        // Abre el lightbox al hacer click en una de las imagenes
        destacadaCards.forEach((card) => {
            card.addEventListener("click", () => {
                const img = card.querySelector("img");
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt || "Imagen del festival";
                    lightbox.classList.add("active");
                    document.body.style.overflow = "hidden"; // bloquea scroll de la pagina
                }
            });
        });

        // para cerrar se debe hacer click en el botón ✕
        closeBtn.addEventListener("click", cerrarLightbox);

        // Al cerrar al hacer click en la x, nos saca de la imagen
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                cerrarLightbox();
            }
        });

        document.addEventListener("keydown", (e) => {//Tambien para cerrar la imagen dectecta el esc del teclado
            if (e.key === "Escape" && lightbox.classList.contains("active")) {
                cerrarLightbox();
            }
        });

function cerrarLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // restaura el scroll de la pagina
    }
    }
});