(this["webpackJsonpattestation-deplacement"]=this["webpackJsonpattestation-deplacement"]||[]).push([[0],{216:function(e,a,t){e.exports=t(353)},221:function(e,a,t){},232:function(e,a,t){},353:function(e,a,t){"use strict";t.r(a);var r,n=t(0),o=t.n(n),c=t(11),s=t.n(c),l=(t(221),t(10)),i=t.n(l),u=t(169),m=t(22),d=t(36),p=t(9),b=t(355),h=t(356),f=t(359),g=t(358),w=t(357),v=t(90),x=t(45),y=t(214),E=t(170),k=t(44),T=t(102),D=t.n(T);t(231),t(232),t(233);D.a.locale("fr");var j;!function(e){e.name="name",e.birthDay="birthDay",e.birthTown="birthTown",e.address="address",e.town="town",e.postalCode="postalCode",e.purpose="purpose",e.signature="signature"}(j||(j={}));var z,O=k.a().shape((r={},Object(p.a)(r,j.name,k.b().required()),Object(p.a)(r,j.birthDay,k.b().required()),Object(p.a)(r,j.birthTown,k.b().required()),Object(p.a)(r,j.address,k.b().required()),Object(p.a)(r,j.town,k.b().required()),Object(p.a)(r,j.postalCode,k.b().required()),Object(p.a)(r,j.purpose,k.b().required()),r));!function(e){e.pro="pro",e.grocery="grocery",e.health="health",e.family="family",e.sport="sport",e.judicial="judicial",e.generalInterest="generalInterest"}(z||(z={}));var N=[{label:"Pro",value:z.pro},{label:"Achats de premi\xe8re n\xe9cessit\xe9",value:z.grocery},{label:"Sant\xe9",value:z.health},{label:"Famille",value:z.family},{label:"D\xe9placements brefs (max 1km) sport individuel",value:z.sport},{label:"Convocation judiciaire ou administrative",value:z.judicial},{label:"Mission d'inter\xeat g\xe9n\xe9ral",value:z.generalInterest}],S=b.a.Option,q=h.a.Title;var Y=function(){var e=Object(m.a)(i.a.mark((function e(a){var t,r,n,o,c,s,l,u,m,d,p,b,h,f,g,w,v,x,y,k,T;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.name,r=a.birthDay,n=a.birthTown,o=a.address,c=a.town,s=a.postalCode,l=a.purpose,u=a.signature,m=10,d=D()(r).format("DD/MM/YYYY"),e.next=5,fetch("template.pdf").then((function(e){return e.arrayBuffer()}));case 5:return p=e.sent,e.next=8,E.PDFDocument.load(p);case 8:b=e.sent,(h=b.getPages()[0]).drawText(t,{x:122,y:685,size:m}),h.drawText(d,{x:122,y:661,size:m}),h.drawText(n,{x:90,y:637,size:m}),h.drawText("".concat(o," ").concat(s," ").concat(c),{x:134,y:613,size:m}),e.t0=l,e.next=e.t0===z.pro?17:e.t0===z.grocery?19:e.t0===z.health?21:e.t0===z.family?23:e.t0===z.sport?25:e.t0===z.judicial?27:e.t0===z.generalInterest?29:31;break;case 17:return h.drawText("x",{x:77,y:528,size:17}),e.abrupt("break",31);case 19:return h.drawText("x",{x:77,y:478,size:17}),e.abrupt("break",31);case 21:return h.drawText("x",{x:77,y:437,size:17}),e.abrupt("break",31);case 23:return h.drawText("x",{x:77,y:401,size:17}),e.abrupt("break",31);case 25:return h.drawText("x",{x:77,y:345,size:17}),e.abrupt("break",31);case 27:return h.drawText("x",{x:77,y:298,size:17}),e.abrupt("break",31);case 29:return h.drawText("x",{x:77,y:262,size:17}),e.abrupt("break",31);case 31:return h.drawText(c,{x:109,y:225,size:m}),f=String((new Date).getHours()),g=String((new Date).getMinutes()),w=(new Date).getDate(),v=String((new Date).getMonth()+1).padStart(2,"0"),x=(new Date).getFullYear(),h.drawText("".concat(w," / ").concat(v," / ").concat(x),{x:93,y:202,size:m}),h.drawText(f,{x:195,y:202,size:m}),h.drawText(g,{x:224,y:202,size:m}),e.next=42,b.embedPng(u);case 42:return y=e.sent,k=y.scale(1/(y.width/100)),h.drawImage(y,{x:134,y:131,width:k.width,height:k.height}),e.next=47,b.save();case 47:return T=e.sent,e.abrupt("return",new Blob([T],{type:"application/pdf"}));case 49:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),C=function(e,a){var t=document.createElement("a"),r=URL.createObjectURL(e);t.href=r,t.download=a,t.click()},M=function(){var e=Object(n.useState)(void 0),a=Object(d.a)(e,2),t=a[0],r=a[1],c=Object(x.b)({validationSchema:O}),s=c.handleSubmit,l=c.errors,p=c.control,h=function(){var e=Object(m.a)(i.a.mark((function e(a){var r,n,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="attestation.pdf",n=(null===t||void 0===t?void 0:t.toDataURL())||"",e.next=4,Y(Object(u.a)({},a,{signature:n}));case 4:o=e.sent,C(o,r);case 6:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){var e=document.querySelector("canvas");e?r(new y.a(e)):console.log("no canvas")}),[]),o.a.createElement("div",{className:"App"},o.a.createElement(q,{className:"title"},"G\xe9n\xe9rateur d'attestation de d\xe9placement"),o.a.createElement(f.a,{className:"alert",type:"info",message:o.a.createElement(o.a.Fragment,null,o.a.createElement("p",null,"Il est d\xe9sormais autoris\xe9 d'utiliser une attestation d\xe9materialis\xe9e,"," "),o.a.createElement("p",null,"Vous trouverez le g\xe9n\xe9rateur officiel du gouvernement"," ",o.a.createElement("a",{href:"https://media.interieur.gouv.fr/deplacement-covid-19/",target:"_blank",rel:"noopener noreferrer"},"ici")))}),o.a.createElement("a",{className:"bmc-button",target:"_blank",href:"https://www.buymeacoffee.com/georges"},o.a.createElement("img",{src:"https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg",alt:"Buy me a coffee"}),o.a.createElement("span",null,"Buy me a coffee")),o.a.createElement("form",{className:"Form",onSubmit:s(h)},Object.keys(l).length>0&&o.a.createElement("span",{className:"form-error-label"},"Tous les champs sont obligatoires !"),o.a.createElement(x.a,{as:o.a.createElement(g.a,{placeholder:"Nom"}),control:p,name:j.name}),o.a.createElement(x.a,{as:o.a.createElement(w.a,{placeholder:"Date de naissance",name:j.birthDay,format:"DD/MM/YYYY"}),control:p,name:j.birthDay}),o.a.createElement(x.a,{as:o.a.createElement(g.a,{placeholder:"Lieu de naissance"}),control:p,name:j.birthTown}),o.a.createElement(x.a,{as:o.a.createElement(g.a,{placeholder:"Adresse"}),control:p,name:j.address}),o.a.createElement(x.a,{as:o.a.createElement(g.a,{placeholder:"Ville",value:"Lyon"}),control:p,name:j.town}),o.a.createElement(x.a,{as:o.a.createElement(g.a,{placeholder:"Code Postal"}),control:p,name:j.postalCode}),o.a.createElement(x.a,{as:o.a.createElement(b.a,{placeholder:"Motif"},N.map((function(e,a){return o.a.createElement(S,{key:a,value:e.value},e.label)}))),control:p,name:"purpose"}),o.a.createElement("span",{className:"label"},"Signature:"),o.a.createElement("canvas",null),o.a.createElement("a",{className:"link clear-pad",onClick:function(){null===t||void 0===t||t.clear()}},"Effacer signature"),o.a.createElement(v.a,{type:"primary",htmlType:"submit"},"G\xe9n\xe9rer PDF")),o.a.createElement("span",{className:"footerText"},"Bon courage pendant le confinement, et sortez couvert \ud83d\ude37"," "),o.a.createElement("span",{className:"footerText warning"},"Les donn\xe9es personnelles ne sont pas collect\xe9es (c'est \xe0 dire qu'aucune des informations ci-dessus n'est envoy\xe9e \xe0 aucun moment vers un serveur, tout reste uniquement sur votre t\xe9l\xe9phone)"),o.a.createElement("a",{className:"link",href:"https://github.com/gmpetrov/generateur-attestation-deplacement",target:"_blank",rel:"noopener noreferrer"},"code source"),o.a.createElement("a",{className:"link",href:"mailto:georges@cool.ovh"},"contact"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[216,1,2]]]);
//# sourceMappingURL=main.d9116d89.chunk.js.map