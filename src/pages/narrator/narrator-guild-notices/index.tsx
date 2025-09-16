import { useEffect, useState } from "react";
import * as S from "./styles";
import { useGuildNotices } from "../../../hooks/use-guild-notices";
import { IconButton } from "../../../components/buttons/icon-button";
import { Plus, Pencil, Trash } from "@styled-icons/bootstrap";
import LoadingSpinner from "../../../components/loading-spinner";
import { GuildNoticeModal } from "../../../components/modals/guild-notice-modal";
import { IGuildNotice } from "../../../services/guild-notice/DTO";
import { ConfirmModal } from "../../../components/modals/confirm-modal";
import { GuildNoticeFormData } from "../../../schemas/guild-notice-schema";

export const NarratorGuildNoticesPage = () => {
  const {
    guildNotices,
    isLoading,
    fetchGuildNotices,
    createGuildNotice,
    updateGuildNotice,
    deleteGuildNotice,
  } = useGuildNotices();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<IGuildNotice.Model | null>(
    null
  );
  const [deletingNotice, setDeletingNotice] =
    useState<IGuildNotice.Model | null>(null);

  useEffect(() => {
    fetchGuildNotices();
  }, []);

  const handleCreate = () => {
    setEditingNotice(null);
    setIsModalOpen(true);
  };

  const handleEdit = (notice: IGuildNotice.Model) => {
    setEditingNotice(notice);
    setIsModalOpen(true);
  };

  const handleDelete = (notice: IGuildNotice.Model) => {
    setDeletingNotice(notice);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingNotice) {
      await deleteGuildNotice(deletingNotice.id);
      setIsDeleteModalOpen(false);
      setDeletingNotice(null);
    }
  };

  const handleSaveNotice = async (data: GuildNoticeFormData) => {
    if (editingNotice) {
      await updateGuildNotice({
        id: editingNotice.id,
        guild_notice: data,
      });
    } else {
      await createGuildNotice({
        guild_notice: {
          title: data.title,
          content: data.content,
          priority: data.priority,
          active: data.active,
        },
      });
    }
    setIsModalOpen(false);
    setEditingNotice(null);
  };

  const getPriorityColor = (priority: IGuildNotice.Priority) => {
    const colors = {
      low: "#4caf50",
      normal: "#ffc107",
      high: "#fd7e14",
      critical: "#ff5252",
    };
    return colors[priority];
  };

  const getPriorityLabel = (priority: IGuildNotice.Priority) => {
    const labels = {
      low: "Baixa",
      normal: "Normal",
      high: "Alta",
      critical: "Crítica",
    };
    return labels[priority] || "Normal";
  };

  if (isLoading && !guildNotices) {
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
        <S.Title>Comunicação - Equipe</S.Title>
        <IconButton
          icon={Plus}
          variant="primary"
          onClick={handleCreate}
          disabled={isLoading}
        />
      </S.Header>

      <S.NoticesContainer>
        {guildNotices && guildNotices.length > 0 ? (
          <S.NoticeList>
            {guildNotices.map((notice) => (
              <S.NoticeItem key={notice.id} $active={notice.active}>
                <S.NoticeHeader>
                  <S.NoticeTitle>{notice.title}</S.NoticeTitle>
                  <S.PriorityBadge $color={getPriorityColor(notice.priority)}>
                    {getPriorityLabel(notice.priority)}
                  </S.PriorityBadge>
                </S.NoticeHeader>

                <S.NoticeContent>{notice.content}</S.NoticeContent>

                <S.NoticeFooter>
                  <S.NoticeDate>
                    Criado em:{" "}
                    {new Date(notice.created_at).toLocaleDateString()}
                    {notice.updated_at !== notice.created_at && (
                      <>
                        {" "}
                        • Atualizado em:{" "}
                        {new Date(notice.updated_at).toLocaleDateString()}
                      </>
                    )}
                  </S.NoticeDate>

                  <S.Actions>
                    <S.StatusBadge $active={notice.active}>
                      {notice.active ? "Ativa" : "Inativa"}
                    </S.StatusBadge>

                    <IconButton
                      icon={Pencil}
                      size="sm"
                      onClick={() => handleEdit(notice)}
                      disabled={isLoading}
                      variant="primary"
                    />

                    <IconButton
                      icon={Trash}
                      size="sm"
                      onClick={() => handleDelete(notice)}
                      disabled={isLoading}
                      variant="danger"
                    />
                  </S.Actions>
                </S.NoticeFooter>
              </S.NoticeItem>
            ))}
          </S.NoticeList>
        ) : (
          <S.EmptyMessage>
            Nenhuma notícia da guilda encontrada. Clique em "Nova Notícia" para
            criar a primeira.
          </S.EmptyMessage>
        )}
      </S.NoticesContainer>

      <GuildNoticeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNotice(null);
        }}
        onSubmit={handleSaveNotice}
        initialData={editingNotice}
        isLoading={isLoading}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingNotice(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir a notícia "${deletingNotice?.title}"?`}
        isLoading={isLoading}
      />
    </S.PageContainer>
  );
};
