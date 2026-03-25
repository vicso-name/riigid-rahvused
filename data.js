// ═══════════════════════════════════════════
// data.js — Riigid & Rahvused course data
// 13 Estonian countries: riik, rahvus, kus, rahvused
// Uses engine.js (COURSE contract)
// ═══════════════════════════════════════════

// ══ COUNTRY DATA ══
const COUNTRIES = [
  { riik:'Inglismaa', rahvus:'inglane', kus:'Inglismaal', rahvused:'inglased', ru:'Англия', ruNat:'англичанин', ruNats:'англичане', ruKus:'в Англии' },
  { riik:'Saksamaa', rahvus:'sakslane', kus:'Saksamaal', rahvused:'sakslased', ru:'Германия', ruNat:'немец', ruNats:'немцы', ruKus:'в Германии' },
  { riik:'Venemaa', rahvus:'venelane', kus:'Venemaal', rahvused:'venelased', ru:'Россия', ruNat:'русский', ruNats:'русские', ruKus:'в России' },
  { riik:'Prantsusmaa', rahvus:'prantslane', kus:'Prantsusmaal', rahvused:'prantslased', ru:'Франция', ruNat:'француз', ruNats:'французы', ruKus:'во Франции' },
  { riik:'Hispaania', rahvus:'hispaanlane', kus:'Hispaanias', rahvused:'hispaanlased', ru:'Испания', ruNat:'испанец', ruNats:'испанцы', ruKus:'в Испании' },
  { riik:'Soome', rahvus:'soomlane', kus:'Soomes', rahvused:'soomlased', ru:'Финляндия', ruNat:'финн', ruNats:'финны', ruKus:'в Финляндии' },
  { riik:'Ukraina', rahvus:'ukrainlane', kus:'Ukrainas', rahvused:'ukrainlased', ru:'Украина', ruNat:'украинец', ruNats:'украинцы', ruKus:'в Украине' },
  { riik:'Leedu', rahvus:'leedulane', kus:'Leedus', rahvused:'leedulased', ru:'Литва', ruNat:'литовец', ruNats:'литовцы', ruKus:'в Литве' },
  { riik:'Itaalia', rahvus:'itaallane', kus:'Itaalias', rahvused:'itaallased', ru:'Италия', ruNat:'итальянец', ruNats:'итальянцы', ruKus:'в Италии' },
  { riik:'Norra', rahvus:'norralane', kus:'Norras', rahvused:'norralased', ru:'Норвегия', ruNat:'норвежец', ruNats:'норвежцы', ruKus:'в Норвегии' },
  { riik:'Rootsi', rahvus:'rootslane', kus:'Rootsis', rahvused:'rootslased', ru:'Швеция', ruNat:'швед', ruNats:'шведы', ruKus:'в Швеции' },
  { riik:'Eesti', rahvus:'eestlane', kus:'Eestis', rahvused:'eestlased', ru:'Эстония', ruNat:'эстонец', ruNats:'эстонцы', ruKus:'в Эстонии' },
  { riik:'Läti', rahvus:'lätlane', kus:'Lätis', rahvused:'lätlased', ru:'Латвия', ruNat:'латыш', ruNats:'латыши', ruKus:'в Латвии' },
];

// ══ SENTENCE TEMPLATES (for advanced exercises) ══
const SENTENCE_TEMPLATES = [
  { ru: c => `Я думаю, что он/она — ${c.ruNat}.`, et: c => `Ma arvan, et ta on ${c.rahvus}`, field:'rahvus', words: c => ['Ma','arvan','et','ta','on',c.rahvus] },
  { ru: c => `Я думаю, что они — ${c.ruNats}.`, et: c => `Ma arvan, et nad on ${c.rahvused}`, field:'rahvused', words: c => ['Ma','arvan','et','nad','on',c.rahvused] },
  { ru: c => `Я живу ${c.ruKus}.`, et: c => `Ma elan ${c.kus}`, field:'kus', words: c => ['Ma','elan',c.kus] },
  { ru: c => `Он/она живёт ${c.ruKus}.`, et: c => `Ta elab ${c.kus}`, field:'kus', words: c => ['Ta','elab',c.kus] },
  { ru: c => `Они — ${c.ruNats}.`, et: c => `Nad on ${c.rahvused}`, field:'rahvused', words: c => ['Nad','on',c.rahvused] },
  { ru: c => `Он/она — ${c.ruNat}.`, et: c => `Ta on ${c.rahvus}`, field:'rahvus', words: c => ['Ta','on',c.rahvus] },
  { ru: c => `Где ты живёшь? — ${c.ruKus}.`, et: c => `Kus sa elad? — ${c.kus}`, field:'kus', words: c => ['Kus','sa','elad',c.kus] },
];

function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

// ══ FORM CONFIG ══
const FORMS = {
  rahvus:   { label:'Житель',    qPrefix: c => `Житель «${c.riik}»?`, ruAnswer: c => c.ruNat, etAnswer: c => c.rahvus },
  kus:      { label:'Где?',      qPrefix: c => `Где? — «${c.ru}»`,    ruAnswer: c => c.ruKus, etAnswer: c => c.kus },
  rahvused: { label:'Мн. число', qPrefix: c => `Жители «${c.riik}» (мн.ч.)?`, ruAnswer: c => c.ruNats, etAnswer: c => c.rahvused },
};

// ═══════════════════════════════════════════
// ══ EXERCISE GENERATORS ══
// ═══════════════════════════════════════════

function makeVocabChoice(country, form, key){
  const formCfg = FORMS[form];
  const answer = formCfg.etAnswer(country);
  const wrongs = shuffle(COUNTRIES.filter(c => c.riik !== country.riik))
    .slice(0, 3).map(c => formCfg.etAnswer(c));
  return { type:'choice', label:formCfg.label, qText:formCfg.qPrefix(country), qRu:'',
    answer, options:shuffle([answer, ...wrongs]), reveal:`${country.ru} → ${answer}`,
    _audio:answer, _skillKey:key };
}

function makeVocabChoiceReverse(country, form, key){
  const formCfg = FORMS[form];
  const etWord = formCfg.etAnswer(country);
  const wrongs = shuffle(COUNTRIES.filter(c => c.riik !== country.riik))
    .slice(0, 3).map(c => c.ru);
  return { type:'choice', label:'Какая страна?', qText:etWord, qRu:'',
    answer:country.ru, options:shuffle([country.ru, ...wrongs]),
    reveal:`${etWord} → ${country.ru}`, _audio:etWord, _skillKey:key };
}

function makeVocabTyping(country, form, key){
  const formCfg = FORMS[form];
  const answer = formCfg.etAnswer(country);
  return { type:'typing', label:`${formCfg.label} — напиши`, qText:formCfg.qPrefix(country),
    qRu:formCfg.ruAnswer(country), answer:normalize(answer), reveal:answer,
    _audio:answer, _skillKey:key };
}

function makeReverseTyping(country, form, key){
  const formCfg = FORMS[form];
  const etWord = formCfg.etAnswer(country);
  return { type:'typing', label:'Напиши страну', qText:`«${etWord}» — страна?`,
    qRu:'', answer:normalize(country.riik), reveal:country.riik,
    _audio:country.riik, _skillKey:key };
}

function makeSentenceBuild(country, key){
  const tmpl = pick(SENTENCE_TEMPLATES);
  const et = tmpl.et(country);
  const ru = tmpl.ru(country);
  const words = tmpl.words(country);
  // Distractor words from another country
  const other = pick(COUNTRIES.filter(c => c.riik !== country.riik));
  const distractors = [];
  if(other){
    const otherAnswer = other[tmpl.field];
    if(otherAnswer && !words.includes(otherAnswer)) distractors.push(otherAnswer);
  }
  return { type:'build', label:'Собери предложение', qRu:ru,
    answer:words, bank:shuffle([...words, ...distractors]),
    reveal:et, _audio:et, _skillKey:key };
}

function makeSentenceTyping(country, key){
  const tmpl = pick(SENTENCE_TEMPLATES);
  const et = tmpl.et(country);
  const ru = tmpl.ru(country);
  return { type:'typing', label:'Переведи предложение', qText:'Переведи:',
    qRu:ru, answer:normalize(et), reveal:et, _audio:et, _skillKey:key };
}

// ═══════════════════════════════════════════
// ══ COURSE DEFINITION ══
// ═══════════════════════════════════════════
const COURSE = window.COURSE = {
  saveKey: 'riigid_v2',
  sessionLen: 20,
  streakNeeded: 2,

  stages: [
    { id:1, label:'Страна → Житель', form:'rahvus' },
    { id:2, label:'Где? (падеж)',     form:'kus' },
    { id:3, label:'Мн. число',        form:'rahvused' },
  ],

  getAllSkillKeys(){
    const keys = [];
    Object.keys(FORMS).forEach(form => {
      COUNTRIES.forEach((_, i) => keys.push(`${form}_${i}`));
    });
    return keys;
  },

  getStageSkillKeys(stageId){
    const st = this.stages.find(s => s.id === stageId);
    if(!st) return [];
    return COUNTRIES.map((_, i) => `${st.form}_${i}`);
  },

  makeExercise(skillKey, box){
    const m = skillKey.match(/^(\w+)_(\d+)$/);
    if(!m) return makeVocabChoice(COUNTRIES[0], 'rahvus', skillKey);

    const form = m[1];
    const idx = parseInt(m[2]);
    const country = COUNTRIES[idx];
    if(!country || !FORMS[form]) return makeVocabChoice(COUNTRIES[0], 'rahvus', skillKey);

    const roll = Math.random();
    let choiceP, buildP, typingP;
    if(box === 0)      { choiceP = 0.55; buildP = 0.70; typingP = 0.90; }
    else if(box === 1) { choiceP = 0.15; buildP = 0.35; typingP = 0.70; }
    else               { choiceP = 0.00; buildP = 0.15; typingP = 0.55; }

    if(roll < choiceP){
      return Math.random() > 0.4
        ? makeVocabChoice(country, form, skillKey)
        : makeVocabChoiceReverse(country, form, skillKey);
    }
    if(roll < buildP){
      return makeSentenceBuild(country, skillKey);
    }
    if(roll < typingP){
      return Math.random() > 0.5
        ? makeVocabTyping(country, form, skillKey)
        : makeReverseTyping(country, form, skillKey);
    }
    // Box 2: sentence-level typing
    return makeSentenceTyping(country, skillKey);
  },

  faqHtml: `
    <div style="font-size:.88rem;line-height:1.65;color:var(--text-dim);">
      <div style="margin-bottom:14px;">
        <div style="font-weight:800;color:var(--text);margin-bottom:4px;">🎯 Цель</div>
        Выучить 13 стран по-эстонски: название страны (riik), житель (rahvus), множественное число (rahvused) и падежную форму «где» (kus).
      </div>
      <div style="margin-bottom:14px;">
        <div style="font-weight:800;color:var(--text);margin-bottom:4px;">📦 Как учим</div>
        Каждая форма каждой страны — навык. Три ступени:<br>
        <span style="color:var(--danger);font-weight:700;">Новый</span> → <span style="color:var(--warning);font-weight:700;">Учу</span> → <span style="color:var(--success);font-weight:700;">Освоен</span><br>
        <strong>2 верных ответа подряд</strong> — навык продвигается.<br>
        <strong>1 ошибка</strong> — возврат в начало.
      </div>
      <div style="margin-bottom:14px;">
        <div style="font-weight:800;color:var(--text);margin-bottom:4px;">🗺 3 этапа</div>
        <strong>Stage 1:</strong> Страна → Житель (Inglismaa → inglane)<br>
        <strong>Stage 2:</strong> Где? (Inglismaal, Soomes, Lätis...)<br>
        <strong>Stage 3:</strong> Мн. число (inglased, soomlased...)<br><br>
        Каждый следующий этап открывается когда <strong>все 13</strong> навыков текущего освоены.
      </div>
      <div style="margin-bottom:14px;">
        <div style="font-weight:800;color:var(--text);margin-bottom:4px;">📝 Типы заданий</div>
        <strong>Выбор</strong> — выбери правильный вариант<br>
        <strong>Обратный выбор</strong> — по эстонскому слову найди страну<br>
        <strong>Сборка</strong> — собери предложение (Ma arvan, et ta on inglane)<br>
        <strong>Ввод</strong> — напиши по памяти<br>
        <strong>Перевод предложений</strong> — переведи с русского на эстонский
      </div>
      <div>
        <div style="font-weight:800;color:var(--text);margin-bottom:4px;">💾 Прогресс</div>
        Сохраняется автоматически. Можно закрыть и продолжить позже.
      </div>
    </div>`,

  renderStudy(container, helpers){
    const { openDrill, stopAudio } = helpers;
    const tabs = [
      { id:'tabRahvus', label:'Жители' },
      { id:'tabKus', label:'Где?' },
      { id:'tabRahvused', label:'Мн. число' },
      { id:'tabRef', label:'Правила' },
    ];
    const tabBar = document.createElement('div');
    tabBar.style.cssText = 'display:flex;justify-content:space-between;gap:6px;margin-bottom:16px;overflow-x:auto;-webkit-overflow-scrolling:touch;';
    const panels = {};

    tabs.forEach((tab, i) => {
      const btn = document.createElement('button'); btn.className = 'study-tab'; btn.textContent = tab.label;
      if(i === 0) btn.classList.add('active');
      btn.addEventListener('click', () => {
        stopAudio();
        tabBar.querySelectorAll('.study-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        Object.values(panels).forEach(p => p.style.display = 'none');
        panels[tab.id].style.display = '';
      });
      tabBar.appendChild(btn);
      const panel = document.createElement('div'); panel.style.display = i === 0 ? '' : 'none';
      panels[tab.id] = panel;
    });
    container.appendChild(tabBar);
    Object.values(panels).forEach(p => container.appendChild(p));

    function makeCountryRow(country, etField, ruLabel){
      const etVal = country[etField];
      const row = document.createElement('div'); row.className = 'study-sentence';
      row.innerHTML = `<span class="ss-et">${country.ru} → ${etVal}</span><span class="ss-ru">${ruLabel}</span>`;
      row.addEventListener('click', () => openDrill(etVal, etVal, country.ru, ruLabel));
      return row;
    }

    // Tab 1: rahvus
    const g1 = document.createElement('div'); g1.className = 'study-sentence-grid';
    COUNTRIES.forEach(c => g1.appendChild(makeCountryRow(c, 'rahvus', c.ruNat)));
    panels['tabRahvus'].appendChild(g1);

    // Tab 2: kus
    const g2 = document.createElement('div'); g2.className = 'study-sentence-grid';
    COUNTRIES.forEach(c => g2.appendChild(makeCountryRow(c, 'kus', c.ruKus)));
    panels['tabKus'].appendChild(g2);

    // Tab 3: rahvused
    const g3 = document.createElement('div'); g3.className = 'study-sentence-grid';
    COUNTRIES.forEach(c => g3.appendChild(makeCountryRow(c, 'rahvused', c.ruNats)));
    panels['tabRahvused'].appendChild(g3);

    // Tab 4: Rules
    const ref = panels['tabRef'];
    const n1 = document.createElement('div'); n1.className = 'study-note';
    n1.innerHTML = `<strong>Житель страны (rahvus)</strong><br><br>
      Образуется от названия страны: корень + <strong>lane</strong><br>
      <span style="font-family:'DM Mono',monospace;font-size:.85rem;">
      Inglismaa → ing<strong>lane</strong><br>
      Saksamaa → saks<strong>lane</strong><br>
      Soome → soom<strong>lane</strong><br>
      Eesti → eest<strong>lane</strong></span>`;
    ref.appendChild(n1);

    const n2 = document.createElement('div'); n2.className = 'study-note';
    n2.innerHTML = `<strong>Где? (kus?) — падежная форма</strong><br><br>
      Страны на <strong>-maa</strong>: + <strong>l</strong> → Inglismaa<strong>l</strong>, Saksamaa<strong>l</strong><br>
      Остальные: + <strong>s</strong> → Soome<strong>s</strong>, Eesti<strong>s</strong>, Läti<strong>s</strong><br>
      <span style="font-family:'DM Mono',monospace;font-size:.85rem;">
      Hispaania → Hispaania<strong>s</strong><br>
      Itaalia → Itaalia<strong>s</strong></span>`;
    ref.appendChild(n2);

    const n3 = document.createElement('div'); n3.className = 'study-note';
    n3.innerHTML = `<strong>Множественное число (rahvused)</strong><br><br>
      Корень жителя + <strong>sed/sed</strong> → <strong>ed</strong>:<br>
      <span style="font-family:'DM Mono',monospace;font-size:.85rem;">
      inglane → inglas<strong>ed</strong><br>
      sakslane → sakslas<strong>ed</strong><br>
      soomlane → soomlas<strong>ed</strong></span><br><br>
      Обрати внимание: <strong>ne → sed</strong> (inglane → inglased)`;
    ref.appendChild(n3);

    const n4 = document.createElement('div'); n4.className = 'study-note';
    n4.innerHTML = `<strong>Полезные фразы</strong><br><br>
      <span style="font-family:'DM Mono',monospace;font-size:.85rem;">
      Ma arvan, et ta on <strong>inglane</strong> — Я думаю, что он/она англичанин<br><br>
      Ma elan <strong>Soomes</strong> — Я живу в Финляндии<br><br>
      Ta elab <strong>Inglismaal</strong> — Он/она живёт в Англии<br><br>
      Nad on <strong>sakslased</strong> — Они немцы</span>`;
    ref.appendChild(n4);
  },
};

// ══ BOOT ══
init();