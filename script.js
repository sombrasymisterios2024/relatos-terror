// --- PROTECCIÓN DE CONTENIDO ---

// Bloqueo de clic derecho
document.addEventListener('contextmenu', event => event.preventDefault());

// Bloqueo de atajos de teclado (F12, Ctrl+U, Ctrl+C, Ctrl+P, Ctrl+S)
document.onkeydown = function(e) {
    if(e.keyCode == 123 || 
      (e.ctrlKey && (e.keyCode == 85 || e.keyCode == 67 || e.keyCode == 80 || e.keyCode == 83))) {
        alert("Contenido protegido por derechos de autor.");
        return false;
    }
};

// --- FUNCIONES DEL LECTOR PDF ---

/**
 * Abre el lector modal usando el Visor de Google Docs para permitir zoom en móviles
 */
function abrirLector(url) {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    // Transformamos el link de Drive para el Visor de Google Docs
    // Esto habilita herramientas de zoom nativas y evita pedir cuenta de Gmail
    const urlDirecta = url.replace('/preview', '/view');
    const visorGoogle = `https://docs.google.com/viewer?url=${encodeURIComponent(urlDirecta)}&embedded=true`;
    
    iframe.src = visorGoogle;
    lector.style.display = 'block';
    
    // Bloqueamos el scroll de la página principal
    document.body.style.overflow = 'hidden';
    
    // Forzamos modo claro al iniciar
    cambiarModoLector('claro');
}

/**
 * Cierra el lector y limpia los estados
 */
function cerrarLector() {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    // Salir de pantalla completa si está activa
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
    
    lector.style.display = 'none';
    iframe.src = ''; 
    document.body.style.overflow = 'auto';
}

/**
 * Cambia entre modo claro y oscuro con filtros
 */
function cambiarModoLector(modo) {
    const iframe = document.getElementById('frame-pdf');
    const botones = document.querySelectorAll('.btn-modo');
    
    if (modo === 'oscuro') {
        iframe.classList.add('pdf-oscuro');
    } else {
        iframe.classList.remove('pdf-oscuro');
    }

    botones.forEach(btn => {
        btn.classList.remove('active');
        const textoBoton = btn.innerText.toUpperCase();
        
        if (modo === 'oscuro' && textoBoton.includes('OSCURO')) {
            btn.classList.add('active');
        } else if (modo === 'claro' && textoBoton.includes('CLARO')) {
            btn.classList.add('active');
        }
    });
}

/**
 * Activa el modo Pantalla Completa real del navegador
 * Esto permite que el PDF ocupe todo el dispositivo sin salir de la web
 */
function pantallaCompleta() {
    const lector = document.getElementById('lector-pdf');
    
    // Detectar si ya estamos en pantalla completa
    const enPantallaCompleta = document.fullscreenElement || 
                               document.webkitFullscreenElement || 
                               document.mozFullScreenElement || 
                               document.msFullscreenElement;

    if (!enPantallaCompleta) {
        // Entrar en pantalla completa (Soporte para todos los navegadores)
        if (lector.requestFullscreen) {
            lector.requestFullscreen();
        } else if (lector.webkitRequestFullscreen) {
            lector.webkitRequestFullscreen();
        } else if (lector.mozRequestFullScreen) {
            lector.mozRequestFullScreen();
        } else if (lector.msRequestFullscreen) {
            lector.msRequestFullscreen();
        }
    } else {
        // Salir de pantalla completa
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
