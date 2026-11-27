(function(){
  const WHATS='5549985031923';
  const reduz=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ic=(id,cls)=>'<svg class="i '+(cls||'')+'"><use href="#i-'+id+'"/></svg>';

  /* ---------- serviços ---------- */
  const S=[
    {n:'Abertura de empresas',ic:'predio',d:'Condução de todo o processo de formalização, da definição da estrutura jurídica ao registro do CNPJ.',tags:['Estrutura jurídica','Enquadramento tributário','Registro']},
    {n:'Contabilidade consultiva',ic:'lupa',d:'Interpretação dos números da empresa para apoiar decisões de gestão e investimento.',tags:['Análise de resultados','Apoio à gestão']},
    {n:'Escrituração fiscal e contábil',ic:'livro',d:'Registro das operações e entrega das obrigações acessórias em conformidade com a legislação.',tags:['Obrigações acessórias','Conformidade']},
    {n:'Certificação digital',ic:'chave',d:'Emissão e renovação de certificados digitais para pessoas físicas e jurídicas.',tags:['Emissão','Renovação']},
    {n:'Planejamento tributário',ic:'grafico',d:'Análise do regime e das operações para reduzir a carga tributária dentro da legislação.',tags:['Redução de impostos','Escolha do regime']},
    {n:'Consultoria e regularização empresarial',ic:'escudo',d:'Diagnóstico e solução de pendências fiscais, tributárias e legais.',tags:['Pendências fiscais','Regularização']},
    {n:'Folha de pagamento e departamento pessoal',ic:'pessoas',d:'Gestão completa da folha: admissões, rescisões, férias, encargos sociais e obrigações trabalhistas.',tags:['Folha','Admissões e rescisões','eSocial']},
    {n:'Imposto de Renda PF e PJ',ic:'doc',d:'Elaboração e revisão de declarações, com foco na redução de riscos junto à Receita Federal.',tags:['Pessoa física','Pessoa jurídica']},
    {n:'Regularização de obras (CEI / Obra no INSS)',ic:'obra',d:'Regularização completa da obra junto ao INSS, com redução legal do valor devido.',destaque:['Até 70%','de economia no INSS'],tags:['CEI','Obra no INSS']},
    {n:'Contabilidade e administração pública',ic:'publico',d:'Documentação para licitações, análise de editais, pedidos de reequilíbrio (Lei 14.133/2021), orçamentos e planejamento municipal, empenhos, liquidações e pagamentos.',tags:['Licitações','Lei 14.133/2021','Execução orçamentária']}
  ];
  const pad=i=>String(i+1).padStart(2,'0');
  const lista=document.getElementById('servLista'),painel=document.getElementById('painel'),mob=document.getElementById('servMobile');
  S.forEach((s,i)=>{
    const li=document.createElement('li');li.setAttribute('role','presentation');
    li.innerHTML='<button class="serv-btn" role="tab" id="tab'+i+'" aria-selected="'+(i===0)+'" aria-controls="painel"><span class="n">'+pad(i)+'</span><span class="nome">'+s.n+'</span><span class="seta">'+ic('seta')+'</span></button>';
    lista.appendChild(li);
    const d=document.createElement('details');d.className='acc';if(i===0)d.open=true;
    d.innerHTML='<summary><span class="n">'+pad(i)+'</span><span class="nome">'+s.n+'</span><span class="mais">'+ic('mais')+'</span></summary><div class="corpo">'+s.d+(s.destaque?' <b>'+s.destaque[0]+' '+s.destaque[1]+'.</b>':'')+'</div>';
    mob.appendChild(d);
  });
  function mostra(i){
    const s=S[i];
    lista.querySelectorAll('.serv-btn').forEach((b,j)=>b.setAttribute('aria-selected',j===i));
    painel.setAttribute('aria-labelledby','tab'+i);
    painel.innerHTML='<div class="padrao"></div><div class="bignum">'+pad(i)+'</div><div class="anim"><div class="ic">'+ic(s.ic)+'</div><h3>'+s.n+'</h3><p>'+s.d+'</p>'+
      (s.destaque?'<div class="destaque"><b>'+s.destaque[0]+'</b>'+s.destaque[1]+'</div>':'')+
      '<div class="tags">'+s.tags.map(t=>'<span>'+t+'</span>').join('')+'</div>'+
      '<div class="rodape"><a class="btn b-laranja" target="_blank" rel="noopener" href="https://wa.me/'+WHATS+'?text='+encodeURIComponent('Olá! Gostaria de informações sobre: '+s.n+'.')+'">Solicitar informações'+ic('seta')+'</a></div></div>';
  }
  const idx=b=>[...lista.querySelectorAll('.serv-btn')].indexOf(b);
  lista.addEventListener('click',e=>{const b=e.target.closest('.serv-btn');if(b)mostra(idx(b));});
  lista.addEventListener('mouseover',e=>{const b=e.target.closest('.serv-btn');if(b&&matchMedia('(hover:hover)').matches)mostra(idx(b));});
  lista.addEventListener('keydown',e=>{
    const bs=[...lista.querySelectorAll('.serv-btn')],i=bs.indexOf(document.activeElement);if(i<0)return;
    let j=null;if(e.key==='ArrowDown')j=(i+1)%bs.length;if(e.key==='ArrowUp')j=(i-1+bs.length)%bs.length;
    if(j!==null){e.preventDefault();bs[j].focus();mostra(j);}
  });
  mostra(0);
  const sel=document.getElementById('servico');
  ['Preciso de orientação',...S.map(s=>s.n)].forEach(n=>{const o=document.createElement('option');o.textContent=n;sel.appendChild(o);});

  /* ---------- faixa ---------- */
  const tr=document.getElementById('trilho');tr.innerHTML+=tr.innerHTML;

  /* ---------- header e menu ---------- */
  const hd=document.getElementById('topo');
  const onScroll=()=>hd.classList.toggle('solido',scrollY>40);onScroll();addEventListener('scroll',onScroll,{passive:true});
  const bg=document.getElementById('burger'),mn=document.getElementById('menu');
  const fecha=()=>{mn.classList.remove('aberto');bg.classList.remove('x');bg.setAttribute('aria-expanded',false);};
  bg.addEventListener('click',()=>{const a=mn.classList.toggle('aberto');bg.classList.toggle('x',a);bg.setAttribute('aria-expanded',a);});
  mn.querySelectorAll('a').forEach(a=>a.addEventListener('click',fecha));
  addEventListener('keydown',e=>{if(e.key==='Escape')fecha();});

  /* ---------- anos de experiência ----------
     27 anos em 2026; soma 1 a cada maio (maio/2027 = 28, maio/2028 = 29…) */
  const ANOS_BASE=27, ANO_BASE=2026, MES_VIRADA=5;
  const hoje=new Date();
  const anos=ANOS_BASE+(hoje.getFullYear()-ANO_BASE)-((hoje.getMonth()+1)<MES_VIRADA?1:0);
  const anosOk=Math.max(ANOS_BASE,anos);
  document.querySelectorAll('[data-anos]').forEach(e=>e.textContent=anosOk);
  document.querySelectorAll('[data-anos-alvo]').forEach(e=>e.dataset.alvo=anosOk);
  document.querySelectorAll('[data-anos-label]').forEach(e=>e.setAttribute('aria-label','Mais de '+anosOk+' anos de experiência'));

  /* ---------- revelar e contadores ---------- */
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}}),{threshold:.15});
  document.querySelectorAll('.rv').forEach(el=>io.observe(el));
  const ioc=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;ioc.unobserve(e.target);
    const el=e.target,alvo=+el.dataset.alvo;if(reduz){el.textContent=alvo;return;}
    const t0=performance.now(),dur=1600;
    (function f(t){const p=Math.min((t-t0)/dur,1);el.textContent=Math.round(alvo*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f);})(t0);
  }),{threshold:.6});
  document.querySelectorAll('.cont').forEach(el=>ioc.observe(el));

  /* ---------- frase que acende ---------- */
  const fr=document.getElementById('frase');
  (function quebra(node){
    [...node.childNodes].forEach(n=>{
      if(n.nodeType===3){const f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(p=>{if(!p.trim()){f.appendChild(document.createTextNode(p));return;}const s=document.createElement('span');s.className='w';s.textContent=p;f.appendChild(s);});n.replaceWith(f);}
      else if(n.nodeType===1)quebra(n);
    });
  })(fr);
  const ws=fr.querySelectorAll('.w');
  function acende(){const r=fr.getBoundingClientRect(),vh=innerHeight;const p=Math.min(Math.max((vh*.85-r.top)/(r.height+vh*.35),0),1);const k=Math.round(p*ws.length);ws.forEach((w,i)=>w.classList.toggle('on',i<k));}
  if(reduz)ws.forEach(w=>w.classList.add('on'));else{acende();addEventListener('scroll',acende,{passive:true});}

  /* ---------- jornada ---------- */
  const tl=document.getElementById('trilha'),bar=document.getElementById('barra');
  const passo=()=>tl.querySelector('.etapa').offsetWidth+16;
  document.getElementById('jorProx').onclick=()=>tl.scrollBy({left:passo(),behavior:'smooth'});
  document.getElementById('jorAnt').onclick=()=>tl.scrollBy({left:-passo(),behavior:'smooth'});
  const prog=()=>{const m=tl.scrollWidth-tl.clientWidth;bar.style.width=(m>0?Math.max(tl.scrollLeft/m,.08)*100:100)+'%';};
  tl.addEventListener('scroll',prog,{passive:true});prog();addEventListener('resize',prog);
  let dx=null,sl=0;
  tl.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;dx=e.clientX;sl=tl.scrollLeft;tl.classList.add('arrastando');});
  addEventListener('pointermove',e=>{if(dx===null)return;tl.scrollLeft=sl-(e.clientX-dx);});
  addEventListener('pointerup',()=>{if(dx===null)return;dx=null;tl.classList.remove('arrastando');});

  /* ---------- perguntas ---------- */
  const Q=['Precisa tirar uma ideia do papel?','Quer mais organização e clareza nos números?','Busca uma contabilidade que fala a sua língua?'];
  const alvo=document.getElementById('digita');
  if(reduz){alvo.textContent=Q[2];}else{
    let qi=0,ci=0,apaga=false;
    (function tick(){const q=Q[qi];
      if(!apaga){ci++;alvo.textContent=q.slice(0,ci);if(ci===q.length){apaga=true;return setTimeout(tick,2200);}}
      else{ci--;alvo.textContent=q.slice(0,ci);if(ci===0){apaga=false;qi=(qi+1)%Q.length;}}
      setTimeout(tick,apaga?24:48);
    })();
  }

  /* ---------- formulário -> WhatsApp ---------- */
  document.getElementById('form').addEventListener('submit',e=>{
    e.preventDefault();const f=e.target,nome=f.nome.value.trim();
    if(!nome){f.nome.focus();f.nome.style.borderColor='var(--laranja)';f.nome.setAttribute('aria-invalid','true');return;}
    const txt=['Olá! Vim pelo site da D&M Contabilidade.','*Nome:* '+nome,f.empresa.value.trim()?'*Empresa:* '+f.empresa.value.trim():'','*Serviço:* '+f.servico.value,f.msg.value.trim()?'*Mensagem:* '+f.msg.value.trim():''].filter(Boolean).join('\n');
    window.open('https://wa.me/'+WHATS+'?text='+encodeURIComponent(txt),'_blank','noopener');
  });

  document.getElementById('ano').textContent=new Date().getFullYear();

  /* ---------- grade de conferência (tecla G ou ?grade=1) ---------- */
  const gc=document.getElementById('gradeCols');for(let i=0;i<16;i++)gc.appendChild(document.createElement('i'));
  const ajustaGrade=()=>{const n=+getComputedStyle(document.documentElement).getPropertyValue('--cols');[...gc.children].forEach((c,i)=>c.style.display=i<n?'':'none');};
  ajustaGrade();addEventListener('resize',ajustaGrade);
  if(new URLSearchParams(location.search).get('grade'))document.documentElement.classList.add('ver-grade');
  addEventListener('keydown',e=>{if((e.key==='g'||e.key==='G')&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))document.documentElement.classList.toggle('ver-grade');});

  /* ---------- faixa do topo: aviso do escritório (avisos.json) ou campanha do mês ---------- */
  const faixa=document.getElementById('campanha'),faixaTxt=document.getElementById('campanhaTxt');
  document.getElementById('fecharAviso').addEventListener('click',()=>document.documentElement.classList.add('aviso-fechado'));
  if(window.TEMA_ATUAL){
    faixaTxt.innerHTML=TEMA_ATUAL.texto;document.documentElement.classList.add('tem-aviso');
    document.querySelectorAll('img[data-logo]').forEach(img=>{const t=new Image();t.onload=()=>{img.src=TEMA_ATUAL.logo;};t.src=TEMA_ATUAL.logo;});
  }
  fetch('avisos.json',{cache:'no-store'}).then(r=>r.ok?r.json():[]).then(lista=>{
    const hj=new Date().toISOString().slice(0,10);
    const a=(lista||[]).find(x=>x&&x.texto&&(!x.inicio||x.inicio<=hj)&&(!x.fim||x.fim>=hj));
    if(!a)return;
    faixaTxt.textContent=a.texto;faixa.classList.add('escritorio');
    document.querySelector('#avisoIcone use').setAttribute('href','#i-sino');
    document.documentElement.classList.add('tem-aviso');
  }).catch(()=>{});

  /* ---------- carrossel de avaliações ---------- */
  const dl=document.getElementById('depoLista');
  if(dl){
    const ant=document.getElementById('depoAnt'),prox=document.getElementById('depoProx');
    const passo=()=>{const c=dl.querySelector('.depo');return c?c.getBoundingClientRect().width+parseFloat(getComputedStyle(dl).columnGap||16):dl.clientWidth};
    const estado=()=>{ant.disabled=dl.scrollLeft<4;prox.disabled=dl.scrollLeft+dl.clientWidth>=dl.scrollWidth-4};
    ant.addEventListener('click',()=>dl.scrollBy({left:-passo()}));
    prox.addEventListener('click',()=>dl.scrollBy({left:passo()}));
    dl.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();prox.click()}if(e.key==='ArrowLeft'){e.preventDefault();ant.click()}});
    dl.addEventListener('scroll',()=>requestAnimationFrame(estado),{passive:true});
    addEventListener('resize',estado);estado();
    /* passa sozinho a cada 5 s; pausa com o mouse em cima, no foco, no toque e fora da tela */
    const fim=()=>dl.scrollLeft+dl.clientWidth>=dl.scrollWidth-4;
    let pausa=false,visivel=false,timer=null;
    const avanca=()=>{if(pausa||!visivel||document.hidden)return;fim()?dl.scrollTo({left:0}):dl.scrollBy({left:passo()})};
    const liga=()=>{clearInterval(timer);timer=setInterval(avanca,5000)};
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
      const trilho=dl.closest('.depo-trilho');
      trilho.addEventListener('mouseenter',()=>pausa=true);
      trilho.addEventListener('mouseleave',()=>{pausa=false;liga()});
      dl.addEventListener('focusin',()=>pausa=true);
      dl.addEventListener('focusout',()=>{pausa=false;liga()});
      dl.addEventListener('touchstart',()=>{pausa=true;clearTimeout(dl._t);dl._t=setTimeout(()=>{pausa=false;liga()},8000)},{passive:true});
      [ant,prox].forEach(b=>b.addEventListener('click',liga));
      if('IntersectionObserver' in window)new IntersectionObserver(es=>{visivel=es[0].isIntersecting},{threshold:.4}).observe(dl);else visivel=true;
      liga();
    }
  }

  /* ---------- avaliações do Google (/api/avaliacoes), carregadas quando a seção aparece ---------- */
  const secAval=document.getElementById('avaliacoes');
  if(secAval&&location.protocol.startsWith('http')&&'IntersectionObserver' in window){
    const esc=t=>String(t||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    const estrela='<svg class="i"><use href="#i-estrela"/></svg>';
    const ioA=new IntersectionObserver(es=>{
      if(!es.some(e=>e.isIntersecting))return;ioA.disconnect();
      fetch('/api/avaliacoes').then(r=>r.ok?r.json():null).then(d=>{
        if(!d||!d.nota)return;
        document.getElementById('notaValor').textContent=d.nota.toFixed(1).replace('.',',');
        document.getElementById('notaTotal').textContent=d.total;
        const cheias=Math.floor(d.nota),meia=d.nota-cheias>=.3;
        document.getElementById('notaEstrelas').innerHTML=Array.from({length:5},(_,i)=>i<cheias?estrela:(i===cheias&&meia?'<svg class="i" style="opacity:.6"><use href="#i-estrela"/></svg>':'<svg class="i" style="opacity:.2"><use href="#i-estrela"/></svg>')).join('');
        if(d.mapa)document.getElementById('btnVerAval').href=d.mapa;
        if(d.avaliar)document.getElementById('btnAvaliar').href=d.avaliar;
        const slots=[...document.querySelectorAll('[data-depo]')];
        (d.avaliacoes||[]).slice(0,slots.length).forEach((v,i)=>{
          const nome=esc(v.autor),ini=nome.charAt(0).toUpperCase();
          const foto=v.autorFoto?'<img class="avatar" src="'+esc(v.autorFoto)+'" alt="" referrerpolicy="no-referrer" loading="lazy">':'<span class="avatar" aria-hidden="true">'+ini+'</span>';
          const quem=v.autorLink?'<a href="'+esc(v.autorLink)+'" target="_blank" rel="noopener"><strong>'+nome+'</strong></a>':'<strong>'+nome+'</strong>';
          slots[i].innerHTML='<div class="estrelas" aria-label="'+v.nota+' de 5 estrelas">'+estrela.repeat(v.nota)+'</div>'+
            '<blockquote>'+esc(v.texto)+(v.traduzida?'<span class="trad">Traduzida pelo Google</span>':'')+'</blockquote>'+
            '<figcaption class="autor">'+foto+'<span>'+quem+'<span>Google Maps · '+esc(v.quando)+'</span></span></figcaption>'+
            '<a class="ver" href="'+esc(v.link)+'" target="_blank" rel="noopener">Ver no Google Maps</a>';
        });
      }).catch(()=>{});
    },{rootMargin:'200px'});
    ioA.observe(secAval);
  }

  /* ---------- últimos posts do Instagram (/api/instagram) ---------- */
  const ig=document.getElementById('igPosts');
  if(ig&&location.protocol.startsWith('http')){
    fetch('/api/instagram').then(r=>r.ok?r.json():null).then(d=>{
      const posts=(d&&d.posts)||[];if(!posts.length)return;
      const esc=t=>String(t||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
      const fmt=t=>new Date(t).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.','');
      ig.innerHTML=posts.slice(0,4).map(p=>'<a class="ig-post" href="'+esc(p.permalink)+'" target="_blank" rel="noopener">'+
        '<img src="'+esc(p.imagem)+'" alt="'+esc((p.legenda||'Post do Instagram').slice(0,120))+'" loading="lazy">'+
        (p.tipo==='VIDEO'?'<span class="ig-tipo">Vídeo</span>':p.tipo==='CAROUSEL_ALBUM'?'<span class="ig-tipo">Galeria</span>':'')+
        '<span class="ig-info"><span class="ig-leg">'+esc(p.legenda)+'</span><span class="ig-data">'+fmt(p.data)+'</span></span></a>').join('');
      document.getElementById('instagram').hidden=false;
    }).catch(()=>{});
  }
})();
