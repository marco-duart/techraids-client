import * as S from "./styles";

export const NarratorHowToUsePage = () => {
  return (
    <S.PageContainer>
      <S.Title>Como Usar o Aplicativo</S.Title>

      <S.ContentContainer>
        <S.Section>
          <S.SectionTitle>Visão Geral</S.SectionTitle>
          <S.SectionText>
            Este aplicativo foi desenvolvido para auxiliar na gestão de equipes
            de forma lúdica e motivacional, transformando atividades
            profissionais em missões e recompensas.
          </S.SectionText>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Página de Equipe</S.SectionTitle>
          <S.SectionText>
            Na página <strong>Equipe</strong>, você pode acompanhar todos os
            indicadores de performance da sua equipe.
          </S.SectionText>
          <S.FeatureList>
            <li>Visualize gráficos de desempenho individual e coletivo</li>
            <li>Acompanhe o progresso de cada colaborador</li>
            <li>Identifique pontos fortes e áreas de melhoria na equipe</li>
          </S.FeatureList>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Página de Missões</S.SectionTitle>
          <S.SectionText>
            A página <strong>Missões</strong> é destinada à gestão de atividades
            opcionais para os colaboradores.
          </S.SectionText>
          <S.SectionSubtitle>Como funcionam:</S.SectionSubtitle>
          <S.FeatureList>
            <li>
              Atividades designadas pelo gestor para desenvolvimento pessoal
            </li>
            <li>Totalmente opcionais para o colaborador</li>
            <li>
              Conclusão bem-sucedida gera recursos para prêmios individuais
              (Ouro)
            </li>
          </S.FeatureList>

          <S.SectionSubtitle>Recomendações:</S.SectionSubtitle>
          <S.FeatureList>
            <li>Designe missões alinhadas aos interesses do colaborador</li>
            <li>Foque em temas que precisam de desenvolvimento</li>
            <li>Mantenha um equilíbrio entre desafio e realização</li>
          </S.FeatureList>

          <S.SectionSubtitle>Status das Missões:</S.SectionSubtitle>
          <S.StatusList>
            <li>
              <S.StatusBadge $status="pending">Pendente</S.StatusBadge> -
              Aguardando conclusão pelo colaborador
            </li>
            <li>
              <S.StatusBadge $status="approved">Aprovado</S.StatusBadge> -
              Missão concluída com sucesso
            </li>
            <li>
              <S.StatusBadge $status="rejected">Reprovado</S.StatusBadge> -
              Missão não atendida
            </li>
          </S.StatusList>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Página de Tarefas</S.SectionTitle>
          <S.SectionText>
            A página <strong>Tarefas</strong> gerencia atividades relacionadas
            diretamente à função do colaborador.
          </S.SectionText>
          <S.SectionSubtitle>Diferença para Missões:</S.SectionSubtitle>
          <S.FeatureList>
            <li>São atividades obrigatórias da função</li>
            <li>Cadastradas pelo próprio colaborador ao concluir</li>
            <li>Requerem aprovação do gestor</li>
          </S.FeatureList>

          <S.SectionSubtitle>Recompensas:</S.SectionSubtitle>
          <S.FeatureList>
            <li>Aprovação gera recursos para prêmios em grupo (experiencia)</li>
            <li>
              Desafios (chefes derrotados) em equipe desbloqueiam recompensas
              coletivas
            </li>
            <li>Prêmios podem incluir lanches ou outras gratificações</li>
          </S.FeatureList>

          <S.SectionSubtitle>Status das Tarefas:</S.SectionSubtitle>
          <S.StatusList>
            <li>
              <S.StatusBadge $status="pending">Pendente</S.StatusBadge> -
              Aguardando conclusão pelo colaborador
            </li>
            <li>
              <S.StatusBadge $status="approved">Aprovado</S.StatusBadge> -
              Missão concluída com sucesso
            </li>
            <li>
              <S.StatusBadge $status="rejected">Reprovado</S.StatusBadge> -
              Missão não atendida
            </li>
          </S.StatusList>

          <S.SectionSubtitle>Fluxo de Trabalho:</S.SectionSubtitle>
          <S.Workflow>
            <S.WorkflowStep>
              <S.StepNumber>1</S.StepNumber>
              <S.StepText>
                Colaborador conclui tarefa e registra no sistema
              </S.StepText>
            </S.WorkflowStep>
            <S.WorkflowStep>
              <S.StepNumber>2</S.StepNumber>
              <S.StepText>Gestor avalia e aprova/reprova</S.StepText>
            </S.WorkflowStep>
            <S.WorkflowStep>
              <S.StepNumber>3</S.StepNumber>
              <S.StepText>
                Equipe acumula pontos para desafios coletivos
              </S.StepText>
            </S.WorkflowStep>
            <S.WorkflowStep>
              <S.StepNumber>4</S.StepNumber>
              <S.StepText>Conclusão de desafios libera recompensas</S.StepText>
            </S.WorkflowStep>
          </S.Workflow>
        </S.Section>
      </S.ContentContainer>
    </S.PageContainer>
  );
};
