/* Motor de diagramação ABNT: transforma o estado do trabalho em páginas (lista de desenho),
   que depois viram PDF (jsPDF) ou SVG (prévia). Unidade: ponto (1 cm = 28,3465 pt). */
(function () {
  'use strict';
  var CM = 72 / 2.54;
  var PW = 595.28, PH = 841.89;
  var ML = 3 * CM, MT = 3 * CM, MR = 2 * CM, MB = 2 * CM;
  var TW = PW - ML - MR;            // largura da mancha: 16 cm
  var CX = ML + TW / 2;
  var SZ = 12, LEAD = 18;            // corpo 12, entrelinha 1,5
  var SIMPLE = 13.8;                 // entrelinha simples para corpo 12
  var SZS = 10, LEADS = 11.5;        // corpo 10, entrelinha simples
  var PI = 1.25 * CM;                // recuo de parágrafo
  var QUOTE = 4 * CM;                // recuo de citação longa
  var STYLE = { n: 'normal', b: 'bold', i: 'italic', bi: 'bolditalic' };
  var FAM = { sans: 'ABNTsans', serif: 'ABNTserif' };

  /* ---------- fontes e medição ---------- */
  var mdoc = null, wcache = {};
  function reg(doc, fam) {
    Object.keys(STYLE).forEach(function (k) {
      var file = fam + '-' + STYLE[k] + '.ttf';
      doc.addFileToVFS(file, window.ABNT_FONTS[fam + '-' + STYLE[k]]);
      doc.addFont(file, FAM[fam], STYLE[k]);
    });
  }
  function M() {
    if (!mdoc) {
      mdoc = new window.jspdf.jsPDF({ unit: 'pt', format: 'a4' });
      reg(mdoc, 'sans'); reg(mdoc, 'serif');
    }
    return mdoc;
  }
  var curFam = 'sans';
  function tw(s, f, sz) {
    var key = curFam + f, c = wcache[key] || (wcache[key] = new Map());
    var u = c.get(s);
    if (u === undefined) {
      var d = M(); d.setFont(FAM[curFam], STYLE[f]);
      u = d.getStringUnitWidth(s); c.set(s, u);
    }
    return u * sz;
  }

  /* ---------- texto ---------- */
  var BAD = /[^ -~¡-ɏͰ-Ͽ‐-‧‰-›⁄⁰-₎€™←-↓∂∆∏∑−√∞≈≠≤≥●•\n]/g;
  function clean(s) {
    return String(s == null ? '' : s).replace(/\r/g, '').replace(/[ \t]/g, ' ')
      .replace(/[​-‏﻿­]/g, '').replace(BAD, '');
  }
  function up(s) { return clean(s).toLocaleUpperCase('pt-BR'); }
  function code(b, i) { return b ? (i ? 'bi' : 'b') : (i ? 'i' : 'n'); }

  // **negrito** e *itálico* -> trechos com estilo
  function inline(text, f0) {
    text = clean(text);
    var b0 = f0 === 'b' || f0 === 'bi', i0 = f0 === 'i' || f0 === 'bi';
    var parts = text.split(/(\*\*|\*)/), nb = 0, ni = 0;
    parts.forEach(function (p) { if (p === '**') nb++; else if (p === '*') ni++; });
    var okB = nb % 2 === 0, okI = ni % 2 === 0, b = false, i = false, out = [];
    parts.forEach(function (p) {
      if (p === '**' && okB) { b = !b; return; }
      if (p === '*' && okI) { i = !i; return; }
      if (p) out.push({ s: p, f: code(b0 || b, i0 || i) });
    });
    return out;
  }
  function plain(text) { return clean(text).replace(/\*\*|\*/g, ''); }

  function toWords(runs, sz) {
    var words = [], cur = null;
    runs.forEach(function (r) {
      r.s.split(/(\s+)/).forEach(function (p) {
        if (!p) return;
        if (/^\s+$/.test(p)) { cur = null; return; }
        if (!cur) { cur = { fr: [], w: 0 }; words.push(cur); }
        var w = tw(p, r.f, sz);
        cur.fr.push({ s: p, f: r.f, w: w }); cur.w += w;
      });
    });
    return words;
  }
  // quebra palavra maior que a linha (links longos)
  function splitWord(word, maxW, sz) {
    var out = [], cur = { fr: [], w: 0 };
    word.fr.forEach(function (fr) {
      var buf = '', bw = 0;
      for (var k = 0; k < fr.s.length; k++) {
        var ch = fr.s[k], cw = tw(buf + ch, fr.f, sz);
        if (cur.w + cw > maxW && (buf || cur.fr.length)) {
          if (buf) { cur.fr.push({ s: buf, f: fr.f, w: bw }); cur.w += bw; }
          out.push(cur); cur = { fr: [], w: 0 }; buf = ch; bw = tw(ch, fr.f, sz);
        } else { buf += ch; bw = cw; }
      }
      if (buf) { cur.fr.push({ s: buf, f: fr.f, w: bw }); cur.w += bw; }
    });
    if (cur.fr.length) out.push(cur);
    return out;
  }
  function breakLines(words, wFirst, wRest, sz) {
    var sp = tw(' ', 'n', sz), lines = [], line = { words: [], w: 0 }, lim = wFirst;
    function push() { lines.push(line); line = { words: [], w: 0 }; lim = wRest; }
    var queue = words.slice();
    while (queue.length) {
      var w = queue.shift();
      if (w.w > lim && !line.words.length) {
        var pieces = splitWord(w, lim, sz);
        if (pieces.length > 1) { queue = pieces.concat(queue); continue; }
      }
      var add = line.words.length ? sp + w.w : w.w;
      if (line.words.length && line.w + add > lim + 0.01) { push(); queue.unshift(w); continue; }
      line.words.push(w); line.w += add;
    }
    if (line.words.length) lines.push(line);
    if (lines.length) lines[lines.length - 1].last = true;
    return lines;
  }
  function emit(page, line, x, y, width, align, sz) {
    var sp = tw(' ', 'n', sz), n = line.words.length, gap = sp, x0 = x;
    if (align === 'j' && !line.last && n > 1) gap = sp + (width - line.w) / (n - 1);
    else if (align === 'c') x0 = x + (width - line.w) / 2;
    else if (align === 'r') x0 = x + width - line.w;
    var segs = [], cx = x0;
    line.words.forEach(function (w) {
      w.fr.forEach(function (fr) { segs.push({ x: cx, s: fr.s, f: fr.f }); cx += fr.w; });
      cx += gap;
    });
    page.items.push({ t: 'ln', y: y, sz: sz, segs: segs });
  }
  function base(lead, sz) { return (lead - sz) / 2 + sz * 0.8; }

  // bloco em posição fixa (capa, folha de rosto...). Retorna o y final.
  function block(page, text, o) {
    var sz = o.sz || SZ, lead = o.lead || LEAD;
    var lines = breakLines(toWords(inline(o.caps ? up(text) : text, o.f || 'n'), sz), o.width, o.width, sz);
    var y = o.y;
    lines.forEach(function (l) { emit(page, l, o.x, y + base(lead, sz), o.width, o.align || 'c', sz); y += lead; });
    return y;
  }
  function blockH(text, o) {
    var sz = o.sz || SZ;
    return breakLines(toWords(inline(o.caps ? up(text) : text, o.f || 'n'), sz), o.width, o.width, sz).length * (o.lead || LEAD);
  }

  /* ---------- fluxo de páginas ---------- */
  function Flow() { this.pages = []; this.y = MT; this.pend = 0; this.top = true; this.numbered = false; }
  Flow.prototype.newPage = function (numbered) {
    if (numbered !== undefined) this.numbered = numbered;
    this.page = { items: [], numbered: this.numbered };
    this.pages.push(this.page); this.y = MT; this.pend = 0; this.top = true;
    return this.page;
  };
  Flow.prototype.pageNo = function () { return this.pages.length - 1; }; // capa não conta
  Flow.prototype.space = function (h) { if (!this.top) this.pend = Math.max(this.pend, h); };
  Flow.prototype.room = function () { return PH - MB - this.y - this.pend; };
  Flow.prototype.need = function (h) { if (!this.top && this.room() < h - 0.01) this.newPage(); };
  Flow.prototype.flush = function () { this.y += this.pend; this.pend = 0; };
  Flow.prototype.para = function (text, o) {
    o = o || {};
    var sz = o.sz || SZ, lead = o.lead || LEAD, x0 = o.x0 === undefined ? ML : o.x0;
    var width = o.width || (ML + TW - x0), ind = o.indent || 0, hang = o.hang || 0;
    var runs = typeof text === 'string' ? inline(text, o.f || 'n') : text;
    var lines = breakLines(toWords(runs, sz), width - ind - hang, width - hang, sz);
    if (!lines.length) return;
    if (o.keep && lines.length * lead <= PH - MT - MB) this.need(lines.length * lead);
    var i = 0;
    while (i < lines.length) {
      var fit = Math.floor((this.room() + 0.01) / lead), rem = lines.length - i;
      if (fit < 1 || (fit < rem && fit < 2 && rem > 1 && i === 0 && !this.top)) { this.newPage(); continue; }
      var n = Math.min(fit, rem);
      if (n < rem && rem - n === 1 && n > 2) n--;
      this.flush();
      for (var k = 0; k < n; k++) {
        var first = i + k === 0;
        var lx = x0 + hang + (first ? ind : 0), lw = width - hang - (first ? ind : 0);
        if (first && o.label) this.page.items.push({ t: 'ln', y: this.y + base(lead, sz), sz: sz, segs: [{ x: x0 + ind, s: o.label, f: o.labelF || 'n' }] });
        emit(this.page, lines[i + k], lx, this.y + base(lead, sz), lw, o.align || 'j', sz);
        this.y += lead;
      }
      this.top = false; i += n;
      if (i < lines.length) this.newPage();
    }
  };
  Flow.prototype.ctitle = function (text) {
    this.para(up(text), { f: 'b', align: 'c', keep: true });
    this.space(LEAD);
  };

  /* ---------- corpo: marcações ---------- */
  function parseBody(text) {
    var blocks = [], last = null, blank = true;
    clean(text).split('\n').forEach(function (raw) {
      var l = raw.trim(), m;
      if (!l) { blank = true; last = null; return; }
      if ((m = /^(#{1,3})\s*(.+)$/.exec(l))) { blocks.push(last = { t: 'h', lv: m[1].length + 1, s: m[2].replace(/^[\d.]+\s+/, '') }); }
      else if ((m = /^\[\[\s*(fig|tab)-([a-z0-9]+)[^\]]*\]\]$/i.exec(l))) { blocks.push(last = { t: m[1].toLowerCase(), id: m[2] }); }
      else if ((m = /^>\s?(.*)$/.exec(l))) {
        if (last && last.t === 'q' && !blank) last.s += ' ' + m[1]; else blocks.push(last = { t: 'q', s: m[1] });
      }
      else if ((m = /^(?:[-•–]|\*(?!\*)|[a-z]\))\s+(.+)$/.exec(l))) {
        if (last && last.t === 'ul') last.items.push(m[1]); else blocks.push(last = { t: 'ul', items: [m[1]] });
      }
      else blocks.push(last = { t: 'p', s: l });
      blank = false;
    });
    return blocks;
  }
  function letter(i) { var s = ''; i++; while (i > 0) { i--; s = String.fromCharCode(97 + i % 26) + s; i = Math.floor(i / 26); } return s; }
  function parseTable(raw) {
    var rows = clean(raw).split('\n').map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) {
      var sep = l.indexOf('\t') >= 0 ? '\t' : l.indexOf(';') >= 0 ? ';' : l.indexOf('|') >= 0 ? '|' : null;
      return (sep ? raw_split(l, sep) : [l]).map(function (c) { return c.trim(); });
    });
    var n = rows.reduce(function (a, r) { return Math.max(a, r.length); }, 0);
    rows.forEach(function (r) { while (r.length < n) r.push(''); });
    return { rows: rows, n: n };
  }
  function raw_split(l, sep) { return clean(l).replace(/^\||\|$/g, '').split(sep); }

  function keywords(s) {
    s = clean(s).replace(/^\s*(palavras?-chave|keywords?)\s*:\s*/i, '').trim();
    if (!s) return '';
    var parts = /[;\n,]/.test(s) ? s.split(/[;\n,]+/) : s.split(/\.\s+/);
    parts = parts.map(function (p) { return p.trim().replace(/[.;,]+$/, ''); }).filter(Boolean);
    return parts.join('; ') + '.';
  }
  function authors(s) { return clean(s).split(/\n|;/).map(function (a) { return a.trim(); }).filter(Boolean); }

  /* ---------- montagem do documento ---------- */
  function build(st, prev) {
    var F = new Flow(), toc = [], lof = [], lot = [], warn = [];
    var figN = 0, tabN = 0, m = st.meta || {};
    var auts = authors(m.autores); if (!auts.length) auts = ['[Nome do autor]'];
    var titulo = clean(m.titulo).trim() || '[Título do trabalho]';
    var sub = clean(m.subtitulo).trim();
    var cidade = clean(m.cidade).trim() || '[Cidade]', ano = clean(m.ano).trim() || '[Ano]';

    function foot(pg) {
      block(pg, cidade, { x: ML, width: TW, y: PH - MB - 2 * LEAD });
      block(pg, ano, { x: ML, width: TW, y: PH - MB - LEAD });
    }
    function titleBlock(pg, y) {
      y = block(pg, titulo + (sub ? ':' : ''), { x: ML, width: TW, y: y, f: 'b', caps: true });
      if (sub) y = block(pg, sub, { x: ML, width: TW, y: y });
      return y;
    }
    function names(pg, y) { auts.forEach(function (a) { y = block(pg, a, { x: ML, width: TW, y: y }); }); return y; }
    function nature(pg, y) {
      var nat = clean(m.natureza).trim();
      if (nat) y = block(pg, nat, { x: CX, width: TW / 2, y: y, align: 'j', lead: SIMPLE });
      if (clean(m.orient).trim()) { y += SIMPLE; y = block(pg, 'Orientador(a): ' + m.orient.trim(), { x: CX, width: TW / 2, y: y, align: 'l', lead: SIMPLE }); }
      if (clean(m.coorient).trim()) y = block(pg, 'Coorientador(a): ' + m.coorient.trim(), { x: CX, width: TW / 2, y: y, align: 'l', lead: SIMPLE });
      return y;
    }

    // capa
    var pg = F.newPage(false), y = MT;
    if (m.logo && m.logo.data) {
      var lh = 2.6 * CM, lw = lh * m.logo.w / m.logo.h;
      if (lw > 7 * CM) { lw = 7 * CM; lh = lw * m.logo.h / m.logo.w; }
      pg.items.push({ t: 'img', id: 'logo', data: m.logo.data, x: CX - lw / 2, y: y, w: lw, h: lh });
      y += lh + 10;
    }
    if (clean(m.inst).trim()) y = block(pg, m.inst, { x: ML, width: TW, y: y, f: 'b', caps: true });
    if (clean(m.curso).trim()) y = block(pg, m.curso, { x: ML, width: TW, y: y, f: 'b', caps: true });
    y = names(pg, Math.max(y + 3 * LEAD, 8 * CM));
    titleBlock(pg, Math.max(y + 3 * LEAD, 13.5 * CM));
    foot(pg);

    // folha de rosto
    pg = F.newPage(false);
    y = names(pg, MT);
    y = titleBlock(pg, Math.max(y + 3 * LEAD, 10 * CM));
    nature(pg, y + 2 * LEAD);
    foot(pg);

    // folha de aprovação
    var ap = st.aprov || {};
    if (ap.on) {
      pg = F.newPage(false);
      y = names(pg, MT);
      y = titleBlock(pg, y + 2 * LEAD);
      y = nature(pg, y + 2 * LEAD);
      y += 2 * LEAD;
      y = block(pg, 'Aprovado em: ' + (clean(ap.data).trim() || '____ de ______________ de ______') + '.', { x: ML, width: TW, y: y, align: 'l' });
      y += LEAD;
      y = block(pg, 'BANCA EXAMINADORA', { x: ML, width: TW, y: y, f: 'b' });
      var banca = clean(ap.banca).split('\n').map(function (b) { return b.trim(); }).filter(Boolean);
      if (!banca.length) banca = ['[Nome do(a) orientador(a)] – [Instituição]', '[Nome do(a) avaliador(a)] – [Instituição]'];
      var gapB = Math.min(3 * LEAD, Math.max(LEAD * 1.6, (PH - MB - 2 * LEAD - y - banca.length * 2 * SIMPLE - LEAD) / banca.length));
      banca.forEach(function (b) {
        var p = b.split(/\s+[–—-]\s+/);
        y += gapB;
        pg.items.push({ t: 'rule', x1: CX - 4.5 * CM, x2: CX + 4.5 * CM, y: y, w: 0.5 });
        y += 3;
        y = block(pg, p[0], { x: ML, width: TW, y: y, lead: SIMPLE });
        if (p[1]) y = block(pg, p.slice(1).join(' – '), { x: ML, width: TW, y: y, lead: SIMPLE });
      });
      foot(pg);
    }

    var opc = st.opc || {};
    function bottomRight(text, align, f) {
      var paras = clean(text).split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
      var h = 0; paras.forEach(function (p) { h += blockH(p, { width: TW / 2, f: f }); });
      var yy = PH - MB - h, p2 = F.newPage(false);
      paras.forEach(function (p) { yy = block(p2, p, { x: CX, width: TW / 2, y: yy, align: align, f: f }); });
    }
    if (clean(opc.dedic).trim()) bottomRight(opc.dedic, 'j');
    if (clean(opc.agrad).trim()) {
      F.newPage(false); F.ctitle('Agradecimentos');
      clean(opc.agrad).split('\n').forEach(function (p) { if (p.trim()) F.para(p.trim(), { indent: PI }); });
    }
    if (clean(opc.epig).trim()) bottomRight(opc.epig, 'r', 'i');

    function resumo(title, text, label, keys) {
      if (!clean(text).trim() && !clean(keys).trim()) return;
      F.newPage(false); F.ctitle(title);
      F.para(clean(text).split('\n').map(function (l) { return l.trim(); }).filter(Boolean).join(' '));
      var k = keywords(keys);
      if (k) { F.space(LEAD); F.para('**' + label + '**: ' + k, { align: 'l' }); }
    }
    resumo('Resumo', st.resumo, 'Palavras-chave', st.chaves);
    resumo('Abstract', st.abstract, 'Keywords', st.keywords);

    function leaderLine(numStr, numW, title, f, caps, page, extra) {
      var avail = TW - numW - 30, sz = SZ;
      var lines = breakLines(toWords(inline(caps ? up(title) : title, f), sz), avail, avail, sz);
      if (!lines.length) return;
      F.need(lines.length * LEAD + (extra || 0));
      if (extra && !F.top) F.y += extra;
      F.flush();
      if (numStr) F.page.items.push({ t: 'ln', y: F.y + base(LEAD, sz), sz: sz, segs: [{ x: ML, s: numStr, f: f }] });
      lines.forEach(function (l, i) {
        emit(F.page, l, ML + numW, F.y + base(LEAD, sz), avail, 'l', sz);
        if (i === lines.length - 1) {
          var ps = String(page), pw = tw(ps, f, sz), dw = tw('. ', 'n', sz);
          var from = ML + numW + l.w + 5, to = ML + TW - Math.max(pw, 14) - 6;
          var cnt = Math.floor((to - from) / dw);
          if (cnt > 1) F.page.items.push({ t: 'ln', y: F.y + base(LEAD, sz), sz: sz, segs: [{ x: to - cnt * dw, s: new Array(cnt + 1).join('. '), f: 'n' }] });
          F.page.items.push({ t: 'ln', y: F.y + base(LEAD, sz), sz: sz, segs: [{ x: ML + TW - pw, s: ps, f: f }] });
        }
        F.y += LEAD;
      });
      F.top = false;
    }
    function listPage(title, entries) {
      F.newPage(false); F.ctitle(title);
      var numW = 0;
      entries.forEach(function (e) { numW = Math.max(numW, tw(e.label + ' – ', 'n', SZ)); });
      entries.forEach(function (e) { leaderLine(e.label + ' –', numW, e.title, 'n', false, e.page); });
    }
    var L = st.lists || {};
    if (L.fig && prev.lof.length) listPage('Lista de ilustrações', prev.lof);
    if (L.tab && prev.lot.length) listPage('Lista de tabelas', prev.lot);

    // sumário (usa as entradas da passada anterior)
    F.newPage(false); F.ctitle('Sumário');
    var TS = { 1: ['b', true], 2: ['n', true], 3: ['b', false], 4: ['n', false], 0: ['b', true] };
    var numW = 0;
    prev.toc.forEach(function (e) { if (e.num) numW = Math.max(numW, tw(e.num, TS[e.lv][0], SZ)); });
    numW = numW ? numW + 16 : 0;
    prev.toc.forEach(function (e) {
      leaderLine(e.num, numW, e.title, TS[e.lv][0], TS[e.lv][1], e.page, e.lv <= 1 ? 7 : 0);
    });

    /* ----- elementos textuais ----- */
    var HS = { 1: ['b', true], 2: ['n', true], 3: ['b', false], 4: ['n', false] };
    function heading(lv, num, title, inToc) {
      var f = HS[lv][0], t = HS[lv][1] ? up(title) : clean(title);
      var hang = num ? tw(num + ' ', f, SZ) : 0;
      var lines = breakLines(toWords(inline(t, f), SZ), TW - hang, TW - hang, SZ);
      if (lv === 1) F.newPage(true);
      else { F.space(LEAD); F.need(lines.length * LEAD + LEAD + 2 * LEAD); }
      F.flush();
      if (inToc) toc.push({ lv: lv, num: num, title: clean(title), page: F.pageNo() });
      if (num) F.page.items.push({ t: 'ln', y: F.y + base(LEAD, SZ), sz: SZ, segs: [{ x: ML, s: num, f: f }] });
      lines.forEach(function (l) { emit(F.page, l, ML + hang, F.y + base(LEAD, SZ), TW - hang, 'l', SZ); F.y += LEAD; });
      F.top = false; F.space(LEAD);
    }
    function figure(id) {
      var fg = (st.figs || {})[id];
      if (!fg || !fg.data) { warn.push('Uma figura inserida no texto não foi encontrada na lista de figuras.'); return; }
      figN++;
      var cap = 'Figura ' + figN + ' – ' + (clean(fg.title).trim() || '[Título da figura]');
      var src = 'Fonte: ' + (clean(fg.source).trim() || 'elaborado pelos autores (' + ano + ').');
      var frac = fg.size === 'p' ? 0.5 : fg.size === 'm' ? 0.75 : 1;
      var w = TW * frac, h = w * fg.h / fg.w, maxH = 13 * CM;
      if (h > maxH) { w = w * maxH / h; h = maxH; }
      var capH = blockH(cap, { width: TW, lead: SIMPLE }), srcH = blockH(src, { width: TW, sz: SZS, lead: LEADS });
      var total = capH + 6 + h + 6 + srcH;
      F.space(LEAD); F.need(total); F.flush();
      lof.push({ label: 'Figura ' + figN, title: clean(fg.title).trim(), page: F.pageNo() });
      F.y = block(F.page, cap, { x: ML, width: TW, y: F.y, lead: SIMPLE }) + 6;
      F.page.items.push({ t: 'img', id: id, x: CX - w / 2, y: F.y, w: w, h: h });
      F.y += h + 6;
      F.y = block(F.page, src, { x: ML, width: TW, y: F.y, sz: SZS, lead: LEADS });
      F.top = false; F.space(LEAD);
    }
    function table(id) {
      var tb = (st.tabs || {})[id];
      if (!tb) { warn.push('Uma tabela inserida no texto não foi encontrada na lista de tabelas.'); return; }
      var T = parseTable(tb.raw);
      if (!T.n) return;
      tabN++;
      var cap = 'Tabela ' + tabN + ' – ' + (clean(tb.title).trim() || '[Título da tabela]');
      var src = 'Fonte: ' + (clean(tb.source).trim() || 'elaborado pelos autores (' + ano + ').');
      var pad = 6, sz = SZS, lead = LEADS + 1, nat = [], minw = [];
      for (var c = 0; c < T.n; c++) {
        var mx = 0, mn = 0;
        T.rows.forEach(function (r, ri) {
          var f = ri === 0 ? 'b' : 'n';
          mx = Math.max(mx, tw(plain(r[c]), f, sz));
          plain(r[c]).split(/\s+/).forEach(function (wd) { mn = Math.max(mn, tw(wd, f, sz)); });
        });
        nat.push(mx + 2 * pad); minw.push(Math.min(mn, TW / T.n - 2 * pad) + 2 * pad);
      }
      var sum = nat.reduce(function (a, b) { return a + b; }, 0), cw = nat.slice();
      if (sum > TW) {
        var minSum = minw.reduce(function (a, b) { return a + b; }, 0), extra = TW - minSum, flex = sum - minSum;
        cw = nat.map(function (n, i) { return minSum >= TW ? TW / T.n : minw[i] + (n - minw[i]) * extra / flex; });
        sum = TW;
      }
      var x0 = CX - sum / 2;
      var rowsL = T.rows.map(function (r, ri) {
        var cells = r.map(function (cell, ci) {
          var w = cw[ci] - 2 * pad;
          return breakLines(toWords(inline(cell, ri === 0 ? 'b' : 'n'), sz), w, w, sz);
        });
        var nl = cells.reduce(function (a, cl) { return Math.max(a, cl.length); }, 1);
        return { cells: cells, h: nl * lead + 6 };
      });
      var capH = blockH(cap, { width: TW, lead: SIMPLE });
      F.space(LEAD);
      F.need(capH + 6 + rowsL[0].h + (rowsL[1] ? rowsL[1].h : 0) + 20);
      F.flush();
      lot.push({ label: 'Tabela ' + tabN, title: clean(tb.title).trim(), page: F.pageNo() });
      F.y = block(F.page, cap, { x: ML, width: TW, y: F.y, lead: SIMPLE }) + 6;
      function rule(w) { F.page.items.push({ t: 'rule', x1: x0, x2: x0 + sum, y: F.y, w: w }); }
      function drawRow(R, head) {
        var cx = x0;
        R.cells.forEach(function (cl, ci) {
          cl.forEach(function (l, li) {
            emit(F.page, l, cx + pad, F.y + 3 + li * lead + base(lead, sz), cw[ci] - 2 * pad, T.n > 1 && ci > 0 ? 'c' : 'l', sz);
          });
          cx += cw[ci];
        });
        F.y += R.h;
      }
      rule(0.9); drawRow(rowsL[0], true); rule(0.5);
      for (var r = 1; r < rowsL.length; r++) {
        if (F.y + rowsL[r].h > PH - MB - 1) { rule(0.9); F.newPage(); rule(0.9); drawRow(rowsL[0], true); rule(0.5); }
        drawRow(rowsL[r], false);
      }
      rule(0.9); F.y += 5;
      if (F.y + LEADS > PH - MB) F.newPage();
      F.y = block(F.page, src, { x: ML, width: TW, y: F.y, sz: SZS, lead: LEADS });
      F.top = false; F.space(LEAD);
    }
    function body(text, secNum) {
      var c2 = 0, c3 = 0, c4 = 0;
      parseBody(text).forEach(function (b) {
        if (b.t === 'h') {
          if (!secNum) { F.space(LEAD); F.need(3 * LEAD); F.para(b.s, { f: 'b', align: 'l' }); F.space(LEAD); return; }
          var num;
          if (b.lv === 2) { c2++; c3 = c4 = 0; num = secNum + '.' + c2; }
          else if (b.lv === 3) { if (!c2) c2 = 1; c3++; c4 = 0; num = secNum + '.' + c2 + '.' + c3; }
          else { if (!c2) c2 = 1; if (!c3) c3 = 1; c4++; num = secNum + '.' + c2 + '.' + c3 + '.' + c4; }
          heading(b.lv, num, b.s, true);
        } else if (b.t === 'p') F.para(b.s, { indent: PI });
        else if (b.t === 'q') { F.space(LEAD); F.para(b.s, { x0: ML + QUOTE, sz: SZS, lead: LEADS }); F.space(LEAD); }
        else if (b.t === 'ul') {
          var lw = tw('m) ', 'n', SZ);
          b.items.forEach(function (it, i) {
            var s = it.replace(/[\s.;,]+$/, ''); if (!/[?!]$/.test(s)) s += (i === b.items.length - 1 ? '.' : ';');
            F.para(s, { indent: 0, x0: ML + PI, hang: lw, label: letter(i) + ')' });
          });
        }
        else if (b.t === 'fig') figure(b.id);
        else if (b.t === 'tab') table(b.id);
      });
    }

    var n = 0;
    (st.secs || []).forEach(function (s) {
      if (!clean(s.title).trim() && !clean(s.text).trim()) return;
      n++;
      heading(1, String(n), clean(s.title).trim() || '[Título da seção]', true);
      body(s.text, String(n));
    });
    if (!n) F.newPage(true);

    /* ----- pós-textuais ----- */
    var refs = (st.refList || []).map(clean).filter(function (r) { return r.trim(); });
    if (refs.length) {
      F.newPage(true); toc.push({ lv: 0, num: '', title: 'Referências', page: F.pageNo() });
      F.ctitle('Referências');
      refs.sort(function (a, b) { return plain(a).localeCompare(plain(b), 'pt', { sensitivity: 'base' }); });
      refs.forEach(function (r) { F.para(r.trim(), { align: 'l', lead: SIMPLE, keep: true }); F.space(SIMPLE); });
    }
    function extras(list, word) {
      (list || []).forEach(function (a, i) {
        if (!clean(a.title).trim() && !clean(a.text).trim()) return;
        var t = word + ' ' + letter(i).toUpperCase() + ' – ' + (clean(a.title).trim() || '[Título]');
        F.newPage(true); toc.push({ lv: 0, num: '', title: t, page: F.pageNo() });
        F.ctitle(t);
        body(a.text, '');
      });
    }
    extras(st.apx, 'Apêndice');
    extras(st.anx, 'Anexo');

    F.pages.forEach(function (p, i) { p.num = p.numbered ? i : null; });
    return { pages: F.pages, toc: toc, lof: lof, lot: lot, warn: warn };
  }

  function layout(st) {
    curFam = st.font === 'serif' ? 'serif' : 'sans';
    var prev = { toc: [], lof: [], lot: [] }, res, sig = '';
    for (var k = 0; k < 5; k++) {
      res = build(st, prev);
      var s = JSON.stringify([res.toc, res.lof, res.lot]);
      if (s === sig) break;
      sig = s; prev = res;
    }
    res.fam = curFam;
    return res;
  }

  /* ---------- saída: PDF ---------- */
  function toPdf(res, st) {
    var doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'a4', compress: true, putOnlyUsedFonts: true });
    reg(doc, res.fam);
    var fam = FAM[res.fam];
    res.pages.forEach(function (p, i) {
      if (i) doc.addPage();
      p.items.forEach(function (it) {
        if (it.t === 'ln') {
          doc.setFontSize(it.sz);
          it.segs.forEach(function (s) { doc.setFont(fam, STYLE[s.f]); doc.text(s.s, s.x, it.y); });
        } else if (it.t === 'rule') {
          doc.setLineWidth(it.w); doc.line(it.x1, it.y, it.x2, it.y);
        } else if (it.t === 'img') {
          try { doc.addImage(it.data || st.figs[it.id].data, 'JPEG', it.x, it.y, it.w, it.h, 'fig' + it.id, 'FAST'); } catch (e) { /* imagem inválida */ }
        }
      });
      if (p.num != null) {
        doc.setFont(fam, 'normal'); doc.setFontSize(SZS);
        var s = String(p.num);
        doc.text(s, PW - MR - doc.getTextWidth(s), 2 * CM + 7.2);
      }
    });
    var m = st.meta || {};
    doc.setProperties({ title: clean(m.titulo), author: authors(m.autores).join('; '), creator: 'Formata ABNT' });
    return doc;
  }

  /* ---------- saída: SVG (prévia) ---------- */
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function pageSvg(p, res, st) {
    var o = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + PW + ' ' + PH + '" class="pg-svg" style="font-family:' + FAM[res.fam] + '">'];
    p.items.forEach(function (it) {
      if (it.t === 'ln') {
        o.push('<text y="' + it.y.toFixed(2) + '" font-size="' + it.sz + '">');
        it.segs.forEach(function (s) {
          o.push('<tspan x="' + s.x.toFixed(2) + '"' + (s.f === 'b' || s.f === 'bi' ? ' font-weight="700"' : '') + (s.f === 'i' || s.f === 'bi' ? ' font-style="italic"' : '') + '>' + esc(s.s) + '</tspan>');
        });
        o.push('</text>');
      } else if (it.t === 'rule') {
        o.push('<line x1="' + it.x1 + '" x2="' + it.x2 + '" y1="' + it.y + '" y2="' + it.y + '" stroke="#000" stroke-width="' + it.w + '"/>');
      } else if (it.t === 'img') {
        o.push('<image href="' + (it.data || st.figs[it.id].data) + '" x="' + it.x + '" y="' + it.y + '" width="' + it.w + '" height="' + it.h + '" preserveAspectRatio="none"/>');
      }
    });
    if (p.num != null) o.push('<text x="' + (PW - MR) + '" y="' + (2 * CM + 7.2) + '" font-size="10" text-anchor="end">' + p.num + '</text>');
    o.push('</svg>');
    return o.join('');
  }

  function loadWebFonts() {
    if (!window.FontFace || !window.ABNT_FONTS) return Promise.resolve();
    var jobs = [];
    Object.keys(FAM).forEach(function (fam) {
      Object.keys(STYLE).forEach(function (k) {
        var bin = atob(window.ABNT_FONTS[fam + '-' + STYLE[k]]), buf = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
        var ff = new FontFace(FAM[fam], buf.buffer, { weight: k === 'b' || k === 'bi' ? '700' : '400', style: k === 'i' || k === 'bi' ? 'italic' : 'normal' });
        jobs.push(ff.load().then(function (f) { document.fonts.add(f); }).catch(function () {}));
      });
    });
    return Promise.all(jobs);
  }

  window.ABNT = { layout: layout, toPdf: toPdf, pageSvg: pageSvg, loadWebFonts: loadWebFonts, keywords: keywords, authors: authors, clean: clean, plain: plain, parseBody: parseBody };
})();
