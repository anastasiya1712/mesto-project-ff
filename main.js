(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function t(e){e.classList.remove("popup_is-opened"),Array.from(e.querySelectorAll(".popup__input")).forEach((function(e){e.value=""})),document.removeEventListener("keydown",r)}function r(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function n(e,t,r,n,o,c,a,u,i,l){var s=e.querySelector(".card").cloneNode(!0),p=s.querySelector(".card__image");return s.querySelector(".card__title").textContent=t.name,p.src=t.link,p.alt=t.name,s.querySelector(".card__like-count").textContent=t.likes.length,p.addEventListener("click",r),s.querySelector(".card__like-button").addEventListener("click",(function(e){s.querySelector(".card__like-button").classList.contains("card__like-button_is-active")?i(t._id).then((function(t){s.querySelector(".card__like-count").textContent=t.likes.length,a(e)})):u(t._id).then((function(t){s.querySelector(".card__like-count").textContent=t.likes.length,a(e)}))})),t.likes.some((function(e){return e._id===l}))&&s.querySelector(".card__like-button").classList.add("card__like-button_is-active"),l===t.owner._id?s.querySelector(".card__delete-button").addEventListener("click",(function(e){n().querySelector(".popup__button").addEventListener("click",(function(){c(t._id).then((function(t){t.ok&&o(e)})).catch((function(e){console.log(e)}))}))})):s.querySelector(".card__delete-button").classList.add("card__delete-button-hidden"),s}function o(e){e.target.closest(".card").remove()}function c(e){e.target.classList.toggle("card__like-button_is-active")}function a(e,t){Array.from(e.getElementsByTagName("input")).forEach((function(r){u(e,r,t.inputErrorClass,t.errorClass)}))}function u(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r),o.classList.remove(n),o.textContent=""}function i(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(r):t.classList.add(r)}var l={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-30",headers:{authorization:"8bfbbd8d-da69-4f60-b945-0ada8a3820a6","Content-Type":"application/json"}},s=function(e){return fetch("".concat(l.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:l.headers})},p=function(e){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:l.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},d=function(e){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:l.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))};function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var f,m,y=document.querySelector("#card-template").content,v=document.querySelector(".profile__info"),h=v.querySelector(".profile__title"),b=v.querySelector(".profile__description"),S=document.querySelector(".profile__image"),k=document.querySelector(".profile__edit-button"),q=document.querySelector(".profile__add-button"),g=document.querySelector(".popup_type_edit"),E=document.querySelector(".profile__image-wrapper"),C=document.querySelector(".popup_type_new-card"),L=document.querySelector(".popup_type_image"),j=document.querySelector(".popup_type_delete-card"),A=document.querySelector(".popup_type_edit-avatar"),x=L.querySelector(".popup__image"),w=L.querySelector(".popup__caption"),P=document.querySelectorAll(".popup__close"),U=j.querySelector(".popup__button"),T=document.querySelector(".places__list"),O=document.forms["edit-profile"],D=document.forms["edit-avatar"],I=D.querySelector(".popup__input_type_url"),B=O.querySelector(".popup__input_type_name"),N=O.querySelector(".popup__input_type_description"),M=document.forms["new-place"],J=M.querySelector(".popup__input_type_card-name"),H=M.querySelector(".popup__input_type_url"),V=document.querySelectorAll(".popup"),z=fetch("".concat(l.baseUrl,"/users/me"),{headers:l.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),$=fetch("".concat(l.baseUrl,"/cards"),{headers:l.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}));function F(){return e(j),j}function G(t){var r=t.target,n=r.closest(".card").querySelector(".card__title").textContent.trim();x.src=r.src,x.alt=n,w.textContent=n,e(L)}Promise.all([z,$]).then((function(e){var t,r,a=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,r)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=a[0],i=a[1];f=u._id,h.textContent=u.name,b.textContent=u.about,S.style.backgroundImage="url(".concat(u.avatar,")"),i.forEach((function(e){var t={_id:e._id,name:e.name,link:e.link,likes:e.likes,owner:{_id:e.owner._id}},r=n(y,t,G,F,o,s,c,p,d,f);T.append(r)}))})).catch((function(e){console.log(e)})),O.addEventListener("submit",(function(e){var r;(e.preventDefault(),e.target.querySelector(".popup__button").classList.contains("popup__button_disabled"))||((r={name:B.value,about:N.value},fetch("".concat(l.baseUrl,"/users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify({name:r.name,about:r.about})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){h.textContent=e.name,b.textContent=e.about,S.style.backgroundImage="url(".concat(user.avatar,")")})).catch((function(e){console.log(e)})),t(g))})),M.addEventListener("submit",(function(e){var r;(e.preventDefault(),e.target.querySelector(".popup__button").classList.contains("popup__button_disabled"))||((r={name:J.value,link:H.value},fetch("".concat(l.baseUrl,"/cards"),{method:"POST",headers:l.headers,body:JSON.stringify({name:r.name,link:r.link})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var t=n(y,e,G,F,o,s,c,p,d,f);T.prepend(t)})).catch((function(e){console.log(e)})),t(C),J.value="",H.value="")})),D.addEventListener("submit",(function(e){if(e.preventDefault(),!e.target.querySelector(".popup__button").classList.contains("popup__button_disabled")){var r,n=I.value;(r=n,fetch("".concat(l.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:r})})).then((function(e){e.ok&&(S.style.backgroundImage="url(".concat(n,")"))})).catch((function(e){console.log(e)})),t(A)}})),E.addEventListener("click",(function(){a(D,{inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),e(A)})),V.forEach((function(e){e.addEventListener("click",(function(r){r.target===e&&t(e)}))})),k.addEventListener("click",(function(){B.value=h.textContent,N.value=b.textContent,a(O,{inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),e(g)})),q.addEventListener("click",(function(){a(M,{inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),e(C)})),P.forEach((function(e){e.addEventListener("click",(function(){t(e.closest(".popup"))}))})),U.addEventListener("click",(function(e){t(e.target.closest(".popup"))})),m={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Array.from(document.querySelectorAll(m.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t,r,n,o,c){var a=Array.from(e.querySelectorAll(t)),l=e.querySelector(o);i(a,l,c),a.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,r,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,r,n):function(e,t,r,n,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n),c.textContent=r,c.classList.add(o)}(e,t,t.validationMessage,r,n)}(e,t,r,n),i(a,l,c)}))}))}(e,m.inputSelector,m.inputErrorClass,m.errorClass,m.submitButtonSelector,m.inactiveButtonClass)}))})();