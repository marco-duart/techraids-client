import styled from "styled-components";
import { DEVICE } from "../../../utils/constants";

export const PageContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.primary};

  @media ${DEVICE.tablet} {
    padding: 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 1rem;
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

export const RewardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Section = styled.div`
  background: ${({ theme }) => theme.secondary};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textTitle};
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.emphasis};
  font-style: italic;
  padding: 2rem;
`;

export const RewardList = styled.div`
  display: grid;
  gap: 1rem;
`;

export const RewardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.primary};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const RewardInfo = styled.div`
  flex: 1;
`;

export const RewardTitle = styled.h3`
  color: ${({ theme }) => theme.textTitle};
  margin-bottom: 0.5rem;
`;

export const RewardDescription = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

export const RewardDate = styled.span`
  color: ${({ theme }) => theme.emphasis};
  font-size: 0.75rem;
`;

export const DeliverButton = styled.button`
  background: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.accent}CC;
  }

  &:disabled {
    background: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;
