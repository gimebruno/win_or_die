import Phaser from 'phaser';

export default class Lava extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'lava');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(32, 32);
        this.setOrigin(0, 0);
        this.body.setAllowGravity(false);
        this.setImmovable();
        this.setVisible(true);

        // Reproducir la animación
        this.play('lavas');

        // Configurar el movimiento de lado a lado
        this.movementSpeed = 100; 
        this.direction = 1; 
    }

    update(time, delta) {
        // Mover la lava de lado a lado
        this.x += this.direction * this.movementSpeed * delta / 1000;

        // Cambiar la dirección al llegar a los límites
        if (this.x >= this.scene.scale.width - this.body.width) {
            this.direction = -1;
        } else if (this.x <= 0) {
            this.direction = 1;
        }
    }
}
