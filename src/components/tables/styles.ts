import styled from "styled-components";

export const TableWrapper = styled.div`
  position: relative;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 0;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  background-color: ${({ theme }) => theme.secondary};
  font-family: "MedievalSharp", cursive;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.primary};
`;

export const TableHeader = styled.th`
  padding: 1.25rem 1rem;
  text-align: left;
  color: ${({ theme }) => theme.textTitle};
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 1px;
  border-bottom: 3px solid ${({ theme }) => theme.border};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.accent};
  }
`;

export const TableBody = styled.tbody`
  tr:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`;

export const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary}20;
  }
`;

export const TableCell = styled.td`
  padding: 1.25rem 1rem;
  vertical-align: middle;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 60%;
    background: ${({ theme }) => theme.border};
    opacity: 0.3;
  }

  &:first-child::before {
    display: none;
  }
`;

export const QuestTitle = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.textTitle};
  letter-spacing: 0.5px;
`;

export const QuestDescription = styled.p`
  margin: 0.75rem 0 0;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.4;
  font-family: "Book Antiqua", serif;
`;

export const XPCell = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  &::after {
    content: "XP";
    font-size: 0.7em;
    opacity: 0.7;
    margin-left: 0.25rem;
  }
`;

export const GoldCell = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  &::after {
    content: "Gold";
    font-size: 0.7em;
    opacity: 0.7;
    margin-left: 0.25rem;
  }
`;

export const ActionsCell = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const EmptyMessage = styled.div`
  padding: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-style: italic;
  font-family: "Book Antiqua", serif;
  font-size: 1.1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.secondary}dd;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: ${({ theme }) => theme.text};
  font-family: "MedievalSharp", cursive;
  font-size: 1.2rem;
  letter-spacing: 1px;

  &::before {
    content: "⌛";
    margin-right: 0.75rem;
    font-size: 1.5rem;
    animation: pulse 1.5s infinite ease-in-out;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.7;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }
`;
