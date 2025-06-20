import { useAuth } from "../../../context/user-provider";
import { useTheme } from "../../../context/theme-provider";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BoxArrowRight,
  PersonCircle,
  FileText,
  Map,
  BarChart,
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
          <Link to="/narrator/home">
            <BarChart size={20} />
            {!isCollapsed && " Equipe"}
          </Link>
        </S.MenuItem>
        {/* <S.MenuItem>
          <Link to="/narrator/account">
            <PersonCircle size={20} />
            {!isCollapsed && " Perfil"}
          </Link>
        </S.MenuItem> */}
        <S.MenuItem>
          <Link to="/narrator/mission">
            <Map size={20} />
            {!isCollapsed && " Missões"}
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link to="/narrator/task">
            <FileText size={20} />
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
