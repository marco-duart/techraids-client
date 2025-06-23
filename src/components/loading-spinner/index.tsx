import { useAuth } from "../../context/user-provider";
import { IUser } from "../../services/auth/DTO";
import * as S from "./styles";
import { Book } from "@styled-icons/remix-fill";

const LoadingSpinner = () => {
  const { user } = useAuth()
  return (
    <S.LoadingContainer>
      <S.LoadingAnimation>
        <Book size={48} className="book-spin" />
        {user?.role === IUser.Role.NARRATOR ? <span>Carregando informações...</span> : <span>Consultando os oráculos...</span>}
      </S.LoadingAnimation>
    </S.LoadingContainer>
  );
};

export default LoadingSpinner;
