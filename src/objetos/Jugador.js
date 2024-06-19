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
    incrementoAngulo;
    velocidadYActual; // Nueva propiedad para almacenar la velocidad actual
    velocidadYMinima;
    velocidadYMaxima;
    inmune;

    constructor(scene, x, y, texture, ladoEquipo) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        this.ladoEquipo = ladoEquipo;
        this.puedeMoverse = true;
        this.monedas = 0;
        this.numeroRondasGanadas = 0;
        this.textura = texture;
        this.anguloMaximo = 360;
        this.incrementoAngulo = 1;
        this.velocidadYActual = 0; // Inicializar velocidad actual en 0
        this.velocidadYMinima = 0; // Velocidad mínima en 0
        this.velocidadYMaxima = 350; // Velocidad máxima permitida
        this.inmune=false;
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
        } else if (controles.right.isDown) {
            this.setAngle(this.angle + this.incrementoAngulo);
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
    }
}