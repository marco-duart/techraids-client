import styled from "styled-components";
import { ThemeType } from "../../../assets/styles/theme";
import { NavLink } from "react-router-dom";

export const CharacterLayoutContainer = styled.div<{ themeType: ThemeType }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
`;

export const CharacterContent = styled.main`
  flex: 1;
  overflow-y: auto;
`;

export const CharacterHeader = styled.header<{ themeType: ThemeType }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: ${({ theme }) => theme.secondary};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 0 5rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }
`;

export const CharacterNavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const CharacterNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-size: 16px;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
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

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;
`;

export const UserPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.accent};
  cursor: pointer;
`;

export const DropdownContent = styled.div`
  display: block;
  position: absolute;
  left: 0;
  background-color: ${({ theme }) => theme.secondary};
  min-width: 45px;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 1000;
  border-radius: 4px;
  overflow: hidden;
`;

export const DropdownItem = styled.div`
  padding: 12px 16px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.accent};
  }
`;
