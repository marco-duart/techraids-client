import { useAuth } from "../../../context/user-provider";
import { useTheme } from "../../../context/theme-provider";
import { useNavigate, useLocation } from "react-router-dom";
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
  CurrencyDollar,
  Megaphone,
  Award,
  Trophy,
} from "@styled-icons/bootstrap";
import { Target } from "@styled-icons/feather";
import { CommunicationPerson } from "styled-icons/fluentui-system-regular";
import * as S from "./styles";
import { IMAGES } from "../../../utils/constants";

interface Props {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Sidebar: React.FC<Props> = ({ isCollapsed, onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { themeMode, setThemeMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isNarratorQuestPage = location.pathname.includes("/narrator/quest");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const canPostArcaneAnnouncements =
    user &&
    ["arcane_scholars", "lorekeepers", "runemasters"].includes(
      user?.village.village_type
    );

  return (
    <S.SidebarContainer $isCollapsed={isCollapsed}>
      {!isNarratorQuestPage && (
        <S.ThemeToggle
          onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
        >
          {themeMode === "light" ? "🌙" : "☀️"}
        </S.ThemeToggle>
      )}

      <S.SidebarHeader>
        <S.UserPhoto
          src={user?.photo_url || IMAGES.userIcon}
          alt="User Photo"
        />
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
        <S.MenuItem>
          <S.NarratorNavLink to="/narrator/quest">
            <Map size={20} />
            {!isCollapsed && " Aventura"}
          </S.NarratorNavLink>
        </S.MenuItem>
        <S.DisabledLink>
          <S.NarratorNavLink
            to="/narrator/profile"
            onClick={(e) => e.preventDefault()}
          >
            <PersonCircle size={20} />
            {!isCollapsed && " Perfil"}
          </S.NarratorNavLink>
          <S.ComingSoonOverlay>
            <S.ComingSoonText>Em breve</S.ComingSoonText>
          </S.ComingSoonOverlay>
        </S.DisabledLink>
        <S.MenuItem>
          <S.NarratorNavLink to="/narrator/missions">
            <Target size={20} />
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
          <S.NarratorNavLink to="/narrator/bosses">
            <Trophy size={20} />
            {!isCollapsed && " Prêmios Coletivos"}
          </S.NarratorNavLink>
        </S.MenuItem>
        <S.MenuItem>
          <S.NarratorNavLink to="/narrator/treasure-chests">
            <Gift size={20} />
            {!isCollapsed && " Prêmios Individuais"}
          </S.NarratorNavLink>
        </S.MenuItem>
        <S.MenuItem>
          <S.NarratorNavLink to="/narrator/pending-rewards">
            <CurrencyDollar size={20} />
            {!isCollapsed && " Prêmios Pendentes"}
          </S.NarratorNavLink>
        </S.MenuItem>
        <S.DisabledLink>
          <S.NarratorNavLink
            to="/narrator/honorable-titles"
            onClick={(e) => e.preventDefault()}
          >
            <Award size={20} />
            {!isCollapsed && " Títulos Honoríficos"}
          </S.NarratorNavLink>
          <S.ComingSoonOverlay>
            <S.ComingSoonText>Em breve</S.ComingSoonText>
          </S.ComingSoonOverlay>
        </S.DisabledLink>
        <S.MenuItem>
          <S.NarratorNavLink to="/narrator/guild-notices">
            <CommunicationPerson size={20} />
            {!isCollapsed && " Comunicação - Equipe"}
          </S.NarratorNavLink>
        </S.MenuItem>
        {canPostArcaneAnnouncements && (
          <S.MenuItem>
            <S.NarratorNavLink to="/narrator/arcane-announcements">
              <Megaphone size={20} />
              {!isCollapsed && " Comunicação - Geral"}
            </S.NarratorNavLink>
          </S.MenuItem>
        )}
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
