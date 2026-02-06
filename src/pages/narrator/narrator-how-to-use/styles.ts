import styled from "styled-components";
import { DEVICE } from "../../../utils/constants";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.primary};
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;

  @media ${DEVICE.tablet} {
    padding: 2rem;
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.accent};
  font-size: 1.8rem;
  margin: 0;

  @media ${DEVICE.tablet} {
    font-size: 2.2rem;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.textTitle};
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.textTitle};
  padding-bottom: 0.5rem;
`;

export const SectionSubtitle = styled.h3`
  color: ${({ theme }) => theme.textTitle};
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem;
`;

export const SectionText = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;

export const FeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.5rem 0 1rem;
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.text};

  li {
    line-height: 1.5;
  }
`;

export const StatusList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1rem 0;
  padding-left: 0;
  list-style: none;
  color: ${({ theme }) => theme.text};

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    line-height: 1.5;
  }
`;

export const StatusBadge = styled.span<{ $status: "approved" | "rejected" | "pending" }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${({ $status, theme }) =>
    $status === "approved"
      ? theme.approved
      : $status === "rejected"
      ? theme.rejected
      : theme.pending};
  color: white;
`;

export const Workflow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1.5rem 0;
  position: relative;
  padding-left: 2.5rem;

  &::before {
    content: "";
    position: absolute;
    left: 1.25rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: ${({ theme }) => theme.accent};
    opacity: 0.3;
  }
`;

export const WorkflowStep = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  position: relative;
`;

export const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.border};
  color: white;
  font-weight: bold;
  flex-shrink: 0;
  position: absolute;
  left: -2.5rem;
`;

export const StepText = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.5;
  margin: 0;
  padding-top: 0.5rem;
`;
