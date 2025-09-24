import { useAuth } from "../../../context/user-provider";
import { useTheme } from "../../../context/theme-provider";
import { Sword, Shield, Fire, Map, Coin } from "@styled-icons/remix-line";
import { Crown, Refresh } from "@styled-icons/boxicons-regular";
import * as S from "./styles";
import { IMAGES } from "../../../utils/constants";
import { useHonoraryTitles } from "../../../hooks";
import { Dropdown } from "../../../components/dropdown";

export const CharacterStatusPage = () => {
  const { user, refreshUser } = useAuth();
  const { themeMode } = useTheme();
  const { isLoading, switchHonoraryTitle } = useHonoraryTitles();

  if (!user) {
    return <div>Carregando...</div>;
  }

  const {
    nickname,
    character_class,
    specialization,
    guild,
    village,
    gold,
    experience,
    current_level,
    active_title,
    acquired_titles,
  } = user;

  const handleTitleChange = async (titleId: number) => {
    if (active_title?.id === titleId) return;
    await switchHonoraryTitle({ honorary_title_id: titleId });
  };

  const handleRefresh = async () => {
    await refreshUser();
  };

  return (
    <S.CharacterContainer>
      <S.BackgroundImage src={IMAGES.backgroundCharacter} alt="Background" />
      <S.FireAnimation
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <S.CharacterSheet themeMode={themeMode}>
         <S.RefreshIconButton 
          onClick={handleRefresh} 
          disabled={isLoading}
          themeMode={themeMode}
          title="Atualizar dados"
        >
          <Refresh size={isLoading ? 18 : 20} />
          {isLoading && <S.LoadingSpinner />}
        </S.RefreshIconButton>

        <S.CharacterLevel>
          {current_level}
          <S.LevelText>Level</S.LevelText>
        </S.CharacterLevel>

        <S.CharacterFullBodyImage
          src={character_class.image_url}
          alt="Character Image"
        />

        <S.CharacterTitle>{nickname}</S.CharacterTitle>

        {active_title && (
          <S.ActiveTitleContainer>
            <Crown size={20} />
            <S.ActiveTitleText>{active_title.title}</S.ActiveTitleText>
            <S.ActiveTitleSlogan>"{active_title.slogan}"</S.ActiveTitleSlogan>
          </S.ActiveTitleContainer>
        )}

        <S.CharacterSubtitle>"{character_class.slogan}"</S.CharacterSubtitle>

        <S.DecorativeBorder />

        {acquired_titles.length > 0 && (
          <S.TitleSelectorContainer>
            <S.CharacterLabel>
              <Crown size={20} />
              <span>Selecione um Título:</span>
            </S.CharacterLabel>
            <Dropdown
              options={acquired_titles.map((title) => ({
                value: title.id,
                label: title.title,
                selected: active_title?.id === title.id,
              }))}
              onSelect={handleTitleChange}
              disabled={isLoading}
              placeholder="Choose a title..."
            />
          </S.TitleSelectorContainer>
        )}

        <S.CharacterInfoGroup>
          <S.CharacterInfo>
            <S.CharacterLabel>
              <Coin size={20} />
              <span>Ouro:</span>
            </S.CharacterLabel>
            <S.CharacterValue>{gold}</S.CharacterValue>
          </S.CharacterInfo>

          <S.CharacterInfo>
            <S.CharacterLabel>
              <Fire size={20} />
              <span>Experiência:</span>
            </S.CharacterLabel>
            <S.CharacterValue>{experience}</S.CharacterValue>
          </S.CharacterInfo>
        </S.CharacterInfoGroup>

        <S.DecorativeLine />

        <S.CharacterInfoGroup>
          <S.CharacterInfo>
            <S.CharacterLabel>
              <Shield size={20} />
              <span>Especialização:</span>
            </S.CharacterLabel>
            <S.CharacterValue>{specialization.title}</S.CharacterValue>
          </S.CharacterInfo>

          <S.CharacterInfo>
            <S.CharacterLabel>
              <Sword size={20} />
              <span>Classe:</span>
            </S.CharacterLabel>
            <S.CharacterValue>{character_class.name}</S.CharacterValue>
          </S.CharacterInfo>
        </S.CharacterInfoGroup>

        <S.DecorativeLine />

        <S.CharacterInfoGroup>
          <S.CharacterInfo>
            <S.CharacterLabel>
              <Map size={20} />
              <span>Vilarejo:</span>
            </S.CharacterLabel>
            <S.CharacterValue>{village.name}</S.CharacterValue>
          </S.CharacterInfo>

          <S.CharacterInfo>
            <S.CharacterLabel>
              <Map size={20} />
              <span>Guilda:</span>
            </S.CharacterLabel>
            <S.CharacterValue>{guild.name}</S.CharacterValue>
          </S.CharacterInfo>
        </S.CharacterInfoGroup>
      </S.CharacterSheet>
    </S.CharacterContainer>
  );
};
