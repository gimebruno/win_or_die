import Phaser from "phaser";

export default class BolaFuego extends Phaser.Physics.Arcade.Sprite {

    exploto = false;

    constructor(scene, x, y, nivel) {
        super(scene, x, y, `bolafuego_nivel_${nivel}`);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        
        // Configuración específica del nivel
        this.setSpritePorNivel(nivel);

        this.body.setSize(32, 32);
        this.setOrigin(0, 0);
        this.body.setAllowGravity(false);
    }

    setSpritePorNivel(nivel) {
        // Cambia el sprite según el nivel
        switch (nivel) {
            case 1:
                this.setTexture('tierra');
                break;
            case 2:
                this.setTexture('arena');
                break;
            case 3:
                this.setTexture('fuego');
                break;
            case 4:
                this.setTexture('hielo');
                break;
        }
    }

    destruccion() {
        if (this.exploto) return;
        this.exploto = true;
        this.destroy();
    }
};