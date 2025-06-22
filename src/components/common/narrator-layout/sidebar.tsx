import { useAuth } from "../../../context/user-provider";
import { useTheme } from "../../../context/theme-provider";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BoxArrowRight,
  PersonCircle,
  FileText,
  Map,
  BarChart,
  Question,
  Gift,
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
    <S.SidebarContainer $isCollapsed={isCollapsed}>
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
          <S.NarratorNavLink to="/narrator/home">
            <BarChart size={20} />
            {!isCollapsed && " Equipe"}
          </S.NarratorNavLink>
        </S.MenuItem>
        <S.DisabledLink>
          <S.NarratorNavLink to="#" onClick={(e) => e.preventDefault()}>
            <PersonCircle size={24} />
            {!isCollapsed && " Perfil"}
          </S.NarratorNavLink>
          <S.ComingSoonOverlay>
            <S.ComingSoonText>Em breve</S.ComingSoonText>
          </S.ComingSoonOverlay>
        </S.DisabledLink>
        <S.MenuItem>
          <S.NarratorNavLink to="/narrator/missions">
            <Map size={20} />
            {!isCollapsed && " Missões"}
          </S.NarratorNavLink>
        </S.MenuItem>
        <S.MenuItem>
          <S.NarratorNavLink to="/narrator/tasks">
            <FileText size={20} />
            {!isCollapsed && " Tarefas"}
          </S.NarratorNavLink>
        </S.MenuItem>
        <S.MenuItem>
          <S.NarratorNavLink to="/narrator/treasure-chests">
            <Gift size={20} />
            {!isCollapsed && " Premiações"}
          </S.NarratorNavLink>
        </S.MenuItem>
        <S.MenuItem>
          <S.NarratorNavLink to="/narrator/how-to-use">
            <Question size={20} />
            {!isCollapsed && " Como Usar"}
          </S.NarratorNavLink>
        </S.MenuItem>
      </S.SidebarMenu>

      <S.LogoutButton onClick={handleLogout}>
        <BoxArrowRight size={20} />
        {!isCollapsed && " Sair"}
      </S.LogoutButton>
    </S.SidebarContainer>
  );
};
