import * as S from "./styles";

export const NarratorHowToUsePage = () => {
  return (
    <S.Container>
      <S.PageContainer>
        <S.Title>Como Usar o Aplicativo</S.Title>

        <S.ContentContainer>
          <S.Section>
            <S.SectionTitle>Visão Geral</S.SectionTitle>
            <S.SectionText>
              Este aplicativo foi desenvolvido para auxiliar na gestão de
              equipes de forma lúdica e motivacional, transformando atividades
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
              A página <strong>Missões</strong> é destinada à gestão de
              atividades opcionais para os colaboradores.
            </S.SectionText>
            <S.SectionSubtitle>Como funciona:</S.SectionSubtitle>
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

            <S.SectionSubtitle>Fluxo de Trabalho:</S.SectionSubtitle>
            <S.Workflow>
              <S.WorkflowStep>
                <S.StepNumber>1</S.StepNumber>
                <S.StepText>O gestor registra a missão no sistema</S.StepText>
              </S.WorkflowStep>
              <S.WorkflowStep>
                <S.StepNumber>2</S.StepNumber>
                <S.StepText>O colaborador realiza ou não a missão</S.StepText>
              </S.WorkflowStep>
              <S.WorkflowStep>
                <S.StepNumber>3</S.StepNumber>
                <S.StepText>Gestor avalia e aprova/reprova a missão</S.StepText>
              </S.WorkflowStep>
              <S.WorkflowStep>
                <S.StepNumber>4</S.StepNumber>
                <S.StepText>O colaborador acumula pontos de ouro</S.StepText>
              </S.WorkflowStep>
              <S.WorkflowStep>
                <S.StepNumber>5</S.StepNumber>
                <S.StepText>
                  Usar o ouro adquirido libera recompensas individuais
                </S.StepText>
              </S.WorkflowStep>
            </S.Workflow>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Página de Tarefas</S.SectionTitle>
            <S.SectionText>
              A página <strong>Tarefas</strong> gerencia atividades relacionadas
              diretamente à função do colaborador.
            </S.SectionText>
            <S.SectionSubtitle>Como funciona:</S.SectionSubtitle>
            <S.FeatureList>
              <li>São atividades obrigatórias da função</li>
              <li>Cadastradas pelo próprio colaborador ao concluir</li>
              <li>Requerem aprovação do gestor</li>
            </S.FeatureList>

            <S.SectionSubtitle>Recompensas:</S.SectionSubtitle>
            <S.FeatureList>
              <li>
                Aprovação gera recursos para prêmios em grupo (experiencia)
              </li>
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
                Aguardando validação e aprovação pelo gestor
              </li>
              <li>
                <S.StatusBadge $status="approved">Aprovado</S.StatusBadge> -
                Tarefa concluída e aprovada
              </li>
              <li>
                <S.StatusBadge $status="rejected">Reprovado</S.StatusBadge> -
                Tarefa não atendida
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
                <S.StepText>Gestor avalia e aprova/reprova a tarefa</S.StepText>
              </S.WorkflowStep>
              <S.WorkflowStep>
                <S.StepNumber>3</S.StepNumber>
                <S.StepText>
                  Equipe acumula pontos de experiencia para desafios coletivos
                </S.StepText>
              </S.WorkflowStep>
              <S.WorkflowStep>
                <S.StepNumber>4</S.StepNumber>
                <S.StepText>
                  Conclusão de desafios(chefes derrotados) libera recompensas
                  coletivas
                </S.StepText>
              </S.WorkflowStep>
            </S.Workflow>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Página de Prêmios Cadastrados</S.SectionTitle>
            <S.SectionText>
              A página <strong>Prêmios Cadastrados</strong> é destinada à gestão
              de possíveis recompensas para os colaboradores.
            </S.SectionText>
            <S.SectionSubtitle>Como funciona:</S.SectionSubtitle>
            <S.FeatureList>
              <li>
                Recompensas cadastradas pelo gestor de acordo com o orçamento
                disponível
              </li>
              <li>
                O gestor define tanto a recompensa quanto o custo e o baú
                necessário para liberá-la
              </li>
            </S.FeatureList>

            <S.SectionSubtitle>Recomendações:</S.SectionSubtitle>
            <S.FeatureList>
              <li>
                Defina as recompensas e a quantidade de cada recompensa
                disponível para o colaborador
              </li>
              <li>
                Cadastre as recompensas, lembrando de definir a quantidade
                disponível da mesma
              </li>
              <li>
                Coloque as recompensas em baús com valores proporcionais aos
                valores das recompensas disponíveis
              </li>
            </S.FeatureList>

            <S.SectionSubtitle>Fluxo de Trabalho:</S.SectionSubtitle>
            <S.Workflow>
              <S.WorkflowStep>
                <S.StepNumber>1</S.StepNumber>
                <S.StepText>
                  O gestor registra os baús disponíveis no sistema
                </S.StepText>
              </S.WorkflowStep>
              <S.WorkflowStep>
                <S.StepNumber>2</S.StepNumber>
                <S.StepText>
                  O gestor visualiza o baú, e então registra as recompensas
                  disponíveis nesse baú
                </S.StepText>
              </S.WorkflowStep>
              <S.WorkflowStep>
                <S.StepNumber>3</S.StepNumber>
                <S.StepText>
                  Ao acabar as recompensas, o baú pode ser desabilitado
                </S.StepText>
              </S.WorkflowStep>
              <S.WorkflowStep>
                <S.StepNumber>4</S.StepNumber>
                <S.StepText>
                  Caso o gestor reabasteça as recompensas, o baú pode ser
                  reabilitado
                </S.StepText>
              </S.WorkflowStep>
              <S.WorkflowStep>
                <S.StepNumber>5</S.StepNumber>
                <S.StepText>
                  O colaborador, ao abrir um baú, é registrado a recompensa
                  ganha na página "Prêmios Pendentes"
                </S.StepText>
              </S.WorkflowStep>
            </S.Workflow>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Página de Prêmios Pendentes</S.SectionTitle>
            <S.SectionText>
              A página <strong>Prêmios Pendentes</strong> é destinada à gestão
              de recompensas já ganhas pelo colaboradores, poŕem, que não foram
              entregues.
            </S.SectionText>
            <S.SectionSubtitle>Como funciona:</S.SectionSubtitle>
            <S.FeatureList>
              <li>O colaborador abre um baú e ganha uma recompensa</li>
              <li>O gestor entrega a recompensa ao colaborador</li>
            </S.FeatureList>

            <S.SectionSubtitle>Fluxo de Trabalho:</S.SectionSubtitle>
            <S.Workflow>
              <S.WorkflowStep>
                <S.StepNumber>1</S.StepNumber>
                <S.StepText>
                  O colaborador abre um baú e ganha uma recompensa
                </S.StepText>
              </S.WorkflowStep>
              <S.WorkflowStep>
                <S.StepNumber>2</S.StepNumber>
                <S.StepText>
                  O gestor visualiza a recompensa ganha pelo colaborador na tela
                </S.StepText>
              </S.WorkflowStep>
              <S.WorkflowStep>
                <S.StepNumber>3</S.StepNumber>
                <S.StepText>
                  O gestor realiza a entrega da recompensa ao colaborador
                </S.StepText>
              </S.WorkflowStep>
              <S.WorkflowStep>
                <S.StepNumber>4</S.StepNumber>
                <S.StepText>
                  O gestor marca a recompensa como entregue
                </S.StepText>
              </S.WorkflowStep>
            </S.Workflow>
          </S.Section>
        </S.ContentContainer>
      </S.PageContainer>
    </S.Container>
  );
};
