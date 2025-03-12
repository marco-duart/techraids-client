import { useAuth } from "../../context/user-provider";
import { useTheme } from "../../context/theme-provider";
import { ArrowUp, Shield, Map, Coin, Fire } from "@styled-icons/bootstrap";
import * as S from "./styles";
import { IMAGES } from "../../utils/constants";

export const CharacterPage = () => {
  const { user } = useAuth();
  const { themeType } = useTheme();

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
  } = user;

  return (
    <S.CharacterContainer themeType={themeType}>
      <S.BackgroundImage src={IMAGES.backgroundCharacter} alt="Background" />
      <S.FireAnimation
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <S.CharacterSheet>
        <S.CharacterFullBodyImage
          src={character_class.image_url}
          alt="Character Full Body"
        />

        <S.CharacterTitle>{nickname}</S.CharacterTitle>
        <S.CharacterSubtitle>"{character_class.slogan}"</S.CharacterSubtitle>

        <S.DecorativeBorder />

        <S.CharacterInfoGroup>
          <S.CharacterInfo>
            <S.CharacterLabel>
              <Coin size={20} />
              <span>Gold:</span>
            </S.CharacterLabel>
            <S.CharacterValue>{gold}</S.CharacterValue>
          </S.CharacterInfo>

          <S.CharacterInfo>
            <S.CharacterLabel>
              <Fire size={20} />
              <span>Experience:</span>
            </S.CharacterLabel>
            <S.CharacterValue>{experience}</S.CharacterValue>
          </S.CharacterInfo>
        </S.CharacterInfoGroup>

        <S.DecorativeLine />

        <S.CharacterInfoGroup>
          <S.CharacterInfo>
            <S.CharacterLabel>
              <Shield size={20} />
              <span>Class:</span>
            </S.CharacterLabel>
            <S.CharacterValue>{character_class.name}</S.CharacterValue>
          </S.CharacterInfo>

          <S.CharacterInfo>
            <S.CharacterLabel>
              <Shield size={20} />
              <span>Specialization:</span>
            </S.CharacterLabel>
            <S.CharacterValue>{specialization.title}</S.CharacterValue>
          </S.CharacterInfo>
        </S.CharacterInfoGroup>

        <S.DecorativeLine />

        <S.CharacterInfoGroup>
          <S.CharacterInfo>
            <S.CharacterLabel>
              <Map size={20} />
              <span>Guild:</span>
            </S.CharacterLabel>
            <S.CharacterValue>{guild.name}</S.CharacterValue>
          </S.CharacterInfo>

          <S.CharacterInfo>
            <S.CharacterLabel>
              <Map size={20} />
              <span>Village:</span>
            </S.CharacterLabel>
            <S.CharacterValue>{village.name}</S.CharacterValue>
          </S.CharacterInfo>
        </S.CharacterInfoGroup>
      </S.CharacterSheet>
    </S.CharacterContainer>
  );
};
