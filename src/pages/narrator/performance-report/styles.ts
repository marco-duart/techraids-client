import styled from "styled-components";
import { DEVICE } from "../../../utils/constants";

export const PageContainer = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};

  @media ${DEVICE.tablet} {
    padding: 2rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h1 {
    color: ${({ theme }) => theme.textTitle};
    margin-bottom: 0.5rem;
  }
`;

export const PeriodInfo = styled.p`
  color: ${({ theme }) => theme.emphasis};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const GuildName = styled.h2`
  color: ${({ theme }) => theme.accent};
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;
