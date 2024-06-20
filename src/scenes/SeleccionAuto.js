import Phaser from 'phaser';
import BotonAmarrillo from "../objetos/BotonAmarrillo";

export default class SeleccionAuto extends Phaser.Scene {
    constructor() {
        super('SeleccionAuto');
        this.selectedAutoIndexPlayer1 = 0;
        this.selectedAutoIndexPlayer2 = 0;
    }

    preload() {
        for (let i = 1; i <= 8; i += 1) {
            this.load.image(`auto${i}`, `assets/autos/auto${i}.png`);
        }
    }

    create() {
        this.add.image(0, 0, 'fondo').setOrigin(0);
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.add.text(centerX, centerY - 240, 'Win or Die', {
            fontSize: '80px',
            fontStyle: 'bold',
            color: 'white',
            fontFamily: 'AnyMale',
            stroke: 'black',
            strokeThickness: 6
        }).setOrigin(0.5);

        const selectedAutoPlayer1 = this.add.image(centerX - 200, centerY, `auto${this.selectedAutoIndexPlayer1 + 1}`);
        const selectedAutoPlayer2 = this.add.image(centerX + 200, centerY, `auto${this.selectedAutoIndexPlayer2 + 1}`);

        const flechaArribaPlayer1 = this.add.text(selectedAutoPlayer1.x, selectedAutoPlayer1.y - selectedAutoPlayer1.displayHeight / 2 - 70, '▲', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: 'white',
            fontFamily: 'AnyMale',
            stroke: 'black',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive();

        const flechaAbajoPlayer1 = this.add.text(selectedAutoPlayer1.x, selectedAutoPlayer1.y + selectedAutoPlayer1.displayHeight / 2 + 70, '▼', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: 'white',
            fontFamily: 'AnyMale',
            stroke: 'black',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive();

        const flechaArribaPlayer2 = this.add.text(selectedAutoPlayer2.x, selectedAutoPlayer2.y - selectedAutoPlayer2.displayHeight / 2 - 70, '▲', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: 'white',
            fontFamily: 'AnyMale',
            stroke: 'black',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive();

        const flechaAbajoPlayer2 = this.add.text(selectedAutoPlayer2.x, selectedAutoPlayer2.y + selectedAutoPlayer2.displayHeight / 2 + 70, '▼', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: 'white',
            fontFamily: 'AnyMale',
            stroke: 'black',
            strokeThickness: 2
        }).setOrigin(0.5).setInteractive();

        [flechaArribaPlayer1, flechaAbajoPlayer1, flechaArribaPlayer2, flechaAbajoPlayer2].forEach(flecha => {
            flecha.setScale(1.5);
        });

        this.add.text(selectedAutoPlayer1.x, selectedAutoPlayer1.y + selectedAutoPlayer1.displayHeight / 2 + 110, 'Jugador 1', {
            fontSize: '24px',
            fontStyle: 'bold',
            color: 'white',
            fontFamily: 'AnyMale',
            stroke: 'black',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.add.text(selectedAutoPlayer2.x, selectedAutoPlayer2.y + selectedAutoPlayer2.displayHeight / 2 + 110, 'Jugador 2', {
            fontSize: '24px',
            fontStyle: 'bold',
            color: 'white',
            fontFamily: 'AnyMale',
            stroke: 'black',
            strokeThickness: 2
        }).setOrigin(0.5);

        flechaArribaPlayer1.on('pointerdown', () => {
            this.selectedAutoIndexPlayer1 = (this.selectedAutoIndexPlayer1 - 1 + 8) % 8;
            selectedAutoPlayer1.setTexture(`auto${this.selectedAutoIndexPlayer1 + 1}`);
        });

        flechaAbajoPlayer1.on('pointerdown', () => {
            this.selectedAutoIndexPlayer1 = (this.selectedAutoIndexPlayer1 + 1) % 8;
            selectedAutoPlayer1.setTexture(`auto${this.selectedAutoIndexPlayer1 + 1}`);
        });

        flechaArribaPlayer2.on('pointerdown', () => {
            this.selectedAutoIndexPlayer2 = (this.selectedAutoIndexPlayer2 - 1 + 8) % 8;
            selectedAutoPlayer2.setTexture(`auto${this.selectedAutoIndexPlayer2 + 1}`);
        });

        flechaAbajoPlayer2.on('pointerdown', () => {
            this.selectedAutoIndexPlayer2 = (this.selectedAutoIndexPlayer2 + 1) % 8;
            selectedAutoPlayer2.setTexture(`auto${this.selectedAutoIndexPlayer2 + 1}`);
        });

        const botonSeleccionar = new BotonAmarrillo(this, centerX, 650, 'Seleccionar', () => {
            const selectedAutoNamePlayer1 = `auto${this.selectedAutoIndexPlayer1 + 1}`;
            const selectedAutoNamePlayer2 = `auto${this.selectedAutoIndexPlayer2 + 1}`;
            this.registry.set('selectedAutoNamePlayer1', selectedAutoNamePlayer1);
            this.registry.set('selectedAutoNamePlayer2', selectedAutoNamePlayer2);

            this.scene.start('Nivel', {
                autoJugador1: selectedAutoNamePlayer1,
                autoJugador2: selectedAutoNamePlayer2
            });
        }, 1, 50);
        // eslint-disable-next-line no-unused-vars
        const _ = botonSeleccionar;
    }
}