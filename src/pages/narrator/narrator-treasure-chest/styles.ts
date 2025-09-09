import styled from "styled-components";
import { DEVICE } from "../../../utils/constants";

export const PageContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

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

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;
