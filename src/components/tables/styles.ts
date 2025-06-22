import styled from "styled-components";

export const TableWrapper = styled.div<{ isNarrator?: boolean }>`
  position: relative;
  border: 3px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.3);
  background: ${(props) =>
    props.isNarrator
      ? null
      : `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url('https://www.transparenttextures.com/patterns/old-map.png'), ${props.theme.secondary}`};
  padding: 1rem;
  font-family: "MedievalSharp", cursive;
  color: ${({ theme }) => theme.text};
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: transparent;
`;

export const TableHead = styled.thead`
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.border} 100%
  );
  border-bottom: 3px double ${({ theme }) => theme.border};
`;

export const TableHeader = styled.th`
  padding: 1.25rem 1rem;
  text-align: left;
  color: ${({ theme }) => theme.textTitle};
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 1px;
  position: relative;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 2px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${({ theme }) => theme.accent} 50%,
      transparent 100%
    );
  }
`;

export const TableBody = styled.tbody`
  tr {
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.1) 0%,
      transparent 5%,
      transparent 95%,
      rgba(0, 0, 0, 0.1) 100%
    );

    &:nth-child(odd) {
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.2) 0%,
        transparent 5%,
        transparent 95%,
        rgba(0, 0, 0, 0.2) 100%
      );
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.border};
    }

    &:hover {
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.3) 0%,
        ${({ theme }) => theme.primary}20 5%,
        ${({ theme }) => theme.primary}20 95%,
        rgba(0, 0, 0, 0.3) 100%
      );
    }
  }
`;

export const TableRow = styled.tr`
  transition: all 0.3s ease;
`;

export const TableCell = styled.td`
  padding: 1.25rem 1rem;
  vertical-align: middle;
  position: relative;

  &:not(:first-child)::before {
    content: "";
    position: absolute;
    left: 0;
    top: 15%;
    height: 70%;
    width: 1px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${({ theme }) => theme.border} 50%,
      transparent 100%
    );
  }
`;

export const QuestTitle = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.textTitle};
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent 0%,
      ${({ theme }) => theme.accent} 50%,
      transparent 100%
    );
  }
`;

export const QuestDescription = styled.p`
  margin: 0.75rem 0 0;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.4;
  font-family: "Book Antiqua", serif;
  font-style: italic;
  padding-left: 0.5rem;
  border-left: 2px solid ${({ theme }) => theme.border};
`;

export const GoldCell = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  position: relative;
  padding-left: 1.25rem;

  &::before {
    content: "🪙";
    position: absolute;
    left: 0;
    font-size: 0.9em;
  }

  &::after {
    content: "Peças de Ouro";
    font-size: 0.7em;
    opacity: 0.7;
    margin-left: 0.25rem;
    font-family: "Book Antiqua", serif;
    font-style: italic;
    color: ${({ theme }) => theme.text};
  }

  @keyframes glow {
    0% {
      opacity: 0.7;
      transform: scale(1);
    }
    100% {
      opacity: 1;
      transform: scale(1.1);
      text-shadow: 0 0 5px ${({ theme }) => theme.accent};
    }
  }
`;

export const XPCell = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  position: relative;
  padding-left: 1.5rem;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);

  &::before {
    content: "✨";
    position: absolute;
    left: 0;
    font-size: 1em;
    filter: drop-shadow(0 0 2px ${({ theme }) => theme.accent});
    animation: glow 2s infinite alternate;
  }

  &::after {
    content: "Pontos de Experiência";
    font-size: 0.7em;
    opacity: 0.8;
    margin-left: 0.5rem;
    font-family: "Book Antiqua", serif;
    font-style: italic;
    color: ${({ theme }) => theme.text};
  }

  @keyframes glow {
    0% {
      opacity: 0.7;
      transform: scale(1);
    }
    100% {
      opacity: 1;
      transform: scale(1.1);
      text-shadow: 0 0 5px ${({ theme }) => theme.accent};
    }
  }
`;

export const ActionsCell = styled.div`
  display: flex;
  gap: 0.75rem;

  button {
    background: ${({ theme }) => theme.border};
    border: 1px solid ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 0.25rem;
    transition: all 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.accent};
      transform: translateY(-1px);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

export const EmptyMessage = styled.div`
  padding: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-style: italic;
  font-family: "Book Antiqua", serif;
  font-size: 1.1rem;
  border-top: 1px dashed ${({ theme }) => theme.border};
  background: url("https://www.transparenttextures.com/patterns/parchment.png");
  position: relative;

  &::before,
  &::after {
    content: "✧";
    position: absolute;
    top: 1rem;
    color: ${({ theme }) => theme.accent};
    font-size: 1.5rem;
  }

  &::before {
    left: 1rem;
  }

  &::after {
    right: 1rem;
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("https://www.transparenttextures.com/patterns/black-paper.png"),
    rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: ${({ theme }) => theme.accent};
  font-family: "MedievalSharp", cursive;
  font-size: 1.4rem;
  letter-spacing: 2px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);

  &::before {
    content: "⚔️";
    margin-right: 1rem;
    font-size: 2rem;
    animation: pulse 1.5s infinite ease-in-out, swing 3s infinite ease-in-out;
    transform-origin: top center;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.7;
      transform: scale(1) rotate(-10deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.1) rotate(-10deg);
    }
  }

  @keyframes swing {
    0%,
    100% {
      transform: rotate(-10deg);
    }
    50% {
      transform: rotate(10deg);
    }
  }
`;

export const MembersTable = styled.div`
  margin-top: 2rem;
  overflow-x: auto;

  h2 {
    color: ${({ theme }) => theme.textTitle};
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: ${({ theme }) => theme.secondary};
    box-shadow: ${({ theme }) => theme.shadow};
    border-radius: 8px;
    overflow: hidden;
  }

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  th {
    background-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.primary};
    font-weight: 500;
  }

  tr:hover {
    background-color: ${({ theme }) => theme.emphasis}20;
  }
`;

export const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 0 0.5rem;
  position: relative;
`;

export const ProgressFill = styled.div<{
  $percentage: number;
  $color: "pending" | "approved" | "rejected";
}>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background-color: ${({ theme, $color }) => theme[$color]};
  border-radius: 10px;
  transition: width 0.5s ease;
`;

export const StatusDetails = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.emphasis};
  margin-top: 0.25rem;
`;

export const PerformanceScore = styled.div<{ $score: number }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  background-color: ${({ theme, $score }) => {
    if ($score >= 80) return theme.approved;
    if ($score >= 50) return theme.pending;
    return theme.rejected;
  }};
  color: ${({ theme }) => theme.primary};
`;

export const QuantityInput = styled.input`
  width: 60px;
  padding: 0.25rem;
  margin-right: 0.5rem;
`;
