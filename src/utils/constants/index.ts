import logo from "../../assets/images/logo.jpeg";
import backgroundLight from "../../assets/images/background-light.jpg";
import backgroundDark from "../../assets/images/background-dark.jpg";
import backgroundCharacter from "../../assets/images/background-character.jpg";
import backgroundAccessDenied from "../../assets/images/background-access-denied.jpg";
import backgroundRanking from "../../assets/images/background-ranking.jpg";
import paperTextureLight from "../../assets/images/paper-texture-light.jpg";
import paperTextureDark from "../../assets/images/paper-texture-dark.jpg";
import worldMap from "../../assets/images/world-map.jpg";
import questMap from "../../assets/images/quest-map.jpg";
import clouds from "../../assets/images/clouds.png";
import openedChest from "../../assets/images/opened-chest.png";
import closedChest from "../../assets/images/closed-chest.png";

import mainThemeSong from "../../assets/audios/celtic-main-theme.mp3";

const SIZES = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  desktop: "1024px",
  fullHd: "1920px",
};

export const DEVICE = {
  mobileS: `(min-width: ${SIZES.mobileS})`,
  mobileM: `(min-width: ${SIZES.mobileM})`,
  mobileL: `(min-width: ${SIZES.mobileL})`,
  tablet: `(min-width: ${SIZES.tablet})`,
  desktop: `(min-width: ${SIZES.desktop})`,
  fullHd: `(min-width: ${SIZES.fullHd})`,
};

export const IMAGES = {
  logo,
  backgroundLight,
  backgroundDark,
  backgroundAccessDenied,
  backgroundCharacter,
  backgroundRanking,
  paperTextureLight,
  paperTextureDark,
  worldMap,
  questMap,
  clouds,
  openedChest,
  closedChest,
};

export const SONGS = {
  mainThemeSong,
};
