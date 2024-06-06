import Phaser from "phaser";
import BotonAmarrillo from "../objetos/BotonAmarrillo";

export default class SeleccionAuto extends Phaser.Scene {
    constructor() {
        super("SeleccionAuto");
        this.selectedAutoIndexPlayer1 = 0; // Índice del auto seleccionado por el jugador 1
        this.selectedAutoIndexPlayer2 = 0; // Índice del auto seleccionado por el jugador 2
    }

    preload() {
        // Carga las imágenes de los autos
        for (let i = 1; i <= 8; i+= 1) {
            this.load.image(`auto${i}`, `assets/autos/auto${i}.png`);
        }
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // Muestra el título centrado en X
        this.add.text(centerX, centerY - 240, "Win or Die", { fontSize: '80px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);

        // Muestra las ruletas de selección de autos a cada lado de la pantalla
        const selectedAutoPlayer1 = this.add.image(centerX - 200, centerY, `auto${this.selectedAutoIndexPlayer1 + 1}`).setScale(1);
        const selectedAutoPlayer2 = this.add.image(centerX + 200, centerY, `auto${this.selectedAutoIndexPlayer2 + 1}`).setScale(1);

        // Agrega flechas arriba y abajo para el jugador 1
        const flechaArribaPlayer1 = this.add.text(selectedAutoPlayer1.x, selectedAutoPlayer1.y - selectedAutoPlayer1.displayHeight / 2 + 180, "▲", { fontSize: '40px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 2 }).setOrigin(0.5).setInteractive();
        const flechaAbajoPlayer1 = this.add.text(selectedAutoPlayer1.x, selectedAutoPlayer1.y + selectedAutoPlayer1.displayHeight / 2 - 170, "▼", { fontSize: '40px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 2 }).setOrigin(0.5).setInteractive();

        // Agrega flechas arriba y abajo para el jugador 2
        const flechaArribaPlayer2 = this.add.text(selectedAutoPlayer2.x, selectedAutoPlayer2.y - selectedAutoPlayer2.displayHeight / 2 + 180, "▲", { fontSize: '40px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 2 }).setOrigin(0.5).setInteractive();
        const flechaAbajoPlayer2 = this.add.text(selectedAutoPlayer2.x, selectedAutoPlayer2.y + selectedAutoPlayer2.displayHeight / 2 - 170, "▼", { fontSize: '40px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 2 }).setOrigin(0.5).setInteractive();

        // Escala las flechas para que sean más grandes
        [flechaArribaPlayer1, flechaAbajoPlayer1, flechaArribaPlayer2, flechaAbajoPlayer2].forEach(flecha => {
            flecha.setScale(1.5);
        });

        // Agrega los textos "Jugador 1" y "Jugador 2" sobre las ruletas
        this.add.text(selectedAutoPlayer1.x, selectedAutoPlayer1.y + selectedAutoPlayer1.displayHeight / 2 + 50, "Jugador 1", { fontSize: '24px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 2 }).setOrigin(0.5);
        this.add.text(selectedAutoPlayer2.x, selectedAutoPlayer2.y + selectedAutoPlayer2.displayHeight / 2 + 50, "Jugador 2", { fontSize: '24px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 2 }).setOrigin(0.5);

        // Define el evento para cambiar la selección de autos del jugador 1
        flechaArribaPlayer1.on('pointerdown', () => {
            this.selectedAutoIndexPlayer1 = (this.selectedAutoIndexPlayer1 - 1 + 8) % 8;
            selectedAutoPlayer1.setTexture(`auto${this.selectedAutoIndexPlayer1 + 1}`);
        });

        flechaAbajoPlayer1
        .on('pointerdown', () => {
            this.selectedAutoIndexPlayer1 = (this.selectedAutoIndexPlayer1 + 1) % 8;
            selectedAutoPlayer1.setTexture(`auto${this.selectedAutoIndexPlayer1 + 1}`);
        });

        // Define el evento para cambiar la selección de autos del jugador 2
        flechaArribaPlayer2.on('pointerdown', () => {
            this.selectedAutoIndexPlayer2 = (this.selectedAutoIndexPlayer2 - 1 + 8) % 8;
            selectedAutoPlayer2.setTexture(`auto${this.selectedAutoIndexPlayer2 + 1}`);
        });

        flechaAbajoPlayer2.on('pointerdown', () => {
            this.selectedAutoIndexPlayer2 = (this.selectedAutoIndexPlayer2 + 1) % 8;
            selectedAutoPlayer2.setTexture(`auto${this.selectedAutoIndexPlayer2 + 1}`);
        });

        // Muestra el rectángulo para seleccionar
        this.rectangle = this.add.rectangle(centerX, centerY + 200, 320, 100, 0x000000);
        this.rectangle.alpha = 0.5;

        // Crea el botón para seleccionar
// Crear una instancia de BotonAmarrillo
const boton = new BotonAmarrillo(this, centerX, centerY + 200, 'Seleccionar', () => {
    // Callback del botón
}, 1, 50, 'fondo-boton');

// Configurar el evento de clic para el botón
boton.on('pointerdown', () => {
    // Obtiene los nombres de los autos seleccionados
    const selectedAutoNamePlayer1 = `auto${this.selectedAutoIndexPlayer1 + 1}`;
    const selectedAutoNamePlayer2 = `auto${this.selectedAutoIndexPlayer2 + 1}`;

    console.log(`Auto seleccionado para Jugador 1: ${selectedAutoNamePlayer1}`);
    console.log(`Auto seleccionado para Jugador 2: ${selectedAutoNamePlayer2}`);

    // Guarda los nombres de los autos seleccionados para usarlos en la siguiente escena
    this.registry.set('selectedAutoNamePlayer1', selectedAutoNamePlayer1);
    this.registry.set('selectedAutoNamePlayer2', selectedAutoNamePlayer2);

    // Pasa a la siguiente escena
    this.scene.start('Nivel1', {
        autoJugador1: selectedAutoNamePlayer1,
        autoJugador2: selectedAutoNamePlayer2
    });
});


    }
}
