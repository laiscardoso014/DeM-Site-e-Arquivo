/* ===== CONFIGURAÇÃO DOS TEMAS MENSAIS =====
   mes: 1 = janeiro ... 12 = dezembro
   Para criar outro mês: copie um bloco, troque o mês, o tema e o texto,
   e crie as cores correspondentes no CSS (html[data-tema="..."]).        */
window.TEMAS = {
  9:  { tema:'amarelo', logo:'img/logo-dm-amarelo.png', cor:'#0f4637', texto:'<b>Setembro Amarelo</b> · Falar é a melhor solução. Precisa conversar? Ligue 188 (CVV).' },
  10: { tema:'rosa',    logo:'img/logo-dm-rosa.png',    cor:'#6b1842', texto:'<b>Outubro Rosa</b> · Cuide da saúde da mulher: faça seus exames preventivos.' },
  11: { tema:'azul',    logo:'img/logo-dm-azul.png',    cor:'#0f3460', texto:'<b>Novembro Azul</b> · Cuidar da saúde do homem também é prevenção.' }
};
(function(){
  var q=new URLSearchParams(location.search).get('tema'), m=new Date().getMonth()+1, cfg=null;
  if(q){ for(var k in TEMAS){ if(TEMAS[k].tema===q) cfg=TEMAS[k]; } }
  else cfg=TEMAS[m]||null;
  window.TEMA_ATUAL=cfg;
  document.documentElement.setAttribute('data-tema', cfg?cfg.tema:'padrao');
  if(cfg) document.querySelector('meta[name="theme-color"]').setAttribute('content',cfg.cor);
})();
