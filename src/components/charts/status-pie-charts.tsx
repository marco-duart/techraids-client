import { IGetPerformanceReport } from "../../services/performance-report/DTO";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import * as S from "./styles";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const StatusPieCharts = ({
  performanceReports,
}: {
  performanceReports: IGetPerformanceReport.Response | undefined;
}) => {
  const initialStatusData = {
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    name: "Tasks",
  };

  const taskStatusData =
    performanceReports?.report.reduce(
      (acc, member) => ({
        total: acc.total + member.tasks.total,
        approved: acc.approved + member.tasks.approved,
        rejected: acc.rejected + member.tasks.rejected,
        pending: acc.pending + member.tasks.pending,
        name: "Tasks",
      }),
      { ...initialStatusData }
    ) || initialStatusData;

  const missionStatusData = performanceReports?.report.reduce(
    (acc, member) => ({
      total: acc.total + member.missions.total,
      approved: acc.approved + member.missions.approved,
      rejected: acc.rejected + member.missions.rejected,
      pending: acc.pending + member.missions.pending,
      name: "Missions",
    }),
    { ...initialStatusData, name: "Missions" }
  ) || { ...initialStatusData, name: "Missions" };

  const pieData = [
    { name: "Aprovadas", value: taskStatusData.approved },
    { name: "Rejeitadas", value: taskStatusData.rejected },
    { name: "Pendentes", value: taskStatusData.pending },
  ];

  const missionPieData = [
    { name: "Aprovadas", value: missionStatusData.approved },
    { name: "Rejeitadas", value: missionStatusData.rejected },
    { name: "Pendentes", value: missionStatusData.pending },
  ];

  return (
    <S.ChartGrid>
      <S.ChartCard>
        <h2>Status das Tarefas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </S.ChartCard>

      <S.ChartCard>
        <h2>Status das Missões</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={missionPieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {missionPieData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </S.ChartCard>
    </S.ChartGrid>
  );
};
