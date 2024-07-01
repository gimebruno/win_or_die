import Phaser from 'phaser';
import events from '../scenes/EventCenter';

export default class Jugador extends Phaser.Physics.Arcade.Sprite {
    textura;
    contadorImpactos;
    ladoEquipo;
    puedeMoverse;
    camara;
    monedas;
    numeroRondasGanadas;
    anguloMaximo;
    inmune;
    incrementoAngulo;
    velocidadYActual;
    velocidadYMinima;
    velocidadYMaxima;
    autoSeleccionado;

    constructor(scene, x, y, texture, ladoEquipo) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        this.ladoEquipo = ladoEquipo;
        this.puedeMoverse = false;
        this.monedas = 0;
        this.numeroRondasGanadas = 0;
        this.textura = texture;
        this.anguloMaximo = 360;
        this.incrementoAngulo = 1;
        this.velocidadYActual = 0;
        this.velocidadYMinima = 0;
        this.velocidadYMaxima = 398;
        this.colisionado = false;
        this.inmune = false;
        this.autoSeleccionado = texture;


        // Suscribir métodos
        this.recibirImpacto = this.recibirImpacto.bind(this);
        this.recolectarMoneda = this.recolectarMoneda.bind(this);
        this.mover = this.mover.bind(this);
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
            if (this.autoSeleccionado === 'auto1') {
                this.setTexture('auto1i');
            } else if (this.autoSeleccionado === 'auto2') {
                this.setTexture('auto2i');
            } else if (this.autoSeleccionado === 'auto3') {
                this.setTexture('auto3i');
            } else if (this.autoSeleccionado === 'auto4') {
                this.setTexture('auto4i');
            } else if (this.autoSeleccionado === 'auto5') {
                this.setTexture('auto5i');
            } else if (this.autoSeleccionado === 'auto6') {
                this.setTexture('auto6i');
            }
        } else if (controles.right.isDown) {
            this.setAngle(this.angle + this.incrementoAngulo);
            if (this.autoSeleccionado === 'auto1') {
                this.setTexture('auto1d');
            } else if (this.autoSeleccionado === 'auto2') {
                this.setTexture('auto2d');
            } else if (this.autoSeleccionado === 'auto3') {
                this.setTexture('auto3d');
            } else if (this.autoSeleccionado === 'auto4') {
                this.setTexture('auto4d');
            } else if (this.autoSeleccionado === 'auto5') {
                this.setTexture('auto5d');
            } else if (this.autoSeleccionado === 'auto6') {
                this.setTexture('auto6d');
            }
        }

        // Mantener el ángulo dentro de los límites
        if (this.angle > this.anguloMaximo) {
            this.setAngle(this.anguloMaximo);
        } else if (this.angle < -this.anguloMaximo) {
            this.setAngle(-this.anguloMaximo);
        }

        // Ajustar la velocidad Y según las teclas presionadas
        if (controles.up.isDown) {
            this.velocidadYActual += 10;
        } else if (controles.down.isDown) {
            this.velocidadYActual -= 10;
        }

        // Limitar la velocidad Y dentro de los rangos establecidos
        if (this.velocidadYActual > this.velocidadYMaxima) {
            this.velocidadYActual = this.velocidadYMaxima;
        } else if (this.velocidadYActual < this.velocidadYMinima) {
            this.velocidadYActual = this.velocidadYMinima;
        }

        // Calcular la velocidad en X e Y en base al ángulo actual
        const radianes = Phaser.Math.DegToRad(this.angle);
        const velocidadX = Math.sin(radianes) * Math.abs(this.velocidadYActual);
        const velocidadYAjustada = -Math.cos(radianes) * this.velocidadYActual;

        this.setVelocityX(velocidadX);
        this.setVelocityY(velocidadYAjustada);

        // Emitir evento de velocidad cambiada
        events.emit('velocidad-cambiada', this.ladoEquipo, this.velocidadYActual);
    }

    cambiarTexturaDanada() {
        if (this.autoSeleccionado === 'auto1') {
            this.anims.play('auto1s', true);
        } else if (this.autoSeleccionado === 'auto2') {
            this.anims.play('auto2s', true);
        } else if (this.autoSeleccionado === 'auto3') {
            this.anims.play('auto3s', true);
        } else if (this.autoSeleccionado === 'auto4') {
            this.anims.play('auto4s', true);
        } else if (this.autoSeleccionado === 'auto5') {
            this.anims.play('auto5s', true);
        } else if (this.autoSeleccionado === 'auto6') {
            this.anims.play('auto6s', true);
        }
    }
}
