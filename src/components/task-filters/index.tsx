import { useState } from "react";
import * as S from "./styles";
import { IUser } from "../../services/auth/DTO";

interface Props {
  onStatusChange?: (
    status: "pending" | "approved" | "rejected" | undefined,
  ) => void;
  onRewardRangeChange?: (min?: number, max?: number) => void;
  onCharacterChange?: (characterId?: number) => void;
  onSortChange?: (sortBy: string, direction: "asc" | "desc") => void;
  guildMembers?: IUser.Model[];
}

export const TaskFilters = ({
  onStatusChange,
  onRewardRangeChange,
  onCharacterChange,
  onSortChange,
  guildMembers = [],
}: Props) => {
  const [minReward, setMinReward] = useState<string>("");
  const [maxReward, setMaxReward] = useState<string>("");

  const handleRewardChange = () => {
    const min = minReward ? parseInt(minReward) : undefined;
    const max = maxReward ? parseInt(maxReward) : undefined;
    onRewardRangeChange?.(min, max);
  };

  return (
    <S.FilterContainer>
      <S.FilterGroup>
        <S.FilterLabel>Status</S.FilterLabel>
        <S.FilterSelect
          onChange={(e) =>
            onStatusChange?.(
              e.target.value as "pending" | "approved" | "rejected" | undefined,
            )
          }
          defaultValue=""
        >
          <option value="">Todos</option>
          <option value="pending">Pendente</option>
          <option value="approved">Aprovado</option>
          <option value="rejected">Reprovado</option>
        </S.FilterSelect>
      </S.FilterGroup>

      <S.FilterGroup>
        <S.FilterLabel>Personagem</S.FilterLabel>
        <S.FilterSelect
          onChange={(e) =>
            onCharacterChange?.(
              e.target.value ? parseInt(e.target.value) : undefined
            )
          }
          defaultValue=""
        >
          <option value="">Todos</option>
          {guildMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.nickname}
            </option>
          ))}
        </S.FilterSelect>
      </S.FilterGroup>

      <S.FilterGroup>
        <S.FilterLabel>XP</S.FilterLabel>
        <S.FilterInput
          type="number"
          placeholder="Min"
          value={minReward}
          onChange={(e) => {
            setMinReward(e.target.value);
            handleRewardChange();
          }}
        />
        <S.FilterLabel style={{ margin: "0 4px" }}>-</S.FilterLabel>
        <S.FilterInput
          type="number"
          placeholder="Max"
          value={maxReward}
          onChange={(e) => {
            setMaxReward(e.target.value);
            handleRewardChange();
          }}
        />
      </S.FilterGroup>

      <S.FilterGroup>
        <S.FilterLabel>Ordenar</S.FilterLabel>
        <S.FilterSelect
          onChange={(e) => {
            const [sortBy, direction] = e.target.value.split(":");
            onSortChange?.(sortBy, direction as "asc" | "desc");
          }}
          defaultValue="updated_at:desc"
        >
          <option value="updated_at:desc">Mais Recentes</option>
          <option value="updated_at:asc">Mais Antigas</option>
          <option value="created_at:desc">Recém Criadas</option>
          <option value="experience_reward:desc">Maior Recompensa XP</option>
          <option value="experience_reward:asc">Menor Recompensa XP</option>
          <option value="status:asc">Status (A-Z)</option>
        </S.FilterSelect>
      </S.FilterGroup>
    </S.FilterContainer>
  );
};
