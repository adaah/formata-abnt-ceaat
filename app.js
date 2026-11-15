(function () {
  'use strict';
  var A = window.ABNT, G = window.GUIDE, KEY = 'formata-abnt-v1';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function h(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function md(s) { return h(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>'); }
  function uid() { return Math.random().toString(36).slice(2, 7); }
  function words(s) { var m = String(s || '').trim().match(/\S+/g); return m ? m.length : 0; }

  /* ---------------- estado ---------------- */
  function blank() {
    return {
      v: 1, font: 'sans', example: false,
      meta: { inst: '', curso: '', autores: '', titulo: '', subtitulo: '', natureza: '', orient: '', coorient: '', cidade: '', ano: String(new Date().getFullYear()) },
      aprov: { on: false, banca: '', data: '' },
      opc: { dedic: '', agrad: '', epig: '' },
      resumo: '', chaves: '', abstract: '', keywords: '',
      lists: { fig: false, tab: false },
      secs: [
        { id: uid(), title: 'Introdução', text: '' }, { id: uid(), title: 'Referencial teórico', text: '' },
        { id: uid(), title: 'Metodologia', text: '' }, { id: uid(), title: 'Resultados e discussão', text: '' },
        { id: uid(), title: 'Considerações finais', text: '' }
      ],
      figs: {}, tabs: {}, refs: [], apx: [], anx: []
    };
  }
  function chartImage() {
    var c = document.createElement('canvas'); c.width = 1200; c.height = 640;
    var x = c.getContext('2d');
    x.fillStyle = '#fff'; x.fillRect(0, 0, 1200, 640);
    x.strokeStyle = '#c8d0c0'; x.lineWidth = 2; x.fillStyle = '#44584c'; x.font = '26px sans-serif'; x.textAlign = 'right';
    for (var i = 0; i <= 4; i++) { var y = 540 - i * 110; x.beginPath(); x.moveTo(130, y); x.lineTo(1120, y); x.stroke(); x.fillText(String(i * 5), 110, y + 9); }
    var data = [['Antes do sistema', 15, '#8aa596'], ['Após 1 mês', 6, '#3f7a5c'], ['Após 2 meses', 3, '#1d4a36']];
    x.textAlign = 'center';
    data.forEach(function (d, k) {
      var bx = 250 + k * 300, bh = d[1] * 22;
      x.fillStyle = d[2]; x.fillRect(bx - 90, 540 - bh, 180, bh);
      x.fillStyle = '#13271d'; x.font = 'bold 30px sans-serif'; x.fillText(String(d[1]), bx, 540 - bh - 14);
      x.font = '26px sans-serif'; x.fillStyle = '#44584c'; x.fillText(d[0], bx, 585);
    });
    return { data: c.toDataURL('image/jpeg', 0.9), w: 1200, h: 640 };
  }
  function example() {
    var s = blank(), img = chartImage();
    s.example = true;
    s.meta = {
      inst: 'Colégio Estadual de Aplicação Anísio Teixeira', curso: 'Curso Técnico em Informática',
      autores: 'Ana Beatriz Souza Lima\nCarlos Eduardo dos Santos', titulo: 'SisLab', subtitulo: 'Sistema Web para Agendamento dos Laboratórios de Informática',
      natureza: 'Trabalho de Conclusão de Curso apresentado ao Colégio Estadual de Aplicação Anísio Teixeira, como requisito parcial para a obtenção do título de Técnico em Informática.',
      orient: 'Prof. Me. João Pereira da Silva', coorient: '', cidade: 'Salvador', ano: '2026'
    };
    s.resumo = 'A organização do uso de espaços compartilhados é um desafio comum em instituições de ensino, sobretudo naquelas que ofertam cursos técnicos e dependem de laboratórios para as aulas práticas. Quando o controle de horários é feito em cadernos ou planilhas separadas, surgem reservas duplicadas e falhas de comunicação entre os professores. O presente trabalho descreve o desenvolvimento do SisLab, um protótipo de sistema web voltado ao agendamento e ao controle de acesso dos laboratórios de informática de uma escola estadual de Salvador. A pesquisa caracteriza-se como aplicada e exploratória, com abordagem quantitativa e qualitativa, e utilizou o Scrum para organizar as etapas em ciclos de duas semanas. O levantamento de requisitos foi realizado por meio de um questionário respondido por 15 professores do curso técnico. Na construção da aplicação foram empregadas as tecnologias Node.js no servidor, React na interface e um banco de dados relacional. Nos testes realizados durante dois meses, o número de professores que relataram conflitos de horário caiu de 15 para 3, uma redução de 80%. Conclui-se que o sistema torna a gestão dos laboratórios mais simples e visível para toda a equipe, embora ainda dependa de hospedagem externa para ser acessado fora da rede da escola.';
    s.chaves = 'agendamento; desenvolvimento web; laboratório de informática; React';
    s.abstract = 'Organizing the use of shared spaces is a common challenge in schools, especially in those that offer technical courses and depend on laboratories for practical classes. When schedules are kept in notebooks or separate spreadsheets, duplicate bookings and communication failures among teachers arise. This paper describes the development of SisLab, a web system prototype for scheduling and controlling access to the computer labs of a state school in Salvador. The research is applied and exploratory, with a quantitative and qualitative approach, and used Scrum to organize the stages in two-week cycles. Requirements were gathered through a questionnaire answered by 15 teachers of the technical course. The application was built with Node.js on the server, React on the interface and a relational database. During two months of testing, the number of teachers who reported scheduling conflicts dropped from 15 to 3, a reduction of 80%. It is concluded that the system makes lab management simpler and more visible to the whole staff, although it still depends on external hosting to be accessed outside the school network.';
    s.keywords = 'scheduling; web development; computer lab; React';
    s.figs = { ex1: { id: 'ex1', title: 'Professores que relataram conflitos de horário', source: '', size: 'm', data: img.data, w: img.w, h: img.h } };
    s.tabs = { ex2: { id: 'ex2', title: 'Tecnologias utilizadas no desenvolvimento', source: '', raw: 'Camada; Tecnologia; Função\nInterface; React; Telas de agendamento\nServidor; Node.js; Regras de reserva\nDados; PostgreSQL; Armazenamento das reservas' } };
    s.secs = [
      { id: uid(), title: 'Introdução', text: 'No ambiente escolar, a infraestrutura tecnológica tem papel importante no processo de ensino e aprendizagem (Tardif, 2014). Escolas que ofertam cursos técnicos lidam com grande procura pelos laboratórios de informática, e a gestão manual de horários e chaves costuma gerar reservas duplicadas e falhas de comunicação entre os professores.\nNesse contexto, o desenvolvimento de software surge como uma forma de organizar a rotina escolar e dar visibilidade ao uso dos espaços.\n\n# Problema de pesquisa\nDiante das dificuldades relatadas pelos professores, este trabalho busca responder à seguinte questão: como um sistema web pode reduzir os conflitos de agendamento dos laboratórios de informática da escola?\n\n# Justificativa\nA proposta beneficia professores, estudantes e a coordenação, pois reduz o tempo gasto com a organização dos horários e evita que turmas fiquem sem laboratório.\n\n# Objetivos\n## Objetivo geral\nDesenvolver um protótipo de sistema web, denominado SisLab, para organizar o agendamento dos laboratórios de informática da escola.\n## Objetivos específicos\nPara alcançar o objetivo geral, pretende-se:\n- levantar os requisitos do sistema com os professores por meio de questionário\n- desenvolver a interface de agendamento com foco na clareza\n- avaliar o protótipo com os professores durante dois meses' },
      { id: uid(), title: 'Referencial teórico', text: '# Desenvolvimento web\nSistemas web modernos costumam separar a interface, com a qual o usuário interage, do servidor, que processa as regras e acessa o banco de dados. Segundo Flanagan (2021), o JavaScript permite trabalhar nas duas pontas com a mesma linguagem, o que simplifica a manutenção por equipes pequenas.\nPara o autor, essa característica explica a popularidade da linguagem:\n> JavaScript é a linguagem de programação da web. A ampla maioria dos sites usa JavaScript, e todos os navegadores modernos, em computadores, tablets e celulares, incluem interpretadores da linguagem, o que a torna a linguagem de programação mais implantada da história (Flanagan, 2021, p. 1).\n\n# Trabalhos correlatos\nPereira e Mendes (2023) demonstraram que painéis digitais reduziram o tempo gasto pela coordenação de escolas estaduais na realocação de turmas. O presente trabalho parte da mesma ideia, mas trata especificamente dos laboratórios de informática.' },
      { id: uid(), title: 'Metodologia', text: 'Esta pesquisa classifica-se como aplicada e exploratória, com abordagem quantitativa e qualitativa (Prodanov; Freitas, 2013). O desenvolvimento seguiu o Scrum, com ciclos de entrega de duas semanas.\n\n# Coleta de dados\nOs requisitos foram levantados por meio de um questionário digital respondido por 15 professores do curso técnico (Apêndice A).\n\n# Ferramentas utilizadas\nA Tabela 1 apresenta as tecnologias utilizadas em cada camada do sistema.\n[[tab-ex2 | Tecnologias utilizadas no desenvolvimento]]\nO código foi escrito no editor Visual Studio Code e versionado com Git.' },
      { id: uid(), title: 'Resultados e discussão', text: 'O protótipo foi utilizado pelos professores durante dois meses. A Figura 1 mostra a evolução do número de professores que relataram conflitos de horário nesse período.\n[[fig-ex1 | Professores que relataram conflitos de horário]]\nA redução de 15 para 3 relatos, equivalente a 80%, confirma o que Pereira e Mendes (2023) observaram sobre o efeito da digitalização de processos na rotina escolar.' },
      { id: uid(), title: 'Considerações finais', text: 'O trabalho alcançou seu objetivo geral ao entregar o protótipo funcional do SisLab. A verificação automática de horários impediu reservas duplicadas e respondeu ao problema de pesquisa.\nComo limitação, o sistema ainda funciona apenas na rede local da escola. Para trabalhos futuros, sugere-se a hospedagem em nuvem e a criação de uma versão para celular.' }
    ];
    s.refs = [
      { id: uid(), type: 'livro', f: { autores: 'David Flanagan', titulo: 'JavaScript', subtitulo: 'o guia definitivo', edicao: '7', cidade: 'Rio de Janeiro', editora: 'Alta Books', ano: '2021' } },
      { id: uid(), type: 'artigo', f: { autores: 'Ana Carla Pereira\nRui Mendes', titulo: 'Governança de dados no ensino público', subtitulo: 'o impacto da automação de processos', revista: 'Revista Brasileira de Informática na Educação', cidade: 'Porto Alegre', volume: '29', numero: '2', pini: '45', pfim: '60', ano: '2023' } },
      { id: uid(), type: 'livro', f: { autores: 'Cleber Cristiano Prodanov\nErnani Cesar de Freitas', titulo: 'Metodologia do trabalho científico', subtitulo: 'métodos e técnicas da pesquisa e do trabalho acadêmico', edicao: '2', cidade: 'Novo Hamburgo', editora: 'Feevale', ano: '2013' } },
      { id: uid(), type: 'livro', f: { autores: 'Maurice Tardif', titulo: 'Saberes docentes e formação profissional', subtitulo: '', edicao: '17', cidade: 'Petrópolis', editora: 'Vozes', ano: '2014' } }
    ];
    s.apx = [{ id: uid(), title: 'Questionário aplicado aos professores', text: 'As perguntas a seguir foram respondidas pelos professores do curso técnico:\n- Com que frequência você utiliza os laboratórios de informática?\n- Você já teve uma aula prejudicada por conflito de horário?\n- Como você reserva o laboratório atualmente?' }];
    return s;
  }

  var state, ui = { step: 'inicio', ref: { type: 'livro', f: {}, edit: null }, imp: null }, dl = null;
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { var s = JSON.parse(raw); if (s && s.v === 1 && s.meta && s.secs) { if (s.example && s.meta.subtitulo === 'sistema web para agendamento dos laboratórios de informática') s.meta.subtitulo = 'Sistema Web para Agendamento dos Laboratórios de Informática'; return Object.assign(blank(), s); } }
    } catch (e) { /* sem armazenamento */ }
    return example();
  }
  var saveT, saveNote = '';
  function save() {
    clearTimeout(saveT);
    saveT = setTimeout(function () {
      try { localStorage.setItem(KEY, JSON.stringify(state)); saveNote = ''; }
      catch (e) {
        try {
          var lite = JSON.parse(JSON.stringify(state));
          Object.keys(lite.figs).forEach(function (k) { lite.figs[k].data = ''; });
          localStorage.setItem(KEY, JSON.stringify(lite));
          saveNote = 'As imagens são grandes demais para o rascunho automático. Salve uma cópia do projeto para não perdê-las.';
        } catch (e2) { saveNote = 'O rascunho automático não está disponível neste navegador. Salve uma cópia do projeto antes de sair.'; }
      }
    }, 500);
  }
  function getPath(p) { var o = p.indexOf('ui.') === 0 ? ui : state, ks = p.replace(/^ui\./, '').split('.'); for (var i = 0; i < ks.length; i++) o = o == null ? o : o[ks[i]]; return o; }
  function setPath(p, v) { var o = p.indexOf('ui.') === 0 ? ui : state, ks = p.replace(/^ui\./, '').split('.'); for (var i = 0; i < ks.length - 1; i++) o = o[ks[i]]; o[ks[ks.length - 1]] = v; }

  /* ---------------- referências (NBR 6023) ---------------- */
  var SUF = /^(filho|júnior|junior|neto|sobrinho|jr\.?)$/i, ART = /^(o|a|os|as|um|uma|uns|umas|the|an?)$/i;
  var MES = ['jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
  function upper(s) { return String(s).toLocaleUpperCase('pt-BR'); }
  function dot(s) { s = String(s).trim(); return !s ? '' : /[.!?]$/.test(s) ? s : s + '.'; }
  function splitName(n) {
    n = n.trim();
    if (n.indexOf(',') >= 0) { var p = n.split(','); return { sur: p[0].trim(), given: p.slice(1).join(',').trim() }; }
    var t = n.split(/\s+/); if (t.length === 1) return { sur: t[0], given: '' };
    var sur = [t.pop()]; if (SUF.test(sur[0]) && t.length > 1) sur.unshift(t.pop());
    return { sur: sur.join(' '), given: t.join(' ') };
  }
  function cap(s) { return s.toLocaleLowerCase('pt-BR').replace(/(^|[\s-])(\S)/g, function (m, a, b) { return a + b.toLocaleUpperCase('pt-BR'); }); }
  function people(f) { return A.authors(f.autores || ''); }
  function fmtAuthors(f) {
    var list = people(f); if (!list.length) return '';
    if (f.inst) return dot(upper(list[0]));
    var out = list.map(function (n) { var p = splitName(n); return upper(p.sur) + (p.given ? ', ' + p.given : ''); });
    if (out.length > 3) return out[0] + ' *et al.*';
    return dot(out.join('; '));
  }
  function firstCaps(t) {
    var w = t.trim().split(/\s+/); if (!w.length) return '';
    w[0] = upper(w[0]); if (ART.test(w[0]) && w[1]) w[1] = upper(w[1]);
    return w.join(' ');
  }
  function fmtDate(iso) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); return m ? parseInt(m[3], 10) + ' ' + MES[parseInt(m[2], 10) - 1] + ' ' + m[1] : ''; }
  function online(f) {
    var u = (f.url || '').trim(); if (!u) return '';
    var d = fmtDate(f.acesso);
    return ' Disponível em: ' + u + '.' + (d ? ' Acesso em: ' + d + '.' : '');
  }
  function title(f, bold) {
    var t = (f.titulo || '').trim().replace(/[.:]+$/, ''), s = (f.subtitulo || '').trim().replace(/[.]+$/, '');
    if (!t) return '';
    return (bold ? '**' + t + '**' : t) + (s ? ': ' + s : '') + '.';
  }
  function fmtRef(r) {
    var f = r.f || {}, a = fmtAuthors(f), ano = (f.ano || '').trim(), o = [];
    if (r.type === 'livre') return (f.texto || '').trim();
    if (r.type === 'livro') {
      o.push(a ? a : ''); o.push(a ? title(f, true) : dot(firstCaps((f.titulo || '') + (f.subtitulo ? ': ' + f.subtitulo : ''))));
      if (f.edicao && String(f.edicao).trim() !== '1') o.push(String(f.edicao).trim().replace(/\D+$/, '') + '. ed.');
      o.push(((f.cidade || '').trim() || '[*S. l.*]') + ': ' + ((f.editora || '').trim() || '[*s. n.*]') + ', ' + (ano || '[' + new Date().getFullYear() + '?]') + '.');
    } else if (r.type === 'artigo') {
      o.push(a); o.push(title(f, false));
      var parts = ['**' + (f.revista || '').trim() + '**'];
      if ((f.cidade || '').trim()) parts.push(f.cidade.trim());
      if ((f.volume || '').trim()) parts.push('v. ' + f.volume.trim());
      if ((f.numero || '').trim()) parts.push('n. ' + f.numero.trim());
      if ((f.pini || '').trim()) parts.push('p. ' + f.pini.trim() + ((f.pfim || '').trim() ? '-' + f.pfim.trim() : ''));
      if (ano) parts.push(ano);
      o.push(parts.join(', ') + '.');
    } else if (r.type === 'site') {
      o.push(a); o.push(a ? title(f, true) : dot(firstCaps((f.titulo || '') + (f.subtitulo ? ': ' + f.subtitulo : ''))));
      var y = ano || '[' + ((f.acesso || '').slice(0, 4) || new Date().getFullYear()) + '?]';
      o.push(((f.site || '').trim() ? f.site.trim() + ', ' : '') + y + '.');
    } else if (r.type === 'tcc') {
      o.push(a); o.push(title(f, true)); if (ano) o.push(ano + '.');
      o.push((f.tipo || 'Trabalho de Conclusão de Curso') + ((f.curso || '').trim() ? ' (' + f.curso.trim() + ')' : '') + ' – ' + [(f.instituicao || '').trim(), (f.cidade || '').trim(), ano].filter(Boolean).join(', ') + '.');
    } else if (r.type === 'video') {
      o.push(dot(firstCaps(f.titulo || '')));
      o.push('[*S. l.*: *s. n.*], ' + (ano || '[' + new Date().getFullYear() + '?]') + '.');
      o.push('1 vídeo' + ((f.duracao || '').trim() ? ' (' + f.duracao.trim().replace(/\s*min.*$/i, '') + ' min)' : '') + '.');
      if ((f.canal || '').trim()) o.push('Publicado pelo canal ' + f.canal.trim() + '.');
    }
    return o.filter(Boolean).join(' ') + online(f);
  }
  function cite(r) {
    var f = r.f || {}, ano = (f.ano || '').trim() || 's. d.';
    if (r.type === 'livre') return null;
    var list = r.type === 'video' ? [] : people(f), par, nar;
    if (!list.length) { var w = firstCaps(f.titulo || '').split(/\s+/); par = nar = cap(w.slice(0, ART.test(w[0]) ? 2 : 1).join(' ')) + '...'; }
    else if (f.inst) par = nar = list[0];
    else {
      var s = list.map(function (n) { return cap(splitName(n).sur); });
      if (s.length > 3) par = nar = s[0] + ' et al.';
      else { par = s.join('; '); nar = s.length === 1 ? s[0] : s.slice(0, -1).join(', ') + ' e ' + s[s.length - 1]; }
    }
    return { par: '(' + par + ', ' + ano + ')', nar: nar + ' (' + ano + ')', key: list.length && !f.inst ? splitName(list[0]).sur : (list[0] || '') };
  }
  var RTYPES = {
    livro: { n: 'Livro', fields: [['autores', 'Autores (um por linha, na ordem normal)', 'ta', 'Maurice Tardif'], ['inst', 'O autor é uma instituição ou empresa', 'ck'], ['titulo', 'Título', '', 'Saberes docentes e formação profissional'], ['subtitulo', 'Subtítulo (se houver)', ''], ['edicao', 'Edição (número)', 's', '17'], ['cidade', 'Cidade da editora', 's', 'Petrópolis'], ['editora', 'Editora', 's', 'Vozes'], ['ano', 'Ano', 's', '2014'], ['url', 'Link (só se leu on-line)', ''], ['acesso', 'Data de acesso', 'd']] },
    artigo: { n: 'Artigo de revista', fields: [['autores', 'Autores (um por linha, na ordem normal)', 'ta', 'Ana Carla Pereira'], ['titulo', 'Título do artigo', ''], ['subtitulo', 'Subtítulo (se houver)', ''], ['revista', 'Nome da revista', '', 'Revista Brasileira de Informática na Educação'], ['cidade', 'Cidade da revista', 's', 'Porto Alegre'], ['volume', 'Volume', 's', '29'], ['numero', 'Número', 's', '2'], ['pini', 'Página inicial', 's', '45'], ['pfim', 'Página final', 's', '60'], ['ano', 'Ano', 's', '2023'], ['url', 'Link (se leu on-line)', ''], ['acesso', 'Data de acesso', 'd']] },
    site: { n: 'Site', fields: [['autores', 'Autor ou instituição (deixe vazio se não houver)', 'ta', 'IBGE'], ['inst', 'O autor é uma instituição ou empresa', 'ck'], ['titulo', 'Título da página', '', 'Censo 2022'], ['subtitulo', 'Subtítulo (se houver)', ''], ['site', 'Nome do site', 's', 'IBGE'], ['ano', 'Ano da publicação', 's', '2023'], ['url', 'Link completo', '', 'https://...'], ['acesso', 'Data em que você acessou', 'd']] },
    tcc: { n: 'TCC ou dissertação', fields: [['autores', 'Autor', 'ta'], ['titulo', 'Título', ''], ['subtitulo', 'Subtítulo (se houver)', ''], ['tipo', 'Tipo de trabalho', 'sel', ['Trabalho de Conclusão de Curso', 'Dissertação', 'Tese']], ['curso', 'Curso ou grau', 's', 'Graduação em Pedagogia'], ['instituicao', 'Instituição', '', 'Universidade Federal da Bahia'], ['cidade', 'Cidade', 's', 'Salvador'], ['ano', 'Ano', 's', '2022'], ['url', 'Link (se leu on-line)', ''], ['acesso', 'Data de acesso', 'd']] },
    video: { n: 'Vídeo on-line', fields: [['titulo', 'Título do vídeo', ''], ['canal', 'Nome do canal', 's'], ['ano', 'Ano da publicação', 's'], ['duracao', 'Duração em minutos', 's', '12'], ['url', 'Link do vídeo', ''], ['acesso', 'Data em que você assistiu', 'd']] },
    livre: { n: 'Colar pronta', fields: [['texto', 'Referência já formatada (coloque o título entre ** para sair em negrito)', 'ta', 'SOBRENOME, Nome. **Título**. Cidade: Editora, ano.']] }
  };

  /* ---------------- ícones ---------------- */
  var IC = {
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="7.6" r="1.2" fill="currentColor"/></svg>',
    home: '<svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    capa: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 8h6M9 12h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    resumo: '<svg viewBox="0 0 24 24"><path d="M5 6h14M5 10h14M5 14h14M5 18h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    texto: '<svg viewBox="0 0 24 24"><path d="M4 6h7M4 12h16M4 18h16M15 4v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    refs: '<svg viewBox="0 0 24 24"><path d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M5 17a3 3 0 0 1 3-3h9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    extras: '<svg viewBox="0 0 24 24"><path d="M15 7l-6.5 6.5a2.1 2.1 0 0 0 3 3L18 10a4 4 0 0 0-5.700-5.700L5.800 10.800a6 6 0 0 0 8.500 8.500L19 14.600" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    final: '<svg viewBox="0 0 24 24"><path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    eye: '<svg viewBox="0 0 24 24"><path d="M2.500 12S6 5.500 12 5.500 21.500 12 21.500 12 18 18.500 12 18.500 2.500 12 2.500 12z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.800" fill="currentColor"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    up: '<svg viewBox="0 0 24 24"><path d="M6 14l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    down: '<svg viewBox="0 0 24 24"><path d="M6 10l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14m0 0l-5-5m5 5l-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    paste: '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="12" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="9" y="3" width="6" height="4" rx="1" fill="currentColor"/><path d="M9 12h6M9 16h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12.500l4.500 4.500L19 7.500" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    warn: '<svg viewBox="0 0 24 24"><path d="M12 8v5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="16.500" r="1.300" fill="currentColor"/></svg>',
    edit: '<svg viewBox="0 0 24 24"><path d="M5 19l1-4L16 5l3 3L9 18z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>'
  };
  function ic(n) { return '<span class="ic">' + IC[n] + '</span>'; }
  function ibtn(topic, target) { return '<button type="button" class="ibtn" data-a="info" data-topic="' + topic + '"' + (target ? ' data-target="' + target + '"' : '') + ' aria-label="Como fazer esta parte">' + IC.info + '</button>'; }

  /* ---------------- passos ---------------- */
  var STEPS = [
    { id: 'inicio', n: 'Início', ic: 'home' }, { id: 'capa', n: 'Capa', ic: 'capa' }, { id: 'resumo', n: 'Resumo', ic: 'resumo' },
    { id: 'texto', n: 'Texto', ic: 'texto' }, { id: 'referencias', n: 'Referências', ic: 'refs' },
    { id: 'apendices', n: 'Apêndices e anexos', ic: 'extras' }, { id: 'gerar', n: 'Revisar e gerar', ic: 'final' }
  ];
  function topicFor(t) {
    t = (t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    if (/introdu/.test(t)) return 'introducao';
    if (/referencial|fundamenta|revis|teoric/.test(t)) return 'referencial';
    if (/metod|materia/.test(t)) return 'metodologia';
    if (/resultado|discuss|desenvolvimento|analise/.test(t)) return 'resultados';
    if (/conclus|considera/.test(t)) return 'conclusao';
    return 'secao';
  }
  function field(label, path, o) {
    o = o || {};
    var v = getPath(path), id = 'f-' + path.replace(/\W/g, '-');
    var lab = '<label for="' + id + '">' + h(label) + (o.info ? ibtn(o.info, o.tpl ? id : '') : '') + '</label>';
    var ctl;
    if (o.ta) ctl = '<textarea id="' + id + '" data-b="' + path + '" rows="' + (o.rows || 3) + '" placeholder="' + h(o.ph || '') + '">' + h(v) + '</textarea>';
    else if (o.sel) ctl = '<select id="' + id + '" data-b="' + path + '">' + o.sel.map(function (x) { return '<option' + (x === v ? ' selected' : '') + '>' + h(x) + '</option>'; }).join('') + '</select>';
    else ctl = '<input id="' + id + '" data-b="' + path + '" type="' + (o.type || 'text') + '" value="' + h(v) + '" placeholder="' + h(o.ph || '') + '"' + (o.mode ? ' inputmode="' + o.mode + '"' : '') + '>';
    return '<div class="fld' + (o.cls ? ' ' + o.cls : '') + '">' + lab + ctl + (o.hint ? '<p class="hint">' + o.hint + '</p>' : '') + (o.meter ? '<p class="meter" data-meter="' + o.meter + '" data-path="' + path + '"></p>' : '') + '</div>';
  }
  function check(label, path) { var id = 'f-' + path.replace(/\W/g, '-'); return '<label class="ck" for="' + id + '"><input type="checkbox" id="' + id + '" data-b="' + path + '"' + (getPath(path) ? ' checked' : '') + '><span>' + h(label) + '</span></label>'; }
  function toolbar(taId, lite) {
    var b = function (k, t, tip) { return '<button type="button" data-a="ins" data-k="' + k + '" data-ta="' + taId + '" title="' + tip + '">' + t + '</button>'; };
    return '<div class="tools" role="toolbar" aria-label="Marcações">' +
      (lite ? '' : b('h2', 'Subseção', 'Título de subseção (1.1)') + b('h3', 'Sub-subseção', 'Título de terceiro nível (1.1.1)')) +
      b('list', 'Lista a) b)', 'Itens em alíneas') + (lite ? '' : b('quote', 'Citação longa', 'Citação direta com mais de três linhas')) +
      b('fig', 'Figura', 'Inserir imagem com título e fonte') + b('tab', 'Tabela', 'Inserir tabela com título e fonte') +
      b('b', '<b>N</b>', 'Negrito') + b('i', '<i>I</i>', 'Itálico') + b('join', 'Unir linhas', 'Junta linhas quebradas de texto copiado de PDF') +
      '</div>';
  }

  var V = {};
  V.inicio = function () {
    var tiles = STEPS.slice(1, 6).map(function (s) { return '<a class="tile" href="#' + s.id + '"><span class="tile-ic">' + IC[s.ic] + '</span><span>' + s.n + '</span></a>'; }).join('');
    return '<section class="hero"><p class="eyebrow">Trabalho de conclusão de curso</p><h1>Você escreve.<br>A formatação ABNT fica por conta do app.</h1>' +
      '<p>Cole cada parte do trabalho no campo certo. No final, você baixa um PDF com capa, sumário, numeração, citações, figuras e referências no lugar.</p>' +
      '<div class="row"><a class="btn lime" href="#capa">Preencher por partes ' + ic('arrow') + '</a><button class="btn ghost-dark" data-a="import">' + ic('paste') + ' Colar o trabalho inteiro</button></div></section>' +
      '<nav class="tiles" aria-label="Partes do trabalho">' + tiles + '</nav>' +
      '<section class="card"><h2>O que sai pronto no PDF</h2><ul class="rules">' +
      ['Papel A4, margens de 3 cm (superior e esquerda) e 2 cm (inferior e direita)', 'Letra tamanho 12 no texto e 10 em citações longas, legendas e número da página', 'Espaçamento 1,5 no texto e simples em citações longas e referências', 'Número da página no canto superior direito, a partir da Introdução', 'Seções e subseções numeradas, com o destaque de cada nível', 'Sumário montado sozinho, com os mesmos títulos do texto', 'Figuras e tabelas numeradas, com título em cima e fonte embaixo', 'Referências em ordem alfabética, com o título em negrito'].map(function (r) { return '<li>' + ic('check') + '<span>' + r + '</span></li>'; }).join('') +
      '</ul></section>' +
      '<section class="card"><h2>Ajustes do documento</h2><div class="grid2">' +
      '<div class="fld"><label for="f-font">Tipo de letra</label><select id="f-font" data-b="font"><option value="sans"' + (state.font === 'sans' ? ' selected' : '') + '>Arial (sem serifa)</option><option value="serif"' + (state.font === 'serif' ? ' selected' : '') + '>Times New Roman (com serifa)</option></select><p class="hint">A norma aceita as duas. Veja qual a sua escola pede.</p></div>' +
      '<div class="fld"><span class="lab">Listas opcionais antes do sumário</span>' + check('Lista de ilustrações', 'lists.fig') + check('Lista de tabelas', 'lists.tab') + '</div></div></section>' +
      '<section class="card"><h2>Seu projeto</h2><p class="hint">O rascunho fica salvo neste navegador. Para continuar em outro aparelho ou guardar uma cópia segura, salve o arquivo do projeto.</p>' +
      '<div class="row"><button class="btn" data-a="exportProj">Salvar cópia do projeto</button><label class="btn" for="projFile">Abrir cópia salva</label><input type="file" id="projFile" accept=".json,application/json" hidden>' +
      '<button class="btn" data-a="askBlank">Começar em branco</button><button class="btn" data-a="askExample">Ver o exemplo</button></div>' +
      '<p class="hint" id="saveNote">' + h(saveNote) + '</p></section>';
  };
  V.capa = function () {
    return '<header class="step-h"><h1>Capa e identificação</h1><p>Esses dados montam a capa, a folha de rosto e a folha de aprovação.</p></header>' +
      '<section class="card"><h2>Instituição e autores ' + ibtn('capa') + '</h2>' +
      '<div class="fld"><label for="logoFile">Brasão ou logotipo da escola (opcional)</label><div class="logo-row">' + (state.meta.logo ? '<img src="' + state.meta.logo.data + '" alt="Brasão atual"><button type="button" class="btn sm" data-a="logoDel">Remover</button>' : '') + '<input type="file" id="logoFile" accept="image/*"></div><p class="hint">Aparece no alto da capa, antes do nome da escola.</p></div>' +
      field('Instituição', 'meta.inst', { ph: 'Colégio Estadual de Aplicação Anísio Teixeira' }) +
      field('Curso', 'meta.curso', { ph: 'Curso Técnico em Informática' }) +
      field('Autores (um por linha)', 'meta.autores', { ta: 1, rows: 3, ph: 'Nome completo do primeiro autor\nNome completo do segundo autor' }) +
      field('Título do trabalho', 'meta.titulo', { ph: 'Título, sem ponto final' }) +
      field('Subtítulo (opcional)', 'meta.subtitulo', { ph: 'Complemento do título' }) +
      '<div class="grid2">' + field('Cidade', 'meta.cidade', { ph: 'Salvador' }) + field('Ano de entrega', 'meta.ano', { ph: '2026', mode: 'numeric' }) + '</div></section>' +
      '<section class="card"><h2>Folha de rosto ' + ibtn('natureza') + '</h2>' +
      field('Natureza do trabalho', 'meta.natureza', { ta: 1, rows: 4, ph: 'Trabalho de Conclusão de Curso apresentado ao ..., como requisito parcial para a obtenção do título de ...' }) +
      '<div class="row"><button class="btn sm" data-a="natureza">Gerar texto padrão</button></div>' +
      '<div class="grid2">' + field('Orientador(a)', 'meta.orient', { ph: 'Prof. Me. Nome Sobrenome' }) + field('Coorientador(a) (opcional)', 'meta.coorient', {}) + '</div></section>' +
      '<section class="card"><h2>Folha de aprovação ' + ibtn('aprovacao') + '</h2>' + check('Incluir folha de aprovação', 'aprov.on') +
      '<div class="' + (state.aprov.on ? '' : 'off') + '" id="aprovBox">' +
      field('Banca examinadora (um por linha: Nome – Instituição)', 'aprov.banca', { ta: 1, rows: 3, ph: 'Prof. Me. João Pereira da Silva – Colégio Estadual de Aplicação Anísio Teixeira\nProfa. Dra. Maria Oliveira – Universidade Federal da Bahia' }) +
      field('Data da aprovação (opcional)', 'aprov.data', { ph: '10 de dezembro de 2026' }) + '</div></section>';
  };
  V.resumo = function () {
    return '<header class="step-h"><h1>Resumo</h1><p>Resumo em português, versão em inglês e as páginas opcionais do começo do trabalho.</p></header>' +
      '<section class="card"><h2>Resumo ' + ibtn('resumo', 'f-resumo') + '</h2>' + field('Texto do resumo', 'resumo', { ta: 1, rows: 9, ph: 'Um parágrafo só, de 150 a 500 palavras.', meter: 'resumo' }) +
      field('Palavras-chave', 'chaves', { ph: 'agendamento; desenvolvimento web; laboratório de informática', info: 'chaves', meter: 'chaves' }) + '</section>' +
      '<section class="card"><h2>Abstract ' + ibtn('abstract') + '</h2>' + field('Resumo em inglês', 'abstract', { ta: 1, rows: 9, ph: 'A mesma informação do resumo, em inglês.', meter: 'abstract' }) +
      field('Keywords', 'keywords', { ph: 'scheduling; web development; computer lab', meter: 'chaves' }) + '</section>' +
      '<section class="card"><h2>Páginas opcionais ' + ibtn('opcionais') + '</h2><p class="hint">Deixe em branco o que não for usar.</p>' +
      field('Dedicatória', 'opc.dedic', { ta: 1, rows: 2 }) + field('Agradecimentos', 'opc.agrad', { ta: 1, rows: 4 }) + field('Epígrafe', 'opc.epig', { ta: 1, rows: 2, ph: '"Frase citada" (Autor, ano, p. 00).' }) + '</section>';
  };
  function secCard(s, i, n) {
    var id = 'ta-sec-' + s.id, tp = topicFor(s.title);
    return '<section class="card sec"><div class="sec-h"><span class="badge">' + (i + 1) + '</span>' +
      '<input class="sec-t" data-b="secs.' + i + '.title" value="' + h(s.title) + '" placeholder="Título da seção" aria-label="Título da seção ' + (i + 1) + '">' +
      '<button type="button" class="ibtn" data-a="info" data-topic="' + tp + '" data-target="' + id + '" data-sec="' + i + '" aria-label="Como fazer esta seção">' + IC.info + '</button></div>' +
      toolbar(id) + '<textarea id="' + id + '" class="big" data-b="secs.' + i + '.text" rows="8" placeholder="Cole ou escreva aqui o texto desta seção. Cada linha nova vira um parágrafo.">' + h(s.text) + '</textarea>' +
      '<div class="sec-f"><p class="meter" data-meter="words" data-path="secs.' + i + '.text"></p><span class="grow"></span>' +
      '<button class="mini" data-a="secUp" data-i="' + i + '"' + (i === 0 ? ' disabled' : '') + ' aria-label="Mover para cima">' + IC.up + '</button>' +
      '<button class="mini" data-a="secDown" data-i="' + i + '"' + (i === n - 1 ? ' disabled' : '') + ' aria-label="Mover para baixo">' + IC.down + '</button>' +
      '<button class="mini" data-a="secDel" data-i="' + i + '" aria-label="Excluir seção">' + IC.trash + '</button></div></section>';
  }
  function mediaList() {
    var figs = Object.keys(state.figs).map(function (k) { return state.figs[k]; }), tabs = Object.keys(state.tabs).map(function (k) { return state.tabs[k]; });
    if (!figs.length && !tabs.length) return '<p class="hint">Nenhuma figura ou tabela ainda. Coloque o cursor no ponto do texto onde ela deve aparecer e use os botões Figura ou Tabela.</p>';
    var all = JSON.stringify([state.secs, state.apx, state.anx]);
    return '<ul class="media">' + figs.map(function (f) {
      return '<li><img src="' + f.data + '" alt=""><div><b>' + h(f.title || 'Figura sem título') + '</b><span>' + (all.indexOf('[[fig-' + f.id) >= 0 ? 'Figura inserida no texto' : 'Ainda não inserida no texto') + '</span></div>' +
        '<button class="mini" data-a="figEdit" data-id="' + f.id + '" aria-label="Editar figura">' + IC.edit + '</button><button class="mini" data-a="figDel" data-id="' + f.id + '" aria-label="Excluir figura">' + IC.trash + '</button></li>';
    }).join('') + tabs.map(function (t) {
      return '<li><span class="tabic">' + IC.resumo + '</span><div><b>' + h(t.title || 'Tabela sem título') + '</b><span>' + (all.indexOf('[[tab-' + t.id) >= 0 ? 'Tabela inserida no texto' : 'Ainda não inserida no texto') + '</span></div>' +
        '<button class="mini" data-a="tabEdit" data-id="' + t.id + '" aria-label="Editar tabela">' + IC.edit + '</button><button class="mini" data-a="tabDel" data-id="' + t.id + '" aria-label="Excluir tabela">' + IC.trash + '</button></li>';
    }).join('') + '</ul>';
  }
  V.texto = function () {
    return '<header class="step-h"><h1>Texto</h1><p>Uma caixa para cada seção. O app numera, aplica os títulos e começa cada seção em página nova.</p>' +
      '<div class="row"><button class="btn sm" data-a="info" data-topic="formatacao">' + ic('info') + ' Subseções e listas</button><button class="btn sm" data-a="info" data-topic="citacoes">' + ic('info') + ' Como citar</button>' +
      '<button class="btn sm" data-a="info" data-topic="figuras">' + ic('info') + ' Figuras</button><button class="btn sm" data-a="info" data-topic="tabelas">' + ic('info') + ' Tabelas</button></div></header>' +
      state.secs.map(function (s, i) { return secCard(s, i, state.secs.length); }).join('') +
      '<button class="btn add" data-a="secAdd">' + ic('plus') + ' Adicionar seção</button>' +
      '<section class="card"><h2>Figuras e tabelas do trabalho</h2>' + mediaList() + '</section>';
  };
  function refForm() {
    var T = RTYPES[ui.ref.type];
    return '<div class="chips">' + Object.keys(RTYPES).map(function (k) { return '<button type="button" class="chip' + (k === ui.ref.type ? ' on' : '') + '" data-a="refType" data-k="' + k + '">' + RTYPES[k].n + '</button>'; }).join('') + '</div>' +
      '<div class="grid2 refgrid">' + T.fields.map(function (f) {
        var p = 'ui.ref.f.' + f[0];
        if (getPath(p) === undefined) setPath(p, f[2] === 'ck' ? false : f[2] === 'sel' ? f[3][0] : '');
        if (f[2] === 'ck') return '<div class="fld wide">' + check(f[1], p) + '</div>';
        if (f[2] === 'ta') return field(f[1], p, { ta: 1, rows: 2, ph: f[3], cls: 'wide' });
        if (f[2] === 'sel') return field(f[1], p, { sel: f[3] });
        if (f[2] === 'd') return field(f[1], p, { type: 'date' });
        return field(f[1], p, { ph: f[3], cls: f[2] === 's' ? '' : 'wide' });
      }).join('') + '</div>' +
      '<div class="refprev"><span class="lab">Como vai sair</span><p id="refPrev"></p></div>' +
      '<div class="row"><button class="btn forest" data-a="refSave">' + (ui.ref.edit ? 'Salvar alteração' : 'Adicionar à lista') + '</button>' + (ui.ref.edit ? '<button class="btn" data-a="refCancel">Cancelar</button>' : '') + '</div>';
  }
  function sortedRefs() {
    return state.refs.map(function (r) { return { r: r, s: fmtRef(r) }; }).sort(function (a, b) { return A.plain(a.s).localeCompare(A.plain(b.s), 'pt', { sensitivity: 'base' }); });
  }
  V.referencias = function () {
    var list = sortedRefs();
    return '<header class="step-h"><h1>Referências</h1><p>Preencha os dados de cada fonte. O app monta a referência, ordena a lista e mostra como citar no texto.</p></header>' +
      '<section class="card" id="refCard"><h2>' + (ui.ref.edit ? 'Editar referência' : 'Nova referência') + ' ' + ibtn('referencias') + '</h2>' + refForm() + '</section>' +
      '<section class="card"><h2>Lista de referências <span class="count">' + list.length + '</span></h2>' +
      (list.length ? '<ol class="reflist">' + list.map(function (x) {
        var c = cite(x.r);
        return '<li><p class="reftext">' + md(x.s) + '</p>' + (c ? '<div class="cites"><span>No texto:</span><button class="cite" data-a="copy" data-t="' + h(c.par) + '">' + h(c.par) + '</button><button class="cite" data-a="copy" data-t="' + h(c.nar) + '">' + h(c.nar) + '</button></div>' : '') +
          '<div class="acts"><button class="mini" data-a="refEdit" data-id="' + x.r.id + '" aria-label="Editar referência">' + IC.edit + '</button><button class="mini" data-a="refDel" data-id="' + x.r.id + '" aria-label="Excluir referência">' + IC.trash + '</button></div></li>';
      }).join('') + '</ol>' : '<p class="hint">Nenhuma referência ainda. Adicione todas as fontes que você citou no texto.</p>') + '</section>';
  };
  function extraCards(key, word, topic) {
    return state[key].map(function (a, i) {
      var id = 'ta-' + key + '-' + a.id;
      return '<section class="card sec"><div class="sec-h"><span class="badge">' + String.fromCharCode(65 + i) + '</span>' +
        '<input class="sec-t" data-b="' + key + '.' + i + '.title" value="' + h(a.title) + '" placeholder="Título do ' + word.toLowerCase() + '" aria-label="Título do ' + word + ' ' + String.fromCharCode(65 + i) + '">' + ibtn(topic) + '</div>' +
        toolbar(id, true) + '<textarea id="' + id + '" class="big" data-b="' + key + '.' + i + '.text" rows="5" placeholder="Cole o texto ou insira as imagens deste ' + word.toLowerCase() + '.">' + h(a.text) + '</textarea>' +
        '<div class="sec-f"><span class="grow"></span><button class="mini" data-a="xDel" data-key="' + key + '" data-i="' + i + '" aria-label="Excluir">' + IC.trash + '</button></div></section>';
    }).join('');
  }
  V.apendices = function () {
    return '<header class="step-h"><h1>Apêndices e anexos</h1><p>Materiais complementares que vão depois das referências. Cada um começa em página nova e recebe uma letra.</p></header>' +
      '<div class="twohead"><h2>Apêndices ' + ibtn('apendice') + '</h2><p>Material feito por você: questionário, roteiro, código, manual.</p></div>' +
      extraCards('apx', 'Apêndice', 'apendice') + '<button class="btn add" data-a="xAdd" data-key="apx">' + ic('plus') + ' Adicionar apêndice</button>' +
      '<div class="twohead"><h2>Anexos ' + ibtn('anexo') + '</h2><p>Material de outros autores: leis, manuais, documentos, mapas.</p></div>' +
      extraCards('anx', 'Anexo', 'anexo') + '<button class="btn add" data-a="xAdd" data-key="anx">' + ic('plus') + ' Adicionar anexo</button>';
  };

  /* ---------------- revisão ---------------- */
  function allText() { return state.secs.concat(state.apx, state.anx).map(function (s) { return s.text; }).join('\n') + '\n' + state.opc.epig; }
  function checks() {
    var m = state.meta, out = [], t = allText();
    function add(ok, msg, step, warnOnly) { out.push({ ok: ok, msg: msg, step: step, soft: warnOnly }); }
    add(!!m.inst.trim(), m.inst.trim() ? 'Instituição informada' : 'Falta o nome da instituição', 'capa');
    add(A.authors(m.autores).length > 0, A.authors(m.autores).length ? 'Autores informados' : 'Falta o nome dos autores', 'capa');
    add(!!m.titulo.trim(), m.titulo.trim() ? 'Título informado' : 'Falta o título do trabalho', 'capa');
    add(!!m.cidade.trim() && !!m.ano.trim(), m.cidade.trim() && m.ano.trim() ? 'Cidade e ano informados' : 'Faltam cidade ou ano', 'capa');
    add(!!m.natureza.trim() && !!m.orient.trim(), m.natureza.trim() && m.orient.trim() ? 'Folha de rosto completa' : 'Falta a natureza do trabalho ou o orientador', 'capa');
    var w = words(state.resumo);
    add(w >= 150 && w <= 500, !w ? 'Falta o resumo' : w < 150 ? 'Resumo com ' + w + ' palavras: o mínimo é 150' : w > 500 ? 'Resumo com ' + w + ' palavras: o máximo é 500' : 'Resumo com ' + w + ' palavras', 'resumo');
    var nk = A.keywords(state.chaves).split(';').filter(function (x) { return x.trim(); }).length;
    add(nk >= 3 && nk <= 5, !nk ? 'Faltam as palavras-chave' : nk < 3 ? 'Use pelo menos 3 palavras-chave' : nk > 5 ? 'Use no máximo 5 palavras-chave' : nk + ' palavras-chave', 'resumo');
    add(!!state.abstract.trim() && !!state.keywords.trim(), state.abstract.trim() && state.keywords.trim() ? 'Abstract e keywords preenchidos' : 'Falta o abstract ou as keywords', 'resumo');
    var empty = state.secs.filter(function (s) { return !s.text.trim(); }).map(function (s) { return s.title || 'sem título'; });
    add(!empty.length && state.secs.length > 0, empty.length ? 'Seções sem texto: ' + empty.join(', ') : 'Todas as seções têm texto', 'texto');
    var old = t.match(/\(([A-ZÀ-Ý]{3,}(?:[;,]? (?:[A-ZÀ-Ý]{2,}|et al\.))*), (?:\d{4}|s\. ?d\.)/g);
    if (old) add(false, 'Citação no formato antigo, como ' + old[0] + '). Escreva o sobrenome só com a inicial maiúscula, a não ser que seja sigla', 'texto', true);
    var figMiss = Object.keys(state.figs).filter(function (k) { return t.indexOf('[[fig-' + k) < 0; }).length + Object.keys(state.tabs).filter(function (k) { return t.indexOf('[[tab-' + k) < 0; }).length;
    if (figMiss) add(false, figMiss + ' figura(s) ou tabela(s) criada(s) mas não inserida(s) no texto', 'texto', true);
    add(state.refs.length > 0, state.refs.length ? state.refs.length + ' referência(s) na lista' : 'Falta a lista de referências', 'referencias');
    var low = t.toLocaleLowerCase('pt-BR'), nc = [];
    state.refs.forEach(function (r) { var c = cite(r); if (c && c.key && low.indexOf(c.key.toLocaleLowerCase('pt-BR')) < 0) nc.push(cap(c.key)); });
    if (nc.length) add(false, 'Referência não citada no texto: ' + nc.join(', ') + '. Cite no texto ou retire da lista', 'referencias', true);
    var ap = t.match(/Ap[êe]ndice ([A-Z])\b/g) || [], an = t.match(/Anexo ([A-Z])\b/g) || [];
    ap.forEach(function (x) { var i = x.slice(-1).charCodeAt(0) - 65; if (!state.apx[i] && !out.some(function (o) { return o.k === x; })) out.push({ ok: false, k: x, msg: 'O texto cita o ' + x + ', mas ele não existe', step: 'apendices', soft: true }); });
    an.forEach(function (x) { var i = x.slice(-1).charCodeAt(0) - 65; if (!state.anx[i] && !out.some(function (o) { return o.k === x; })) out.push({ ok: false, k: x, msg: 'O texto cita o ' + x + ', mas ele não existe', step: 'apendices', soft: true }); });
    return out;
  }
  V.gerar = function () {
    var cs = checks(), bad = cs.filter(function (c) { return !c.ok; }).length;
    return '<header class="step-h"><h1>Revisar e gerar</h1><p>Confira os avisos e baixe o PDF. Dá para gerar mesmo com pendências e voltar depois.</p></header>' +
      '<section class="hero gen"><div><p class="eyebrow">' + (bad ? bad + ' ponto(s) para conferir' : 'Tudo certo') + '</p><h1 id="genPages">PDF pronto para gerar</h1>' +
      '<p>O arquivo sai com letra ' + (state.font === 'serif' ? 'Times New Roman' : 'Arial') + ', sumário e numeração de páginas montados automaticamente.</p></div>' +
      '<div class="row"><button class="btn lime big-btn" data-a="pdf">' + ic('final') + ' Baixar PDF</button><button class="btn ghost-dark only-mobile" data-a="preview">' + ic('eye') + ' Ver prévia</button></div><p class="gen-note" id="genNote"></p></section>' +
      '<section class="card"><h2>Conferência</h2><ul class="checks">' + cs.map(function (c) {
        return '<li class="' + (c.ok ? 'ok' : c.soft ? 'soft' : 'bad') + '"><span class="st">' + (c.ok ? IC.check : IC.warn) + '</span><span>' + h(c.msg) + '.</span>' + (c.ok ? '' : '<a href="#' + c.step + '">Corrigir</a>') + '</li>';
      }).join('') + '</ul></section>';
  };

  /* ---------------- desenho da tela ---------------- */
  function stepDone(id) {
    var m = state.meta;
    if (id === 'capa') return !!(m.inst.trim() && m.titulo.trim() && A.authors(m.autores).length && m.cidade.trim());
    if (id === 'resumo') return words(state.resumo) >= 150 && !!state.chaves.trim();
    if (id === 'texto') return state.secs.length > 0 && state.secs.every(function (s) { return s.text.trim(); });
    if (id === 'referencias') return state.refs.length > 0;
    if (id === 'apendices') return state.apx.length + state.anx.length > 0;
    return false;
  }
  function renderNav() {
    $('#nav').innerHTML = STEPS.map(function (s) {
      return '<a href="#' + s.id + '" class="' + (s.id === ui.step ? 'on' : '') + (stepDone(s.id) ? ' done' : '') + '"' + (s.id === ui.step ? ' aria-current="step"' : '') + '>' + ic(s.ic) + '<span>' + s.n + '</span><i class="dot"></i></a>';
    }).join('');
    var on = $('#nav a.on'); if (on && on.scrollIntoView && window.innerWidth < 1000) on.scrollIntoView({ block: 'nearest', inline: 'center' });
  }
  function render() {
    var i = STEPS.findIndex(function (s) { return s.id === ui.step; });
    $('#banner').innerHTML = state.example ? '<div class="banner"><span><b>Este é um trabalho de exemplo.</b> Veja como cada campo vira uma página na prévia.</span><button class="btn sm forest" data-a="askBlank">Começar o meu</button></div>' : '';
    $('#step').innerHTML = V[ui.step]();
    $('#stepnav').innerHTML = (i > 0 ? '<a class="btn" href="#' + STEPS[i - 1].id + '">Voltar</a>' : '<span></span>') +
      (i < STEPS.length - 1 ? '<a class="btn forest" href="#' + STEPS[i + 1].id + '">' + STEPS[i + 1].n + ' ' + ic('arrow') + '</a>' : '<button class="btn forest" data-a="pdf">Baixar PDF</button>');
    renderNav(); meters(); autosizeAll();
    if (ui.step === 'referencias') refPreview();
  }
  function meters() {
    document.querySelectorAll('[data-meter]').forEach(function (el) {
      var v = getPath(el.dataset.path) || '', k = el.dataset.meter, w = words(v), cls = '', t = '';
      if (k === 'resumo' || k === 'abstract') {
        t = w + (w === 1 ? ' palavra' : ' palavras') + (k === 'resumo' ? ' (a norma pede de 150 a 500)' : '');
        cls = k === 'resumo' ? (w >= 150 && w <= 500 ? 'good' : w ? 'low' : '') : '';
      } else if (k === 'chaves') { t = v.trim() ? 'Vai sair assim: ' + A.keywords(v) : ''; }
      else t = w + (w === 1 ? ' palavra' : ' palavras');
      el.textContent = t; el.className = 'meter ' + cls;
    });
  }
  function autosize(ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight + 2, Math.round(window.innerHeight * 0.62)) + 'px'; }
  function autosizeAll() { document.querySelectorAll('#step textarea').forEach(autosize); }
  function refPreview() { var el = $('#refPrev'); if (el) { var s = fmtRef({ type: ui.ref.type, f: ui.ref.f }); el.innerHTML = s.replace(/[.\s]/g, '') ? md(s) : '<span class="muted">Preencha os campos para ver a referência montada.</span>'; } }

  /* ---------------- prévia ---------------- */
  var result = null, prevT, io = null, seen = {};
  function compute() { var st = Object.assign({}, state, { refList: state.refs.map(fmtRef) }); result = A.layout(st); result.st = st; return result; }
  function fillPage(el) { var i = +el.dataset.i; if (result && result.pages[i]) { el.innerHTML = A.pageSvg(result.pages[i], result, result.st); el.dataset.fresh = '1'; } }
  function drawPreview() {
    var box = $('#pages'); if (!box) return;
    try { compute(); } catch (e) { box.innerHTML = '<p class="hint">Não foi possível montar a prévia: ' + h(e.message) + '</p>'; return; }
    var n = result.pages.length;
    while (box.children.length > n) box.removeChild(box.lastChild);
    while (box.children.length < n) { var d = document.createElement('div'); d.className = 'pg'; d.dataset.i = box.children.length; box.appendChild(d); if (io) io.observe(d); }
    Array.prototype.forEach.call(box.children, function (el) { el.dataset.fresh = ''; if (!io || seen[el.dataset.i]) fillPage(el); });
    $('#pcount').textContent = n + (n === 1 ? ' página' : ' páginas');
    var gp = $('#genPages'); if (gp) gp.textContent = 'PDF com ' + n + ' páginas pronto para gerar';
  }
  function schedule() { clearTimeout(prevT); prevT = setTimeout(drawPreview, 450); }
  function changed() { save(); schedule(); meters(); renderNavSoon(); }
  var navT; function renderNavSoon() { clearTimeout(navT); navT = setTimeout(renderNav, 600); }

  /* ---------------- folha (diálogos) ---------------- */
  function sheet(html, cls) { var s = $('#sheet'); s.className = 'sheet ' + (cls || ''); $('#sheetBody').innerHTML = html; s.hidden = false; document.body.classList.add('locked'); var f = s.querySelector('input,textarea,button.btn'); if (f && cls !== 'info') f.focus(); }
  function closeSheet() { $('#sheet').hidden = true; document.body.classList.remove('locked'); ui.dlg = null; }
  function toast(msg) { var t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove('on'); }, 3200); }
  function confirmSheet(titleT, text, okLabel, act) {
    sheet('<h2>' + h(titleT) + '</h2><p>' + h(text) + '</p><div class="row end"><button class="btn" data-a="close">Cancelar</button><button class="btn forest" data-a="' + act + '">' + h(okLabel) + '</button></div>', 'small');
  }
  function infoSheet(topic, target, sec) {
    var g = G[topic]; if (!g) return;
    ui.dlg = { tpl: g.tpl, target: target };
    sheet('<p class="eyebrow dark">Como fazer</p><h2>' + h(g.t) + '</h2>' +
      '<ol class="how">' + g.how.map(function (x) { return '<li>' + md(x) + '</li>'; }).join('') + '</ol>' +
      '<h3>Não pode faltar</h3><ul class="must">' + g.must.map(function (x) { return '<li>' + IC.check + '<span>' + h(x) + '</span></li>'; }).join('') + '</ul>' +
      '<h3>Exemplo de estrutura</h3><dl class="ex">' + g.ex.map(function (e) { return '<div><dt>' + h(e.k) + '</dt><dd>' + md(e.v) + '</dd></div>'; }).join('') + '</dl>' +
      (g.tpl && target ? '<div class="row"><button class="btn forest" data-a="useTpl">Colocar esta estrutura no campo</button></div><p class="hint">Os trechos entre colchetes são instruções: troque pelo seu texto.</p>' : ''), 'info');
  }

  /* ---------------- figuras e tabelas ---------------- */
  function figSheet(taId, id) {
    var f = id ? state.figs[id] : { title: '', source: '', size: 'g' };
    ui.dlg = { kind: 'fig', ta: taId, id: id, img: id ? { data: f.data, w: f.w, h: f.h } : null };
    sheet('<h2>' + (id ? 'Editar figura' : 'Inserir figura') + ' ' + ibtn('figuras') + '</h2>' +
      '<div class="fld"><label for="figFile">Imagem (foto, captura de tela, gráfico)</label><input type="file" id="figFile" accept="image/*"><div id="figPrev" class="figprev">' + (id ? '<img src="' + f.data + '" alt="">' : '') + '</div></div>' +
      '<div class="fld"><label for="figTitle">Título da figura</label><input id="figTitle" value="' + h(f.title) + '" placeholder="Tela de agendamento do sistema"><p class="hint">Sem a palavra Figura e sem número: o app coloca.</p></div>' +
      '<div class="fld"><label for="figSrc">Fonte</label><input id="figSrc" value="' + h(f.source) + '" placeholder="Deixe em branco se a imagem é sua"><p class="hint">Se veio de outro autor, escreva assim: Flanagan (2021, p. 45).</p></div>' +
      '<div class="fld"><label for="figSize">Tamanho na página</label><select id="figSize"><option value="g"' + (f.size === 'g' ? ' selected' : '') + '>Grande (largura do texto)</option><option value="m"' + (f.size === 'm' ? ' selected' : '') + '>Média</option><option value="p"' + (f.size === 'p' ? ' selected' : '') + '>Pequena</option></select></div>' +
      '<p class="err" id="dlgErr"></p><div class="row end"><button class="btn" data-a="close">Cancelar</button><button class="btn forest" data-a="figSave">' + (id ? 'Salvar' : 'Inserir no texto') + '</button></div>');
  }
  function readImage(file) {
    return new Promise(function (ok, fail) {
      var fr = new FileReader();
      fr.onerror = function () { fail(new Error('leitura')); };
      fr.onload = function () {
        var im = new Image();
        im.onerror = function () { fail(new Error('formato')); };
        im.onload = function () {
          var k = Math.min(1, 1800 / Math.max(im.width, im.height)), c = document.createElement('canvas');
          c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
          var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0, c.width, c.height);
          ok({ data: c.toDataURL('image/jpeg', 0.88), w: c.width, h: c.height });
        };
        im.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }
  function tabSheet(taId, id) {
    var t = id ? state.tabs[id] : { title: '', source: '', raw: '' };
    ui.dlg = { kind: 'tab', ta: taId, id: id };
    sheet('<h2>' + (id ? 'Editar tabela' : 'Inserir tabela') + ' ' + ibtn('tabelas') + '</h2>' +
      '<div class="fld"><label for="tabTitle">Título da tabela</label><input id="tabTitle" value="' + h(t.title) + '" placeholder="Equipamentos do laboratório"></div>' +
      '<div class="fld"><label for="tabRaw">Dados</label><textarea id="tabRaw" rows="6" placeholder="Equipamento; Quantidade; Situação\nComputador; 15; Em funcionamento\nRoteador; 2; Em manutenção">' + h(t.raw) + '</textarea><p class="hint">Uma linha da tabela por linha. Separe as colunas com ponto e vírgula, ou cole as células copiadas de uma planilha. A primeira linha é o cabeçalho.</p></div>' +
      '<div class="fld"><label for="tabSrc">Fonte</label><input id="tabSrc" value="' + h(t.source) + '" placeholder="Deixe em branco se os dados são seus"></div>' +
      '<p class="err" id="dlgErr"></p><div class="row end"><button class="btn" data-a="close">Cancelar</button><button class="btn forest" data-a="tabSave">' + (id ? 'Salvar' : 'Inserir no texto') + '</button></div>');
  }
  function insertAt(ta, text, selA, selB) {
    var s = ta.selectionStart == null ? ta.value.length : ta.selectionStart, e = ta.selectionEnd == null ? s : ta.selectionEnd;
    ta.value = ta.value.slice(0, s) + text + ta.value.slice(e);
    setPath(ta.dataset.b, ta.value);
    ta.focus();
    if (selA != null) ta.setSelectionRange(s + selA, s + selB); else ta.setSelectionRange(s + text.length, s + text.length);
    autosize(ta); changed();
  }
  function ownLine(ta, line, selA, selB) {
    var s = ta.selectionStart == null ? ta.value.length : ta.selectionStart, e = ta.selectionEnd == null ? s : ta.selectionEnd;
    var pre = s > 0 && ta.value[s - 1] !== '\n' ? '\n' : '', post = e < ta.value.length && ta.value[e] !== '\n' ? '\n' : '';
    insertAt(ta, pre + line + post, selA == null ? null : pre.length + selA, selA == null ? null : pre.length + selB);
  }
  function updateMarkers(kind, id, titleT) {
    var re = new RegExp('\\[\\[' + kind + '-' + id + '[^\\]]*\\]\\]', 'g'), rep = '[[' + kind + '-' + id + ' | ' + titleT.replace(/[\[\]]/g, '') + ']]';
    state.secs.concat(state.apx, state.anx).forEach(function (s) { s.text = s.text.replace(re, rep); });
  }
  function removeMarkers(kind, id) {
    var re = new RegExp('\\n?\\[\\[' + kind + '-' + id + '[^\\]]*\\]\\]', 'g');
    state.secs.concat(state.apx, state.anx).forEach(function (s) { s.text = s.text.replace(re, ''); });
  }

  /* ---------------- importar tudo ---------------- */
  function norm(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().trim(); }
  var KNOWN = /^(INTRODUCAO|REFERENCIAL TEORICO|FUNDAMENTACAO TEORICA|REVISAO (DE|DA) LITERATURA|REVISAO BIBLIOGRAFICA|METODOLOGIA|MATERIAIS? E METODOS|PROCEDIMENTOS METODOLOGICOS|DESENVOLVIMENTO|RESULTADOS( E DISCUSS(AO|OES))?|ANALISE (E DISCUSSAO )?DOS RESULTADOS|DISCUSSAO|CONCLUSAO|CONCLUSOES|CONSIDERACOES FINAIS|JUSTIFICATIVA|OBJETIVOS?)$/;
  function parseAll(text, join) {
    var out = { resumo: '', chaves: '', abstract: '', keywords: '', dedic: '', agrad: '', secs: [], refs: [], apx: [], anx: [] };
    var cur = null, mode = '', buf = [];
    function flush() {
      var t = buf.join('\n').replace(/\n{3,}/g, '\n\n').trim(); buf = [];
      if (join) t = t.replace(/([^\n.!?:;])\n(?!\n|[#>\-•\[]|[a-z]\))/g, '$1 ');
      if (mode === 'resumo') out.resumo = t.replace(/\n+/g, ' ');
      else if (mode === 'abstract') out.abstract = t.replace(/\n+/g, ' ');
      else if (mode === 'dedic') out.dedic = t; else if (mode === 'agrad') out.agrad = t;
      else if (mode === 'refs') out.refs = (/\n\s*\n/.test(t) ? t.split(/\n\s*\n/) : t.split('\n')).map(function (r) { return r.replace(/\n/g, ' ').trim(); }).filter(Boolean);
      else if (cur) cur.text = t;
    }
    text.replace(/\r/g, '').split('\n').forEach(function (raw) {
      var l = raw.trim(), n = norm(l), m;
      if (mode === 'skip') { if (!l || /\.{3,}|\s\d+$/.test(l) || /^\d+$/.test(l)) return; }
      if ((m = /^PALAVRAS?[- ]CHAVES?\s*:\s*(.*)$/i.exec(l))) { out.chaves = m[1]; flush(); mode = 'none'; cur = null; return; }
      if ((m = /^KEY ?WORDS?\s*:\s*(.*)$/i.exec(l))) { out.keywords = m[1]; flush(); mode = 'none'; cur = null; return; }
      var simple = { RESUMO: 'resumo', ABSTRACT: 'abstract', DEDICATORIA: 'dedic', AGRADECIMENTOS: 'agrad', AGRADECIMENTO: 'agrad', SUMARIO: 'skip', REFERENCIAS: 'refs', 'REFERENCIAS BIBLIOGRAFICAS': 'refs', BIBLIOGRAFIA: 'refs' }[n.replace(/^\d+\.?\s+/, '')];
      if (!simple && /^LISTA DE /.test(n) && l.length < 60) simple = 'skip';
      if (simple) { flush(); mode = simple; cur = null; return; }
      if ((m = /^(AP[ÊE]NDICE|ANEXO)\s+([A-Z])\b\s*[–—:-]?\s*(.*)$/i.exec(l)) && l.length < 140 && !/[.;,]$/.test(l)) {
        flush(); mode = 'x'; cur = { title: m[3].trim().replace(/^./, function (c) { return c.toUpperCase(); }), text: '' };
        cur.title = cur.title === cur.title.toUpperCase() ? cur.title.charAt(0) + cur.title.slice(1).toLowerCase() : cur.title;
        (/^AP/i.test(m[1]) ? out.apx : out.anx).push(cur); return;
      }
      m = /^(\d+(?:\.\d+)*)\.?\s+(\S.*)$/.exec(l);
      var short = l.length <= 100 && !/[.;:,]$/.test(l);
      if (m && short && (mode === 'sec' || mode === 'x' || m[1].indexOf('.') < 0)) {
        var depth = m[1].split('.').length, tt = m[2].trim();
        if (depth === 1 && (tt === tt.toUpperCase() || KNOWN.test(norm(tt)) || tt.split(/\s+/).length <= 6)) {
          flush(); mode = 'sec'; cur = { title: tt === tt.toUpperCase() ? tt.charAt(0) + tt.slice(1).toLowerCase() : tt, text: '' }; out.secs.push(cur); return;
        }
        if (depth > 1 && depth <= 4 && cur && mode === 'sec') { buf.push(''); buf.push(new Array(depth).join('#') + ' ' + (tt === tt.toUpperCase() ? tt.charAt(0) + tt.slice(1).toLowerCase() : tt)); return; }
      }
      if (!m && short && KNOWN.test(n) && l === l.toUpperCase()) { flush(); mode = 'sec'; cur = { title: l.charAt(0) + l.slice(1).toLowerCase(), text: '' }; out.secs.push(cur); return; }
      if (mode && mode !== 'none' && mode !== 'skip') buf.push(l);
    });
    flush();
    return out;
  }
  function importSheet() {
    ui.imp = null;
    sheet('<h2>Colar o trabalho inteiro ' + ibtn('importar') + '</h2><p>Cole todo o texto. O app separa resumo, seções, subseções, referências, apêndices e anexos pelos títulos.</p>' +
      '<div class="fld"><label for="impText">Texto completo</label><textarea id="impText" rows="9" placeholder="RESUMO\nTexto do resumo...\nPalavras-chave: ...\n\n1 INTRODUÇÃO\nTexto...\n1.1 Problema de pesquisa\nTexto...\n\nREFERÊNCIAS\n..."></textarea></div>' +
      '<label class="ck" for="impJoin"><input type="checkbox" id="impJoin"><span>O texto foi copiado de um PDF (juntar linhas quebradas no meio da frase)</span></label>' +
      '<div id="impOut"></div><p class="err" id="dlgErr"></p><div class="row end"><button class="btn" data-a="close">Cancelar</button><button class="btn forest" data-a="impDetect">Detectar as partes</button></div>', 'wide');
  }

  /* ---------------- PDF ---------------- */
  function slug(s) { return (s || 'tcc').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 60) || 'tcc'; }
  function saveFile(name, data) {
    var blob = data instanceof Blob ? data : new Blob([data], { type: 'application/json' });
    if (dl) return dl.save({ filename: name, data: blob });
    return new Promise(function (ok) {
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); ok({ status: 'saved' }); }, 400);
    });
  }
  function makePdf() {
    var note = $('#genNote'); if (note) note.textContent = 'Montando o PDF...';
    setTimeout(function () {
      var blob;
      try { compute(); blob = A.toPdf(result, result.st).output('blob'); window.__pdfBlob = blob; }
      catch (e) { if (note) note.textContent = ''; toast('Não foi possível montar o PDF: ' + e.message); return; }
      saveFile(slug(state.meta.titulo) + '-abnt.pdf', blob).then(function () {
        try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: 'pdf-gerado', title: 'PDF gerado', event: true }); } catch (x) { /* contador indisponível */ }
        if (note) note.textContent = 'PDF gerado com ' + result.pages.length + ' páginas.'; toast('PDF gerado.');
      }).catch(function (e) {
        if (note) note.textContent = '';
        toast(e && e.code === 'declined' ? 'Download cancelado.' : e && e.code === 'rate_limited' ? 'Já existe um pedido de download aberto. Responda a ele e tente de novo.' : 'O download não está disponível nesta tela. Abra o app na página dele no Claude e tente de novo.');
      });
    }, 30);
  }

  /* ---------------- ações ---------------- */
  var ACT = {
    info: function (el) { infoSheet(el.dataset.topic, el.dataset.target, el.dataset.sec); },
    close: closeSheet,
    logoDel: function () { delete state.meta.logo; render(); changed(); },
    preview: function () { document.body.classList.add('show-prev'); drawPreview(); },
    hidePreview: function () { document.body.classList.remove('show-prev'); },
    pdf: makePdf,
    import: importSheet,
    natureza: function () {
      var m = state.meta, curso = m.curso.replace(/^curso\s+(de\s+)?/i, '').trim();
      var tit = /^t[eé]cnico/i.test(curso) ? curso.charAt(0).toUpperCase() + curso.slice(1) : curso ? 'Técnico em ' + curso : '[título pretendido]';
      m.natureza = 'Trabalho de Conclusão de Curso apresentado ao ' + (m.inst.trim() || '[nome da instituição]') + ', como requisito parcial para a obtenção do título de ' + tit + '.';
      render(); changed();
    },
    useTpl: function () {
      var d = ui.dlg, ta = d && d.target && document.getElementById(d.target); if (!ta) return closeSheet();
      ta.value = ta.value.trim() ? ta.value.replace(/\s+$/, '') + '\n\n' + d.tpl : d.tpl;
      setPath(ta.dataset.b, ta.value); closeSheet(); autosize(ta); ta.focus(); changed(); toast('Estrutura colocada no campo. Troque os trechos entre colchetes.');
    },
    ins: function (el) {
      var ta = document.getElementById(el.dataset.ta), k = el.dataset.k; if (!ta) return;
      if (!ta.dataset.t) { ta.setSelectionRange(ta.value.length, ta.value.length); ta.dataset.t = '1'; }
      var sel = ta.value.slice(ta.selectionStart, ta.selectionEnd);
      if (k === 'h2') ownLine(ta, '# ' + (sel || 'Título da subseção'), 2, 2 + (sel || 'Título da subseção').length);
      else if (k === 'h3') ownLine(ta, '## ' + (sel || 'Título da sub-subseção'), 3, 3 + (sel || 'Título da sub-subseção').length);
      else if (k === 'quote') ownLine(ta, '> ' + (sel || 'Texto copiado exatamente como está no original (Autor, ano, p. 00).'), 2, 2 + (sel || 'Texto copiado exatamente como está no original (Autor, ano, p. 00).').length);
      else if (k === 'list') ownLine(ta, sel ? sel.split('\n').filter(function (x) { return x.trim(); }).map(function (x) { return '- ' + x.trim(); }).join('\n') : '- primeiro item\n- segundo item\n- terceiro item', sel ? null : 2, sel ? null : 15);
      else if (k === 'b') insertAt(ta, '**' + (sel || 'texto') + '**', 2, 2 + (sel || 'texto').length);
      else if (k === 'i') insertAt(ta, '*' + (sel || 'texto') + '*', 1, 1 + (sel || 'texto').length);
      else if (k === 'join') { ta.value = ta.value.replace(/([^\n.!?:;])\n(?!\n|[#>\-•\[]|[a-z]\))/g, '$1 '); setPath(ta.dataset.b, ta.value); autosize(ta); changed(); toast('Linhas unidas. Confira se os parágrafos ficaram certos.'); }
      else if (k === 'fig') { ui.caret = [ta.selectionStart, ta.selectionEnd]; figSheet(ta.id, null); }
      else if (k === 'tab') { ui.caret = [ta.selectionStart, ta.selectionEnd]; tabSheet(ta.id, null); }
    },
    figSave: function () {
      var d = ui.dlg, t = $('#figTitle').value.trim();
      if (!d.img) { $('#dlgErr').textContent = 'Escolha uma imagem.'; return; }
      if (!t) { $('#dlgErr').textContent = 'Escreva o título da figura.'; return; }
      var id = d.id || uid();
      state.figs[id] = { id: id, title: t, source: $('#figSrc').value.trim(), size: $('#figSize').value, data: d.img.data, w: d.img.w, h: d.img.h };
      if (d.id) updateMarkers('fig', id, t);
      var ta = !d.id && d.ta && document.getElementById(d.ta);
      closeSheet();
      if (ta) { ta.setSelectionRange(ui.caret[0], ui.caret[1]); ownLine(ta, '[[fig-' + id + ' | ' + t.replace(/[\[\]]/g, '') + ']]'); }
      render(); changed();
    },
    tabSave: function () {
      var d = ui.dlg, t = $('#tabTitle').value.trim(), raw = $('#tabRaw').value;
      if (!t) { $('#dlgErr').textContent = 'Escreva o título da tabela.'; return; }
      if (raw.trim().split('\n').length < 2) { $('#dlgErr').textContent = 'A tabela precisa do cabeçalho e de pelo menos uma linha de dados.'; return; }
      var id = d.id || uid();
      state.tabs[id] = { id: id, title: t, source: $('#tabSrc').value.trim(), raw: raw };
      if (d.id) updateMarkers('tab', id, t);
      var ta = !d.id && d.ta && document.getElementById(d.ta);
      closeSheet();
      if (ta) { ta.setSelectionRange(ui.caret[0], ui.caret[1]); ownLine(ta, '[[tab-' + id + ' | ' + t.replace(/[\[\]]/g, '') + ']]'); }
      render(); changed();
    },
    figEdit: function (el) { figSheet(null, el.dataset.id); },
    tabEdit: function (el) { tabSheet(null, el.dataset.id); },
    figDel: function (el) { delete state.figs[el.dataset.id]; removeMarkers('fig', el.dataset.id); render(); changed(); },
    tabDel: function (el) { delete state.tabs[el.dataset.id]; removeMarkers('tab', el.dataset.id); render(); changed(); },
    secAdd: function () { state.secs.push({ id: uid(), title: '', text: '' }); render(); changed(); var t = document.querySelectorAll('.sec-t'); t[t.length - 1].focus(); },
    secUp: function (el) { var i = +el.dataset.i; state.secs.splice(i - 1, 0, state.secs.splice(i, 1)[0]); render(); changed(); },
    secDown: function (el) { var i = +el.dataset.i; state.secs.splice(i + 1, 0, state.secs.splice(i, 1)[0]); render(); changed(); },
    secDel: function (el) {
      var i = +el.dataset.i, s = state.secs[i];
      if (s.text.trim()) { ui.pending = i; confirmSheet('Excluir a seção?', 'O texto de "' + (s.title || 'seção sem título') + '" será apagado.', 'Excluir', 'secDelOk'); }
      else { state.secs.splice(i, 1); render(); changed(); }
    },
    secDelOk: function () { state.secs.splice(ui.pending, 1); closeSheet(); render(); changed(); },
    xAdd: function (el) { state[el.dataset.key].push({ id: uid(), title: '', text: '' }); render(); changed(); },
    xDel: function (el) { state[el.dataset.key].splice(+el.dataset.i, 1); render(); changed(); },
    refType: function (el) { ui.ref.type = el.dataset.k; render(); },
    refSave: function () {
      var f = ui.ref.f, t = ui.ref.type;
      if (t === 'livre' ? !(f.texto || '').trim() : !(f.titulo || '').trim()) { toast(t === 'livre' ? 'Cole a referência no campo.' : 'Preencha pelo menos o título.'); return; }
      var keep = {}; RTYPES[t].fields.forEach(function (x) { keep[x[0]] = f[x[0]]; });
      if (ui.ref.edit) { var r = state.refs.find(function (x) { return x.id === ui.ref.edit; }); if (r) { r.type = t; r.f = keep; } }
      else state.refs.push({ id: uid(), type: t, f: keep });
      ui.ref = { type: t, f: {}, edit: null }; render(); changed(); toast('Referência salva na lista.');
    },
    refCancel: function () { ui.ref = { type: ui.ref.type, f: {}, edit: null }; render(); },
    refEdit: function (el) { var r = state.refs.find(function (x) { return x.id === el.dataset.id; }); ui.ref = { type: r.type, f: JSON.parse(JSON.stringify(r.f)), edit: r.id }; render(); $('#refCard').scrollIntoView({ block: 'start' }); },
    refDel: function (el) { state.refs = state.refs.filter(function (x) { return x.id !== el.dataset.id; }); render(); changed(); },
    copy: function (el) {
      var t = el.dataset.t;
      try { navigator.clipboard.writeText(t).then(function () { toast('Copiado: ' + t); }, function () { toast('Selecione e copie: ' + t); }); } catch (e) { toast('Selecione e copie: ' + t); }
    },
    impDetect: function () {
      var txt = $('#impText').value;
      if (words(txt) < 30) { $('#dlgErr').textContent = 'Cole o texto do trabalho no campo acima.'; return; }
      var r = parseAll(txt, $('#impJoin').checked); ui.imp = r;
      var rows = [];
      if (r.resumo) rows.push(['Resumo', words(r.resumo) + ' palavras']);
      if (r.chaves) rows.push(['Palavras-chave', r.chaves]);
      if (r.abstract) rows.push(['Abstract', words(r.abstract) + ' palavras']);
      if (r.keywords) rows.push(['Keywords', r.keywords]);
      if (r.agrad) rows.push(['Agradecimentos', words(r.agrad) + ' palavras']);
      r.secs.forEach(function (s, i) { var sub = (s.text.match(/^#+ /gm) || []).length; rows.push([(i + 1) + ' ' + s.title, words(s.text) + ' palavras' + (sub ? ', ' + sub + ' subseção(ões)' : '')]); });
      if (r.refs.length) rows.push(['Referências', r.refs.length + ' itens']);
      r.apx.forEach(function (a, i) { rows.push(['Apêndice ' + String.fromCharCode(65 + i), a.title]); });
      r.anx.forEach(function (a, i) { rows.push(['Anexo ' + String.fromCharCode(65 + i), a.title]); });
      if (!rows.length) { $('#dlgErr').textContent = 'Nenhum título foi reconhecido. Confira se cada título (RESUMO, 1 INTRODUÇÃO, REFERÊNCIAS...) está sozinho em uma linha.'; $('#impOut').innerHTML = ''; return; }
      $('#dlgErr').textContent = '';
      $('#impOut').innerHTML = '<h3>Partes encontradas</h3><dl class="ex found">' + rows.map(function (x) { return '<div><dt>' + h(x[0]) + '</dt><dd>' + h(x[1]) + '</dd></div>'; }).join('') + '</dl>' +
        '<p class="hint">Capa, figuras e tabelas não são detectadas: preencha depois. As partes encontradas substituem o que está nos campos hoje.</p>' +
        '<div class="row end"><button class="btn lime" data-a="impApply">Usar estas partes</button></div>';
    },
    impApply: function () {
      var r = ui.imp; if (!r) return;
      if (state.example) { var keepFont = state.font; state = blank(); state.font = keepFont; }
      if (r.resumo) state.resumo = r.resumo; if (r.chaves) state.chaves = r.chaves;
      if (r.abstract) state.abstract = r.abstract; if (r.keywords) state.keywords = r.keywords;
      if (r.agrad) state.opc.agrad = r.agrad; if (r.dedic) state.opc.dedic = r.dedic;
      if (r.secs.length) state.secs = r.secs.map(function (s) { return { id: uid(), title: s.title, text: s.text }; });
      if (r.refs.length) state.refs = r.refs.map(function (x) { return { id: uid(), type: 'livre', f: { texto: x } }; });
      if (r.apx.length) state.apx = r.apx.map(function (s) { return { id: uid(), title: s.title, text: s.text }; });
      if (r.anx.length) state.anx = r.anx.map(function (s) { return { id: uid(), title: s.title, text: s.text }; });
      state.example = false; closeSheet(); location.hash = '#texto'; ui.step = 'texto'; render(); changed(); toast('Partes distribuídas. Confira cada campo.');
    },
    askBlank: function () { confirmSheet('Começar em branco?', state.example ? 'O exemplo sai da tela e os campos ficam vazios para o seu trabalho.' : 'Todos os campos preenchidos serão apagados. Salve uma cópia do projeto antes, se quiser guardar.', 'Começar em branco', 'doBlank'); },
    doBlank: function () { var f = state.font; state = blank(); state.font = f; closeSheet(); location.hash = '#capa'; ui.step = 'capa'; render(); changed(); },
    askExample: function () { confirmSheet('Carregar o exemplo?', 'O conteúdo atual dos campos será trocado pelo trabalho de exemplo.', 'Carregar exemplo', 'doExample'); },
    doExample: function () { state = example(); closeSheet(); render(); changed(); },
    exportProj: function () { saveFile(slug(state.meta.titulo) + '-projeto.json', JSON.stringify(state)).then(function () { toast('Cópia do projeto salva.'); }).catch(function (e) { toast(e && e.code === 'declined' ? 'Download cancelado.' : 'Não foi possível salvar a cópia nesta tela.'); }); }
  };

  /* ---------------- eventos ---------------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-a]'); if (!el) { if (e.target.id === 'sheet') closeSheet(); return; }
    if (el.tagName === 'BUTTON' || el.tagName === 'A') e.preventDefault();
    var fn = ACT[el.dataset.a]; if (fn) fn(el);
  });
  document.addEventListener('input', function (e) {
    var el = e.target, p = el.dataset && el.dataset.b; if (!p) return;
    setPath(p, el.type === 'checkbox' ? el.checked : el.value);
    if (el.tagName === 'TEXTAREA') autosize(el);
    if (p.indexOf('ui.ref') === 0) { refPreview(); return; }
    if (p === 'aprov.on') $('#aprovBox').className = el.checked ? '' : 'off';
    changed();
  });
  document.addEventListener('change', function (e) {
    var el = e.target;
    if (el.id === 'figFile' && el.files[0]) {
      readImage(el.files[0]).then(function (img) { ui.dlg.img = img; $('#figPrev').innerHTML = '<img src="' + img.data + '" alt="">'; $('#dlgErr').textContent = ''; })
        .catch(function () { $('#dlgErr').textContent = 'Não foi possível abrir esta imagem. Use um arquivo JPG ou PNG.'; });
    }
    if (el.id === 'logoFile' && el.files[0]) {
      readImage(el.files[0]).then(function (img) { state.meta.logo = img; render(); changed(); })
        .catch(function () { toast('Não foi possível abrir esta imagem. Use um arquivo JPG ou PNG.'); });
    }
    if (el.id === 'projFile' && el.files[0]) {
      var fr = new FileReader();
      fr.onload = function () {
        try { var s = JSON.parse(fr.result); if (!s || !s.meta || !s.secs) throw 0; state = Object.assign(blank(), s); state.example = false; render(); changed(); toast('Projeto aberto.'); }
        catch (x) { toast('Este arquivo não é uma cópia de projeto do Formata.'); }
      };
      fr.readAsText(el.files[0]); el.value = '';
    }
  });
  document.addEventListener('focusin', function (e) { if (e.target.tagName === 'TEXTAREA') e.target.dataset.t = '1'; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (!$('#sheet').hidden) closeSheet(); else document.body.classList.remove('show-prev'); } });
  function route() {
    var id = (location.hash || '').slice(1);
    ui.step = STEPS.some(function (s) { return s.id === id; }) ? id : 'inicio';
    render(); var w = $('#work'); if (w) w.scrollTop = 0; window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);

  /* ---------------- início ---------------- */
  state = load();
  if (window.IntersectionObserver) {
    io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { var el = en.target; if (en.isIntersecting) { seen[el.dataset.i] = 1; if (!el.dataset.fresh) fillPage(el); } else delete seen[el.dataset.i]; });
    }, { root: null, rootMargin: '600px 0px' });
  }
  route();
  A.loadWebFonts().then(drawPreview);
  if (window.claude && window.claude.use) { try { window.claude.use('downloads').then(function (d) { dl = d; }, function () {}); } catch (e) { /* sem download nativo */ } }
  var gc = window.FORMATA_CONFIG && String(window.FORMATA_CONFIG.goatcounter || '').trim();
  if (gc && /^[a-z0-9-]+$/i.test(gc)) {
    var sc = document.createElement('script'); sc.async = true; sc.src = 'https://gc.zgo.at/count.js';
    sc.setAttribute('data-goatcounter', 'https://' + gc + '.goatcounter.com/count'); document.head.appendChild(sc);
  }
  window.__formata = { get state() { return state; }, compute: compute, parseAll: parseAll, fmtRef: fmtRef };
})();
