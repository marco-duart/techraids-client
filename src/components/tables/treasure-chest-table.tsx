import * as S from "./styles";
import { ITreasureChest } from "../../services/treasure-chest/DTO";
import { IconButton } from "../buttons/icon-button";
import { Eye } from "@styled-icons/fa-regular";
import { ToggleOn, ToggleOff } from "@styled-icons/material";

interface Props {
  treasureChests: ITreasureChest.Model[];
  onView: (treasureChest: ITreasureChest.Model) => void;
  onToggleStatus: (id: number, isActive: boolean) => void;
}

export const TreasureChestTable = ({
  treasureChests,
  onView,
  onToggleStatus,
}: Props) => {
  return (
    <S.TableWrapper isNarrator={true}>
      <S.Table>
        <S.TableHead>
          <tr>
            <S.TableHeader>Título</S.TableHeader>
            <S.TableHeader>Valor</S.TableHeader>
            <S.TableHeader>Status</S.TableHeader>
            <S.TableHeader>Ações</S.TableHeader>
          </tr>
        </S.TableHead>
        <S.TableBody>
          {treasureChests.length > 0 ? (
            treasureChests.map((chest) => (
              <S.TableRow key={chest.id}>
                <S.TableCell>
                  <S.QuestTitle>{chest.title}</S.QuestTitle>
                </S.TableCell>
                <S.TableCell>
                  <S.GoldCell>{chest.value}</S.GoldCell>
                </S.TableCell>
                <S.TableCell>
                  <div>{chest.active ? "Habilitado" : "Desabilitado"}</div>
                </S.TableCell>
                <S.TableCell>
                  <S.ActionsCell>
                    <IconButton
                      icon={chest.active ? ToggleOn : ToggleOff}
                      onClick={() => onToggleStatus(chest.id, !chest.active)}
                      variant={chest.active ? "default" : "danger"}
                    />
                    <IconButton icon={Eye} onClick={() => onView(chest)} />
                  </S.ActionsCell>
                </S.TableCell>
              </S.TableRow>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <S.EmptyMessage>
                  Nenhum baú de tesouro encontrado
                </S.EmptyMessage>
              </td>
            </tr>
          )}
        </S.TableBody>
      </S.Table>
    </S.TableWrapper>
  );
};
