import { useState } from "react";
import { usePerformanceReport } from "../../../hooks";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PerformanceCharts } from "../../../components/charts/performance-charts";
import { MembersTable } from "../../../components/tables/members-table";
import { DateRangeFilter } from "../../../components/date-range-filter";
import { Range, RangeKeyDict } from "react-date-range";
import * as S from "./styles";
import LoadingSpinner from "../../../components/loading-spinner"; //Trocar por um spinner elegante

export const PerformanceReportPage = () => {
  const { performanceReports, isLoading, fetchPerformanceReport } =
    usePerformanceReport();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
    key: "selection",
  });

  const handleDateSelect = (ranges: RangeKeyDict) => {
    setDateRange(ranges.selection);
  };

  const handleApplyDates = async () => {
    if (dateRange.startDate && dateRange.endDate) {
      await fetchPerformanceReport({
        startDate: format(dateRange.startDate, "yyyy-MM-dd"),
        endDate: format(dateRange.endDate, "yyyy-MM-dd"),
      });
      setShowDatePicker(false);
    }
  };

  return (
    <S.PageContainer>
      <S.Header>
        <h1>Relatório de Desempenho</h1>
        {performanceReports && (
          <S.PeriodInfo>
            Período:{" "}
            {format(
              new Date(performanceReports.period.start_date),
              "dd MMM yyyy",
              { locale: ptBR }
            )}{" "}
            -{" "}
            {format(
              new Date(performanceReports.period.end_date),
              "dd MMM yyyy",
              { locale: ptBR }
            )}
          </S.PeriodInfo>
        )}
        <S.GuildName>{performanceReports?.guild_name}</S.GuildName>
      </S.Header>

      <DateRangeFilter
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        dateRange={dateRange}
        handleDateSelect={handleDateSelect}
        handleApplyDates={handleApplyDates}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <PerformanceCharts performanceReports={performanceReports} />
          <MembersTable performanceReports={performanceReports} />
        </>
      )}
    </S.PageContainer>
  );
};
