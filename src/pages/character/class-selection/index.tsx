import { useState } from "react";
import { useCharacterClasses } from "../../../hooks";
import { useAuth } from "../../../context/user-provider";
import { useTheme } from "../../../context/theme-provider";
import { motion } from "framer-motion";
import { Sword } from "@styled-icons/remix-line";
import * as S from "./styles";
import { IMAGES } from "../../../utils/constants";

export const ClassSelectionPage = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const { characterClasses, switchCharacterClass, isLoading } =
    useCharacterClasses();
  const { user } = useAuth();
  const { themeMode } = useTheme();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = async (id: number) => {
    setSelectedId(id);
    const success = await switchCharacterClass({ character_class_id: id });
    if (success) {
      onComplete();
    }
  };

  if (isLoading || !user) {
    return (
      <S.LoadingContainer>
        <S.LoadingAnimation>
          <Sword size={48} className="sword-spin" />
          <span>Carregando classes ancestrais...</span>
        </S.LoadingAnimation>
      </S.LoadingContainer>
    );
  }

  return (
    <S.SelectionContainer>
      <S.BackgroundImage src={IMAGES.backgroundRanking} alt="Background" />

      <S.HeaderContainer>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <S.MainTitle>Assuma Seu Legado</S.MainTitle>
          <S.MainSubtitle>
            "O sangue de heróis corre em suas veias - que classe você herdará?"
          </S.MainSubtitle>
        </motion.div>
      </S.HeaderContainer>

      <S.ClassesShowcase>
        {characterClasses.map((cls) => (
          <S.ClassCard
            key={cls.id}
            themeMode={themeMode}
            selected={selectedId === cls.id}
            onClick={() => handleSelect(cls.id)}
            whileHover={{ scale: 1.03 }}
          >
            <S.ClassImageContainer>
              <S.ClassImage src={cls.image_url} alt={cls.name} />
              <S.ClassOverlay selected={selectedId === cls.id} />
            </S.ClassImageContainer>

            <S.ClassInfo>
              <S.ClassName>{cls.name}</S.ClassName>
              <S.ClassSlogan>"{cls.slogan}"</S.ClassSlogan>
              <S.ClassRequirements>
                <span>Experiência necessária: {cls.required_experience}</span>
                <span>Taxa de entrada: {cls.entry_fee} gold</span>
              </S.ClassRequirements>
            </S.ClassInfo>
          </S.ClassCard>
        ))}
      </S.ClassesShowcase>

      <S.FooterNote>
        Sua jornada começa aqui - escolha sabiamente, pois este caminho definirá
        seu destino!
      </S.FooterNote>
    </S.SelectionContainer>
  );
};
