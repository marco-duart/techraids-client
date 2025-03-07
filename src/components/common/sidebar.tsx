import React from "react";
import { useAuth } from "../../context/user-provider";
import { useTheme } from "../../context/theme-provider";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BoxArrowRight,
  PersonCircle,
} from "@styled-icons/bootstrap";
import * as S from "./styles";

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const { themeType, themeMode, setThemeMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <S.SidebarContainer isCollapsed={isCollapsed} themeType={themeType}>
      <S.SidebarHeader>
        <S.UserPhoto
          // src={user?.photo}
          alt="User Photo"
        />
        {!isCollapsed && (
          <>
            <S.UserEmail>{user?.email}</S.UserEmail>
            <S.ThemeToggle
              onClick={() =>
                setThemeMode(themeMode === "light" ? "dark" : "light")
              }
            >
              {themeMode === "light" ? "🌙" : "☀️"}
            </S.ThemeToggle>
          </>
        )}
        <S.CollapseButton onClick={toggleSidebar}>
          <ArrowLeft size={24} />
        </S.CollapseButton>
      </S.SidebarHeader>

      <S.SidebarMenu>
        <S.MenuItem>
          <Link to="/personagem">
            <PersonCircle size={20} />
            {!isCollapsed && " Personagem"}
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link to="/jornada">
            <PersonCircle size={20} />
            {!isCollapsed && " Jornada"}
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link to="/missoes">
            <PersonCircle size={20} />
            {!isCollapsed && " Missões"}
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link to="/tarefas">
            <PersonCircle size={20} />
            {!isCollapsed && " Tarefas"}
          </Link>
        </S.MenuItem>
      </S.SidebarMenu>

      <S.LogoutButton onClick={logout}>
        <BoxArrowRight size={20} />
        {!isCollapsed && " Sair"}
      </S.LogoutButton>
    </S.SidebarContainer>
  );
};
