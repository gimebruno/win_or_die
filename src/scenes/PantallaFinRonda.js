import Phaser from "phaser";
import Boton from "../objetos/Boton";

export default class PantallaFinRonda extends Phaser.Scene {
    ganador;

    perdedor;

    constructor() {
        super("PantallaFinRonda");
    }

    init(data) {
        this.ganador = data.ganador;
        this.perdedor = data.perdedor;
    }

    create() {
        this.add.image(0, 0, 'fondo-carga').setOrigin(0);


        this.add.text((this.scale.width / 2), (this.scale.height / 2) - 310, "Ronda completada", { fontSize: '80px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);

        this.add.text((this.scale.width / 2), 200, "Ganador", { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' }).setOrigin(0.5);
        this.add.image((this.scale.width / 2), 250, this.ganador.textura).setOrigin(0.5);

        this.add.text((this.scale.width / 2), 300, `puntos ${this.ganador.monedas}`, { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' }).setOrigin(0.5);

        this.add.text((this.scale.width / 2), 350, `Rondas ganadas ${this.ganador.numeroRondasGanadas}`, { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' }).setOrigin(0.5);



        // eslint-disable-next-line no-new
        new Boton(this, this.scale.width / 2, (this.scale.height / 2) + 200, 'Siguiente Ronda', () => {
            this.scene.start('PantallaMenu');
        }, 1, 50, 'fondo-boton');

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('PantallaMenu');
        });
    }
}