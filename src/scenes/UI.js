import Phaser from "phaser";
import events from "./EventCenter";

export default class UI extends Phaser.Scene {
  tiempoInicial;
  contadorTiempo;
  temporizadorTexto;

  constructor() {
    super("ui");
  }

  init(data) {
    this.tiempoInicial = data.tiempo|| 60;
    this.contadorTiempo = this.tiempoInicial;
    this.temporizadorTexto = this.add.text(this.scale.width / 2, 80, `${this.contadorTiempo}`, {
      fontFamily: "AlarmClock",
      fontStyle: "bold",
      fontSize: "60px",
      color: "#ffff00",
      strokeThickness: 2,
      stroke: "#b13208",
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#b13208",
        blur: 16,
        stroke: true,
        fill: true,
      },
    }).setOrigin(0.5);
  }

  create() {
    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarTiempo,
      callbackScope: this,
      loop: true,
    });

    // add listener to the event
    events.on("collider-event", this.colliderEvent, this);
    this.crearTemporizador();
    this.crearContadoresMonedas();

    // crea el evento para actualizar el contador de monedas dependiendo del juegador 
    events.on("moneda-recolectada", (ladoEquipo, numero) => {
      if (ladoEquipo === "izquierda") {
        this.textoIzquierda.setText(`${numero}`);
      } else if (ladoEquipo === "derecha") {
        this.textoDerecha.setText(`${numero}`);
      }
    });
    
    // Configuración del evento de tiempo
    this.time.addEvent({
        delay: 1000,
        callback: this.actualizarTiempo,
        callbackScope: this,
        loop: true,
      });
  }

  colliderEvent(data) {
    // update text
    this.colliderCount += 1;
    this.text.setText(
      `Collider count: ${this.colliderCount} / Last: ${data.fecha}`
    );
  }

  crearTemporizador() {
    const uiArriba = this.add.image(this.scale.width / 2, 0, "temporizador-ui").setOrigin(0.5, 0);
    uiArriba.setScale(0.75)
    this.temporizadorTexto = this.add.text(this.scale.width / 2, 80, `${this.contadorTiempo}`, {
      fontFamily: "AlarmClock",
      fontStyle: "bold",
      fontSize: "60px",
      color: "#ffff00",
      strokeThickness: 2,
      stroke: "#b13208",
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#b13208",
        blur: 16,
        stroke: true,
        fill: true,
      },
    }).setOrigin(0.5);
  }

  crearContadoresMonedas() {
    const background = this.add.image(0, 0, "contador-ui").setOrigin(0.5, 0);
    background.setScale(0.80);

    const contenedor = this.add.container(this.scale.width / 2, this.scale.height - background.height);

    // Crea un texto en la parte superior iz y derecha. con Jugador/a 1 y Jugador/a 2
    const textoJugador1 = this.add.text(-background.width + (background.width * 0.75), 0 + 14, "Jugador/a 1", {
      fontFamily: "AnyMale",
      fontSize: "16px",
      color: "#fff",
    }).setOrigin(0.5);

    const textoJugador2 = this.add.text(background.width - (background.width * 0.75), 0 + 14, "Jugador/a 2", {
      fontFamily: "AnyMale",
      fontSize: "16px",
      color: "#fff",
    }).setOrigin(0.5);

    const btnWAD = this.add.image(-background.width + (background.width * 0.75), -35, "wasd").setOrigin(0.5).setScale(0.8);
    const btnFlechas = this.add.image(background.width - (background.width * 0.75), -35, "flechas").setOrigin(0.5).setScale(0.8);

    this.textoIzquierda = this.add.text(-background.width + (background.width * 0.75), background.height / 2 - 10, "0", {
      fontFamily: "AlarmClock",
      fontSize: "30px",
      color: "#c81000",
      strokeThickness: 2,
      stroke: "#c81000",
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#c81000",
        blur: 16,
        stroke: true,
        fill: true,
      },
    }).setOrigin(0.5);

    this.textoDerecha = this.add.text(background.width - (background.width * 0.75), background.height / 2 - 10, "0", {
      fontFamily: "AlarmClock",
      fontSize: "30px",
      color: "#7000b6",
      strokeThickness: 2,
      stroke: "#7000b6",
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#7000b6",
        blur: 16,
        stroke: true,
        fill: true,
      },
    }).setOrigin(0.5);

    contenedor.add([background, btnWAD, textoJugador1, btnFlechas, textoJugador2, this.textoIzquierda, this.textoDerecha]);
  }

  actualizarTiempo() {
    this.contadorTiempo -= 1;
    this.temporizadorTexto.setText(`${this.contadorTiempo}`);
    // Emitir el evento 'findetiempo' cuando el contador llegue a cero
    if (this.contadorTiempo === 0) {
        events.emit("findetiempo");
    }
  }
}