(()=>{"use strict";(()=>{const e={LEFT_KEY_BUTTON:0},t={ENTER_KEY:"Enter",ESCAPE_KEY:"Escape"};window.util={Mouse:e,Keys:t,isOnMousedown:(t,o)=>{t.button===e.LEFT_KEY_BUTTON&&(t.preventDefault(),o())},isPressEnter:(e,o)=>{e.key===t.ENTER_KEY&&(e.preventDefault(),o())},isPressEscape:(e,o)=>{e.key===t.ESCAPE_KEY&&(e.preventDefault(),o())},returnDeclination:(e,t,o,n)=>{if(e>10&&1===Math.round(e%100/10))return`${e} ${n}`;switch(e%10){case 1:return`${e} ${t}`;case 2:case 3:case 4:return`${e} ${o}`}return`${e} ${n}`},debounce:e=>{let t=null;return()=>{t&&window.clearTimeout(t),t=window.setTimeout((function(){e()}),500)}}}})(),(()=>{const e=document.querySelector("main"),t=()=>{let t=e.querySelector(".success"),n=e.querySelector(".error");t&&t.remove(),n&&n.remove(),document.removeEventListener("keydown",o)},o=e=>{window.util.isPressEscape(e,t)};window.statusMessage={create:n=>{let r=document.querySelector("#"+n).content.querySelector("."+n),i=document.createDocumentFragment(),s=r.cloneNode(!0),a=s.querySelector(".error__button");i.appendChild(s),e.appendChild(i),a&&a.addEventListener("click",(e=>{e.preventDefault(),t()})),s.addEventListener("click",t),document.addEventListener("keydown",o)},close:t}})(),(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",t="https://21.javascript.pages.academy/keksobooking",o=(e,t,o,n)=>{let r=new XMLHttpRequest;return r.responseType="json",r.addEventListener("load",(()=>{200===r.status?o(r.response):n(`Статус ответа: ${r.status} ${r.statusText}`)})),r.addEventListener("error",(()=>{n("Произошла ошибка соединения")})),r.addEventListener("timeout",(()=>{n(`Запрос не успел выполниться за ${r.timeout}мс`)})),r.timeout=1e4,r.open(e,t),r};window.backend={get:(t,n)=>{o("GET",e,t,n).send()},send:(e,n,r)=>{o("POST",t,e,n).send(r)}}})(),(()=>{const e={low:{start:0,end:1e4},middle:{start:1e4,end:5e4},high:{start:5e4,end:1/0}},t=Array.from(document.querySelector(".map__filters").children),o={"housing-type":(e,t)=>t.value===e.offer.type,"housing-price":(t,o)=>t.offer.price>=e[o.value].start&&t.offer.price<e[o.value].end,"housing-rooms":(e,t)=>t.value===e.offer.rooms.toString(),"housing-guests":(e,t)=>t.value===e.offer.guests.toString(),"housing-features":(e,t)=>Array.from(t.querySelectorAll('input[type="checkbox"]:checked')).every((t=>e.offer.features.some((e=>e===t.value))))};window.filter={data:e=>{let n,r=[],i=0;for(;i<e.length&&r.length<window.pins.MAX_PINS;)n=t.every((t=>"any"===t.value||o[t.id](e[i],t))),n&&r.push(e[i]),i++;return r}}})(),(()=>{const e={WIDTH:50,HEIGHT:70,MAIN_WIDTH:65,MAIN_HEIGHT:87,MAIN_START_POSITION_TOP:375,MAIN_START_POSITION_LEFT:570},t=document.querySelector(".map"),o=document.querySelector(".map__pins"),n=o.querySelector(".map__pin--main"),r=document.createDocumentFragment(),i=document.querySelector("#pin").content.querySelector(".map__pin"),s=()=>{let e=t.querySelector(".map__pin--active");e&&e.classList.remove("map__pin--active")},a=t=>{let o=i.cloneNode(!0),n=o.querySelector("img");return o.style.left=t.location.x-e.WIDTH/2+"px",o.style.top=t.location.y-e.HEIGHT+"px",n.src=t.author.avatar,n.alt=t.offer.title,o.addEventListener("click",(e=>{e.key!==window.util.Keys.ENTER_KEY&&e.button!==window.util.Mouse.LEFT_KEY_BUTTON||(window.popup.close(),(e=>{s(),e.classList.add("map__pin--active")})(o),window.popup.create(t))})),o},d=e=>{let t=e.length>5?5:e.length;for(let o=0;o<t;o++)r.appendChild(a(e[o]));o.appendChild(r)};let p=[];const c=e=>{let t=[];e.forEach((e=>{e.offer&&t.push(e)})),p=t.slice(),d(p),window.form.enabled()},l=e=>{let t=document.createElement("div");t.style="position: fixed; left: 0; top: 0; z-index: 100; width: 100%;  margin: 0 auto; padding: 10px; text-align: center; color: white; background-color: rgba(255, 86, 53, .75);",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t),setTimeout((()=>{t.remove()}),3e3)};window.pins={MAX_PINS:5,Locations:{X_MIN:0,X_MAX:1200,Y_MIN:130,Y_MAX:630},mainResetPosition:()=>{n.style.top=e.MAIN_START_POSITION_TOP+"px",n.style.left=e.MAIN_START_POSITION_LEFT+"px"},removeActiveClass:s,create:()=>{window.backend.get(c,l)},Properties:e,wrapper:o,render:d,remove:()=>{let e=document.querySelectorAll(".map__pin:not(.map__pin--main)");e.length>0&&e.forEach((e=>{e.remove()}))},main:n,map:t,data:()=>p}})(),(()=>{const e=document.querySelector(".ad-form"),t=document.querySelector(".map__filters"),o=e.querySelector(".ad-form__reset"),n=document.querySelectorAll(".ad-form-header, .ad-form__element, .map__filter, .map__features"),r=e.querySelector("#address"),i=e.querySelector('select[name="rooms"]'),s=e.querySelector('select[name="capacity"]'),a=e.querySelector('select[name="timein"]'),d=e.querySelector('select[name="timeout"]'),p=e.querySelector('select[name="type"]'),c=e.querySelector("#price"),l={bungalow:{ru:"Бунгало",min:0},flat:{ru:"Квартира",min:1e3},house:{ru:"Дом",min:5e3},palace:{ru:"Дворец",min:1e4}},u=()=>{let e,t,o,n=Math.floor(window.pins.Locations.X_MIN-window.pins.Properties.MAIN_WIDTH/2),i=Math.floor(window.pins.Locations.X_MAX-window.pins.Properties.MAIN_WIDTH/2),s=window.pins.Locations.Y_MAX-window.pins.Properties.MAIN_HEIGHT;e=window.pins.map.classList.contains("map--faded")?window.pins.Properties.MAIN_WIDTH/2:window.pins.Properties.MAIN_HEIGHT,window.pins.main.offsetLeft<=n?(t=window.pins.Locations.X_MIN,window.pins.main.style.left=n+"px"):window.pins.main.offsetLeft>=i?(t=window.pins.Locations.X_MAX,window.pins.main.style.left=i+"px"):t=Math.floor(window.pins.main.offsetLeft+window.pins.Properties.MAIN_WIDTH/2),window.pins.main.offsetTop<=window.pins.Locations.Y_MIN-window.pins.Properties.MAIN_HEIGHT?(o=window.pins.Locations.Y_MIN,window.pins.main.style.top=window.pins.Locations.Y_MIN-window.pins.Properties.MAIN_HEIGHT+"px"):window.pins.main.offsetTop>=s?(o=window.pins.Locations.Y_MAX,window.pins.main.style.top=s+"px"):o=Math.floor(window.pins.main.offsetTop+e),r.value=`${t}, ${o}`},w=(e,t)=>{e.forEach((e=>{e.disabled=t}))},m=t=>{t.preventDefault(),window.backend.send(f,_,new FormData(e))},f=()=>{v(),window.statusMessage.create("success")},_=e=>{window.statusMessage.create("error",e)},y=()=>{window.popup.close(),window.pins.remove();let e=window.filter.data(window.pins.data());window.pins.render(e)},v=()=>{e.classList.add("ad-form--disabled"),window.pins.map.classList.add("map--faded"),window.pins.remove(),window.popup.close(),window.photos.reset(),w(n,!0),L(),e.reset(),t.reset(),window.pins.mainResetPosition(),u(),document.addEventListener("keydown",E),e.removeEventListener("submit",m),o.removeEventListener("click",v),t.removeEventListener("change",y)},E=e=>{e.target.classList.contains("map__pin--main")&&window.util.isPressEnter(e,window.pins.create)},h=()=>{let e=parseInt(i.value,10),t=parseInt(s.value,10);e<t?s.setCustomValidity("Количество гостей может быть не больше количества комнат"):100===e&&0!==t?s.setCustomValidity("Такое количество комнат не для гостей"):100!==e&&0===t?s.setCustomValidity("Этот вариант подходит только для 100 комнат"):s.setCustomValidity("")},L=()=>{c.min=l.flat.min,c.placeholder=l.flat.min};w(n,!0),u(),document.addEventListener("keydown",E),p.addEventListener("change",(()=>{c.min=l[p.value].min,c.placeholder=l[p.value].min})),i.addEventListener("change",(()=>{h(),s.reportValidity()})),s.addEventListener("change",(()=>{h(),s.reportValidity()})),a.addEventListener("change",(()=>{d.value=a.value})),d.addEventListener("change",(()=>{a.value=d.value})),window.form={ad:e,types:l,setCoordinates:u,enabled:()=>{e.classList.remove("ad-form--disabled"),window.pins.map.classList.remove("map--faded"),w(n,!1),u(),document.removeEventListener("keydown",E),e.addEventListener("submit",m),t.addEventListener("change",window.util.debounce(y)),o.addEventListener("click",v)},disabled:v}})(),(()=>{const e=["gif","jpg","jpeg","png"],t="img/muffin-grey.svg",o=window.form.ad.querySelector(".ad-form-header__preview img"),n=window.form.ad.querySelector('.ad-form-header__upload input[type="file"]'),r=window.form.ad.querySelector(".ad-form__photo"),i=window.form.ad.querySelector('.ad-form__upload input[type="file"]'),s=e=>{o.src=e},a=e=>{r.style=`background: url(${e}) center center / cover no-repeat;`},d=(t,o)=>{let n=t.files[0];if(e.some((e=>n.type.endsWith(e)))){let e=new FileReader;e.addEventListener("load",(()=>{let t=e.result;o(t)})),e.readAsDataURL(n)}};n.addEventListener("change",(function(){d(n,s)})),i.addEventListener("change",(()=>{d(i,a)})),window.photos={reset:()=>{r.style="",o.src=t}}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector("#card").content.querySelector(".popup"),o=t.querySelector(".popup__photo"),n=document.createDocumentFragment(),r=()=>{let t=e.querySelector(".popup");window.pins.removeActiveClass(),t&&(t.remove(),document.removeEventListener("keydown",i))},i=e=>{window.util.isPressEscape(e,r)};window.popup={create:e=>{o.remove();let s=t.cloneNode(!0),a=s.querySelector(".popup__close"),d=s.querySelector(".popup__title"),p=s.querySelector(".popup__text--address"),c=s.querySelector(".popup__text--price"),l=s.querySelector(".popup__type"),u=s.querySelector(".popup__text--capacity"),w=s.querySelector(".popup__text--time"),m=s.querySelector(".popup__features"),f=s.querySelectorAll(".popup__feature"),_=s.querySelector(".popup__description"),y=s.querySelector(".popup__photos"),v=s.querySelector(".popup__avatar");return d.textContent=e.offer.title,p.textContent=e.offer.address,c.textContent=e.offer.price+"₽/ночь",l.textContent=window.form.types[e.offer.type].ru,u.textContent=`${window.util.returnDeclination(e.offer.rooms,"комната","команаты","комнат")} для ${window.util.returnDeclination(e.offer.guests,"гостя","гостей","гостей")}`,w.textContent=`Заезд после ${e.offer.checkin} выезд до ${e.offer.checkout}`,e.offer.description.length>0?_.textContent=e.offer.description:_.remove(),e.author.avatar.length>0?v.src=e.author.avatar:v.remove(),e.offer.features.length>0?((e,t)=>{e.forEach(((o,n)=>{t.indexOf(o.classList[1].replace("popup__feature--",""))<0&&e[n].remove()}))})(f,e.offer.features):m.remove(),((e,t)=>{if(e.length>0){let r;e.forEach((e=>{r=o.cloneNode(),r.src=e,n.appendChild(r)})),t.appendChild(n)}else t.remove()})(e.offer.photos,y),window.pins.wrapper.after(s),document.addEventListener("keydown",i),a.addEventListener("click",r),s},close:r}})(),window.pins.main.addEventListener("mousedown",(e=>{e.preventDefault(),window.pins.map.classList.contains("map--faded")&&e.button===window.util.Mouse.LEFT_KEY_BUTTON&&window.pins.create();let t={x:e.clientX,y:e.clientY};const o=e=>{e.preventDefault();let o=t.x-e.clientX,n=t.y-e.clientY;t={x:e.clientX,y:e.clientY},window.pins.main.style.top=window.pins.main.offsetTop-n+"px",window.pins.main.style.left=window.pins.main.offsetLeft-o+"px",window.form.setCoordinates()},n=e=>{e.preventDefault(),window.form.setCoordinates(),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",n)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",n)}))})();