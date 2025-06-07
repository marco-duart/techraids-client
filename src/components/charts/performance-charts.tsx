import { IGetPerformanceReport } from "../../services/performance-report/DTO";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import * as S from "./styles";
import { StatusPieCharts } from "./status-pie-charts";

interface Props {
  performanceReports: IGetPerformanceReport.Response | undefined;
}

export const PerformanceCharts = ({ performanceReports }: Props) => {
  const performanceData =
    performanceReports?.report.map((member) => ({
      name: member.name,
      performance: member.overall_performance,
      tasks: member.tasks.completion_rate,
      missions: member.missions.completion_rate,
    })) || [];

  return (
    <S.ChartsContainer>
      <S.ChartCard>
        <h2>Desempenho da Equipe</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={performanceData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="performance" name="Desempenho Geral" fill="#8884d8" />
            <Bar dataKey="tasks" name="Tarefas (%)" fill="#82ca9d" />
            <Bar dataKey="missions" name="Missões (%)" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </S.ChartCard>

      <StatusPieCharts performanceReports={performanceReports} />
    </S.ChartsContainer>
  );
};
