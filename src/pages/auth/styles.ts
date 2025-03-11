import styled from "styled-components";
import { DEVICE, IMAGES } from "../../utils/constants";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: ${({ theme }) =>
    theme.themeMode === "light"
      ? `url(${IMAGES.backgroundLight})`
      : `url(${IMAGES.backgroundDark})`};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

export const AccessDeniedPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${IMAGES.backgroundAccessDenied});
  background-size: cover;
  background-position: center;
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;

export const LogoContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

export const LogoImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.accent};
  box-shadow: 0 0 10px ${({ theme }) => theme.accent};
  object-fit: cover;

  @media ${DEVICE.tablet} {
    width: 200px;
    height: 200px;
  }
`;

export const LogoFrame = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 3px solid ${({ theme }) => theme.accent};
  border-radius: 50%;
  box-shadow: 0 0 15px ${({ theme }) => theme.accent};
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

export const SmokeEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, transparent 20%, rgba(0, 0, 0, 0.8) 70%);
  z-index: 1;
  pointer-events: none;
`;

export const RegisterLink = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  margin-top: 1rem;

  a {
    color: ${({ theme }) => theme.accent};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
