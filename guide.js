/* Conteúdo dos botões "i": como fazer, o que não pode faltar, exemplo de estrutura e modelo para inserir. */
window.GUIDE = {
  capa: {
    t: 'Capa e folha de rosto',
    how: [
      'Escreva o nome da instituição e do curso por extenso, sem abreviar.',
      'Informe o nome completo de cada autor, um por linha, em ordem alfabética.',
      'O título deve dizer o que foi feito e para quê. Não use ponto final.',
      'O subtítulo é opcional. O app coloca os dois-pontos entre título e subtítulo.',
      'Cidade é a da escola. Ano é o da entrega do trabalho.',
      'Você digita normalmente: o app aplica maiúsculas, negrito e posição de cada item.'
    ],
    must: ['Instituição', 'Nome completo dos autores', 'Título', 'Cidade', 'Ano de entrega'],
    ex: [
      { k: 'Instituição', v: 'Colégio Estadual de Aplicação Anísio Teixeira' },
      { k: 'Curso', v: 'Curso Técnico em Informática' },
      { k: 'Autores', v: 'Ana Beatriz Souza Lima / Carlos Eduardo dos Santos' },
      { k: 'Título', v: 'SisLab' },
      { k: 'Subtítulo', v: 'Sistema Web para Agendamento dos Laboratórios de Informática' },
      { k: 'Local e ano', v: 'Salvador, 2026' }
    ]
  },
  natureza: {
    t: 'Natureza do trabalho',
    how: [
      'É o pequeno texto da folha de rosto que diz que tipo de trabalho é, para quem foi apresentado e com qual objetivo.',
      'Fica na metade direita da página, em espaço simples. O app posiciona sozinho.',
      'Use o botão "Gerar texto padrão" e ajuste só o que for diferente no seu caso.'
    ],
    must: ['Tipo de trabalho', 'Instituição', 'Objetivo (título pretendido)', 'Nome do orientador'],
    ex: [
      { k: 'Tipo', v: 'Trabalho de Conclusão de Curso' },
      { k: 'Para quem', v: 'apresentado ao Colégio Estadual de Aplicação Anísio Teixeira,' },
      { k: 'Objetivo', v: 'como requisito parcial para a obtenção do título de Técnico em Informática.' }
    ]
  },
  aprovacao: {
    t: 'Folha de aprovação',
    how: [
      'É a página que a banca assina no dia da apresentação. Pela norma é obrigatória; confirme com seu orientador se a escola usa.',
      'Escreva um membro da banca por linha, no formato Nome – Instituição. O primeiro é o orientador.',
      'Se ainda não souber a data, deixe em branco: o app deixa o espaço para preencher à mão.'
    ],
    must: ['Nome de cada avaliador', 'Titulação (Prof., Me., Dr.)', 'Instituição de cada um'],
    ex: [
      { k: 'Orientador', v: 'Prof. Me. João Pereira da Silva – Colégio Estadual de Aplicação Anísio Teixeira' },
      { k: 'Avaliadora', v: 'Profa. Dra. Maria Oliveira – Universidade Federal da Bahia' }
    ]
  },
  opcionais: {
    t: 'Dedicatória, agradecimentos e epígrafe',
    how: [
      'Os três são opcionais. Deixe em branco o que não quiser usar e a página não é criada.',
      'Dedicatória: uma frase curta oferecendo o trabalho a alguém. Fica no canto inferior direito.',
      'Agradecimentos: um ou mais parágrafos para quem ajudou (família, orientador, escola, colegas).',
      'Epígrafe: uma citação que tem relação com o tema, com o autor e o ano entre parênteses. Ela também precisa aparecer nas referências.'
    ],
    must: ['Texto curto', 'Epígrafe com autor e ano'],
    ex: [
      { k: 'Dedicatória', v: 'Aos nossos pais, que sempre acreditaram neste projeto.' },
      { k: 'Epígrafe', v: '"Ensinar não é transferir conhecimento, mas criar as possibilidades para a sua produção" (Freire, 1996, p. 47).' }
    ]
  },
  resumo: {
    t: 'Resumo',
    how: [
      'Escreva depois que o trabalho estiver pronto: o resumo conta a história inteira em miniatura.',
      'Um parágrafo só, com 150 a 500 palavras. O contador abaixo do campo avisa.',
      'Use frases completas, na terceira pessoa ("o trabalho apresenta", "foram utilizados").',
      'Não use citações, tópicos, siglas sem explicação nem figuras.'
    ],
    must: ['Tema e contexto', 'Objetivo', 'Metodologia', 'Resultados', 'Conclusão'],
    ex: [
      { k: 'Contexto', v: 'A organização do uso de espaços compartilhados é um desafio comum nas escolas.' },
      { k: 'Objetivo', v: 'Este trabalho descreve o desenvolvimento do SisLab, um sistema web para agendar os laboratórios de informática.' },
      { k: 'Metodologia', v: 'A pesquisa é aplicada e usou Scrum, questionários com professores, Node.js e React.' },
      { k: 'Resultados', v: 'Nos testes, os conflitos de horário relatados caíram 80%.' },
      { k: 'Conclusão', v: 'Conclui-se que a ferramenta torna a gestão dos laboratórios mais simples e visível.' }
    ],
    tpl: '[Contexto: uma ou duas frases apresentando o tema.] [Objetivo: o que o trabalho se propôs a fazer.] [Metodologia: como foi feito, com quem, com quais ferramentas.] [Resultados: o que foi obtido, com números se houver.] [Conclusão: o que isso significa.]'
  },
  chaves: {
    t: 'Palavras-chave',
    how: [
      'Escolha de 3 a 5 termos que alguém usaria para procurar seu trabalho.',
      'Separe com ponto e vírgula e termine com ponto final. O app ajusta os separadores.',
      'Use letra minúscula, a não ser em nomes próprios e siglas (React, Scrum, ABNT).',
      'Evite repetir palavras que já estão no título.'
    ],
    must: ['3 a 5 termos', 'Ponto e vírgula entre eles', 'Minúsculas, exceto nomes próprios'],
    ex: [{ k: 'Certo', v: 'agendamento; desenvolvimento web; laboratório de informática; React.' }, { k: 'Errado', v: 'Agendamento. Desenvolvimento Web. Laboratório.' }]
  },
  abstract: {
    t: 'Abstract e keywords',
    how: [
      'É o mesmo resumo, traduzido para o inglês. Não acrescente nem corte informações.',
      'Traduza frase por frase e revise com seu professor de inglês. Tradutores automáticos erram termos técnicos.',
      'As keywords são as mesmas palavras-chave, em inglês, na mesma ordem.'
    ],
    must: ['Mesmo conteúdo do resumo', 'Parágrafo único', 'Keywords na mesma ordem'],
    ex: [{ k: 'Keywords', v: 'scheduling; web development; computer lab; React.' }]
  },
  introducao: {
    t: 'Introdução',
    how: [
      'Comece pelo cenário geral e vá fechando até chegar ao seu trabalho.',
      'Apresente o problema como uma pergunta direta, terminada em ponto de interrogação.',
      'Explique por que vale a pena fazer o trabalho (justificativa).',
      'Objetivos sempre começam com verbo no infinitivo: desenvolver, analisar, comparar, avaliar.',
      'O objetivo geral é um só. Os específicos são os passos para chegar nele.',
      'Não adiante resultados nem conclusões aqui.'
    ],
    must: ['Contextualização', 'Problema de pesquisa', 'Justificativa', 'Objetivo geral', 'Objetivos específicos'],
    ex: [
      { k: 'Contexto', v: 'Dois a quatro parágrafos sobre o tema, com pelo menos uma citação.' },
      { k: '1.1 Problema', v: 'Como um sistema web pode reduzir os conflitos de agendamento dos laboratórios?' },
      { k: '1.2 Justificativa', v: 'Quem se beneficia e por que o tema importa.' },
      { k: '1.3 Objetivos', v: '1.3.1 Objetivo geral / 1.3.2 Objetivos específicos, em alíneas a), b), c).' }
    ],
    tpl: '[Contextualize o tema: apresente o cenário e mostre por que ele é relevante. Escreva de dois a quatro parágrafos e cite pelo menos um autor, por exemplo: (Tardif, 2014).]\n\n# Problema de pesquisa\n[Escreva a pergunta que o trabalho responde, em forma de pergunta direta.]\n\n# Justificativa\n[Explique por que o trabalho é importante e quem se beneficia dele.]\n\n# Objetivos\n## Objetivo geral\n[Uma frase começando com verbo no infinitivo: Desenvolver..., Analisar..., Avaliar...]\n## Objetivos específicos\nPara alcançar o objetivo geral, pretende-se:\n- [primeiro passo, começando com verbo no infinitivo]\n- [segundo passo]\n- [terceiro passo]'
  },
  referencial: {
    t: 'Referencial teórico',
    how: [
      'Aqui você mostra o que outros autores já disseram sobre o tema. Toda ideia que não é sua precisa de citação.',
      'Organize por assunto, uma subseção para cada conceito importante.',
      'Não faça uma lista de resumos: compare os autores e ligue cada ideia ao seu trabalho.',
      'Prefira livros, artigos e sites de instituições. Evite blogs sem autor.',
      'Todo autor citado aqui tem de aparecer na lista de referências, e vice-versa.'
    ],
    must: ['Conceitos principais', 'Autores citados em cada ideia', 'Trabalhos parecidos com o seu', 'Ligação com o seu tema'],
    ex: [
      { k: '2.1 Conceito', v: 'Segundo Flanagan (2021), ... Essa característica é importante para este trabalho porque ...' },
      { k: '2.2 Conceito', v: 'Definição com citação + explicação com suas palavras.' },
      { k: '2.3 Trabalhos correlatos', v: 'Pereira e Mendes (2023) demonstraram que ... O presente trabalho se diferencia por ...' }
    ],
    tpl: '# [Nome do primeiro conceito]\n[Explique o conceito com base em um autor. Exemplo: Segundo Silva (2024), ...]\n\n# [Nome do segundo conceito]\n[Explique o conceito e mostre a relação com o seu trabalho.]\n\n# Trabalhos correlatos\n[Apresente um ou dois trabalhos parecidos com o seu e diga em que o seu é diferente.]'
  },
  metodologia: {
    t: 'Metodologia',
    how: [
      'Descreva o que foi feito com detalhes suficientes para outra pessoa repetir.',
      'Classifique a pesquisa (aplicada ou básica; qualitativa, quantitativa ou as duas) citando um autor de metodologia.',
      'Diga quem participou, quantas pessoas, onde e quando.',
      'Liste instrumentos (questionário, entrevista) e ferramentas (linguagens, programas, equipamentos).',
      'Escreva no passado: "foi aplicado", "utilizou-se".',
      'Materiais completos (questionário, roteiro, código) vão para os apêndices. No texto, escreva "(Apêndice A)".'
    ],
    must: ['Tipo de pesquisa', 'Participantes e local', 'Instrumentos de coleta', 'Ferramentas e tecnologias', 'Etapas do trabalho'],
    ex: [
      { k: 'Tipo', v: 'Esta pesquisa classifica-se como aplicada e exploratória (Prodanov; Freitas, 2013).' },
      { k: 'Coleta', v: 'Questionário digital com 15 professores (Apêndice A).' },
      { k: 'Ferramentas', v: 'Visual Studio Code, Node.js, React, Git e GitHub.' },
      { k: 'Etapas', v: 'Levantamento de requisitos, prototipação, desenvolvimento, testes.' }
    ],
    tpl: '[Classifique a pesquisa e cite um autor de metodologia. Exemplo: Esta pesquisa classifica-se como aplicada (Prodanov; Freitas, 2013).]\n\n# Participantes e local\n[Quem participou, quantas pessoas, onde e em que período.]\n\n# Instrumentos de coleta de dados\n[Questionário, entrevista ou observação. Indique o apêndice onde o instrumento está: (Apêndice A).]\n\n# Ferramentas utilizadas\n[Linguagens, programas e equipamentos, com a função de cada um.]\n\n# Etapas do desenvolvimento\nO trabalho foi realizado nas seguintes etapas:\n- [primeira etapa]\n- [segunda etapa]\n- [terceira etapa]'
  },
  resultados: {
    t: 'Resultados e discussão',
    how: [
      'Mostre o que você obteve: telas do sistema, respostas dos questionários, medições, testes.',
      'Use figuras e tabelas, e sempre apresente cada uma no texto antes de ela aparecer ("conforme a Figura 1").',
      'Depois de cada resultado, explique o que ele significa e compare com os autores do referencial.',
      'Diga também o que não funcionou. Limitação bem explicada conta a favor.'
    ],
    must: ['O que foi construído ou observado', 'Dados (números, respostas, testes)', 'Figuras e tabelas citadas no texto', 'Interpretação dos resultados'],
    ex: [
      { k: 'Apresentar', v: 'A Figura 1 apresenta a tela de agendamento do sistema.' },
      { k: 'Dados', v: 'Dos 15 professores, 12 (80%) deixaram de relatar conflitos de horário.' },
      { k: 'Discutir', v: 'Esse resultado confirma o que Pereira e Mendes (2023) observaram em ...' }
    ],
    tpl: '# [Primeiro resultado: por exemplo, o protótipo desenvolvido]\n[Descreva o resultado. Antes de cada figura, apresente-a no texto: A Figura 1 mostra ...]\n\n# [Segundo resultado: por exemplo, avaliação com os usuários]\n[Apresente os dados em números e, se ajudar, em uma tabela.]\n\n# Discussão\n[Explique o que os resultados significam e compare com os autores do referencial teórico.]'
  },
  conclusao: {
    t: 'Considerações finais',
    how: [
      'Retome o objetivo geral e diga claramente se ele foi alcançado.',
      'Responda à pergunta do problema de pesquisa.',
      'Resuma os principais resultados em poucas frases.',
      'Aponte limitações e sugira trabalhos futuros.',
      'Não traga autores, dados ou citações novas nesta parte.'
    ],
    must: ['Retomada do objetivo', 'Resposta ao problema', 'Principais resultados', 'Limitações', 'Trabalhos futuros'],
    ex: [
      { k: 'Objetivo', v: 'O trabalho alcançou seu objetivo ao entregar o protótipo funcional do SisLab.' },
      { k: 'Resultados', v: 'Os testes mostraram redução de 80% nos conflitos de horário.' },
      { k: 'Limitações', v: 'O sistema ainda funciona apenas na rede local da escola.' },
      { k: 'Futuro', v: 'Sugere-se hospedar a aplicação em nuvem e criar uma versão para celular.' }
    ],
    tpl: '[Retome o objetivo geral e diga se ele foi alcançado.]\n\n[Responda à pergunta de pesquisa e resuma os principais resultados.]\n\n[Aponte as limitações do trabalho.]\n\n[Sugira melhorias e trabalhos futuros.]'
  },
  secao: {
    t: 'Seção do trabalho',
    how: [
      'Dê um título curto. O app numera a seção e coloca em maiúsculas e negrito.',
      'Cada seção principal começa em página nova.',
      'Divida textos longos em subseções. Uma seção só deve ter subseções se tiver pelo menos duas.',
      'Não deixe um título seguido direto de outro título sem nenhum texto no nível mais alto, quando puder evitar.'
    ],
    must: ['Título curto', 'Texto em parágrafos', 'Citações nas ideias de outros autores'],
    ex: [{ k: 'Estrutura', v: 'Parágrafo de abertura + subseções (# Título) + figuras e tabelas apresentadas no texto.' }]
  },
  formatacao: {
    t: 'Subseções, listas e destaques',
    how: [
      'Você só marca o que cada linha é. Número, maiúsculas, negrito e espaçamento são aplicados pelo app.',
      'Cada linha nova vira um parágrafo. Não use Enter no meio de um parágrafo nem espaços para criar recuo.',
      'Subseção: comece a linha com #. Subdivisão da subseção: comece com ##. Mais um nível: ###.',
      'Lista de itens (alíneas): comece cada linha com um hífen. A frase anterior termina em dois-pontos; o app coloca a), b), c) e a pontuação.',
      'Citação direta com mais de três linhas: comece a linha com >. Ela sai com recuo de 4 cm, letra 10 e sem aspas.',
      'Negrito entre dois asteriscos de cada lado; itálico entre um. Use itálico em palavras estrangeiras e em et al.'
    ],
    must: ['# para subseção', '## para sub-subseção', '- para alíneas', '> para citação longa'],
    ex: [
      { k: 'Você digita', v: '# Problema de pesquisa' },
      { k: 'Sai no PDF', v: '1.1 PROBLEMA DE PESQUISA' },
      { k: 'Você digita', v: '## Objetivo geral' },
      { k: 'Sai no PDF', v: '1.2.1 Objetivo geral (em negrito)' },
      { k: 'Você digita', v: '- levantar os requisitos' },
      { k: 'Sai no PDF', v: 'a) levantar os requisitos;' },
      { k: 'Você digita', v: 'o *framework* **React**' },
      { k: 'Sai no PDF', v: 'framework em itálico, React em negrito' }
    ]
  },
  citacoes: {
    t: 'Como citar no texto',
    how: [
      'Citação indireta é a ideia do autor com as suas palavras: indique sobrenome e ano.',
      'Citação direta é a cópia exata: indique sobrenome, ano e página.',
      'Direta com até três linhas fica no parágrafo, entre aspas.',
      'Direta com mais de três linhas vai em bloco separado: comece a linha com >. Sem aspas.',
      'Dentro dos parênteses o sobrenome tem só a inicial maiúscula: (Tardif, 2014). O formato (TARDIF, 2014) é da norma antiga.',
      'Tudo o que for citado precisa estar na lista de referências.'
    ],
    must: ['Sobrenome do autor', 'Ano', 'Página, se a citação for direta', 'Aspas na citação direta curta'],
    ex: [
      { k: 'Autor na frase', v: 'Segundo Tardif (2014), o saber docente é plural.' },
      { k: 'Autor no fim', v: 'O saber docente é plural (Tardif, 2014).' },
      { k: 'Direta curta', v: 'Para o autor, o saber docente é "plural e heterogêneo" (Tardif, 2014, p. 18).' },
      { k: 'Dois autores', v: 'Prodanov e Freitas (2013) ou (Prodanov; Freitas, 2013).' },
      { k: 'Três autores', v: 'Silva, Costa e Lima (2020) ou (Silva; Costa; Lima, 2020).' },
      { k: 'Quatro ou mais', v: 'Souza et al. (2022) ou (Souza et al., 2022).' },
      { k: 'Instituição', v: '(IBGE, 2022) ou (Brasil, 2018).' },
      { k: 'Citação de citação', v: 'Piaget (1970 apud Tardif, 2014, p. 30). Só use se não tiver acesso ao original.' }
    ]
  },
  referencias: {
    t: 'Referências',
    how: [
      'Entra na lista tudo o que foi citado no texto, e só o que foi citado.',
      'Escolha o tipo de fonte e preencha os campos: o app monta a referência no formato da norma e coloca em ordem alfabética.',
      'Digite o nome do autor na ordem normal (Maurice Tardif). O app inverte para TARDIF, Maurice.',
      'Até três autores, todos aparecem. Com quatro ou mais, o app usa o primeiro seguido de et al.',
      'O destaque em negrito vai no título do livro ou no nome da revista. O subtítulo não leva destaque.',
      'Para sites, informe o endereço completo e a data em que você acessou.',
      'Cada referência mostra como citar aquela fonte no texto. Toque para copiar.'
    ],
    must: ['Autor', 'Título', 'Local e editora (livros)', 'Ano', 'Link e data de acesso (internet)'],
    ex: [
      { k: 'Livro', v: 'TARDIF, Maurice. **Saberes docentes e formação profissional**. 17. ed. Petrópolis: Vozes, 2014.' },
      { k: 'Artigo', v: 'PEREIRA, Ana; MENDES, Rui. Governança de dados no ensino público. **Revista Brasileira de Informática na Educação**, Porto Alegre, v. 29, n. 2, p. 45-60, 2023.' },
      { k: 'Site', v: 'IBGE. **Censo 2022**: panorama. Rio de Janeiro: IBGE, 2023. Disponível em: https://censo2022.ibge.gov.br. Acesso em: 10 mar. 2026.' }
    ]
  },
  figuras: {
    t: 'Figuras',
    how: [
      'Figura é qualquer ilustração: foto, captura de tela, gráfico, desenho, fluxograma, mapa.',
      'Toda figura precisa de um título em cima e da fonte embaixo. O app numera e posiciona os dois.',
      'Se a imagem é sua, deixe a fonte em branco: sai "Fonte: elaborado pelos autores (ano)."',
      'Se veio de um livro ou site, escreva autor e ano e coloque a obra nas referências.',
      'Apresente a figura no texto antes de ela aparecer: "A Figura 1 mostra a tela inicial".',
      'Posicione o cursor no lugar do texto onde a figura deve entrar e só então toque em Figura.'
    ],
    must: ['Título que descreve a imagem', 'Fonte', 'Menção no texto antes da figura'],
    ex: [
      { k: 'Em cima', v: 'Figura 1 – Tela de agendamento do SisLab' },
      { k: 'Embaixo', v: 'Fonte: elaborado pelos autores (2026).' },
      { k: 'De terceiros', v: 'Fonte: Flanagan (2021, p. 45).' }
    ]
  },
  tabelas: {
    t: 'Tabelas',
    how: [
      'Tabela apresenta números. Título em cima, fonte embaixo, igual às figuras.',
      'As laterais ficam abertas, com linhas só em cima, embaixo e sob o cabeçalho. O app desenha assim.',
      'Digite uma linha da tabela por linha do campo, separando as colunas com ponto e vírgula. A primeira linha é o cabeçalho.',
      'Também dá para copiar as células do Excel ou do Google Planilhas e colar direto.',
      'Apresente a tabela no texto antes de ela aparecer: "conforme a Tabela 1".'
    ],
    must: ['Título', 'Cabeçalho nas colunas', 'Fonte', 'Menção no texto'],
    ex: [
      { k: 'Linha 1', v: 'Equipamento; Quantidade; Situação' },
      { k: 'Linha 2', v: 'Computador; 15; Em funcionamento' },
      { k: 'Linha 3', v: 'Roteador; 2; Em manutenção' }
    ]
  },
  apendice: {
    t: 'Apêndices',
    how: [
      'Apêndice é material feito por você que completa o trabalho: questionário aplicado, roteiro de entrevista, código, manual do sistema.',
      'Cada apêndice começa em página nova e recebe uma letra: A, B, C. O app cuida disso.',
      'Dê um título que diga o que é o material.',
      'No texto, cite entre parênteses onde ele é usado: (Apêndice A).',
      'Imagens dentro do apêndice também levam título e fonte.'
    ],
    must: ['Material feito pelos autores', 'Título descritivo', 'Citado no texto como (Apêndice A)'],
    ex: [{ k: 'Título', v: 'APÊNDICE A – QUESTIONÁRIO APLICADO AOS PROFESSORES' }, { k: 'No texto', v: 'As perguntas podem ser consultadas no Apêndice A.' }]
  },
  anexo: {
    t: 'Anexos',
    how: [
      'Anexo é material que não foi feito por você e serve de comprovação: lei, manual de fabricante, mapa, documento da escola.',
      'A diferença para o apêndice é só a autoria. Se foi você quem fez, é apêndice.',
      'Cada anexo começa em página nova e recebe uma letra: A, B, C.',
      'Informe de onde o material veio, no título ou na fonte da imagem.',
      'No texto, cite entre parênteses: (Anexo A).'
    ],
    must: ['Material de outros autores', 'Título descritivo', 'Origem do material', 'Citado no texto como (Anexo A)'],
    ex: [{ k: 'Título', v: 'ANEXO A – REGIMENTO DE USO DOS LABORATÓRIOS' }, { k: 'No texto', v: 'As regras atuais constam no Anexo A.' }]
  },
  importar: {
    t: 'Colar o trabalho inteiro',
    how: [
      'Cole todo o texto do seu arquivo. O app procura os títulos (Resumo, Introdução, Metodologia, Referências, Apêndice A...) e distribui cada parte no campo certo.',
      'Funciona melhor quando cada título está sozinho em uma linha.',
      'Títulos numerados como 1.1 e 1.1.1 viram subseções automaticamente.',
      'Figuras e tabelas não vêm junto com o texto colado: adicione depois, no lugar certo.',
      'Confira o resultado antes de aplicar. Depois você pode ajustar cada campo.'
    ],
    must: ['Títulos em linhas separadas', 'Conferir a lista de partes detectadas'],
    ex: [{ k: 'Reconhece', v: 'RESUMO, ABSTRACT, Palavras-chave:, 1 INTRODUÇÃO, 1.1 Subseção, REFERÊNCIAS, APÊNDICE A – Título, ANEXO A – Título' }]
  }
};
