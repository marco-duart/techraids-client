import styled from "styled-components";
import { IGuildNotice } from "../../../services/guild-notice/DTO";

export const JournalContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 1rem;
  overflow-x: hidden;
  font-family: "MedievalSharp", cursive;
  color: ${({ theme }) => theme.text};
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0.1;
`;

export const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.border};
`;

export const HeaderTitle = styled.h1`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textTitle};
  margin-bottom: 0.5rem;
`;

export const HeaderSubtitle = styled.p`
  font-size: 1rem;
  font-style: italic;
  opacity: 0.8;
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${({ theme, $active }) =>
    $active ? theme.accent : theme.secondary};
  border: 2px solid
    ${({ theme, $active }) => ($active ? theme.accent : theme.border)};
  color: ${({ theme, $active }) => ($active ? theme.textTitle : theme.text)};
  border-radius: 30px;
  font-family: "MedievalSharp", cursive;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.textTitle};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;

export const MessagesContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const MessageCard = styled.div<{
  priority: IGuildNotice.Priority;
}>`
  background: ${({ theme }) => theme.secondary};
  border: 2px solid ${({ priority }) => getPriorityColor(priority)};
  border-radius: 10px;
  margin-bottom: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: ${({ priority }) => getPriorityColor(priority)};
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const getPriorityColor = (priority: IGuildNotice.Priority) => {
  const colors = {
    low: "#4caf50",
    normal: "#ffc107",
    high: "#fd7e14",
    critical: "#ff5252",
  };
  return colors[priority];
};

export const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  position: relative;
`;

export const AuthorLine = styled.span`
  font-size: 0.75rem;
  opacity: 0.6;
  font-style: italic;
  color: ${({ theme }) => theme.text};
  margin-left: auto;
  padding: 0.25rem 0.5rem;
  background: ${({ theme }) => theme.secondary + "40"};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border + "30"};
`;

export const AnnouncementIconWarning = styled.div`
  color: #ff5252;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M12 2L1 21h22L12 2zm0 3.5L18.5 19h-13L12 5.5z'/%3E%3Cpath d='M12 16c.8 0 1.5-.7 1.5-1.5S12.8 13 12 13s-1.5.7-1.5 1.5.7 1.5 1.5 1.5zm-1-4h2v-5h-2v5z'/%3E%3C/svg%3E");
`;

export const AnnouncementIconEvent = styled.div`
  color: #4caf50;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z'/%3E%3C/svg%3E");
`;

export const AnnouncementIconUpdate = styled.div`
  color: #2196f3;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79s7.15 2.71 9.88 0c1.36-1.35 2.04-3.18 2.04-4.9h2c0 1.98-.78 3.9-2.24 5.3-3.02 2.98-7.92 2.98-10.94 0-2.98-2.98-2.98-7.82 0-10.8 3.02-2.98 7.92-2.98 10.94 0l2.74-2.82V10.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z'/%3E%3C/svg%3E");
`;

export const GuildIcon = styled.div<{ guildId: number }>`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background: ${({ guildId }) => {
    const colors = [
      "#ff5252",
      "#4caf50",
      "#2196f3",
      "#ff9800",
      "#9c27b0",
      "#00bcd4",
      "#8bc34a",
      "#ff5722",
    ];
    return colors[guildId % colors.length];
  }};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

export const MessageTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
`;

export const MessageTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  flex: 1;
  color: ${({ theme }) => theme.textTitle};
`;

export const MessageFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px dashed ${({ theme }) => theme.border + "40"};
`;

export const MessageTime = styled.span`
  font-size: 0.65rem;
  opacity: 0.5;
  font-family: "Literata", serif;
  font-style: italic;
  color: ${({ theme }) => theme.text + "90"};
`;

export const MessageContent = styled.p`
  margin: 0;
  font-family: "Literata", serif;
  line-height: 1.6;
`;

export const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-style: italic;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoadingAnimation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;

  .book-spin {
    animation: spin 1.5s linear infinite;
    color: ${({ theme }) => theme.accent};
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
