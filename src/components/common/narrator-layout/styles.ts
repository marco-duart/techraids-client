import styled from "styled-components";
import { ThemeType } from "../../../assets/styles/theme";
import { Link } from "react-router-dom";

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  /* padding: 1rem; */
  overflow-y: auto;
`;

export const SidebarContainer = styled.div<{
  isCollapsed: boolean;
  themeType: ThemeType;
}>`
  width: ${({ isCollapsed }) => (isCollapsed ? "80px" : "250px")};
  height: 100vh;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  transition: width 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.shadow};

  @media (max-width: 768px) {
    width: 100%;
    height: 60px;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem;
  }
`;

export const ContentWrapper = styled.div<{ isCollapsed: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: ${({ isCollapsed }) => (isCollapsed ? "80px" : "250px")};
  transition: padding-left 0.3s ease;

  @media (max-width: 768px) {
    padding-left: 0;
    margin-top: 60px;
  }
`;

export const FooterContainer = styled.footer<{ themeType: ThemeType }>`
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 1000;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 0.5rem;
    margin-bottom: 0;
  }
`;

export const UserPhoto = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.accent};
`;

export const UserEmail = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.5rem;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  justify-content: space-between;
  align-items: center;
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
