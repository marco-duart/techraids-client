import { useJournal } from "../../../hooks/use-journal";
import { Book } from "@styled-icons/remix-fill";
import { Mailbox } from "@styled-icons/bootstrap";
import { Castle } from "@styled-icons/boxicons-solid";
import { FileText } from "@styled-icons/fa-regular";
import { Scroll } from "@styled-icons/fa-solid";
import * as S from "./styles";
import { IMAGES } from "../../../utils/constants";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const CharacterHomePage = () => {
  const {
    arcaneAnnouncements,
    guildNotices,
    isLoading,
    activeTab,
    setActiveTab,
    userGuildId,
  } = useJournal();

  const getAnnouncementIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "warning":
        return <S.AnnouncementIconWarning />;
      case "event":
        return <S.AnnouncementIconEvent />;
      case "update":
        return <S.AnnouncementIconUpdate />;
      default:
        return <Scroll size={20} />;
    }
  };

  if (isLoading) {
    return (
      <S.LoadingContainer>
        <S.LoadingAnimation>
          <Book size={48} className="book-spin" />
          <span>Consultando os Canais do Reino...</span>
        </S.LoadingAnimation>
      </S.LoadingContainer>
    );
  }

  return (
    <S.JournalContainer>
      <S.BackgroundImage src={IMAGES.paperTextureLight} alt="Background" />

      <S.HeaderContainer>
        <S.HeaderTitle>
          <Book size={32} />
          <span>Diário do Aventureiro</span>
        </S.HeaderTitle>
        <S.HeaderSubtitle>
          "O conhecimento é a arma mais poderosa em qualquer jornada"
        </S.HeaderSubtitle>
      </S.HeaderContainer>

      <S.TabsContainer>
        <S.TabButton
          $active={activeTab === "arcane"}
          onClick={() => setActiveTab("arcane")}
        >
          <FileText size={20} />
          <span>Anúncios Arcanos</span>
        </S.TabButton>
        <S.TabButton
          $active={activeTab === "guild"}
          onClick={() => setActiveTab("guild")}
        >
          <Castle size={20} />
          <span>Notícias da Guild</span>
          {guildNotices && guildNotices.length > 0 && (
            <S.NotificationBadge>{guildNotices.length}</S.NotificationBadge>
          )}
        </S.TabButton>
      </S.TabsContainer>

      <S.MessagesContainer>
        <AnimatePresence mode="wait">
          {activeTab === "arcane" ? (
            <motion.div
              key="arcane"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {arcaneAnnouncements?.length === 0 ? (
                <S.EmptyMessage>
                  <Mailbox size={48} />
                  <span>Nenhum anúncio arcano encontrado...</span>
                </S.EmptyMessage>
              ) : (
                arcaneAnnouncements?.map((announcement) => (
                  <S.MessageCard
                    key={announcement.id}
                    priority={announcement.priority}
                  >
                    <S.MessageHeader>
                      {getAnnouncementIcon(announcement.announcement_type)}
                      <S.MessageTitle>{announcement.title}</S.MessageTitle>
                      <S.MessageTime>
                        {formatDistanceToNow(
                          new Date(announcement.created_at),
                          {
                            addSuffix: true,
                            locale: ptBR,
                          }
                        )}
                      </S.MessageTime>
                    </S.MessageHeader>
                    <S.MessageContent>{announcement.content}</S.MessageContent>
                  </S.MessageCard>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="guild"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {guildNotices?.length === 0 ? (
                <S.EmptyMessage>
                  <Mailbox size={48} />
                  <span>Nenhuma notícia da guild encontrada...</span>
                </S.EmptyMessage>
              ) : (
                guildNotices?.map((notice) => (
                  <S.MessageCard
                    key={notice.id}
                    priority={notice.priority}
                    guildNotice
                  >
                    <S.MessageHeader>
                      <S.GuildIcon guildId={userGuildId || 0} />
                      <S.MessageTitle>{notice.title}</S.MessageTitle>
                      <S.MessageTime>
                        {formatDistanceToNow(new Date(notice.created_at), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </S.MessageTime>
                    </S.MessageHeader>
                    <S.MessageContent>{notice.content}</S.MessageContent>
                  </S.MessageCard>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </S.MessagesContainer>
    </S.JournalContainer>
  );
};
