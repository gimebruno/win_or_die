import Phaser from "phaser";

export default class PantallaCarga extends Phaser.Scene {
    constructor() {
        super("PantallaCarga");
    }

    preload() {

        // Backgrounds
        this.load.image('fondo', 'assets/fondos/fondo.png')
        this.load.image('fondo-boton', 'assets/sprites/fondo-boton.png')

        // Autos
        this.load.image('auto1', 'assets/sprites/autos/auto1.png');
        this.load.image('auto2', 'assets/sprites/autos/auto2.png');
        this.load.image('auto3', 'assets/sprites/autos/auto3.png');
        this.load.image('auto4', 'assets/sprites/autos/auto4.png');
        this.load.image('auto5', 'assets/sprites/autos/auto5.png');
        this.load.image('auto6', 'assets/sprites/autos/auto6.png');
        this.load.image('auto7', 'assets/sprites/autos/auto7.png');
        this.load.image('auto8', 'assets/sprites/autos/auto8.png');

        // Bolas de fuego
        this.load.image('bola-fuego', 'assets/sprites/bola-fuego.png');
        this.load.spritesheet('bola-fuego-spritesheet', 'assets/sprites/bola-fuego-spritesheet.png', { frameWidth: 32, frameHeight: 32 });

        // tilemap
        this.load.tilemapTiledJSON("nivel1", "assets/tilemap/nivel1.json");
        this.load.tilemapTiledJSON("nivel2", "assets/tilemap/nivel2.json");
        this.load.tilemapTiledJSON("nivel3", "assets/tilemap/nivel3.json");
        this.load.tilemapTiledJSON("nivel4", "assets/tilemap/nivel4.json");

        // Atlas
        this.load.image('atlas-lava', 'assets/atlas/atlas-lava.png');
        this.load.image('atlas-lava2', 'assets/atlas/atlas-lava2.png');
        this.load.image('atlas-rutas','assets/atlas/atlas-rutas.png');
        this.load.image('backgrounds','assets/atlas/backgrounds-mapas.png');

        this.load.image("moneda", "assets/sprites/moneda.png");
        this.load.image('lava', 'assets/sprites/lava.png');
        this.load.image('meta', 'assets/sprites/meta.png');

        this.load.image('botonWAD', 'assets/sprites/botonWAD.png');
        this.load.image('botonesFlechas', 'assets/sprites/botonesflechas.png');
        this.load.image('temporizador-ui', 'assets/sprites/temporizador.png');
        this.load.image('contador-ui', 'assets/sprites/contador.png');

        this.barraDeCarga();
    }


    create() {
        this.add.image(0, 0, 'fondo').setOrigin(0);

        // crea la animacion de bola-fuego-spritesheet que tiene dos frames
        this.anims.create({
            key: 'bola-fuego-animacion',
            frames: this.anims.generateFrameNumbers('bola-fuego-spritesheet', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: 1
        });
    }

    barraDeCarga() {
        const maxWidth = 400;
        const rectanguloBarra = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, maxWidth, 30, '0xc21f19');

        this.add.text(this.scale.width / 2, this.scale.height / 2 - 40, 'PREPARANDO CONTENIDO', { fontSize: '24px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale' }).setOrigin(0.5)

        const texto = this.add.text(this.scale.width / 2, this.scale.height / 2, '0%', { fontSize: '18px', fontStyle: 'bold', color: 'white', fontFamily: 'AnyMale' }).setOrigin(0.5)

        this.load.on('progress', (progress) => {
            rectanguloBarra.width = maxWidth * progress;
            texto.setText(`${Math.round(progress * 100)}%`)
        })

        this.load.on('complete', () => {
            this.scene.start('PantallaMenuPrincipal')
        });
    }
}