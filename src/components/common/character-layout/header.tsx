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
  Person,
} from "@styled-icons/bootstrap";
import { Paw, FeatherAlt } from "@styled-icons/fa-solid";
import { Trophy, Store, Home } from "@styled-icons/fa-solid";
import * as S from "./styles";

export const Header = () => {
  const { themeMode, setThemeMode } = useTheme();
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
    <S.CharacterHeader>
      <S.DropdownMenu>
        <S.UserPhoto
          src={user?.photo_url}
          alt="User Photo"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <S.DropdownContent>
            <S.DropdownItem>
              <S.CharacterNavLink to="/character/account">
                <Person size={16} />
                Conta
              </S.CharacterNavLink>
            </S.DropdownItem>
            <S.DropdownItem onClick={handleLogout}>
              <BoxArrowRight size={16} />
              Sair
            </S.DropdownItem>
          </S.DropdownContent>
        )}
      </S.DropdownMenu>

      <S.CharacterNavLinks>
        <S.CharacterNavLink to="/character/home">
          <Home size={24} />
          <span>Home</span>
        </S.CharacterNavLink>
        <S.CharacterNavLink to="/character/status">
          <PersonCircle size={24} />
          <span>Personagem</span>
        </S.CharacterNavLink>
        <S.DisabledLink>
          <S.CharacterNavLink to="#" onClick={(e) => e.preventDefault()}>
            <Paw size={24} />
            <span>Pet</span>
          </S.CharacterNavLink>
          <S.ComingSoonOverlay>
            <S.ComingSoonText>Em breve</S.ComingSoonText>
          </S.ComingSoonOverlay>
        </S.DisabledLink>
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
        <S.CharacterNavLink to="/character/store">
          <Store size={24} />
          <span>Loja</span>
        </S.CharacterNavLink>
        <S.CharacterNavLink to="/character/ranking">
          <Trophy size={24} />
          <span>Ranking</span>
        </S.CharacterNavLink>
        <S.DisabledLink>
          <S.CharacterNavLink to="#" onClick={(e) => e.preventDefault()}>
            <FeatherAlt size={24} />
            <span>Ascensão</span>
          </S.CharacterNavLink>
          <S.ComingSoonOverlay>
            <S.ComingSoonText>Em breve</S.ComingSoonText>
          </S.ComingSoonOverlay>
        </S.DisabledLink>
      </S.CharacterNavLinks>

      <S.ThemeToggle onClick={toggleTheme}>
        {themeMode === "light" ? "🌙" : "☀️"}
      </S.ThemeToggle>
    </S.CharacterHeader>
  );
};
