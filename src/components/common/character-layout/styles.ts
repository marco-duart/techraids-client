import styled from "styled-components";
import { ThemeType } from "../../../assets/styles/theme";
import { NavLink } from "react-router-dom";
import { DEVICE } from "../../../utils/constants";

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
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: auto;
  background-color: ${({ theme }) => theme.secondary};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 10px;
  position: relative;

  @media ${DEVICE.tablet} {
    flex-direction: row;
    justify-content: space-between;
    height: 60px;
    padding: 0 5rem;
  }
`;

export const CharacterNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media ${DEVICE.tablet} {
    flex-direction: row;
    gap: 20px;
  }
`;

export const CharacterNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }

  @media ${DEVICE.tablet} {
    font-size: 16px;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.accent};
  cursor: pointer;

  @media ${DEVICE.tablet} {
    width: 50px;
    height: 50px;
  }
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  left: 0;
  background-color: ${({ theme }) => theme.secondary};
  min-width: 45px;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 1000;
  border-radius: 4px;
  overflow: hidden;

  ${DropdownMenu}:hover & {
    display: block;
  }
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
