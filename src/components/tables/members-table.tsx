import { IGetPerformanceReport } from "../../services/performance-report/DTO";
import * as S from "./styles";

export const MembersTable = ({
  performanceReports,
}: {
  performanceReports: IGetPerformanceReport.Response | undefined;
}) => {
  return (
    <S.MembersTable>
      <h2>Detalhes por Membro</h2>
      <table>
        <thead>
          <tr>
            <th>Membro</th>
            <th>Tarefas</th>
            <th>Missões</th>
            <th>Desempenho</th>
          </tr>
        </thead>
        <tbody>
          {performanceReports?.report.map((member) => (
            <tr key={member.character_id}>
              <td>{member.name}</td>
              <td>
                <S.ProgressBar>
                  <S.ProgressFill
                    $percentage={member.tasks.completion_rate}
                    $color="pending"
                  />
                  <span>{member.tasks.completion_rate}%</span>
                </S.ProgressBar>
                <S.StatusDetails>
                  Aprovadas: {member.tasks.approved} | Rejeitadas:{" "}
                  {member.tasks.rejected} | Pendentes: {member.tasks.pending}
                </S.StatusDetails>
              </td>
              <td>
                <S.ProgressBar>
                  <S.ProgressFill
                    $percentage={member.missions.completion_rate}
                    $color="approved"
                  />
                  <span>{member.missions.completion_rate}%</span>
                </S.ProgressBar>
                <S.StatusDetails>
                  Aprovadas: {member.missions.approved} | Rejeitadas:{" "}
                  {member.missions.rejected} | Pendentes:{" "}
                  {member.missions.pending}
                </S.StatusDetails>
              </td>
              <td>
                <S.PerformanceScore $score={member.overall_performance}>
                  {member.overall_performance.toFixed(1)}
                </S.PerformanceScore>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </S.MembersTable>
  );
};
