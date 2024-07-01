import Phaser from "phaser";
import Boton from "../objetos/Boton";

export default class PantallaControles extends Phaser.Scene {
    constructor() {
        super("PantallaControles");
    }

    create() {
        // Añadir el fondo de la pantalla
        this.add.image(0, 0, 'fondo').setOrigin(0);


        // Añadir la imagen de controles WASD con el texto "Jugador Izquierdo"
        const wasdImagen = this.add.image(this.scale.width / 2 - 150, this.scale.height / 2 - 100, 'wasd')
            .setOrigin(0.5, 0.5)

        this.add.text(this.scale.width / 2 - 150, this.scale.height / 2 - 200, 'Jugador Izquierdo', { 
            font: '24px Arial', 
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);

        // Añadir textos para los controles del jugador izquierdo
        this.add.text(this.scale.width / 2 - 150, this.scale.height / 2 + 30, 'A: Girar a la Izquierda', { 
            font: '20px Arial', 
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);

        this.add.text(this.scale.width / 2 - 150, this.scale.height / 2 + 60, 'D: Girar a la Derecha', { 
            font: '20px Arial', 
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);

        this.add.text(this.scale.width / 2 - 150, this.scale.height / 2 + 90, 'W: Aumentar Velocidad', { 
            font: '20px Arial', 
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);

        this.add.text(this.scale.width / 2 - 150, this.scale.height / 2 + 120, 'S: Disminuir Velocidad', { 
            font: '20px Arial', 
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);

        // Añadir la imagen de controles Flechas con el texto "Jugador Derecho"
        const flechasImagen = this.add.image(this.scale.width / 2 + 150, this.scale.height / 2 - 100, 'flechas')
            .setOrigin(0.5, 0.5)

        this.add.text(this.scale.width / 2 + 150, this.scale.height / 2 - 200, 'Jugador Derecho', { 
            font: '24px Arial', 
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);

        // Añadir textos para los controles del jugador derecho
        this.add.text(this.scale.width / 2 + 150, this.scale.height / 2 + 30, '←: Girar a la Izquierda', { 
            font: '20px Arial', 
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);

        this.add.text(this.scale.width / 2 + 150, this.scale.height / 2 + 60, '→: Girar a la Derecha', { 
            font: '20px Arial', 
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);

        this.add.text(this.scale.width / 2 + 150, this.scale.height / 2 + 90, '↑: Aumentar Velocidad', { 
            font: '20px Arial', 
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);

        this.add.text(this.scale.width / 2 + 150, this.scale.height / 2 + 120, '↓: Disminuir Velocidad', { 
            font: '20px Arial', 
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);

        // Crear el botón para volver al menú principal
        new Boton(this, this.scale.width / 2, (this.scale.height) - 140, 'Volver', () => {
            this.scene.start('PantallaMenu');
        }, 0.8, 50, 'fondo-boton');
    }
}