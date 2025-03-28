import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/theme-provider";
import { useAuth } from "../../../context/user-provider";
import {
  PersonCircle,
  Shield,
  Map,
  Table,
  BoxArrowRight,
} from "@styled-icons/bootstrap";
import * as S from "./styles";

export const Header = () => {
  const { themeType, themeMode, setThemeMode } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleTheme = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <S.CharacterHeader themeType={themeType}>
      <S.DropdownMenu>
        <S.UserPhoto
          src={user?.photo_url}
          alt="User Photo"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <S.DropdownContent>
            <S.DropdownItem onClick={handleLogout}>
              <BoxArrowRight size={16} />
              Sair
            </S.DropdownItem>
          </S.DropdownContent>
        )}
      </S.DropdownMenu>

      <S.CharacterNavLinks>
        <S.CharacterNavLink to="/character/status">
          <PersonCircle size={24} />
          <span>Personagem</span>
        </S.CharacterNavLink>
        <S.CharacterNavLink to="/character/quest">
          <Map size={24} />
          <span>Jornada</span>
        </S.CharacterNavLink>
        <S.CharacterNavLink to="/character/missions">
          <Shield size={24} />
          <span>Missões</span>
        </S.CharacterNavLink>
        <S.CharacterNavLink to="/character/tasks">
          <Table size={24} />
          <span>Tarefas</span>
        </S.CharacterNavLink>
      </S.CharacterNavLinks>

      <S.ThemeToggle onClick={toggleTheme}>
        {themeMode === "light" ? "🌙" : "☀️"}
      </S.ThemeToggle>
    </S.CharacterHeader>
  );
};
