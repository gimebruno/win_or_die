import Phaser from "phaser";
import UI from "./scenes/UI";
import PantallaCarga from "./scenes/PantallaCarga";
import PantallaMenuPrincipal from "./scenes/PantallaMenuPrincipal";
import PantallaMenu from "./scenes/PatantallaMenu";
import PantallaControles from "./scenes/PantallaControles";
import Nivel from "./scenes/Nivel";
import PantallaFinRonda from "./scenes/PantallaFinRonda";
import SeleccionAuto from "./scenes/SeleccionAuto";

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 768,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 260,
      height: 280,
    },
    max: {
      width: 1280,
      height: 768,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  scene: [PantallaCarga, PantallaMenuPrincipal, PantallaMenu, PantallaControles, Nivel, UI, PantallaFinRonda, SeleccionAuto],
};

export default new Phaser.Game(config);
