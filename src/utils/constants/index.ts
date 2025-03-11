import logo from "../../assets/images/logo.jpeg";
import backgroundLight from "../../assets/images/background-light.jpg";
import backgroundDark from "../../assets/images/background-dark.jpg";
import backgroundAccessDenied from "../../assets/images/background-access-denied.jpg";

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
};
