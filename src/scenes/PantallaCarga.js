import Phaser from "phaser";

export default class PantallaCarga extends Phaser.Scene {
    constructor() {
        super("PantallaCarga");
    }

    preload() {

        // Backgrounds
        this.load.image('fondo', 'assets/fondos/fondo.png')
        this.load.image('fondo-boton', 'assets/sprites/fondo-boton.png')
        this.load.image('backg-fin-ronda', ' assets/fondos/background-fin-ronda.png')

        // Autos
        this.load.image('auto1', 'assets/sprites/autos/auto1.png');
        this.load.image('auto1i', 'assets/sprites/autos/auto1i.png');
        this.load.image('auto1d', 'assets/sprites/autos/auto1d.png');
        this.load.spritesheet("auto1s", "./assets/sprites/autos/auto1s.png", {
            frameWidth: 95,
            frameHeight: 126,
        });
        this.load.image('auto2', 'assets/sprites/autos/auto2.png');
        this.load.image('auto2i', 'assets/sprites/autos/auto2i.png');
        this.load.image('auto2d', 'assets/sprites/autos/auto2d.png');
        this.load.spritesheet("auto2s", "./assets/sprites/autos/auto2s.png", {
            frameWidth: 95,
            frameHeight: 127,
        });
        this.load.image('auto3', 'assets/sprites/autos/auto3.png');
        this.load.image('auto3i', 'assets/sprites/autos/auto3i.png');
        this.load.image('auto3d', 'assets/sprites/autos/auto3d.png');
        this.load.spritesheet("auto3s", "./assets/sprites/autos/auto3s.png", {
            frameWidth: 123.4,
            frameHeight: 164,
        });
        this.load.image('auto4', 'assets/sprites/autos/auto4.png');
        this.load.image('auto4i', 'assets/sprites/autos/auto4i.png');
        this.load.image('auto4d', 'assets/sprites/autos/auto4d.png');
        this.load.spritesheet("auto4s", "./assets/sprites/autos/auto4s.png", {
            frameWidth: 130.4,
            frameHeight: 177,
        });
        this.load.image('auto5', 'assets/sprites/autos/auto5.png');
        this.load.image('auto5i', 'assets/sprites/autos/auto5i.png');
        this.load.image('auto5d', 'assets/sprites/autos/auto5d.png');
        this.load.spritesheet("auto5s", "./assets/sprites/autos/auto5s.png", {
            frameWidth: 128.8,
            frameHeight: 165,
        });
        this.load.image('auto6', 'assets/sprites/autos/auto6.png');
        this.load.image('auto6i', 'assets/sprites/autos/auto6i.png');
        this.load.image('auto6d', 'assets/sprites/autos/auto6d.png');
        this.load.spritesheet("auto6s", "./assets/sprites/autos/auto6s.png", {
            frameWidth: 130,
            frameHeight: 165,
        });

        //Remolino
        this.load.image('lava', 'assets/sprites/lava.png');
        this.load.spritesheet('lavas', 'assets/sprites/lavas.png', { 
            frameWidth: 129, 
            frameHeight: 168 
        });

        //Lava
        this.load.image('tierra', 'assets/sprites/tierra.png');
        this.load.image('arena', 'assets/sprites/arena.png');
        this.load.image('fuego', 'assets/sprites/fuego.png');
        this.load.image('hielo', 'assets/sprites/hielo.png');

        // tilemap
        this.load.tilemapTiledJSON("nivel1", "assets/tilemap/nivel1.json");
        this.load.tilemapTiledJSON("nivel2", "assets/tilemap/nivel2.json");
        this.load.tilemapTiledJSON("nivel3", "assets/tilemap/nivel3.json");
        this.load.tilemapTiledJSON("nivel4", "assets/tilemap/nivel4.json");

        // Atlas
        this.load.image('atlas-lava', 'assets/atlas/atlas-lava.png');
        this.load.image('atlas-lava2', 'assets/atlas/atlas-lava2.png');
        this.load.image('atlas-rutas', 'assets/atlas/atlas-rutas.png');
        this.load.image('backgrounds', 'assets/atlas/backgrounds-mapas.png');

        this.load.image("moneda", "assets/sprites/moneda.png");
        this.load.image('meta', 'assets/sprites/meta.png');

        this.load.image('botonWAD', 'assets/sprites/botonWAD.png');
        this.load.image('botonesFlechas', 'assets/sprites/botonesflechas.png');
        this.load.image('temporizador-ui', 'assets/sprites/temporizador.png');
        this.load.image('contador-ui', 'assets/sprites/contador.png');
        this.load.image('contenedor-ganador', 'assets/fondos/caja_ganador.png')

        this.barraDeCarga();
        this.load.audio ('soundtrack1','assets/sonidos/soundtrack1.mp3')
        this.load.audio ('soundboton','assets/sonidos/generales/boton2.mp3')
        this.load.audio ('flechasonido','assets/sonidos/generales/clickM.mp3')
        this.load.audio ('vozenoff1','assets/sonidos/obotic-countdown.mp3')
        this.load.audio ('acelerar','assets/sonidos/audioautos/aceleracion.mp3')
        this.load.audio ('freno','assets/sonidos/audioautos/frenar.mp3')
        this.load.audio ('motor1','assets/sonidos/audioautos/motorauto.wav')
        this.load.audio ('motor2','assets/sonidos/audioautos/motor2.mp3')
        this.load.audio ('motor2','assets/sonidos/audioautos/motor3.mp3')
        this.load.audio ('motor2','assets/sonidos/audioautos/motor4.mp3')
        
    }


    create() {
        this.add.image(0, 0, 'fondo').setOrigin(0);

        this.anims.create({
            key: 'lavas',
            frames: this.anims.generateFrameNumbers('lavas', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'auto1s',
            frames: this.anims.generateFrameNumbers('auto1s', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'auto2s',
            frames: this.anims.generateFrameNumbers('auto2s', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'auto3s',
            frames: this.anims.generateFrameNumbers('auto3s', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'auto4s',
            frames: this.anims.generateFrameNumbers('auto4s', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'auto5s',
            frames: this.anims.generateFrameNumbers('auto5s', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'auto6s',
            frames: this.anims.generateFrameNumbers('auto6s', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
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