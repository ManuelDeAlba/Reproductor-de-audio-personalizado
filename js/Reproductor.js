class Reproductor{
    constructor(contenedor){
        this.contenedor = document.querySelector(contenedor);
        this.video = document.querySelector(`${contenedor} .video`);
        this.btnPlayPause = document.querySelector(`${contenedor} .play-pause`);
        this.tiempo = document.querySelector(`${contenedor} .controles .botones .tiempo`);
        this.duracion = document.querySelector(`${contenedor} .controles .botones .duracion`);
        this.barra = document.querySelector(`${contenedor} .controles .barra`);
        this.marcador = document.querySelector(`${contenedor} .controles .barra__marcador`);
        this.marcadorHover = document.querySelector(`${contenedor} .controles .barra__marcador-hover`);
        this.volumen = document.querySelector(`${contenedor} .controles .range`);
        this.configuracion = document.querySelector(`${contenedor} .controles .configuracion`);
        this.btnConfiguracion = document.querySelector(`${contenedor} .controles .btn-configuracion`);
        this.velocidades = document.querySelectorAll(`${contenedor} .controles .velocidad`);

        this.video.volume = ".5";

        this.eventos();
    }

    eventos(){
        this.btnPlayPause.addEventListener('click', () => this.togglePlayPause());
        this.video.addEventListener('timeupdate', () => this.actualizarTiempo());
        this.video.addEventListener('durationchange', () => this.actualizarTextoDuracion());
        this.barra.addEventListener('click', (e) => this.actualizarBarra(e));
        this.barra.addEventListener('mousemove', (e) => this.actualizarMarcadorHover(e));
        this.volumen.addEventListener('input', () => this.actualizarVolumen());

        this.btnConfiguracion.addEventListener('click', () => this.toggleConfiguracion())
        this.velocidades.forEach(e => {
            e.addEventListener('click', () => this.actualizarVelocidad(e.dataset.vel));
        })
    }

    togglePlayPause(){
        if(this.video.paused){
            this.video.play();
            this.btnPlayPause.innerHTML = "pause";
        } else {
            this.video.pause();
            this.btnPlayPause.innerHTML = "play_arrow";
        }
    }

    actualizarTiempo(){
        // Actualizar texto
        let tiempoActual = this.video.currentTime;

        let {h, m, s} = convertirSegundos(tiempoActual);

        this.tiempo.innerText = `${h}:${m}:${s}`;

        // Actualizar barra
        let duracion = this.video.duration;

        let porcentaje = (tiempoActual / duracion) * 100;

        this.marcador.style.width = porcentaje + "%";

        // Si se acaba el video, se pone el boton para reproducir
        if(tiempoActual >= duracion){
            this.btnPlayPause.innerHTML = "play_arrow";
            document.querySelector('.reproductor__contenedor').style.opacity = "1";
        } else {
            document.querySelector('.reproductor__contenedor').style.opacity = "";
        }
    }

    actualizarTextoDuracion(){
        let duracion = this.video.duration;

        let {h, m, s} = convertirSegundos(duracion);

        this.duracion.innerText = `${h}:${m}:${s}`;
    }

    actualizarBarra(e){
        let x = e.offsetX;
        let anchoBarra = this.barra.clientWidth;
        let porcentaje = x / anchoBarra;

        let duracion = this.video.duration;

        this.video.currentTime = duracion * porcentaje;
    }

    actualizarMarcadorHover(e){
        let x = e.offsetX;
        let anchoBarra = this.barra.clientWidth;
        let porcentaje = (x / anchoBarra) * 100;
        
        this.marcadorHover.style.width = porcentaje+"%";
    }

    actualizarVolumen(){
        let volumen = this.volumen.value;

        this.video.volume = volumen;
    }

    actualizarVelocidad(vel){
        this.video.playbackRate = vel;
    }

    toggleConfiguracion(){
        this.configuracion.classList.toggle('activa');
    }
}

function convertirSegundos(seg){
    let tiempo = {
        h: Math.floor(seg / 60 / 60),
        m: Math.floor(seg / 60 % 60),
        s: Math.ceil(seg % 60)
    }

    tiempo.h = tiempo.h < 10 ? "0"+tiempo.h : tiempo.h;
    tiempo.m = tiempo.m < 10 ? "0"+tiempo.m : tiempo.m;
    tiempo.s = tiempo.s < 10 ? "0"+tiempo.s : tiempo.s;

    return tiempo;
}