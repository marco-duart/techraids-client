import * as S from "./styles";
import { useCharacterQuest } from "../../hooks/use-character-quest";

export const HomePage = () => {
  const { data } = useCharacterQuest();
  return (
    <S.PageContainer>
      <h1>Home Page</h1>
      <div>{data?.quest.title}</div>
    </S.PageContainer>
  );
};
