import Phaser from "phaser";
import Boton from "../objetos/Boton";

export default class PantallaMenuPrincipal extends Phaser.Scene {
    constructor() {
        super("PantallaMenuPrincipal");
    }


    create() {
        this.soundtrack=this.sound.add('soundtrack1')
        this.soundtrack.volume=0.1
        this.soundtrack.play()
        this.add.image(0, 0, 'fondo').setOrigin(0);

        this.add.text((this.scale.width / 2), (this.scale.height / 2) - 160, "Win or Die", { fontSize: '200px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale', stroke: 'black', strokeThickness: 6 }).setOrigin(0.5);
        new Boton(this, this.scale.width / 2, (this.scale.height / 2) + 200, 'ENTER', () => {
            this.scene.start('PantallaMenu',{soundtrack:this.soundtrack});
        }, 1, 50, 'fondo-boton');

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('PantallaMenu');
        });
    }
}