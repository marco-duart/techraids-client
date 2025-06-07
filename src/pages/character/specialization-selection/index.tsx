import { useState } from "react";
import { useSpecializations } from "../../../hooks";
import { useAuth } from "../../../context/user-provider";
import { useTheme } from "../../../context/theme-provider";
import { motion } from "framer-motion";
import * as S from "./styles";
import { IMAGES } from "../../../utils/constants";
import { Sword } from "@styled-icons/remix-fill";

export const SpecializationSelectionPage = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const { specializations, selectSpecialization, isLoading } =
    useSpecializations();
  const { user } = useAuth();
  const { themeMode } = useTheme();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = async (id: number) => {
    setSelectedId(id);
    const success = await selectSpecialization({ specialization_id: id });
    if (success) {
      onComplete();
    }
  };

  if (isLoading || !user) {
    return (
      <S.LoadingContainer>
        <S.LoadingAnimation>
          <Sword size={48} className="sword-spin" />
          <span>Carregando caminhos do conhecimento...</span>
        </S.LoadingAnimation>
      </S.LoadingContainer>
    );
  }

  return (
    <S.SelectionContainer>
      {/* <S.BackgroundImage src={IMAGES.backgroundSpecialization} alt="Background" /> */}

      <S.HeaderContainer>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <S.MainTitle>Escolha Seu Caminho</S.MainTitle>
          <S.MainSubtitle>
            "O destino aguarda - selecione sua especialização com sabedoria"
          </S.MainSubtitle>
        </motion.div>
      </S.HeaderContainer>

      <S.CardsGrid>
        {specializations.map((spec) => (
          <S.SpecializationCard
            key={spec.id}
            themeMode={themeMode}
            selected={selectedId === spec.id}
            onClick={() => handleSelect(spec.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <S.SpecTitle>{spec.title}</S.SpecTitle>
            <S.SpecDescription>{spec.description}</S.SpecDescription>
            <S.SelectButton selected={selectedId === spec.id}>
              {selectedId === spec.id ? "Selecionado" : "Selecionar"}
            </S.SelectButton>
          </S.SpecializationCard>
        ))}
      </S.CardsGrid>

      <S.FooterNote>
        Esta escolha determinará suas habilidades futuras. Pense com cuidado!
      </S.FooterNote>
    </S.SelectionContainer>
  );
};
