(this["webpackJsonpattestation-deplacement"]=this["webpackJsonpattestation-deplacement"]||[]).push([[0],{216:function(e,a,t){e.exports=t(353)},221:function(e,a,t){},232:function(e,a,t){},353:function(e,a,t){"use strict";t.r(a);var r,n=t(0),o=t.n(n),l=t(11),s=t.n(l),c=(t(221),t(10)),i=t.n(c),u=t(169),m=t(22),p=t(36),d=t(9),b=t(355),h=t(356),f=t(359),w=t(358),g=t(357),v=t(90),x=t(45),y=t(214),E=t(170),k=t(44),T=t(102),j=t.n(T);t(231),t(232),t(233);j.a.locale("fr");var D;!function(e){e.name="name",e.birthDay="birthDay",e.birthTown="birthTown",e.address="address",e.town="town",e.postalCode="postalCode",e.purpose="purpose",e.signature="signature"}(D||(D={}));var z,O=k.a().shape((r={},Object(d.a)(r,D.name,k.b().required()),Object(d.a)(r,D.birthDay,k.b().required()),Object(d.a)(r,D.birthTown,k.b().required()),Object(d.a)(r,D.address,k.b().required()),Object(d.a)(r,D.town,k.b().required()),Object(d.a)(r,D.postalCode,k.b().required()),Object(d.a)(r,D.purpose,k.b().required()),r));!function(e){e.pro="pro",e.grocery="grocery",e.health="health",e.family="family",e.sport="sport",e.judicial="judicial",e.generalInterest="generalInterest"}(z||(z={}));var N=[{label:"Pro",value:z.pro},{label:"Achats de premi\xe8re n\xe9cessit\xe9",value:z.grocery},{label:"Sant\xe9",value:z.health},{label:"Famille",value:z.family},{label:"D\xe9placements brefs (max 1km) sport individuel",value:z.sport},{label:"Convocation judiciaire ou administrative",value:z.judicial},{label:"Mission d'inter\xeat g\xe9n\xe9ral",value:z.generalInterest}],C=b.a.Option,S=h.a.Title;var q=function(){var e=Object(m.a)(i.a.mark((function e(a){var t,r,n,o,l,s,c,u,m,p,d,b,h,f,w,g,v,x,y,k,T;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.name,r=a.birthDay,n=a.birthTown,o=a.address,l=a.town,s=a.postalCode,c=a.purpose,u=a.signature,m=10,p=j()(r).format("DD/MM/YYYY"),e.next=5,fetch("template3.pdf").then((function(e){return e.arrayBuffer()}));case 5:return d=e.sent,e.next=8,E.PDFDocument.load(d);case 8:b=e.sent,(h=b.getPages()[0]).drawText(t,{x:122,y:685,size:m}),h.drawText(p,{x:122,y:661,size:m}),h.drawText(n,{x:90,y:637,size:m}),h.drawText("".concat(o," ").concat(s," ").concat(l),{x:134,y:613,size:m}),e.t0=c,e.next=e.t0===z.pro?17:e.t0===z.grocery?19:e.t0===z.health?21:e.t0===z.family?23:e.t0===z.sport?25:e.t0===z.judicial?27:e.t0===z.generalInterest?29:31;break;case 17:return h.drawText("x",{x:77,y:528,size:17}),e.abrupt("break",31);case 19:return h.drawText("x",{x:77,y:478,size:17}),e.abrupt("break",31);case 21:return h.drawText("x",{x:77,y:437,size:17}),e.abrupt("break",31);case 23:return h.drawText("x",{x:77,y:401,size:17}),e.abrupt("break",31);case 25:return h.drawText("x",{x:77,y:345,size:17}),e.abrupt("break",31);case 27:return h.drawText("x",{x:77,y:298,size:17}),e.abrupt("break",31);case 29:return h.drawText("x",{x:77,y:262,size:17}),e.abrupt("break",31);case 31:return h.drawText(l,{x:109,y:225,size:m}),f=String((new Date).getHours()),w=String((new Date).getMinutes()),g=(new Date).getDate(),v=String((new Date).getMonth()+1).padStart(2,"0"),x=(new Date).getFullYear(),h.drawText("".concat(g," / ").concat(v," / ").concat(x),{x:93,y:202,size:m}),h.drawText(f,{x:195,y:202,size:m}),h.drawText(w,{x:224,y:202,size:m}),e.next=42,b.embedPng(u);case 42:return y=e.sent,k=y.scale(1/(y.width/100)),h.drawImage(y,{x:134,y:131,width:k.width,height:k.height}),e.next=47,b.save();case 47:return T=e.sent,e.abrupt("return",new Blob([T],{type:"application/pdf"}));case 49:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),M=function(e,a){var t=document.createElement("a"),r=URL.createObjectURL(e);t.href=r,t.download=a,t.click()},Y=function(){var e=Object(n.useState)(void 0),a=Object(p.a)(e,2),t=a[0],r=a[1],l=Object(x.b)({validationSchema:O}),s=l.handleSubmit,c=l.errors,d=l.control,h=function(){var e=Object(m.a)(i.a.mark((function e(a){var r,n,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="attestation.pdf",n=(null===t||void 0===t?void 0:t.toDataURL())||"",e.next=4,q(Object(u.a)({},a,{signature:n}));case 4:o=e.sent,M(o,r);case 6:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){var e=document.querySelector("canvas");e?r(new y.a(e)):console.log("no canvas")}),[]),o.a.createElement("div",{className:"App"},o.a.createElement(S,{className:"title"},"G\xe9n\xe9rateur d'attestation de d\xe9placement"),o.a.createElement(f.a,{className:"alert",type:"warning",message:o.a.createElement(o.a.Fragment,null,o.a.createElement("p",null,o.a.createElement("a",{className:"uppercase",href:"https://www.liberation.fr/checknews/2020/03/18/confinement-peut-on-montrer-l-attestation-de-deplacement-sur-son-telephone_1782180",target:"_blank",rel:"noopener noreferrer"},"L'attestation d\xe9mat\xe9rialis\xe9e n'est plus autoris\xe9e, seule la version papier est accept\xe9e (imprim\xe9e ou mansucrite).")),o.a.createElement("br",null),o.a.createElement("p",null,"Vous pouvez trouver l'attestation officielle"," ",o.a.createElement("a",{href:"https://www.interieur.gouv.fr/Actualites/L-actu-du-Ministere/Attestation-de-deplacement-derogatoire-et-justificatif-de-deplacement-professionnel",target:"_blank",rel:"noopener noreferrer"},"ici.")))}),o.a.createElement(f.a,{className:"alert",type:"info",message:o.a.createElement(o.a.Fragment,null,o.a.createElement("p",null,"Petition pour pouvoir utliser une attestation d\xe9materialis\xe9e"," ",o.a.createElement("a",{href:"https://www.change.org/p/emmanuel-macron-pour-d%C3%A9mat%C3%A9rialiser-les-attestations-de-d%C3%A9placement-72e66b58-254e-42ad-9d50-41896a921102",target:"_blank",rel:"noopener noreferrer"},"ici")))}),o.a.createElement("form",{className:"Form",onSubmit:s(h)},Object.keys(c).length>0&&o.a.createElement("span",{className:"form-error-label"},"Tous les champs sont obligatoires !"),o.a.createElement(x.a,{as:o.a.createElement(w.a,{placeholder:"Nom"}),control:d,name:D.name}),o.a.createElement(x.a,{as:o.a.createElement(g.a,{placeholder:"Date de naissance",name:D.birthDay,format:"DD/MM/YYYY"}),control:d,name:D.birthDay}),o.a.createElement(x.a,{as:o.a.createElement(w.a,{placeholder:"Lieu de naissance"}),control:d,name:D.birthTown}),o.a.createElement(x.a,{as:o.a.createElement(w.a,{placeholder:"Adresse"}),control:d,name:D.address}),o.a.createElement(x.a,{as:o.a.createElement(w.a,{placeholder:"Ville",value:"Lyon"}),control:d,name:D.town}),o.a.createElement(x.a,{as:o.a.createElement(w.a,{placeholder:"Code Postal"}),control:d,name:D.postalCode}),o.a.createElement(x.a,{as:o.a.createElement(b.a,{placeholder:"Motif"},N.map((function(e,a){return o.a.createElement(C,{key:a,value:e.value},e.label)}))),control:d,name:"purpose"}),o.a.createElement("span",{className:"label"},"Signature:"),o.a.createElement("canvas",null),o.a.createElement("a",{className:"link clear-pad",onClick:function(){null===t||void 0===t||t.clear()}},"Effacer signature"),o.a.createElement(v.a,{type:"primary",htmlType:"submit"},"G\xe9n\xe9rer PDF")),o.a.createElement("span",{className:"footerText"},"Bon courage pendant le confinement, et sortez couvert \ud83d\ude37"," "),o.a.createElement("span",{className:"footerText warning"},"Les donn\xe9es personnelles ne sont pas collect\xe9es (c'est \xe0 dire qu'aucune des informations ci-dessus n'est envoy\xe9e \xe0 aucun moment vers un serveur, tout reste uniquement sur votre t\xe9l\xe9phone)"),o.a.createElement("a",{className:"link",href:"https://github.com/gmpetrov/generateur-attestation-deplacement",target:"_blank",rel:"noopener noreferrer"},"code source"),o.a.createElement("a",{className:"link",href:"mailto:georges@cool.ovh"},"contact"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(Y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[216,1,2]]]);
//# sourceMappingURL=main.d09c5d57.chunk.js.map