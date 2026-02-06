import styled from "styled-components";
import { DEVICE } from "../../../utils/constants";

export const PageContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.primary};

  @media ${DEVICE.tablet} {
    padding: 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;

  @media ${DEVICE.tablet} {
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.accent};
  font-size: 1.5rem;
  font-weight: 500;

  @media ${DEVICE.tablet} {
    font-size: 2rem;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

export const BossesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BossList = styled.div`
  display: grid;
  gap: 1rem;
`;

export const BossItem = styled.div<{ $active: boolean }>`
  background: ${({ theme }) => theme.secondary};
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadow};
  opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const BossHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const BossTitle = styled.h3`
  color: ${({ theme }) => theme.textTitle};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
`;

export const PriorityBadge = styled.span<{ $color: string }>`
  background: ${({ $color }) => $color};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export const BossContent = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  white-space: pre-wrap;
`;

export const BossFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  @media ${DEVICE.tablet} {
    flex-direction: row;
    align-items: center;
  }
`;

export const BossDate = styled.span`
  color: ${({ theme }) => theme.emphasis};
  font-size: 0.875rem;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatusBadge = styled.span<{ $active: boolean }>`
  background: ${({ theme, $active }) =>
    $active ? theme.accent : theme.border};
  color: ${({ $active }) => ($active ? "white" : "#6c757d")};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.emphasis};
  font-style: italic;
  padding: 3rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.border};
`;

export const ChapterTitle = styled.span`
  color: ${({ theme }) => theme.emphasis};
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.25rem;
  display: block;
`;
