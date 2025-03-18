import logo from "../../assets/images/logo.jpeg";
import backgroundLight from "../../assets/images/background-light.jpg";
import backgroundDark from "../../assets/images/background-dark.jpg";
import backgroundCharacter from "../../assets/images/background-character.jpg";
import backgroundAccessDenied from "../../assets/images/background-access-denied.jpg";
import paperTextureLight from "../../assets/images/paper-texture-light.jpg";
import paperTextureDark from "../../assets/images/paper-texture-dark.jpg";
import worldMap from "../../assets/images/world-map.jpg";
import questMap from "../../assets/images/quest-map.jpg";

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
  paperTextureLight,
  paperTextureDark,
  backgroundCharacter,
  worldMap,
  questMap,
};
