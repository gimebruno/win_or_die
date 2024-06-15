import Phaser from "phaser";
import Jugador from "../objetos/Jugador";
import Lava from "../objetos/Lava";
import BolaFuego from "../objetos/BolaFuego";
import Moneda from "../objetos/Moneda";
import Meta from "../objetos/Meta";

export default class Nivel extends Phaser.Scene {
    ganador;
    jugadorIzquierdo;
    jugadorDerecho;
    tiempo;
    camaraIzquierdo;
    camaraDerecha;
    controlesIzquierdos;
    controlesDerechos;
    vidasEquipoIzquierda = 3;
    vidasEquipoDerecha = 3;
    monedasEquipoIzquierda = 0;
    monedasEquipoDerecha = 0;

    constructor() {
        super("Nivel");
        this.maxNivel = 4;
    }

    init(data) {
        this.nivel = data.nivel || 1;
        this.maxNivel = data.maxNivel || 4; 
        this.tiempo = 30;
        this.monedasEquipoIzquierda = 0;
        this.monedasEquipoDerecha = 0;
        this.autoJugador1 = data.autoJugador1;
        this.autoJugador2 = data.autoJugador2;
        this.ganador = null;
    }

    create() {
        const mapaClave = `nivel${this.nivel}`;
        this.map = this.make.tilemap({ key: mapaClave });
        const tiled = this.map.addTilesetImage("atlas-lava", "atlas-lava");
        this.map.createLayer("piso", tiled);
        this.map.createLayer("piso", tiled);
        this.map.createLayer("decoracion", tiled);
        const objectsLayer = this.map.getObjectLayer("objetos");
        const spawnJugador1 = objectsLayer.objects.find(obj => obj.name === "jugador1");
        const spawnJugador2 = objectsLayer.objects.find(obj => obj.name === "jugador2");
        const todasLavas = objectsLayer.objects.filter(obj => obj.type === "lava");
        const todosObsculos = objectsLayer.objects.filter(obj => obj.type === "obstaculo");
        const todosMonedas = objectsLayer.objects.filter(obj => obj.type === "moneda");
        const todosMetas = objectsLayer.objects.filter(obj => obj.type === "meta");

        this.jugadorIzquierdo = new Jugador(this, spawnJugador1.x, spawnJugador1.y, this.autoJugador1, "izquierda");
        this.jugadorDerecho = new Jugador(this, spawnJugador2.x, spawnJugador2.y, this.autoJugador2, "derecha");
        
        // Creacion de grupos de obstaculos:
        this.lavaGrupo = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        this.obstaculos = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        this.monedas = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.metas = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        for (let i = 0; i < todasLavas.length; i += 1) {
            const lava = todasLavas[i];
            const lavaPhysics = new Lava(this, lava.x, lava.y);
            this.lavaGrupo.add(lavaPhysics);
        }

        // crear los boscatulos en el mapa, usando las clase de BolaFuego
        for (let i = 0; i < todosObsculos.length; i += 1) {
            const obstaculo = todosObsculos[i];
            const obstaculoPhysics = new BolaFuego(this, obstaculo.x, obstaculo.y);
            this.obstaculos.add(obstaculoPhysics);
        }

        // Crear las monedas en el mapa usando la clase Moneda
        for (let i = 0; i < todosMonedas.length; i += 1) {
            const moneda = todosMonedas[i];
            const monedaPhysics = new Moneda(this, moneda.x, moneda.y, "moneda");
            this.monedas.add(monedaPhysics);
        }

        // Crear las metas en el mapa
        for (let i = 0; i < todosMetas.length; i += 1) {
            const meta = todosMetas[i];
            const metaPhysics = new Meta(this, meta.x, meta.y - 32);
            this.metas.add(metaPhysics);
        }

        // Configuracion de las colisiones:
        this.physics.add.collider(this.jugadorIzquierdo, this.lavaGrupo, this.collisionLava, null, this);
        this.physics.add.collider(this.jugadorDerecho, this.lavaGrupo, this.collisionLava, null, this);
        this.physics.add.collider(this.jugadorIzquierdo, this.obstaculos, this.collisionObstaculo, null, this);
        this.physics.add.collider(this.jugadorDerecho, this.obstaculos, this.collisionObstaculo, null, this);
        this.physics.add.overlap(this.jugadorIzquierdo, this.monedas, this.recolectarMoneda, null, this);
        this.physics.add.overlap(this.jugadorDerecho, this.monedas, this.recolectarMoneda, null, this);
        this.physics.add.overlap(this.jugadorIzquierdo, this.metas, this.establecerGanador, null, this);
        this.physics.add.overlap(this.jugadorDerecho, this.metas, this.establecerGanador, null, this);

        // Configuracion de los controles de los jugadores:
        this.controlesDerechos = this.input.keyboard.createCursorKeys();
        this.controlesIzquierdos = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Configuracion de las camaras:
        this.camaraIzquierdo = this.cameras.main.setSize(this.scale.width / 2, this.scale.height);
        this.camaraIzquierdo.scrollX = 0;
        this.camaraIzquierdo.scrollY = 0;
        this.camaraIzquierdo.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.camaraIzquierdo.startFollow(this.jugadorIzquierdo, true, 0.05, 0.05);
    
        // Ajustes en los límites y la configuración de la cámara derecha
        this.camaraDerecha = this.cameras.add(this.scale.width / 2, 0, this.scale.width / 2, this.scale.height);
        this.camaraDerecha.scrollX = this.map.widthInPixels / 2; 
        this.camaraDerecha.scrollY = 0;
        this.camaraDerecha.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels); 
        this.camaraDerecha.startFollow(this.jugadorDerecho, true, 0.05, 0.05); 
        
        this.scene.launch("ui", { tiempo: (this.map.heightInPixels / this.jugadorIzquierdo.velocidadInicialY) * -0.75 });
    }

    update() {
        this.jugadorDerecho.mover(this.controlesDerechos);
        this.jugadorIzquierdo.mover(this.controlesIzquierdos);
    }
  
    collisionLava(jugador) {
        if (jugador === this.jugadorIzquierdo) {
            this.jugadorIzquierdo.puedeMoverse = false;
            const capaGrisIzquierda = this.add.rectangle(
                this.camaraIzquierdo.scrollX, 
                this.camaraIzquierdo.scrollY, 
                this.camaraIzquierdo.width, 
                this.camaraIzquierdo.height, 
                0x000000, 
                0.5 
            ).setOrigin(0);
            capaGrisIzquierda.setScale(1, 5);
            const rectanguloNegroIzquierda = this.add.rectangle(
                this.camaraIzquierdo.scrollX + this.camaraIzquierdo.width / 2,
                this.camaraIzquierdo.scrollY + this.camaraIzquierdo.height / 2 + 20,
                this.camaraIzquierdo.width, 
                this.camaraIzquierdo.height * 0.15,
                0x000000
            ).setOrigin(0.5);
            const mensajePerdisteIzquierda = this.add.text(
                this.camaraIzquierdo.scrollX + this.camaraIzquierdo.width / 2, 
                this.camaraIzquierdo.scrollY + this.camaraIzquierdo.height / 2, 
                "Perdiste",
                { fontFamily: 'Arial', fontSize: 48, color: '#ffffff' }
            ).setOrigin(0.5);
            const mensajeAdicionalPerdisteIzquierda = this.add.text(
                this.camaraIzquierdo.scrollX + this.camaraIzquierdo.width / 2, 
                this.camaraIzquierdo.scrollY + this.camaraIzquierdo.height / 2 + 40, 
                "Espera a la siguiente ronda",
                { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' }
            ).setOrigin(0.5);
        } else if (jugador === this.jugadorDerecho) { 
            this.jugadorDerecho.puedeMoverse = false;
            const capaGrisDerecha = this.add.rectangle(
                this.camaraDerecha.scrollX, 
                this.camaraDerecha.scrollY, 
                this.camaraDerecha.width, 
                this.camaraDerecha.height, 
                0x000000, 
                0.5 
            ).setOrigin(0);
            const rectanguloNegroDerecha = this.add.rectangle(
                this.camaraDerecha.scrollX + this.camaraDerecha.width / 2,
                this.camaraDerecha.scrollY + this.camaraDerecha.height / 2 + 20,
                this.camaraDerecha.width,
                this.camaraDerecha.height * 0.15, 
                0x000000
            ).setOrigin(0.5);
            const mensajePerdisteDerecha = this.add.text(
                this.camaraDerecha.scrollX + this.camaraDerecha.width / 2, 
                this.camaraDerecha.scrollY + this.camaraDerecha.height / 2, 
                "Perdiste",
                { fontFamily: 'Arial', fontSize: 48, color: '#ffffff' }
            ).setOrigin(0.5);
            const mensajeAdicionalPerdisteDerecha = this.add.text(
                this.camaraDerecha.scrollX + this.camaraDerecha.width / 2, 
                this.camaraDerecha.scrollY + this.camaraDerecha.height / 2 + 40, 
                "Espera a la siguiente ronda",
                { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' }
            ).setOrigin(0.5);
        }
    
        if (!this.jugadorIzquierdo.puedeMoverse && !this.jugadorDerecho.puedeMoverse) {
            let ganador = null;
            let mensajeEmpate = false;
    
            if (this.jugadorIzquierdo.monedas > this.jugadorDerecho.monedas) {
                ganador = this.jugadorIzquierdo;
            } else if (this.jugadorDerecho.monedas > this.jugadorIzquierdo.monedas) {
                ganador = this.jugadorDerecho;
            } else {
                mensajeEmpate = true;
            }
    
            this.scene.stop("ui");
            this.scene.start("PantallaFinRonda", { 
                ganador: ganador, 
                perdedor: mensajeEmpate ? null : (ganador === this.jugadorIzquierdo ? this.jugadorDerecho : this.jugadorIzquierdo), 
                nivel: this.nivel, 
                maxNivel: this.maxNivel,
                autoJugador1: this.autoJugador1,
                autoJugador2: this.autoJugador2,
                empate: mensajeEmpate
            });
        }
    }    

    collisionObstaculo(jugador, obstaculo) {
        if (obstaculo.exploto) return;
        const jugadorLocal = jugador;
        jugadorLocal.puedeMoverse = false;
        obstaculo.destruccion();
        jugador.recibirImpacto();
        const inicioColor = Phaser.Display.Color.ValueToColor(jugadorLocal.tint);
        const finalColor = Phaser.Display.Color.ValueToColor(0x000000);

        this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 50,
            repeat: 1,
            yoyo: true,
            ease: Phaser.Math.Easing.Sine.InOut,
            onUpdate: tween => {
                const value = tween.getValue();
                const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(inicioColor, finalColor, 100, value);
                const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b);
                jugadorLocal.setTint(color);
            },
            onComplete: () => {
                jugadorLocal.clearTint();
                jugadorLocal.puedeMoverse = true;
            }
        });

        this.camaraIzquierdo.shake(100, 0.01);
        this.camaraIzquierdo.flash(100, 255, 0, 0);
    }
    
    // eslint-disable-next-line class-methods-use-this
    recolectarMoneda(jugador, moneda) {
        jugador.recolectarMoneda(moneda.cantidad);
        moneda.destroy();
    }

    establecerGanador(jugador) {
        if (this.ganador) return;
        this.ganador = jugador;
        this.ganador.numeroRondasGanadas += 1;
        const jugadores = [this.jugadorIzquierdo, this.jugadorDerecho];
        const jugadorPerdedor = jugadores.find(j => j !== jugador);
        console.log(`Ganador: ${this.ganador.textura}, Nivel actual: ${this.nivel}`);
        
        // Guardar los datos de ambos autos
        const datosAutos = {
            autoJugador1: this.autoJugador1,
            autoJugador2: this.autoJugador2,
        };

        this.scene.stop("ui");
        this.scene.start("PantallaFinRonda", { 
            ganador: this.ganador, 
            perdedor: jugadorPerdedor, 
            nivel: this.nivel, 
            maxNivel: this.maxNivel,
            ...datosAutos
        });
    }
}