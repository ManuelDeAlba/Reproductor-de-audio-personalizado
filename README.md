# Reproductor de video personalizado

## Estructura HTML del reproductor
```
<div class="reproductor" id="reproductor1">
    <video src="src/video.mp4" class="video"></video>

    <div class="reproductor__contenedor">
        <div class="fondo"></div>

        <span class="material-icons play-pause">play_arrow</span>

        <div class="controles">
            <div class="botones">
                <div class="botones__tiempo">
                    <span class="tiempo">00:00:00</span>
                    <span>&nbsp;/&nbsp;</span>
                    <span class="duracion">00:00:00</span>
                </div>

                <div class="botones__config">
                    <div class="volumen">
                        <span class="material-icons">volume_up</span>
                        <input type="range" class="range" min="0" max="1" value=".5" step=".1">
                    </div>

                    <div class="configuracion">
                        <span class="material-icons btn-configuracion">settings</span>
                        <div class="velocidades">
                            <span class="velocidad" data-vel="1.0">x1.0</span>
                            <span class="velocidad" data-vel="1.5">x1.5</span>
                            <span class="velocidad" data-vel="2.0">x2.0</span>
                        </div>
                    </div>
                </div>
            </div>
                
            <div class="barra">
                <div class="barra__marcador"></div>
                <div class="barra__marcador-hover"></div>
            </div>
        </div>
    </div>
</div>
```
## Instanciar la clase Reproductor para agregar las funcionalidades
> const video = new Reproductor('#reproductor1');
