// Полная обфускация всего исходного кода
(function(){
  'use strict';

  // Генерация случайного ключа
  const a=Math.random().toString(36).substring(2,12),
        b=(x,y)=>btoa(x.split('').map((c,i)=>String.fromCharCode(c.charCodeAt(0)^y.charCodeAt(i%y.length))).join('')),
        c=x=>atob(x).split('').map((d,j)=>String.fromCharCode(d.charCodeAt(0)^a.charCodeAt(j%a.length))).join('');

  // Зашифрованные данные
  const d={
    k1:'Y2hwYng=',k2:'YWJtc3gudGVjaA==',k3:'L2ludmMtcmNoLmpz',k4:'L2V4dGVybmFsaWRz',k5:'bGlmZQ==',k6:'L2xpZ2h0L2V2ZW50cw=='
  };

  // Расшифровка
  const e=f=>c(d[f]);
  const f=e('k1')+e('k2')+'/',
        g=f+e('k3'),
        h=f+e('k4')+'?',
        i=f+e('k6');

  const j=function(){
    this.k=new Lampa.Reguest(),
    this.l=q=>this.k.timeout(q),
    this.m=(r,s,t,u,v)=>{
      const w=r.split(f).pop().split('?');
      w[0].indexOf(c('aHR0cA=='))>=0?
        this.k[s](r,t,u,v):DotNet.invokeMethodAsync(c('SmluRW5lcmd5'),w[0],w[1])
          .then(x=>{t(c(x))}).catch(y=>{console.log(c('RXJyb3I='),y),u(y)})
    };
  };

  const n=function(){
    let o=Lampa.Storage.get(c('bGFtcGFjX3VuaWNfaWQ='), '');
    if(!o){
      o=Lampa.Utils.uid(8).toLowerCase();
      Lampa.Storage.set(c('bGFtcGFjX3VuaWNfaWQ='), o);
    }
    return o;
  };

  const p=function(){
    if(!window.rch){
      Lampa.Utils.putScript([g],()=>{},!1,()=>{
        if(!window.rch.startTypeInvoke)
          window.rch.typeInvoke(f,()=>{})},!0);
    }
  };

  const q=function(){
    const r=function(){
      console.log(c('U3RhcnRpbmcgZXh0ZXJuYWwgYXBpIGNvbm5lY3Rpb24u'));
    };
    const s=function(){
      console.log(c('RXJyb3IgaW4gZXh0ZXJuYWwgc3RhcnQu'));
    };

    return {start:r,error:s};
  };

  p();
  const externalIdsApi=h+e('k5');

  console.log(c('RXh0ZXJuYWwgSURzIFVSTDog')+externalIdsApi);
})();
