import Phaser from "phaser";
import Boton from "../objetos/Boton";

export default class PantallaFinRonda extends Phaser.Scene {
    ganador;
    perdedor;
    nivel;
    maxNivel;
    autoJugador1;
    autoJugador2;
    empate;

    constructor() {
        super("PantallaFinRonda");
    }

    init(data) {
        this.ganador = data.ganador;
        this.perdedor = data.perdedor;
        this.nivel = data.nivel || 1;
        this.maxNivel = data.maxNivel || 4;
        this.autoJugador1 = data.autoJugador1;
        this.autoJugador2 = data.autoJugador2;
        this.empate = data.empate || false;
    }

    create() {
        this.add.image(0, 0, 'fondo').setOrigin(0);
        this.add.image((this.scale.width / 2), this.scale.height / 2, 'contenedor-ganador').setOrigin(0.5);
        this.add.text((this.scale.width / 2), (this.scale.height / 2) - 310, "Ronda completada", { fontSize: '80px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);

        if (this.empate) {
            this.add.text((this.scale.width / 2), 175, "EMPATE", { fontFamily: 'Montserrat', fontSize: 40, fontStyle: 'bold', color: '#ffffff' }).setOrigin(0.5);
        } else {
            this.add.text((this.scale.width / 2), 175, "GANADOR", { fontFamily: 'Montserrat', fontSize: 40, fontStyle: 'bold', color: '#ffffff' }).setOrigin(0.5);
            if (this.ganador && this.ganador.textura) {
                this.add.image((this.scale.width / 2), 300, this.ganador.textura).setOrigin(0.5);
                this.add.text((this.scale.width / 2), 450, `PUNTOS: ${this.ganador.monedas}`, { fontFamily: 'Montserrat', fontSize: 20, color: '#ffffff' }).setOrigin(0.5);
                this.add.text((this.scale.width / 2), 480, `RONDAS GANADAS: ${this.ganador.numeroRondasGanadas}`, { fontFamily: 'Montserrat', fontSize: 20, color: '#ffffff' }).setOrigin(0.5);
            } else {
                console.error('Ganador o textura no definida');
            }
        }

        const startNextLevel = () => {
            if (this.nivel < this.maxNivel) {
                this.scene.start('Nivel', {
                    nivel: this.nivel + 1,
                    autoJugador1: this.autoJugador1,
                    autoJugador2: this.autoJugador2,
                    maxNivel: this.maxNivel
                });
            } else {
                this.scene.start('PantallaMenu');
            }
        };

        new Boton(this, this.scale.width / 2, (this.scale.height / 2) + 300, 'Siguiente Ronda', startNextLevel, 1, 50, 'fondo-boton');
        this.input.keyboard.on('keydown-ENTER', startNextLevel);
    }
}
