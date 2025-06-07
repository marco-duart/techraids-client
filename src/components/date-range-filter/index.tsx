import { Range, RangeKeyDict } from "react-date-range";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ptBR } from "date-fns/locale";
import * as S from "./styles";

interface Props {
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  dateRange: Range;
  handleDateSelect: (ranges: RangeKeyDict) => void;
  handleApplyDates: () => void;
}

export const DateRangeFilter = ({
  showDatePicker,
  setShowDatePicker,
  dateRange,
  handleDateSelect,
  handleApplyDates,
}: Props) => {
  return (
    <S.FiltersContainer>
      <S.DateFilterButton onClick={() => setShowDatePicker(!showDatePicker)}>
        Selecionar Período
      </S.DateFilterButton>

      {showDatePicker && (
        <S.DatePickerContainer>
          <DateRangePicker
            ranges={[dateRange]}
            onChange={handleDateSelect}
            locale={ptBR}
            months={2}
            direction="horizontal"
          />
          <S.DatePickerActions>
            <S.ApplyButton onClick={handleApplyDates}>Aplicar</S.ApplyButton>
            <S.CancelButton onClick={() => setShowDatePicker(false)}>
              Cancelar
            </S.CancelButton>
          </S.DatePickerActions>
        </S.DatePickerContainer>
      )}
    </S.FiltersContainer>
  );
};
