import styled from "styled-components";
import { Link } from "react-router-dom";
import { DEVICE } from "../../../utils/constants";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

  @media ${DEVICE.tablet} {
    flex-direction: row;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
`;

export const SidebarContainer = styled.div<{
  $isCollapsed: boolean;
}>`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  transition: width 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadow};

  @media ${DEVICE.tablet} {
    width: ${({ $isCollapsed }) => ($isCollapsed ? "80px" : "250px")};
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem;
  }
`;

export const ContentWrapper = styled.div<{ $isCollapsed: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-top: 60px;
  transition: padding-left 0.3s ease;

  @media ${DEVICE.tablet} {
    padding-left: ${({ $isCollapsed }) => ($isCollapsed ? "80px" : "250px")};
    margin-top: 0;
  }
`;

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 1000;
  position: fixed;
  bottom: 0;
  left: 0;

  @media ${DEVICE.tablet} {
    position: static;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0;

  @media ${DEVICE.tablet} {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

export const UserPhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.accent};

  @media ${DEVICE.tablet} {
    width: 80px;
    height: 80px;
  }
`;

export const UserEmail = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};

  @media ${DEVICE.tablet} {
    font-size: 1rem;
  }
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.5rem;
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;

  @media ${DEVICE.tablet} {
    top: 20px;
    right: 20px;
  }
`;

export const CollapseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

export const SidebarMenu = styled.div`
  width: 100%;
  display: none;

  @media ${DEVICE.tablet} {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const MenuItem = styled.div`
  a {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: ${({ theme }) => theme.accent};
    }
  }
`;

export const LogoutButton = styled.button`
  margin-top: auto;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;

  @media ${DEVICE.tablet} {
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }
`;

export const Copyright = styled.span`
  font-size: 0.875rem;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: ${({ theme }) => theme.accent};
    }
  }
`;

export const AboutLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;
