import Phaser from 'phaser';
import events from '../scenes/EventCenter';

export default class Jugador extends Phaser.Physics.Arcade.Sprite {
    textura;
    contadorImpactos;
    ladoEquipo;
    puedeMoverse;
    camara;
    velocidadInicialY;
    velocidadTurboY;
    monedas;
    numeroRondasGanadas;
    anguloMaximo;
    incrementoAngulo;

    constructor(scene, x, y, texture, ladoEquipo) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        this.ladoEquipo = ladoEquipo;
        this.puedeMoverse = true;
        this.velocidadInicialY = -150;
        this.velocidadTurboY = -350;
        this.monedas = 0;
        this.numeroRondasGanadas = 0;
        this.textura = texture;
        this.anguloMaximo = 360; 
        this.incrementoAngulo = 1; 
    }

    recibirImpacto() {
        if (this.ladoEquipo === "izquierda") {
            this.scene.vidasEquipoIzquierda -= 1;
        } else if (this.ladoEquipo === "derecha") {
            this.scene.vidasEquipoDerecha -= 1;
        }
        this.contadorImpactos += 1;
    }

    recolectarMoneda(cantidadMonedas) {
        if (this.ladoEquipo === "izquierda") {
            this.monedas += cantidadMonedas;
            events.emit("moneda-recolectada", "izquierda", this.monedas);
        } else if (this.ladoEquipo === "derecha") {
            this.monedas += cantidadMonedas;
            events.emit("moneda-recolectada", "derecha", this.monedas);
        }
    }

    mover(controles) {
        if (!this.puedeMoverse) {
            this.setVelocity(0);
            return;
        }

        if (controles.left.isDown) {
            this.setAngle(this.angle - this.incrementoAngulo);
        } else if (controles.right.isDown) {
            this.setAngle(this.angle + this.incrementoAngulo);
        }

        // Mantener el ángulo dentro de los límites
        if (this.angle > this.anguloMaximo) {
            this.setAngle(this.anguloMaximo);
        } else if (this.angle < -this.anguloMaximo) {
            this.setAngle(-this.anguloMaximo);
        }

        let velocidadY = this.velocidadInicialY;
        if (controles.up.isDown) {
            velocidadY = this.velocidadTurboY;
        }

        // Calcular la velocidad en X e Y en base al ángulo actual
        const radianes = Phaser.Math.DegToRad(this.angle);
        const velocidadX = Math.sin(radianes) * Math.abs(velocidadY);
        const velocidadYAjustada = Math.cos(radianes) * velocidadY;

        this.setVelocityX(velocidadX);
        this.setVelocityY(velocidadYAjustada);
    }
}
