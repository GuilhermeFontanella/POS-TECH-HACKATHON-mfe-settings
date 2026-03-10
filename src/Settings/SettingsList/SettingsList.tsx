import { Collapse, type CollapseProps } from 'antd';
import * as styles from './SettingsList.css';
import Options from './options/Options';
import { useUpdateSettings } from '../../hooks/useUpdateSettings';
import { useDispatch } from 'react-redux';
import { updateSetting } from '../../store/settingsSlice';
import { usePreferences } from '../../hooks/usePreferences';

const radioOptions = {
  field: 'complexityLevel',
  title: 'Nível de complexidade da interface',
  subtitle: 'Escolha o nível de complexidade da interface',
  fullText: `
  Ao selecionar o nível de complexidade da interface, 
  você define quanto detalhamento e quantas opções estarão visíveis durante o uso da aplicação. 
  Um nível mais simples apresenta apenas os elementos essenciais, tornando a navegação 
  mais rápida e intuitiva, ideal para quem prefere uma experiência limpa e direta. 
  Já níveis mais avançados exibem controles adicionais, informações complementares e funcionalidades extras, 
  proporcionando maior flexibilidade e personalização para usuários que precisam de controle total sobre 
  cada detalhe. Ajustar esse parâmetro permite equilibrar eficiência e profundidade, adaptando a interface 
  ao seu estilo de uso e à sua familiaridade com as ferramentas disponíveis.
  `,
  options: [
    { value: 1, label: 'Básico', complementaryText: 'Mostra somente as informações mais importantes. Ideal para quem prefere uma tela mais simples, com menos elementos e menos distrações.' },
    { value: 2, label: 'Comum', complementaryText: 'Mostra as informações essenciais para o uso diário do sistema. É um equilíbrio entre simplicidade e recursos disponíveis.' },
    { value: 3, label: 'Completo', complementaryText: 'Mostra todas as informações e funcionalidades disponíveis. Indicado para quem já está familiarizado com o sistema e deseja acessar todos os recursos.' },
  ]
}

const focusMode = {
  field: 'focusMode',
  title: 'Modo foco',
  subtitle: `
    O Modo Foco ajuda você a manter a concentração em uma tarefa por um período determinado de tempo. Quando ativado:
    As notificações são temporariamente desativadas.
    Alertas visuais e sonoros são reduzidos.
    Um contador de tempo é iniciado para organizar seu período de concentração.
    Esse modo pode ser utilizado com a técnica Pomodoro, que divide o tempo em blocos de foco (por exemplo, 25 minutos) seguidos de pequenas pausas.
    Ao final do tempo escolhido, as notificações são reativadas automaticamente.
    Você pode ativar ou desativar o Modo Foco sempre que desejar.
  `,
  options: [
    { value: true, label: 'Ligado' },
  ]
}

const alertMode = {
  field: 'cognitiveAlert',
  title: 'Alerta cognitivo',
  subtitle: `
    O Alerta Cognitivo ajuda você a perceber quando está há muito tempo na mesma tarefa.
    Quando ativado:
    O sistema acompanha o tempo que você permanece em uma atividade.
    Após um período prolongado, um aviso gentil é exibido.
    O alerta pode sugerir uma pausa ou a troca de tarefa.
    Esse recurso é útil para evitar cansaço mental e sobrecarga, ajudando você a manter um ritmo mais saudável de trabalho ou estudo.
    Você pode ativar ou desativar essa opção a qualquer momento.
  `,
  options: [
    { value: false, label: 'Ligado' },
  ]
}

const summaryMode = {
  field: '',
  title: 'Modo resumo / Modo detalhado',
  subtitle: `
    Você pode escolher como deseja visualizar as informações na tela.
    Modo Resumo
    Exibe as informações principais de forma simplificada e direta.
    Ideal para quem prefere uma visualização mais limpa, com menos detalhes e menos distrações.
    Modo Detalhado
    Exibe todas as informações disponíveis, incluindo dados complementares e explicações adicionais.
    Indicado para quem deseja uma análise mais completa do conteúdo.
    Você pode alterar o modo de visualização a qualquer momento.
  `,
  fullText: `
    Modo Resumo: a interface fica super enxuta, exibindo apenas o essencial. Botões perdem os labels, 
    elementos secundários são ocultados, e você consegue focar no que realmente importa sem distrações. 
    Ideal para quem prefere uma visão rápida e direta.
    Modo Padrão: mantém um equilíbrio entre simplicidade e detalhes. 
    Informações relevantes são destacadas, enquanto dados complementares ficam acessíveis sem poluir a tela. 
    É perfeito para quem quer produtividade sem perder contexto.
    Modo Detalhado: exibe todas as informações possíveis, incluindo dados complementares, explicações e estatísticas. 
    A interface é completa e rica em detalhes, indicada para quem deseja uma análise minuciosa e total controle 
    sobre o conteúdo.
    Você pode alternar entre os modos a qualquer momento, adaptando a experiência ao seu fluxo de trabalho.
  `,
  options: [
    { value: 1, label: 'Modo resumo', field: 'summaryMode' },
    { value: 2, label: 'Modo detalhado', field: 'detailedMode' },
    { value: 3, label: 'Modo padrão', field: 'defaultMode' },
  ],
  multiple: false
}

const inputNumber = {
  field: 'lineHeight',
  title: 'Espaçamento entre os elementos',
  subtitle: `
    Você pode ajustar o espaço entre textos, botões e outros elementos da tela.
    Aumentar o espaçamento pode:
    Facilitar a leitura
    Reduzir a sensação de tela “apertada”
    Melhorar a organização visual
    Diminuir o cansaço ao usar o sistema
    Você pode escolher o nível de espaçamento que for mais confortável para você.
    A alteração é aplicada automaticamente na interface.
  `,
  options: [
    { value: 1, label: 'Espaçamento entre os elementos' },
  ],
  multiple: false
}

const inputNumberTextSize = {
  field: 'fontSize',
  title: 'Tamanho da fonte',
  subtitle: `
    Você pode ajustar o tamanho do texto exibido na tela.
    Aumentar o texto pode:
    Facilitar a leitura
    Reduzir o esforço visual
    Melhorar a compreensão do conteúdo
    Tornar a navegação mais confortável
    As alterações são aplicadas automaticamente e você pode modificar essa opção sempre que precisar.
  `,
  options: [
    { value: 1, label: 'Tamanho da fonte' },
  ],
  multiple: false
}

const SettingsList = () => {
  const { preferences } = usePreferences();
  const dispatch = useDispatch();
  const updateSettings = useUpdateSettings();

  const handleValueChange = (data: any) => {
    const payload: any = {
      [data.field]: data.value
    }
    updateSettings.mutate(payload);

    dispatch(updateSetting(payload));
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Nível de complexidade da interface',
      children: <Options optionType='radio' data={radioOptions} onChangeValue={handleValueChange} defaultValue={preferences.complexityLevel} />,
    },
    {
      key: '2',
      label: 'Modo resumo / Modo detalhado',
      children: <Options optionType='switch' data={summaryMode} onChangeValue={handleValueChange} />,
    },
    {
      key: '3',
      label: 'Espaçamento entre os elementos',
      children: <Options optionType='inputNumber' data={inputNumber} onChangeValue={handleValueChange} defaultValue={preferences.lineHeight} />,
    },
    {
      key: '4',
      label: 'Tamanho da fonte',
      children: <Options optionType='inputNumber' data={inputNumberTextSize} onChangeValue={handleValueChange} defaultValue={preferences.fontSize} />,
    },
    {
      key: '5',
      label: 'Alerta cognitivo',
      children: <Options optionType='switch' data={alertMode} onChangeValue={handleValueChange} defaultValue={preferences.cognitiveAlert} />,
    },
    {
      key: '6',
      label: 'Modo foco',
      children: <Options optionType='switch' data={focusMode} onChangeValue={handleValueChange} defaultValue={preferences.focusMode} />,
    },
  ];

  const setStyle = () => {
    return {
        fontSize: `${preferences.fontSize}px`,
        lineHeight: `${preferences.lineHeight}px`,
        width: '100%',
    }
  }

  return (
    <div className={styles.list}>
      <Collapse style={setStyle()} accordion items={items} />
    </div>
  );
}

export default SettingsList;