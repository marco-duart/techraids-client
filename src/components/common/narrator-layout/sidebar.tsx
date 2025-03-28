import { useAuth } from "../../../context/user-provider";
import { useTheme } from "../../../context/theme-provider";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BoxArrowRight,
  PersonCircle,
} from "@styled-icons/bootstrap";
import * as S from "./styles";

interface Props {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Sidebar: React.FC<Props> = ({ isCollapsed, onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { themeMode, setThemeMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <S.SidebarContainer isCollapsed={isCollapsed} themeType="narrator">
      <S.ThemeToggle
        onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
      >
        {themeMode === "light" ? "🌙" : "☀️"}
      </S.ThemeToggle>

      <S.SidebarHeader>
        <S.UserPhoto src={user?.photo_url} alt="User Photo" />
        {!isCollapsed && <S.UserEmail>{user?.email}</S.UserEmail>}
        <S.CollapseButton onClick={onToggleSidebar}>
          {isCollapsed ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
        </S.CollapseButton>
      </S.SidebarHeader>

      <S.SidebarMenu>
        <S.MenuItem>
          <Link to="/narrator/status">
            <PersonCircle size={20} />
            {!isCollapsed && " Personagem"}
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link to="/narrator/quest">
            <PersonCircle size={20} />
            {!isCollapsed && " Jornada"}
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link to="/narrator/mission">
            <PersonCircle size={20} />
            {!isCollapsed && " Missões"}
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link to="/narrator/task">
            <PersonCircle size={20} />
            {!isCollapsed && " Tarefas"}
          </Link>
        </S.MenuItem>
      </S.SidebarMenu>

      <S.LogoutButton onClick={handleLogout}>
        <BoxArrowRight size={20} />
        {!isCollapsed && " Sair"}
      </S.LogoutButton>
    </S.SidebarContainer>
  );
};
