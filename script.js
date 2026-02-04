// --- PROTECCIÓN DE CONTENIDO ---
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(e) {
    if(e.keyCode == 123 || (e.ctrlKey && [85, 67, 80, 83].includes(e.keyCode))) {
        alert("Contenido protegido.");
        return false;
    }
};

// --- FUNCIONES DEL LECTOR PDF ---

function abrirLector(nombreArchivo) {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    // IMPORTANTE: Cambia esto por tus datos reales
    const usuario = "TU_USUARIO"; 
    const repo = "TU_REPOSITORIO";
    
    // Usamos el visor nativo de Google o una ruta directa si el PDF está en el mismo servidor
    // Si estás en GitHub Pages, lo más sencillo es usar la ruta relativa:
    const urlArchivo = `https://${usuario}.github.io/${repo}/pdfs/${nombreArchivo}`;
    
    // Si PDF.js de Mozilla te da error de "Missing PDF file", 
    // es mejor usar el visor de Google Docs que sí acepta archivos de GitHub:
    const visorFinal = `https://docs.google.com/viewer?url=${encodeURIComponent(urlArchivo)}&embedded=true`;
    
    iframe.src = visorFinal;
    lector.style.display = 'block';
    document.body.style.overflow = 'hidden';
    cambiarModoLector('claro');
}

function cerrarLector() {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
    
    lector.style.display = 'none';
    iframe.src = ''; 
    document.body.style.overflow = 'auto';
}

function cambiarModoLector(modo) {
    const iframe = document.getElementById('frame-pdf');
    const botones = document.querySelectorAll('.btn-modo');
    
    if (modo === 'oscuro') {
        iframe.style.filter = "invert(90%) hue-rotate(180deg) brightness(0.7)";
    } else {
        iframe.style.filter = "none";
    }

    botones.forEach(btn => {
        btn.classList.remove('active');
        if ((modo === 'oscuro' && btn.innerText.includes('OSCURO')) || 
            (modo === 'claro' && btn.innerText.includes('CLARO'))) {
            btn.classList.add('active');
        }
    });
}

function pantallaCompleta() {
    const lector = document.getElementById('lector-pdf');
    const isFull = document.fullscreenElement || document.webkitFullscreenElement;

    if (!isFull) {
        if (lector.requestFullscreen) lector.requestFullscreen();
        else if (lector.webkitRequestFullscreen) lector.webkitRequestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
} // Se corrigió la coma por la llave de cierre
