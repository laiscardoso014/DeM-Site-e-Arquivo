if(window.LOGO_TEMA){var lg=document.querySelector('.logo'),im=new Image();im.onload=function(){lg.src=LOGO_TEMA};im.src=LOGO_TEMA;}
/* anos de experiência: 27 em 2026, +1 a cada maio */
(function(){var h=new Date(),a=27+(h.getFullYear()-2026)-((h.getMonth()+1)<5?1:0);document.getElementById('anos').textContent=Math.max(27,a);})();
/* nota do Google ao vivo */
fetch('/api/avaliacoes').then(function(r){return r.ok?r.json():null}).then(function(d){
  if(!d||!d.nota)return;
  document.getElementById('notaV').textContent=d.nota.toFixed(1).replace('.',',');
  document.getElementById('notaT').textContent=d.total;
  if(d.mapa)document.getElementById('nota').href=d.mapa;
  if(d.avaliar)document.getElementById('avaliar').href=d.avaliar;
}).catch(function(){});
/* mesmo aviso do site (avisos.json) */
fetch('/avisos.json',{cache:'no-store'}).then(function(r){return r.ok?r.json():[]}).then(function(l){
  var hj=new Date().toISOString().slice(0,10);
  var a=(l||[]).find(function(x){return x&&x.texto&&(!x.inicio||x.inicio<=hj)&&(!x.fim||x.fim>=hj)});
  if(a){var e=document.getElementById('aviso');e.textContent=a.texto;e.classList.add('on');}
}).catch(function(){});
