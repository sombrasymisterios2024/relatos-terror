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
    
    // 1. REEMPLAZA ESTO CON TUS DATOS REALES
    const usuario = "TU_USUARIO_GITHUB"; 
    const repositorio = "NOMBRE_DE_TU_REPOSITORIO";

    // 2. Construimos la URL de tu sitio de GitHub Pages (donde están tus archivos)
    // Esto asume que tienes tus PDFs en una carpeta llamada 'pdfs'
    const urlArchivo = `https://${usuario}.github.io/${repositorio}/pdfs/${nombreArchivo}`;
    
    // 3. Usamos el visor de Google Docs que permite zoom
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
