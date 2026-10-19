(() => {
  if (PLAN.totalQuestions >= 3500) return;

  const A = ["A","B","C","D","E"];
  let seed = 20261019 >>> 0;
  const rnd = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
  const shuffle = (arr) => {
    arr = arr.slice();
    for (let i=arr.length-1;i>0;i--) {
      const j=Math.floor(rnd()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  };
  const pick = (arr,n) => shuffle(arr).slice(0,n);
  const subjectName = {
    "Português":"Língua Portuguesa","Inglês":"Língua Inglesa",
    "Sistemas de Informação":"Administração de Sistemas de Informação",
    "ESG":"Sustentabilidade e ESG",
    "Governança e Riscos":"Governança, Compliance e Gestão de Riscos",
    "Contratação":"Contratação"
  };
  let seq=0;
  function makeQ(theme,subtopic,stem,correct,distractors,explanation){
    seq++;
    let vals=[correct].concat(distractors).filter((x,i,a)=>a.indexOf(x)===i);
    const fillers=["conceito não compatível com o enunciado","aplicação pertencente a outro conteúdo","afirmação incompatível com a definição","relação que não corresponde ao tema","procedimento distinto do solicitado"];
    for(const f of fillers) if(vals.length<5&&!vals.includes(f)) vals.push(f);
    vals=shuffle(vals.slice(0,5));
    return {
      id:"EXP3500-"+String(seq).padStart(4,"0"),date:"2026-10-19",weekday:"Segunda-feira",
      subject:subjectName[theme]||theme,content:subtopic,number:seq,question:stem,options:vals,
      answer:A[vals.indexOf(correct)],theme,mapped:"Questão autoral — cobertura do Edital 4",
      source:"Questão autoral para estudo, baseada no conteúdo programático do Edital 4 — Ênfase 1 Administração",
      canonicalTheme:theme,planDate:"RESERVA",planOrder:9999,dailyTarget:0,planTheme:theme,
      explanation,fullExplanation:explanation
    };
  }

  const additions=[];

  const SI=[
    ["SPT","registrar e processar transações rotineiras e de grande volume no nível operacional"],
    ["SIG","consolidar dados operacionais em relatórios e indicadores para acompanhamento gerencial"],
    ["SAD","combinar dados e modelos analíticos para apoiar decisões semiestruturadas"],
    ["ERP","integrar processos e dados de diferentes áreas em uma plataforma comum"],
    ["Business Intelligence","transformar dados em análises, painéis e indicadores úteis à decisão"],
    ["Data warehouse","armazenar dados integrados e históricos voltados principalmente à análise"],
    ["Banco de dados","organizar dados de forma estruturada para consulta, atualização e uso por sistemas"],
    ["Dado","representar um registro bruto ainda sem interpretação suficiente para decisão"],
    ["Informação","representar dados processados e contextualizados que reduzem incerteza"],
    ["Conhecimento","combinar informação, experiência e interpretação para orientar ação"],
    ["Feedback","usar informação de retorno para comparar resultados e corrigir desvios"],
    ["Dimensão organizacional dos SI","considerar processos, estrutura, pessoas e cultura na utilização da tecnologia"],
    ["Dimensão humana dos SI","considerar competências, comportamento e uso efetivo da informação pelas pessoas"],
    ["Dimensão tecnológica dos SI","envolver hardware, software, dados, redes e infraestrutura"],
    ["Sistema operacional","dar suporte às atividades repetitivas e transacionais do dia a dia"],
    ["Sistema estratégico","apoiar decisões e iniciativas com impacto competitivo e de longo prazo"],
    ["Qualidade da informação","combinar precisão, relevância, atualidade e completude"],
    ["Integração de sistemas","permitir fluxo consistente de dados entre processos, áreas e aplicações"],
    ["Automação de processos","usar tecnologia para executar etapas repetitivas com menor intervenção manual"],
    ["Governança de TI","alinhar tecnologia aos objetivos organizacionais, riscos e geração de valor"]
  ];
  for(let i=0;i<60;i++){
    const [c,d]=SI[i%SI.length], others=SI.filter(x=>x[0]!==c);
    const mode=i%3;
    if(mode===1) additions.push(makeQ("Sistemas de Informação",c,
      "Uma organização pretende "+d+". O conceito que melhor representa essa finalidade é",c,pick(others.map(x=>x[0]),4),
      c+" corresponde a "+d+". Em Sistemas de Informação, é importante distinguir a finalidade operacional, gerencial, analítica, integradora ou estratégica de cada recurso."));
    else additions.push(makeQ("Sistemas de Informação",c,
      "Em Sistemas de Informação, assinale a alternativa que caracteriza corretamente "+c+".",d,pick(others.map(x=>x[1]),4),
      c+" corresponde a "+d+". A classificação correta depende da finalidade, do nível de decisão apoiado e da forma como dados e processos são tratados."));
  }

  const ESG=[
    ["Dimensão ambiental do ESG","impactos sobre clima, energia, água, emissões, resíduos, recursos naturais e biodiversidade"],
    ["Dimensão social do ESG","relações com empregados, comunidades, direitos humanos, diversidade, saúde e segurança"],
    ["Dimensão de governança do ESG","ética, controles, transparência, estrutura decisória e prestação de contas"],
    ["Stakeholder","pessoa, grupo ou organização que pode afetar ou ser afetado pelas atividades da empresa"],
    ["Materialidade","identificação dos temas de sustentabilidade mais relevantes para decisões e impactos da organização"],
    ["Ecoeficiência","geração de maior valor com menor consumo de recursos e menor impacto ambiental"],
    ["Economia circular","manutenção de materiais, componentes e produtos em uso, reduzindo desperdício e descarte"],
    ["Pegada de carbono","quantificação de emissões de gases de efeito estufa associadas a uma atividade ou organização"],
    ["Indicador ambiental","medida usada para acompanhar consumo, emissões, resíduos, efluentes ou outro aspecto ambiental"],
    ["Gestão ambiental","planejamento, controle e melhoria sistemática dos aspectos e impactos ambientais"],
    ["Relatório de sustentabilidade","comunicação estruturada do desempenho e dos compromissos ambientais, sociais e de governança"],
    ["Risco climático","possibilidade de impactos físicos ou de transição associados às mudanças climáticas"],
    ["Eficiência energética","redução do consumo de energia para produzir o mesmo ou maior nível de resultado"],
    ["Gestão de resíduos","prevenção, redução, segregação, tratamento, recuperação e destinação adequada de resíduos"],
    ["Licença social para operar","aceitação e confiança das comunidades e partes interessadas em relação à atuação da organização"],
    ["Greenwashing","divulgação ambiental que exagera, distorce ou não comprova adequadamente atributos sustentáveis"],
    ["Desenvolvimento sustentável","atendimento das necessidades presentes sem comprometer a capacidade das futuras gerações"]
  ];
  for(let i=0;i<50;i++){
    const [c,d]=ESG[i%ESG.length], others=ESG.filter(x=>x[0]!==c);
    const mode=i%2;
    additions.push(mode===0
      ? makeQ("ESG",c,"No contexto de Sustentabilidade e ESG, "+c+" corresponde a",d,pick(others.map(x=>x[1]),4),c+" refere-se a "+d+". O conceito deve ser relacionado à dimensão ambiental, social ou de governança e ao tipo de impacto ou mecanismo de gestão envolvido.")
      : makeQ("ESG",c,"Uma organização pretende tratar especificamente de "+d+". O conceito aplicável é",c,pick(others.map(x=>x[0]),4),c+" refere-se a "+d+". A identificação correta evita confundir indicadores, práticas, riscos e dimensões do ESG."));
  }

  const GOV=[
    ["Governança corporativa","sistema pelo qual a organização é dirigida, monitorada e incentivada, com papéis e mecanismos de supervisão"],
    ["Transparência","disponibilização clara, tempestiva e relevante de informações às partes interessadas"],
    ["Equidade","tratamento justo e isonômico das partes interessadas"],
    ["Accountability","dever de prestar contas, explicar decisões e assumir responsabilidade pelas consequências"],
    ["Compliance","práticas para promover conformidade com leis, regulamentos, normas internas e padrões éticos"],
    ["Programa de integridade","estrutura de prevenção, detecção e resposta a desvios com políticas, treinamento, controles e canais"],
    ["Risco","efeito da incerteza sobre objetivos"],
    ["Identificação de riscos","reconhecimento de eventos, condições e fontes de incerteza capazes de afetar objetivos"],
    ["Avaliação de riscos","análise de probabilidade, impacto e relevância para priorizar tratamento"],
    ["Risco inerente","nível de risco antes da consideração dos controles e respostas"],
    ["Risco residual","nível de risco remanescente após controles e respostas"],
    ["Apetite a risco","quantidade e tipo de risco que a organização está disposta a assumir"],
    ["Tolerância a risco","limite aceitável de variação em torno de objetivos ou níveis definidos"],
    ["Evitar risco","eliminar a atividade ou condição que origina determinada exposição"],
    ["Mitigar risco","reduzir probabilidade ou impacto por meio de controles e ações"],
    ["Transferir risco","compartilhar ou deslocar parte das consequências para terceiros"],
    ["Aceitar risco","manter a exposição sem tratamento adicional quando estiver dentro dos limites definidos"],
    ["Controle preventivo","controle projetado para impedir que uma falha ou irregularidade ocorra"],
    ["Controle detectivo","controle destinado a identificar falhas ou irregularidades ocorridas ou em curso"]
  ];
  for(let i=0;i<38;i++){
    const [c,d]=GOV[i%GOV.length], others=GOV.filter(x=>x[0]!==c);
    additions.push(i%2===0
      ? makeQ("Governança e Riscos",c,"Em Governança, Compliance e Riscos, assinale a alternativa que melhor define "+c+".",d,pick(others.map(x=>x[1]),4),c+" corresponde a "+d+". Na prova, diferencie conceitos próximos, especialmente risco inerente e residual, apetite e tolerância, respostas a riscos e tipos de controle.")
      : makeQ("Governança e Riscos",c,"A descrição '"+d+"' corresponde a qual conceito?",c,pick(others.map(x=>x[0]),4),c+" corresponde a "+d+". O ponto central é identificar a função específica do mecanismo dentro da governança e da gestão de riscos."));
  }

  const CONTR=[
    ["Dispensa de licitação","há hipótese legal em que a competição seria possível, mas a lei autoriza contratação direta"],
    ["Inexigibilidade","a contratação direta decorre da inviabilidade de competição"],
    ["Modo de disputa aberto","os licitantes apresentam lances públicos e sucessivos conforme as regras do procedimento"],
    ["Modo de disputa fechado","as propostas permanecem sigilosas até o momento definido para divulgação"],
    ["Menor preço","o julgamento prioriza o menor dispêndio, observadas as exigências do objeto e do edital"],
    ["Maior desconto","o julgamento utiliza o maior percentual de desconto sobre referência previamente estabelecida"],
    ["Melhor técnica","o julgamento privilegia a qualidade técnica segundo critérios previamente definidos"],
    ["Técnica e preço","o julgamento combina avaliação técnica e componente de preço conforme ponderação prevista"],
    ["Matriz de riscos","cláusula que distribui entre as partes responsabilidades por eventos supervenientes relacionados ao contrato"],
    ["Contratação integrada","regime em que o contratado assume conjunto mais amplo de responsabilidades de projeto e execução"],
    ["Contratação semi-integrada","regime que combina projeto básico fornecido com responsabilidades do contratado sobre desenvolvimento e execução"],
    ["Sobrepreço","preço orçado ou contratado expressivamente superior aos referenciais aplicáveis"],
    ["Superfaturamento","dano ao patrimônio decorrente de pagamento, medição ou execução incompatível com o devido"],
    ["Planejamento da contratação","estruturação prévia da necessidade, objeto, requisitos, riscos e condições de execução"],
    ["Publicidade","princípio que favorece transparência dos atos, ressalvadas hipóteses legais de sigilo"],
    ["Isonomia","tratamento igualitário entre os participantes sem favorecimentos incompatíveis com as regras"],
    ["Regularidade fiscal de ME/EPP","tratamento diferenciado da comprovação de regularidade fiscal para fins de contratação, nos termos da LC 123"],
    ["Empate ficto para ME/EPP","mecanismo de preferência que permite exercício de direito de apresentar proposta mais vantajosa quando presentes os requisitos legais"],
    ["Tratamento favorecido a ME/EPP","medidas da LC 123 destinadas a ampliar participação e competitividade de micro e pequenas empresas"],
    ["Gestão contratual","acompanhamento da execução, obrigações, riscos, prazos, alterações e resultados do contrato"]
  ];
  for(let i=0;i<20;i++){
    const [c,d]=CONTR[i], others=CONTR.filter(x=>x[0]!==c);
    additions.push(makeQ("Contratação",c,
      "Considerando os temas de contratação previstos para a Ênfase 1, assinale a alternativa que caracteriza corretamente "+c+".",
      d,pick(others.map(x=>x[1]),4),
      c+" é caracterizado por: "+d+". A distinção é relevante para interpretar questões sobre a Lei 13.303/2016 e o tratamento favorecido da LC 123/2006."));
  }

  const ptPrompts=[
    "Assinale a alternativa correta segundo a norma-padrão.",
    "Em redação formal, assinale a construção adequada.",
    "Considerando a norma-padrão, marque a alternativa correta.",
    "Em um relatório administrativo, qual alternativa está corretamente redigida?",
    "Assinale a opção compatível com a norma culta escrita."
  ];

  const REL=[
    ["embora","concessão","Embora o prazo fosse curto, a equipe concluiu a análise."],
    ["porque","causa","O relatório foi revisado porque havia inconsistências nos dados."],
    ["portanto","conclusão","Os custos aumentaram; portanto, o orçamento precisou ser revisto."],
    ["se","condição","Se os dados forem confiáveis, a decisão será mais segura."],
    ["para que","finalidade","A equipe documentou o processo para que futuras auditorias fossem facilitadas."],
    ["quando","tempo","Quando o fornecedor confirmou a entrega, o planejamento foi atualizado."],
    ["conforme","conformidade","O procedimento foi executado conforme as orientações internas."],
    ["à medida que","proporção","À medida que a demanda crescia, a capacidade era ampliada."],
    ["ainda que","concessão","Ainda que existam riscos, o projeto pode ser viável."],
    ["por isso","conclusão","A previsão foi revisada; por isso, o plano de compras foi ajustado."]
  ];
  const relOpts=["causa","conclusão","condição","concessão","finalidade","tempo","conformidade","proporção"];
  for(let i=0;i<80;i++){
    const [c,r,s]=REL[i%REL.length];
    additions.push(makeQ("Português","Conjunções e relações semânticas",
      'Na frase "'+s+'", a expressão "'+c+'" estabelece predominantemente relação de',r,pick(relOpts.filter(x=>x!==r),4),
      'No período apresentado, "'+c+'" estabelece relação de '+r+'. O valor semântico do conectivo decorre da relação lógica entre as orações.'));
  }

  const CRASE_OK=[
    ["Chegou à unidade às oito horas.","Há crase porque ocorre preposição a mais artigo feminino; em “às oito horas”, trata-se de expressão de horário."],
    ["Referiu-se à proposta aprovada.","“Referir-se” rege preposição a e “proposta” admite artigo feminino."],
    ["Dirigiu-se àquela equipe.","A preposição a se funde ao a inicial do pronome demonstrativo “aquela”."],
    ["Entregou o documento à gerente responsável.","O complemento admite preposição a e artigo feminino."],
    ["A reunião ocorrerá à tarde.","A locução adverbial feminina “à tarde” recebe crase."],
    ["Voltaremos à cidade na próxima semana.","O verbo rege a preposição a e o substantivo determinado admite artigo."],
    ["Fez referência às normas internas.","A regência nominal exige preposição a e o substantivo plural admite artigo as."],
    ["O relatório foi encaminhado à diretoria.","A preposição exigida combina-se com o artigo feminino de “diretoria”."],
    ["A equipe ficou à disposição da auditoria.","A locução “à disposição” recebe crase."],
    ["A decisão foi comunicada às áreas interessadas.","O complemento recebe preposição a e artigo plural as."]
  ];
  const CRASE_BAD=["Começou à trabalhar cedo.","Entregou o relatório à uma analista.","Foi à pé até o prédio.","Referiu-se à homens experientes.","Chegou à Brasília ontem.","O documento será enviado à partir de amanhã.","A equipe estava disposta à colaborar.","O gerente falou à respeito do projeto."];
  for(let i=0;i<50;i++){
    const [ok,ex]=CRASE_OK[i%CRASE_OK.length];
    additions.push(makeQ("Português","Crase",ptPrompts[i%ptPrompts.length]+" Tema: emprego da crase.",ok,pick(CRASE_BAD,4),ex));
  }

  const AGR_OK=[
    ["Devem existir alternativas viáveis.","“Existir” é verbo pessoal e concorda com o sujeito plural."],
    ["Houve mudanças importantes no processo.","“Haver”, no sentido de existir, é impessoal e fica no singular."],
    ["Faz dois meses que o projeto começou.","“Fazer”, indicando tempo decorrido, é impessoal e fica no singular."],
    ["A maioria dos analistas aprovou a proposta.","A concordância no singular com o núcleo “maioria” é adequada."],
    ["Os relatórios e as planilhas foram revisados.","O particípio concorda com o sujeito composto no plural."],
    ["É necessária a atualização do cadastro.","O adjetivo concorda com o substantivo determinado por artigo."],
    ["Seguem anexos os documentos solicitados.","“Anexos” concorda com “documentos”."],
    ["Existem riscos que precisam ser monitorados.","“Existir” concorda com o sujeito plural “riscos”."],
    ["Mais de um candidato apresentou recurso.","Com “mais de um”, em regra, o verbo fica no singular."],
    ["Cerca de vinte empregados participaram da reunião.","O verbo concorda com o núcleo plural da expressão quantitativa."]
  ];
  const AGR_BAD=["Houveram mudanças importantes no processo.","Fazem dois meses que o projeto começou.","Deve existir alternativas viáveis.","Segue anexo as planilhas solicitadas.","É necessário a atualização do cadastro.","Existe riscos relevantes no projeto.","Os relatório foram revisado ontem.","A equipe e o gerente aprovou o plano."];
  for(let i=0;i<60;i++){
    const [ok,ex]=AGR_OK[i%AGR_OK.length];
    additions.push(makeQ("Português","Concordância verbal e nominal",ptPrompts[(i+1)%ptPrompts.length]+" Tema: concordância.",ok,pick(AGR_BAD,4),ex));
  }

  const REG_OK=[
    ["A equipe obedeceu ao procedimento interno.","“Obedecer” rege a preposição a."],
    ["Os gestores assistiram à apresentação.","No sentido de ver/presenciar, “assistir” rege preposição a."],
    ["A empresa visa à melhoria contínua.","No sentido de almejar, “visar” rege preposição a."],
    ["O analista aspirava ao cargo de gerente.","No sentido de desejar, “aspirar” rege preposição a."],
    ["A mudança implicou aumento de custos.","No sentido de acarretar, “implicar” é transitivo direto."],
    ["Prefiro planejamento a improvisação.","A construção recomendada é “preferir X a Y”."],
    ["O gerente informou a decisão à equipe.","“Informar” admite a estrutura informar algo a alguém."],
    ["Ela se lembrou do prazo contratual.","Na forma pronominal, “lembrar-se” rege preposição de."],
    ["A decisão agradou aos investidores.","No sentido de satisfazer, “agradar” rege preposição a."],
    ["O relatório se refere aos riscos operacionais.","“Referir-se” rege preposição a."]
  ];
  const REG_BAD=["A equipe obedeceu o procedimento interno.","Os gestores assistiram a apresentação.","A empresa visa a melhoria contínua.","Prefiro mais planejamento do que improvisação.","A mudança implicou em aumento de custos.","Ela se lembrou o prazo contratual.","A decisão agradou os investidores.","O relatório se refere os riscos operacionais."];
  for(let i=0;i<50;i++){
    const [ok,ex]=REG_OK[i%REG_OK.length];
    additions.push(makeQ("Português","Regência verbal e nominal",ptPrompts[(i+2)%ptPrompts.length]+" Tema: regência.",ok,pick(REG_BAD,4),ex));
  }

  const PRO_OK=[
    ["Não se divulgaram os dados sigilosos.","A palavra negativa atrai o pronome: próclise."],
    ["Sempre se analisam os riscos antes da decisão.","O advérbio favorece a próclise."],
    ["Quem lhe informou a mudança?","O pronome interrogativo atrai o pronome oblíquo."],
    ["Disseram-me que o prazo seria mantido.","No início de oração, a ênclise é adequada na norma formal."],
    ["Nunca nos comunicaram essa alteração.","O advérbio negativo atrai o pronome."],
    ["Quando se encerrou a reunião, todos saíram.","A conjunção subordinativa favorece a próclise."],
    ["Entregaram-lhe o relatório ontem.","Sem palavra atrativa, a ênclise é possível."],
    ["Talvez se reveja a decisão.","O advérbio “talvez” favorece a próclise."]
  ];
  const PRO_BAD=["Não divulgaram-se os dados sigilosos.","Sempre analisam-se os riscos.","Quem informou-lhe a mudança?","Me disseram que o prazo seria mantido.","Nunca comunicaram-nos essa alteração.","Quando encerrou-se a reunião, todos saíram."];
  for(let i=0;i<40;i++){
    const [ok,ex]=PRO_OK[i%PRO_OK.length];
    additions.push(makeQ("Português","Colocação pronominal",ptPrompts[(i+3)%ptPrompts.length]+" Tema: colocação pronominal.",ok,pick(PRO_BAD,4),ex));
  }

  const PUN_OK=[
    ["A equipe analisou custos, prazos e riscos.","A vírgula separa elementos coordenados de uma enumeração."],
    ["Após a reunião, o gerente revisou o cronograma.","A vírgula isola adjunto adverbial deslocado."],
    ["O relatório, que foi revisado ontem, será publicado hoje.","As vírgulas isolam uma oração explicativa."],
    ["Se houver atraso, o planejamento será revisto.","A vírgula separa a oração subordinada adverbial anteposta."],
    ["Carlos, responsável pelo projeto, apresentou os resultados.","As vírgulas isolam o aposto explicativo."],
    ["Os dados foram conferidos; o relatório, porém, ainda não foi liberado.","O ponto e vírgula separa orações relacionadas e “porém” fica isolado."],
    ["Em 2026, a empresa ampliou sua capacidade de análise.","O adjunto adverbial temporal deslocado pode ser isolado por vírgula."],
    ["A decisão foi técnica, transparente e fundamentada.","As vírgulas organizam a enumeração de qualificadores."]
  ];
  const PUN_BAD=["Os gestores, avaliaram o projeto.","A equipe revisou, o orçamento.","O relatório que, foi revisado ontem será publicado.","Se houver atraso o planejamento, será revisto.","Carlos responsável pelo projeto apresentou, os resultados.","A decisão, foi técnica transparente e fundamentada."];
  for(let i=0;i<50;i++){
    const [ok,ex]=PUN_OK[i%PUN_OK.length];
    additions.push(makeQ("Português","Pontuação",ptPrompts[(i+4)%ptPrompts.length]+" Tema: pontuação.",ok,pick(PUN_BAD,4),ex));
  }

  const PTXT=[
    ["A empresa reduziu o prazo de reposição sem elevar o estoque de segurança. Para isso, integrou dados de demanda aos fornecedores e revisou rotinas de compra.","A integração de informações com fornecedores contribuiu para reduzir o prazo de reposição.","A redução do prazo decorreu de mudanças na gestão da informação e das compras."],
    ["O relatório destacou que a queda de custos não decorreu de cortes indiscriminados, mas da eliminação de retrabalhos e da padronização de processos.","A redução de custos foi associada à melhoria de processos.","O texto rejeita a ideia de que qualquer corte de gasto produza eficiência."],
    ["Embora o projeto apresentasse retorno atrativo, a diretoria decidiu reavaliar os riscos antes da aprovação final.","A atratividade financeira não eliminou a necessidade de avaliar riscos.","Retorno e risco devem ser analisados conjuntamente."],
    ["Os indicadores mostraram melhora no atendimento. Ainda assim, o número de reclamações permaneceu acima da meta.","Houve melhora, mas o resultado ainda não atingiu completamente o objetivo.","“Ainda assim” introduz contraste."],
    ["A nova plataforma concentrou informações antes dispersas em diferentes sistemas. Como consequência, diminuiu o tempo gasto na consolidação manual de dados.","A integração reduziu esforço manual de consolidação.","O benefício descrito está ligado à integração de informações."],
    ["O treinamento não foi concebido apenas para transmitir normas. Seu objetivo principal era desenvolver capacidade de julgamento em situações não padronizadas.","O treinamento buscou desenvolver competência decisória em situações menos estruturadas.","“Seu” retoma “treinamento”."],
    ["A organização passou a divulgar metas ambientais e resultados alcançados. A medida ampliou a transparência e permitiu acompanhar a evolução dos indicadores.","A divulgação favoreceu transparência e monitoramento.","O segundo período apresenta consequências da medida."],
    ["A equipe adotou reuniões curtas e frequentes. Em vez de esperar o encerramento do projeto, passou a incorporar feedback ao longo da execução.","O processo passou a usar ciclos frequentes de feedback.","A mudança aproxima a gestão de uma lógica iterativa."],
    ["O estoque elevado reduzia o risco de falta de material, porém aumentava custos de armazenagem e capital imobilizado.","A política de estoque envolve equilíbrio entre disponibilidade e custo.","“Porém” introduz oposição."],
    ["A pesquisa revelou que clientes valorizavam rapidez e previsibilidade mais do que uma ampla variedade de opções.","Os atributos mais valorizados foram rapidez e previsibilidade.","O resultado pode orientar proposta de valor e posicionamento."],
    ["A empresa identificou que decisões baseadas apenas em experiências recentes superestimavam certos riscos.","Experiências facilmente lembradas influenciavam a percepção de risco.","A situação é compatível com heurística da disponibilidade."],
    ["O orçamento foi revisto após a atualização das premissas de inflação e volume. A alteração não decorreu de erro aritmético.","A revisão ocorreu porque mudaram premissas do planejamento.","O texto distingue mudança de premissa de erro de cálculo."],
    ["A diretoria preferiu adiar a expansão até que houvesse maior clareza sobre a demanda.","A decisão foi condicionada à redução da incerteza sobre a demanda.","A expressão delimita condição temporal."],
    ["Os dados de vendas cresceram, mas a margem caiu devido ao aumento dos custos variáveis.","O aumento das vendas não garantiu aumento da margem.","Volume e rentabilidade podem evoluir de forma diferente."],
    ["A organização adotou um canal de denúncias independente e procedimentos de apuração documentados.","As medidas fortalecem integridade e compliance.","O texto descreve instrumentos de detecção e resposta a desvios."],
    ["O fornecedor ofereceu preço menor, mas prazo significativamente maior. A decisão final considerou o custo total e o impacto operacional.","A escolha não foi baseada apenas no preço de aquisição.","O texto adota uma visão de custo total."],
    ["O painel apresentava dezenas de indicadores, porém poucos eram usados nas reuniões de decisão.","Ter muitos indicadores não garante uso gerencial efetivo.","O problema envolve relevância e utilização da informação."],
    ["A equipe documentou o aprendizado obtido no projeto e transformou parte da experiência em procedimentos.","Houve conversão de conhecimento experiencial em conhecimento formalizado.","A documentação ajuda a preservar conhecimento."],
    ["A campanha digital gerou muitos acessos, mas baixa conversão em vendas.","Tráfego elevado não implica necessariamente conversão elevada.","Os resultados exigem avaliar diferentes etapas do funil."]
  ];
  const ptBad=["o texto afirma que preço é sempre o único critério relevante","a organização abandonou completamente o planejamento","os resultados eliminam toda incerteza","indicadores quantitativos são desnecessários","não há relação entre as variáveis descritas"];
  for(let i=0;i<57;i++){
    const [p,main,inf]=PTXT[Math.floor(i/3)%PTXT.length], mode=i%3;
    const corr=mode===1?inf:main;
    const stem=mode===0?'Leia o trecho: "'+p+'" A ideia central é que':mode===1?'Com base no trecho "'+p+'", é possível inferir que':'No trecho "'+p+'", assinale a interpretação coerente.';
    additions.push(makeQ("Português","Interpretação e coesão textual",stem,corr,pick(ptBad,4),"A interpretação correta é: "+corr+" Ela decorre das informações explícitas e das relações de causa, contraste, condição ou consequência presentes no texto."));
  }

  const CONN=[
    ["however","contrast","The costs increased. However, the project remained profitable."],
    ["because","cause","The schedule changed because the supplier delayed the shipment."],
    ["therefore","result/conclusion","Demand increased; therefore, production was expanded."],
    ["although","contrast/concession","Although the deadline was short, the team completed the task."],
    ["if","condition","If the data are reliable, the decision will be safer."],
    ["so that","purpose","The team documented the process so that future audits could be easier."],
    ["moreover","addition","The system reduced errors; moreover, it improved traceability."],
    ["while","contrast","Sales increased, while profit margins decreased."],
    ["unless","condition","The project will continue unless a critical risk occurs."],
    ["consequently","result/conclusion","The lead time fell; consequently, less safety stock was required."]
  ];
  const enRel=["contrast","cause","result/conclusion","condition","purpose","addition","time"];
  for(let i=0;i<80;i++){
    const [w,r,s]=CONN[i%CONN.length];
    additions.push(makeQ("Inglês","Connectors and discourse relations",
      'In the sentence "'+s+'", the word/expression "'+w+'" mainly expresses',r,pick(enRel.filter(x=>x!==r),4),
      '"'+w+'" expresses '+r+' in this context. Connectors show the logical relationship between clauses.'));
  }

  const TENSE=[
    ["The managers ___ the report yesterday.","reviewed",["review","reviews","have reviewed","will review"],"Simple Past is used because “yesterday” refers to a finished time in the past."],
    ["The company ___ its inventory this year.","has reduced",["reduced yesterday","reduce","will reducing","had reduce"],"Present Perfect connects a past action/result with the present and is compatible with an unfinished time period such as “this year”."],
    ["If the supplier reduces the lead time, the company ___ less safety stock.","will need",["needed","would needed","needs yesterday","has need"],"First Conditional uses if + Simple Present and will + base verb for a real or possible future condition."],
    ["If demand were more stable, the company ___ less safety stock.","would hold",["will held","holds yesterday","has hold","held tomorrow"],"Second Conditional uses if + Simple Past and would + base verb for a hypothetical situation."],
    ["The team ___ the contract now.","is reviewing",["reviewed yesterday","reviews every year","will reviewed","has review"],"Present Continuous describes an action in progress now."],
    ["By the time the meeting started, the analyst ___ the report.","had finished",["finishes","will finish","has finishing","finish"],"Past Perfect shows an action completed before another past event."],
    ["The system ___ thousands of transactions every day.","processes",["processed now","will processed","is process","has processing"],"Simple Present is appropriate for routines, facts and recurring activities."],
    ["The company ___ the results next week.","will publish",["published yesterday","publishing","has publish","publish last week"],"Will + base verb can express a future event or prediction."]
  ];
  for(let i=0;i<80;i++){
    const [s,c,d,e]=TENSE[i%TENSE.length];
    additions.push(makeQ("Inglês","Verb tenses and conditionals",'Choose the option that correctly completes the sentence: "'+s+'"',c,d,e));
  }

  const MOD=[
    ["must","strong obligation","Employees must follow the safety procedure."],
    ["should","recommendation/advice","Managers should review the indicators regularly."],
    ["may","possibility","The delay may affect the final schedule."],
    ["might","possibility with uncertainty","Demand might increase next quarter."],
    ["can","ability or general possibility","The system can process large volumes of data."],
    ["could","past ability or conditional possibility","The old system could process only a limited number of transactions."],
    ["must not","prohibition","Users must not share confidential passwords."],
    ["do not have to","absence of obligation","Employees do not have to print the digital report."]
  ];
  const modBad=["certainty about the past","contrast between ideas","purpose","completed action in the past","comparison"];
  for(let i=0;i<50;i++){
    const [mng,c,s]=MOD[i%MOD.length];
    additions.push(makeQ("Inglês","Modal verbs",'In the sentence "'+s+'", the modal expression mainly indicates',c,pick(modBad,4),'"'+mng+'" expresses '+c+' in this context. Modal verbs can indicate obligation, advice, possibility, ability or prohibition.'));
  }

  const PASS=[
    ["The team completed the analysis.","The analysis was completed by the team."],
    ["The company will publish the report.","The report will be published by the company."],
    ["The auditors reviewed the documents.","The documents were reviewed by the auditors."],
    ["The system processes the transactions.","The transactions are processed by the system."],
    ["The manager has approved the proposal.","The proposal has been approved by the manager."],
    ["The supplier is delivering the materials.","The materials are being delivered by the supplier."],
    ["The committee had evaluated the risks.","The risks had been evaluated by the committee."],
    ["The company must update the procedure.","The procedure must be updated by the company."]
  ];
  for(let i=0;i<50;i++){
    const [a,p]=PASS[i%PASS.length];
    const d=[a,p.replace(" by "," to "),p.replace(" been "," "),p.replace(" was "," is ")];
    additions.push(makeQ("Inglês","Passive voice",'Choose the sentence that correctly rewrites "'+a+'" in the passive voice.',p,d,"The passive voice focuses on the receiver of the action and uses an appropriate form of “to be” plus the past participle. The correct form is: "+p));
  }

  const GRAM=[
    ["The company hired ___ experienced analyst.","an","Use “an” before a vowel sound."],
    ["The company updated ___ procedures.","its","“Its” is the possessive determiner for a company or organization."],
    ["The report was delivered ___ Monday.","on","Use “on” with days of the week."],
    ["The meeting starts ___ 9 a.m.","at","Use “at” with clock times."],
    ["The results improved ___ the new process.","because of","“Because of” introduces a noun phrase indicating cause."],
    ["This solution is more efficient ___ the previous one.","than","Comparatives with “more” are followed by “than”."],
    ["The manager spoke ___ the suppliers.","to","“Speak to” is a common prepositional combination."],
    ["There are ___ risks in this scenario.","many","“Many” is used with countable plural nouns."],
    ["We have ___ information about the delay.","little","“Information” is uncountable; “little” expresses a small amount."],
    ["The project was completed ___ time.","on","“On time” means at the planned or expected time."]
  ];
  const gramPool=["a","an","the","its","their","in","on","at","to","than","many","much","little","few","because of"];
  for(let i=0;i<50;i++){
    const [s,c,e]=GRAM[i%GRAM.length];
    additions.push(makeQ("Inglês","Articles, pronouns and prepositions",'Choose the option that correctly completes the sentence: "'+s+'"',c,pick(gramPool.filter(x=>x!==c),4),e));
  }

  const VOC=[
    ["lead time","the time between initiating an order or process and its completion"],
    ["inventory","goods and materials held for future use or sale"],
    ["supplier","an organization or person that provides goods or services"],
    ["revenue","income generated from sales or operations"],
    ["profit","the amount remaining after costs and expenses are deducted from revenue"],
    ["deadline","the latest time or date by which something must be completed"],
    ["stakeholder","a person or group that can affect or be affected by an organization or project"],
    ["forecast","an estimate of a future condition or result"],
    ["compliance","conformity with rules, laws, standards or internal requirements"],
    ["risk","the possibility that uncertainty may affect objectives"],
    ["budget","a financial plan for a defined period or activity"],
    ["procurement","the process of obtaining goods and services from external sources"],
    ["performance","the degree to which results or objectives are achieved"],
    ["customer retention","the ability to keep customers over time"],
    ["market share","the proportion of total market sales held by a company or brand"]
  ];
  for(let i=0;i<45;i++){
    const [w,m]=VOC[i%VOC.length], others=VOC.filter(x=>x[0]!==w);
    additions.push(makeQ("Inglês","Business vocabulary in context",'In a business context, the word/expression "'+w+'" most closely means',m,pick(others.map(x=>x[1]),4),'"'+w+'" means '+m+' in this business context. Vocabulary should be interpreted together with the surrounding sentence and domain.'));
  }

  const ETXT=[
    ["The company reduced inventory after suppliers became more reliable. Service levels remained stable.","Supplier reliability allowed the company to reduce inventory without reducing service levels.","inventory reduction did not harm service performance"],
    ["The project was profitable, but managers postponed the investment because uncertainty had increased.","Managers considered uncertainty in addition to profitability.","profitability alone was not enough for approval"],
    ["The new system integrates sales, purchasing, finance and inventory data in one platform.","The system improves integration across business functions.","the platform reduces data fragmentation"],
    ["Customer complaints fell after the company standardized its service process.","Process standardization was followed by fewer customer complaints.","standardization may improve consistency"],
    ["The supplier offered a lower price, whereas another supplier offered a shorter delivery time.","The sentence contrasts price and delivery-time advantages.","the suppliers differ in the benefits they offer"],
    ["The team reviews performance indicators every week and adjusts the plan when necessary.","The team uses indicators as part of a recurring control process.","monitoring is linked to corrective action"],
    ["The company published environmental targets and reported progress every quarter.","The company increased transparency about environmental performance.","targets are being monitored over time"],
    ["The training focused on decisions that cannot be solved only by fixed procedures.","The training addressed less structured decision situations.","judgment is important in the situations described"],
    ["The platform attracted more users, which made it more valuable to other participants.","The passage describes a network effect.","value increases as participation grows"],
    ["The audit found that access permissions were not reviewed regularly.","Access control governance needs improvement.","periodic review is relevant to information security"],
    ["The marketing campaign increased website traffic but did not increase sales at the same rate.","Higher traffic did not produce proportional sales growth.","traffic and conversion are different metrics"],
    ["The company uses historical demand data to estimate future sales.","Historical data are being used for forecasting.","the estimate concerns future demand"],
    ["The manager asked the team to document lessons learned before the project closed.","The organization wants to preserve and share project knowledge.","lessons learned support organizational learning"],
    ["The budget was revised after energy prices increased.","A change in an external cost assumption led to a budget revision.","budgets may need adjustment when assumptions change"],
    ["The company adopted a code of conduct and a confidential reporting channel.","The measures are related to integrity and compliance.","the organization is strengthening mechanisms for ethical conduct"],
    ["Demand is stable, but the company keeps safety stock because delivery times vary.","Safety stock is being used to protect against supply uncertainty.","stable demand does not eliminate all uncertainty"],
    ["The project team delivers a usable increment every two weeks and collects feedback.","The team is working iteratively.","frequent delivery supports adaptation"],
    ["The report contains accurate data, but it was delivered too late to support the decision.","Accuracy alone does not guarantee information quality.","timeliness is also an important information attribute"],
    ["The company centralized purchasing to gain scale but kept local teams involved in technical specifications.","The arrangement combines centralized purchasing with local technical input.","different activities can have different degrees of centralization"],
    ["The organization measures emissions, water use and waste generation.","The organization is monitoring environmental indicators.","the metrics are related to environmental performance"]
  ];
  const enBad=["price is the only relevant factor","the company stopped using data","all uncertainty was eliminated","the text describes an unrelated legal requirement","the organization abandoned planning"];
  for(const [p,m,i] of ETXT){
    additions.push(makeQ("Inglês","Reading comprehension",'Read the passage: "'+p+'" The main idea is that',m,pick(enBad,4),"The passage states that "+m+" This conclusion follows directly from the facts presented."));
    additions.push(makeQ("Inglês","Reading comprehension",'Based on the passage "'+p+'", it can be inferred that',i,pick(enBad,4),"A reasonable inference is that "+i+". The answer must be supported by the passage."));
  }

  if(additions.length!==950) throw new Error("Expansion count: "+additions.length);
  additions.forEach(q=>QUESTIONS.push(q));

  const cutoff="2026-10-18";
  for(const q of QUESTIONS){
    if(q.planDate && q.planDate<=cutoff) continue;
    q.planDate="RESERVA"; q.planOrder=9999; q.dailyTarget=0;
  }

  const oldDays=PLAN.dailySummary.filter(x=>x.date<=cutoff);
  const future=[];
  function iso(d){return d.toISOString().slice(0,10)}
  const ptWeek=["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
  let d=new Date("2026-10-19T12:00:00"), end=new Date("2026-12-05T12:00:00"), alt=0;
  while(d<=end){
    const ds=iso(d), dow=d.getDay();
    let target,sn,pn,en,phase;
    if(ds==="2026-12-05"){target=25;sn=17;pn=4;en=4;phase="Véspera — revisão leve";}
    else if(ds>="2026-11-30"){target=40;sn=28;pn=6;en=6;phase="Fase 4 — revisão final";}
    else if(dow===0){target=70;sn=50;pn=10;en=10;phase="Simulado misto — formato da prova";}
    else if(dow===6){target=60;sn=43;pn=alt%2?8:9;en=alt%2?9:8;alt++;phase="Fase 3 — consolidação e bateria mista";}
    else {target=45;sn=32;pn=alt%2?6:7;en=alt%2?7:6;alt++;phase="Fase 2 — questões mistas e correção";}
    future.push({date:ds,weekday:ptWeek[dow],target,phase,general:pn+en,specific:sn,pn,en,themes:{}});
    d=new Date(d.getTime()+86400000);
  }

  const ptPool=QUESTIONS.filter(q=>q.planTheme==="Português"&&q.planDate==="RESERVA").sort((a,b)=>(a.id.startsWith("EXP")?0:1)-(b.id.startsWith("EXP")?0:1)||rnd()-.5);
  const enPool=QUESTIONS.filter(q=>q.planTheme==="Inglês"&&q.planDate==="RESERVA").sort((a,b)=>(a.id.startsWith("EXP")?0:1)-(b.id.startsWith("EXP")?0:1)||rnd()-.5);
  const specPool=QUESTIONS.filter(q=>q.planTheme!=="Português"&&q.planTheme!=="Inglês"&&q.planDate==="RESERVA");

  const by={};
  for(const q of specPool)(by[q.planTheme]||(by[q.planTheme]=[])).push(q);
  Object.values(by).forEach(a=>a.sort(()=>rnd()-.5));
  const weights={"AFO":14,"Produção e Compras":10,"Estratégia":8,"Contabilidade Geral":8,"Marketing":7,"Estatística":6,"Projetos":6,"Custos":6,"Processo Decisório":5,"Contratação":7,"RH":5,"Lógica":5,"Conflitos e Negociação":4,"Sistemas de Informação":5,"ESG":4,"Governança e Riscos":4};
  const wheel=[]; for(const [t,w] of Object.entries(weights))for(let i=0;i<w;i++)wheel.push(t);
  shuffle(wheel); let wp=0;
  function takeSpec(n){
    const out=[]; let guard=0;
    while(out.length<n&&guard<100000){const t=wheel[wp++%wheel.length];guard++;if(by[t]&&by[t].length)out.push(by[t].pop());}
    return out;
  }
  let pi=0,ei=0;
  for(const day of future){
    let sel=takeSpec(day.specific).concat(ptPool.slice(pi,pi+day.pn),enPool.slice(ei,ei+day.en));
    pi+=day.pn; ei+=day.en; sel=shuffle(sel);
    sel.forEach((q,i)=>{q.planDate=day.date;q.planOrder=i+1;q.dailyTarget=day.target;day.themes[q.planTheme]=(day.themes[q.planTheme]||0)+1;});
    delete day.pn; delete day.en;
  }

  PLAN.dailySummary=oldDays.concat(future);
  PLAN.totalQuestions=3500;
  PLAN.start="2026-10-13"; PLAN.end="2026-12-05"; PLAN.exam="2026-12-06";
})();