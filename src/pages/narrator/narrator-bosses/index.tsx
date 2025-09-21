import { useState } from "react";
import * as S from "./styles";
import { useBosses } from "../../../hooks/use-bosses";
import { useChapters } from "../../../hooks/use-chapters";
import { IconButton } from "../../../components/buttons/icon-button";
import { Pencil } from "@styled-icons/bootstrap";
import LoadingSpinner from "../../../components/loading-spinner";
import { BossModal } from "../../../components/modals/boss-modal";
import { IBoss } from "../../../services/boss/DTO";

export const NarratorBossesPage = () => {
  const { bosses, isLoading, updateBoss } = useBosses();
  const { chapters } = useChapters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBoss, setEditingBoss] = useState<IBoss.Model | null>(null);

  const handleEdit = (boss: IBoss.Model) => {
    setEditingBoss(boss);
    setIsModalOpen(true);
  };

  const handleSaveBoss = async (data: { reward_description: string }) => {
    if (editingBoss) {
      await updateBoss({
        id: editingBoss.id,
        boss: {
          name: editingBoss.name,
          description: editingBoss.description,
          slogan: editingBoss.slogan,
          reward_description: data.reward_description,
        },
      });
    }
    setIsModalOpen(false);
    setEditingBoss(null);
  };

  const getChapterTitle = (chapterId: number) => {
    const chapter = chapters.find((chap) => chap.id === chapterId);
    return chapter?.title || "Capítulo não encontrado";
  };

  const getStatusColor = (defeated: boolean, rewardClaimed: boolean) => {
    if (rewardClaimed) return "#198754";
    if (defeated) return "#FFC107";
    return "#BB2D3B";
  };

  const getStatusLabel = (defeated: boolean, rewardClaimed: boolean) => {
    if (rewardClaimed) return "Recompensa Coletada";
    if (defeated) return "Derrotado";
    return "Não Derrotado";
  };

  if (isLoading && !bosses) {
    return (
      <S.PageContainer>
        <S.LoadingWrapper>
          <LoadingSpinner />
        </S.LoadingWrapper>
      </S.PageContainer>
    );
  }

  return (
    <S.PageContainer>
      <S.Header>
        <S.Title>Prêmios Coletivos</S.Title>
      </S.Header>

      <S.BossesContainer>
        {bosses && bosses.length > 0 ? (
          <S.BossList>
            {bosses.map((boss) => (
              <S.BossItem key={boss.id} $active={true}>
                <S.BossHeader>
                  <div>
                    <S.BossTitle>{boss.name}</S.BossTitle>
                    <S.ChapterTitle>
                      Capítulo: {getChapterTitle(boss.chapter_id)}
                    </S.ChapterTitle>
                  </div>
                  <S.PriorityBadge
                    $color={getStatusColor(boss.defeated, boss.reward_claimed)}
                  >
                    {getStatusLabel(boss.defeated, boss.reward_claimed)}
                  </S.PriorityBadge>
                </S.BossHeader>

                <S.BossContent>
                  <strong>Slogan:</strong> {boss.slogan}
                  <br />
                  <strong>Descrição:</strong> {boss.description}
                  <br />
                  <strong>Recompensa:</strong>{" "}
                  {boss.reward_description || "Nenhuma recompensa definida"}
                </S.BossContent>

                <S.BossFooter>
                  <S.BossDate>
                    Criado em: {new Date(boss.created_at).toLocaleDateString()}
                    {boss.updated_at !== boss.created_at && (
                      <>
                        {" "}
                        • Atualizado em:{" "}
                        {new Date(boss.updated_at).toLocaleDateString()}
                      </>
                    )}
                  </S.BossDate>

                  <S.Actions>
                    <IconButton
                      icon={Pencil}
                      size="sm"
                      onClick={() => handleEdit(boss)}
                      disabled={isLoading}
                      variant="primary"
                      ariaLabel={`Editar boss ${boss.name}`}
                    />
                  </S.Actions>
                </S.BossFooter>
              </S.BossItem>
            ))}
          </S.BossList>
        ) : (
          <S.EmptyMessage>Nenhum boss encontrado.</S.EmptyMessage>
        )}
      </S.BossesContainer>

      <BossModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBoss(null);
        }}
        onSubmit={handleSaveBoss}
        initialData={editingBoss}
        isLoading={isLoading}
      />
    </S.PageContainer>
  );
};
