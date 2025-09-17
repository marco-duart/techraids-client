import { useEffect, useState } from "react";
import * as S from "./styles";
import { useArcaneAnnouncements } from "../../../hooks/use-arcane-announcements";
import { IconButton } from "../../../components/buttons/icon-button";
import { Plus, Pencil, Trash } from "@styled-icons/bootstrap";
import LoadingSpinner from "../../../components/loading-spinner";
import { ArcaneAnnouncementModal } from "../../../components/modals/arcane-announcement-modal";
import { IArcaneAnnouncement } from "../../../services/arcane-announcement/DTO";
import { ConfirmModal } from "../../../components/modals/confirm-modal";
import { ArcaneAnnouncementFormData } from "../../../schemas/arcane-announcement-schema";

export const NarratorArcaneAnnouncementsPage = () => {
  const {
    arcaneAnnouncements,
    isLoading,
    createArcaneAnnouncement,
    deleteArcaneAnnouncement,
    fetchArcaneAnnouncements,
    updateArcaneAnnouncement,
  } = useArcaneAnnouncements();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<IArcaneAnnouncement.Model | null>(null);
  const [deletingAnnouncement, setDeletingAnnouncement] =
    useState<IArcaneAnnouncement.Model | null>(null);

  useEffect(() => {
    fetchArcaneAnnouncements();
  }, []);

  const handleCreate = () => {
    setEditingAnnouncement(null);
    setIsModalOpen(true);
  };

  const handleEdit = (notice: IArcaneAnnouncement.Model) => {
    setEditingAnnouncement(notice);
    setIsModalOpen(true);
  };

  const handleDelete = (notice: IArcaneAnnouncement.Model) => {
    setDeletingAnnouncement(notice);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingAnnouncement) {
      await deleteArcaneAnnouncement(deletingAnnouncement.id);
      setIsDeleteModalOpen(false);
      setDeletingAnnouncement(null);
    }
  };

  const handleSaveAnnouncement = async (data: ArcaneAnnouncementFormData) => {
    if (editingAnnouncement) {
      await updateArcaneAnnouncement({
        id: editingAnnouncement.id,
        arcane_announcement: data,
      });
    } else {
      await createArcaneAnnouncement({
        arcane_announcement: {
          title: data.title,
          content: data.content,
          priority: data.priority,
          active: data.active,
        },
      });
    }
    setIsModalOpen(false);
    setEditingAnnouncement(null);
  };

  const getPriorityColor = (priority: IArcaneAnnouncement.Priority) => {
    const colors = {
      low: "#4caf50",
      normal: "#ffc107",
      high: "#fd7e14",
      critical: "#ff5252",
    };
    return colors[priority];
  };

  const getPriorityLabel = (priority: IArcaneAnnouncement.Priority) => {
    const labels = {
      low: "Baixa",
      normal: "Normal",
      high: "Alta",
      critical: "Crítica",
    };
    return labels[priority] || "Normal";
  };

  if (isLoading && !arcaneAnnouncements) {
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
        <S.Title>Comunicação - Geral</S.Title>
        <IconButton
          icon={Plus}
          variant="primary"
          onClick={handleCreate}
          disabled={isLoading}
        />
      </S.Header>

      <S.AnnouncementsContainer>
        {arcaneAnnouncements && arcaneAnnouncements.length > 0 ? (
          <S.AnnouncementList>
            {arcaneAnnouncements.map((announcement) => (
              <S.AnnouncementItem
                key={announcement.id}
                $active={announcement.active}
              >
                <S.AnnouncementHeader>
                  <S.AnnouncementTitle>
                    {announcement.title}
                  </S.AnnouncementTitle>
                  <S.PriorityBadge
                    $color={getPriorityColor(announcement.priority)}
                  >
                    {getPriorityLabel(announcement.priority)}
                  </S.PriorityBadge>
                </S.AnnouncementHeader>

                <S.AnnouncementContent>
                  {announcement.content}
                </S.AnnouncementContent>

                <S.AnnouncementFooter>
                  <S.AnnouncementDate>
                    Criado em:{" "}
                    {new Date(announcement.created_at).toLocaleDateString()}
                    {announcement.updated_at !== announcement.created_at && (
                      <>
                        {" "}
                        • Atualizado em:{" "}
                        {new Date(announcement.updated_at).toLocaleDateString()}
                      </>
                    )}
                  </S.AnnouncementDate>

                  <S.Actions>
                    <S.StatusBadge $active={announcement.active}>
                      {announcement.active ? "Ativo" : "Inativo"}
                    </S.StatusBadge>

                    <IconButton
                      icon={Pencil}
                      size="sm"
                      onClick={() => handleEdit(announcement)}
                      disabled={isLoading}
                      variant="primary"
                    />

                    <IconButton
                      icon={Trash}
                      size="sm"
                      onClick={() => handleDelete(announcement)}
                      disabled={isLoading}
                      variant="danger"
                    />
                  </S.Actions>
                </S.AnnouncementFooter>
              </S.AnnouncementItem>
            ))}
          </S.AnnouncementList>
        ) : (
          <S.EmptyMessage>
            Nenhuma anúncio arcano encontrado. Clique em "Novo Anúncio" para
            criar a primeira.
          </S.EmptyMessage>
        )}
      </S.AnnouncementsContainer>

      <ArcaneAnnouncementModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAnnouncement(null);
        }}
        onSubmit={handleSaveAnnouncement}
        initialData={editingAnnouncement}
        isLoading={isLoading}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingAnnouncement(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o anúncio "${deletingAnnouncement?.title}"?`}
        isLoading={isLoading}
      />
    </S.PageContainer>
  );
};
