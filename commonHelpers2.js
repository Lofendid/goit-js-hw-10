import"./assets/iziToast.min-4b39b271.js";/* empty css                      */import{i}from"./assets/vendor-c2cf587c.js";const u=new URL("/goit-js-hw-10/assets/error-icon-40fa32d5.svg",self.location).href,m=new URL("/goit-js-hw-10/assets/ok-icon-8330b1b8.svg",self.location).href,o=document.querySelectorAll('fieldset [name="state"]'),r=document.querySelector('[type="submit"]'),l=document.querySelector(".form"),t=document.querySelector('[name="delay"]'),f=()=>{i.show({backgroundColor:"rgba(239, 64, 64, 1)",title:"Error",theme:"dark",message:`Rejected promise in ${t.value} ms`,position:"topRight",timeout:5e3,iconUrl:u})},b=()=>{i.show({backgroundColor:"rgba(89, 161, 13, 1)",title:"OK",theme:"dark",message:`Fulfilled promise in ${t.value} ms`,position:"topRight",timeout:5e3,iconUrl:m})},h=n=>{n.preventDefault();const a=Number(t.value);r.disabled=!0,setTimeout(()=>{new Promise((e,c)=>{const s=Array.from(o).find(d=>d.checked);s.value==="fulfilled"?e():s.value==="rejected"&&c()}).then(()=>b()).catch(()=>f()).finally(()=>{l.reset(),r.disabled=!1,t.disabled=!1,o.forEach(e=>e.disabled=!1)})},a),t.disabled=!0,o.forEach(e=>e.disabled=!0)};l.addEventListener("submit",h);
//# sourceMappingURL=commonHelpers2.js.map
