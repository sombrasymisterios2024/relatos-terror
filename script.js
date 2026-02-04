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
