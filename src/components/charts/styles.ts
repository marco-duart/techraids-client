import styled from "styled-components";
import { DEVICE } from "../../utils/constants";

export const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;

  @media ${DEVICE.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const ChartCard = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.shadow};
  flex: 1;
  min-width: 100%;

  h2 {
    color: ${({ theme }) => theme.textTitle};
    margin-bottom: 1rem;
    font-size: 1.1rem;
    text-align: center;
  }

  @media ${DEVICE.tablet} {
    min-width: calc(50% - 1rem);
  }

  @media ${DEVICE.desktop} {
    min-width: calc(33% - 1.5rem);
  }
`;

export const ChartGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;

  @media ${DEVICE.tablet} {
    flex-direction: row;
  }
`;