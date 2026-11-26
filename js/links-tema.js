/* mesmos temas mensais do site */
(function(){
  var T={9:'amarelo',10:'rosa',11:'azul'},C={amarelo:'#0f4637',rosa:'#6b1842',azul:'#0f3460'};
  var q=new URLSearchParams(location.search).get('tema'),t=q||T[new Date().getMonth()+1]||'padrao';
  document.documentElement.setAttribute('data-tema',t);
  if(C[t])document.querySelector('meta[name="theme-color"]').setAttribute('content',C[t]);
  window.LOGO_TEMA=C[t]?'/img/logo-dm-'+t+'.png':null;
})();
