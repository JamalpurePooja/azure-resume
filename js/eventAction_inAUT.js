(function() {
        const apiCall = function r(e,t){const{url:n,method:r,body:i,headers:o=[],timeout:a,omitCookies:s,formData:u,fileUrls:c}=e;let l;const f=e=>{let t="";for(const[n,r]of e.entries()){t+=`${n}: ${r}\n\r`}return t};const d=(e,t)=>({response:e.response,status:e.status,responseHeaders:e.getAllResponseHeaders(),requestDuration:Date.now()-t-l,error:""});const p=()=>{const e=o.find((({key:e,value:t})=>e==="Content-Type"&&t==="multipart/form-data"));if(!e){return Promise.resolve({payload:i,downloadFilesTime:0})}if(!u){return Promise.resolve({payload:null,downloadFilesTime:0})}const t=new FormData;const r=Date.now();return Promise.all(u.map((e=>{const{keyName:r,metadata:i}=e;if(!r){return Promise.resolve()}return new Promise(((e,o)=>{if(i.valueType==="text"){t.append(r,i.value);e("");return}if(!r||!c||!c[r]){e("");return}const a=new XMLHttpRequest;a.open("GET",c[r],true);a.responseType="blob";a.onload=function(){t.append(r,a.response,i.name);e("")};a.onerror=function(){o(Error(`Failed to download the file ${r} from ${n}`))};a.ontimeout=function(){o(Error(`Failed to download the file ${r} from ${n}`))};a.send()}))}))).then((()=>({payload:t,downloadFilesTime:Date.now()-r})))};const h=e=>{const t={};o.forEach((({key:n,value:r})=>{if(!n||!r||n==="Content-Type"&&r==="multipart/form-data"){return}if(e){e.setRequestHeader(n,r)}else{t[n]=r}}));return t};const v=()=>{const i=h();const o=Date.now();p().then((({payload:t,downloadFilesTime:o})=>{l=o;return fetch(n,{method:r,headers:i,body:t,credentials:e.withCredentials?"include":"omit"})})).then((e=>e.text().then((n=>{if(!e.ok){throw Object.assign(new Error,{resData:n,response:e})}t({type:"promise",status:"done",result:{response:n,status:e.status,responseHeaders:f(e.headers),requestDuration:Date.now()-o-l,error:""},success:true})})))).catch((e=>{var i;const a=e.response&&f(e.response.headers);t({type:"promise",status:"failed",result:{response:e.resData||"",status:((i=e.response)===null||i===void 0?void 0:i.status)||0,responseHeaders:a||"",requestDuration:Date.now()-o-l,error:`Error, while trying to ${r} at ${n}`},success:false})}))};const _=()=>{const i=new XMLHttpRequest;i.open(r,n,true);h(i);if(e.withCredentials){i.withCredentials=true}i.timeout=a;const o=Date.now();i.onload=function(){t({type:"promise",status:"done",result:d(i,o),success:true})};i.onerror=function(){const e=d(i,o);e.error=`Error, while trying to ${r} at ${n}`;t({type:"promise",status:"failed",result:e,success:false})};i.ontimeout=function(){const e=d(i,o);e.error=`Error, timeout request ${r} at ${n}`;t({type:"promise",status:"failed",result:e,success:true})};p().then((({payload:e,downloadFilesTime:t})=>{l=t;i.send(e)}))};const E=typeof window!=="undefined"&&window.fetch&&s;if(E){v()}else{_()}};
        const shimSafeQuerySelector = function r(){var t;var n;function r(){return typeof e!=="undefined"&&{}.toString.call(e)==="[object global]"}function i(e){if(e&&e.toString){return e.toString().indexOf("[native code]")>-1}else{return false}}function o(){if(n&&t){return}var e=void 0;const r=document.body||document.documentElement;try{if(r){e=document.createElement("iframe");e.style.setProperty("display","none");e.style.setProperty("pointer-events","none");r.appendChild(e);n=e.contentDocument;t=n.createElement("div")}else{n=document.implementation.createHTMLDocument();t=n.createElement("div")}}finally{if(e&&r){r.removeChild(e)}}}function a(e){return function(a,s){if(i(a.querySelector)||r()){return e==="all"?a.querySelectorAll(s):a.querySelector(s)}o();var u=a===document?n:t;return e==="all"?u.querySelectorAll.call(a,s):u.querySelector.call(a,s)}}return{querySelector:a(null),querySelectorAll:a("all")}}
        const registerTestimHandler = function d(e,t,n){let r=[];const i=200;const o=15;const a=40;const s=["pointerup","pointerdown","pointermove"];const u=["mouseup","mousedown","mousemove","click"].concat(s);const c=["keydown","keyup","keypress"];const l=["drag","dragstart","dragend"];const f=l.concat(["drop","dragenter","dragover"]);const d=window.confirm;const p=window.alert;const h=window.print;const v=window.document.createDocumentFragment;function _(e,t){if(e.isInput){e.element.value=t.eventData.text;const n=document.createEvent("Event");n.initEvent("input",true,false);e.element.dispatchEvent(n)}else if(e.isContentEditable){e.element.innerHTML=t.eventData.text}}function E(e){return e.getAttribute?e.getAttribute("contenteditable")==="true":false}function m(e){const t=e.tagName;return t==="INPUT"||t==="TEXTAREA"}function g(e){if(e.keyCode===8){const t=e.target;if(m(t)||E(t)){e.preventDefault();return false}}return true}function T(e){return typeof e==="function"}function y(e){const t=document.createEvent("HTMLEvents");t.initEvent(e,false,true);return t}function S(e,t){e.dispatchEvent(t)}function b(e,t){t.map(y).forEach((t=>{S(e,t)}))}function A(e,t){if(t&&t!==e){b(t,["focusout","blur"])}}function w(e){b(e,["focusin","focus"]);if(T(e.focus)){e.focus()}}function O(e,t){if((e==="change"||e==="blur")&&t.element.tagName==="OPTION"){return t.element.closest("select")}return null}function I(e,t){var n;return t.eventType==="special-key"&&u.includes(e.event)&&((n=t.element)===null||n===void 0?void 0:n.form)}function R(e,t){const n=()=>{var n;return e.event==="textInput"&&!((n=t.quirks)===null||n===void 0?void 0:n.isAuth0Form)};const r=()=>e.event==="click"&&t.isDrag&&!t.allEventsOnSameElement;return n()||r()}function N(e){const t=Object.getOwnPropertyDescriptor(e,"value");if(!t){return}const n=e.value;e.value=`${n}#`;if(t.configurable){delete e.value}e.value=n;const r=document.createEvent("HTMLEvents");r.initEvent("input",true,false);e.dispatchEvent(r);Object.defineProperty(e,"value",t)}function D(e){if(!e.isInput){return}try{N(e.element);e.element.dispatchEvent(new Event("change"))}catch(e){}}function L(e){return e?[e].concat(L(e.parentNode)):[]}function C(e,t){var r;function i(e){function t(){return L(e).find((e=>Array.from(e.classList||[]).includes("Select-control")))}function r(){const e=t();return e?n.querySelector(e,"INPUT"):null}const i=r();if(i){i.dispatchEvent(new Event("focus",{composed:true}))}}if(t.type==="mousedown"&&((r=e.quirks)===null||r===void 0?void 0:r.isReactSelect)){i(e.element)}}function P(e,t){var n;if(t.type==="click"&&((n=e.quirks)===null||n===void 0?void 0:n.isCKEditorFrame)){document.body.dispatchEvent(new Event("focus",{composed:true}))}}function M(){const e=new Event("submit",{composed:true});e.initEvent("submit",true,true);return e}function x(e){const t=new CustomEvent("textInput",{bubbles:true,cancelable:true,composed:true});if(e.eventData){t.data=e.eventData}return t}function U(e){const t=c.indexOf(e.event);if(typeof t!=="number"||t<0){return null}const n=e.eventData;const r=n.modifiers||{};const i=new KeyboardEvent(e.event,{bubbles:true,cancelable:true,composed:true,location:n.location,key:n.key||"",ctrlKey:Boolean(r.ctrl),shiftKey:Boolean(r.shift),altKey:Boolean(r.alt),metaKey:Boolean(r.meta)});Object.defineProperties(i,{keyCode:{enumerable:true,get(){return this._keyCode_}},charCode:{enumerable:true,get(){return this._charCode_}},which:{enumerable:true,get(){return this._keyCode_}}});return Object.assign(i,{_keyCode_:n.keyCode,_charCode_:n.charCode})}function k(e,t,n,r){if(e.event==="submit"){return M()}if(n==="text"||n==="special-key"&&!u.includes(e.event)){return e.event==="textInput"?x(e):U(e)}if(n==="mouse"||n==="special-key"&&u.includes(e.event)){return W(e,t,r)}if(n==="wheel"){return H(e,t,r)}return undefined}function F(e,t,n){return{screenX:0,screenY:0,clientX:t,clientY:n,ctrlKey:Boolean(e.ctrl),altKey:Boolean(e.alt),shiftKey:Boolean(e.shift),metaKey:Boolean(e.meta),bubbles:true,cancelable:true,composed:true}}function j(e,t,n,r,i){if(!window.PointerEvent){return undefined}const o={pointerType:"mouse",isPrimary:true,buttons:i===0?1:2};const a=F(t,n,r);const s=Object.assign({},a,o);return new window.PointerEvent(e,s)}function B(e,t,n,r,i){if(!window.DragEvent){return undefined}const o=F(t,n,r);const a=Object.assign({},o);const s=new window.DragEvent(e,a);if(e==="dragstart"){window.TSTA.dataTransfer=new DataTransfer}Object.defineProperties(s,{dataTransfer:{get:()=>window.TSTA.dataTransfer}});return s}function G(e,t,n,r,i){const o={altKey:Boolean(t.alt),bubbles:true,button:i,buttons:i===0?1:2,cancelable:true,clientX:n,clientY:r,composed:true,ctrlKey:Boolean(t.ctrl),detail:1,metaKey:Boolean(t.meta),screenX:0,screenY:0,shiftKey:Boolean(t.shift),view:document.defaultView,relatedTarget:document.body?document.body.parentNode:document.documentElement};const a=new MouseEvent(e,o);return a}function V(e,t){function n(e,t,n){return n>e&&n<t}const r=Y(t,e.event);const i=e.pointerPosition||{};if(t.isDrag){return{x:i.originX||0,y:i.originY||0}}const o=r.getBoundingClientRect();const a=i.originX&&n(o.left,o.left+o.width,i.originX)?i.originX:o.left+o.width/2;const s=i.originY&&n(o.top,o.top+o.height,i.originY)?i.originY:o.top+o.height/2;return{x:a,y:s}}function H(e,t,n){const r=V(e,n);const i=(t===null||t===void 0?void 0:t.modifiers)||{};const o={deltaX:e.deltaX,deltaY:e.deltaY,deltaZ:e.deltaZ,deltaMode:e.deltaMode,clientX:r.x,clientY:r.y,bubbles:true,cancelable:true,composed:true,ctrl:Boolean(i.ctrl),alt:Boolean(i.alt),shift:Boolean(i.shift),meta:Boolean(i.meta)};return new WheelEvent("wheel",o)}function W(e,t,n){if(e.event==="change"||e.event==="blur"){const t=document.createEvent("HTMLEvents");t.initEvent(e.event,true,true);return t}const r=(t===null||t===void 0?void 0:t.modifiers)||{};const i=V(e,n);const o=(t===null||t===void 0?void 0:t.button)||0;const a=e.event;if(s.includes(a)){return j(a,r,i.x,i.y,o)}if(f.includes(a)){return B(a,r,i.x,i.y,o)}return G(a,r,i.x,i.y,o)}function Y(e,t){return O(t,e)||e.element}function q(e){function t(t){if(e.isSelectOption&&["change","input"].includes(t.type)){e.element.selected=true}const n=Y(e,t.type);n.dispatchEvent(t);C(e,t);P(e,t)}e.events.filter((t=>!R(t,e))).map((t=>k(t,e.eventData,e.eventType,e))).filter(Boolean).forEach((e=>t(e)));if(window.__unloadNavigator){window.removeEventListener("unload",window.__unloadNavigator)}D(e)}function X(e){const t=document.createEvent("Events");t.initEvent("mouseover",true,true);e.dispatchEvent(t)}function K(e){const t={};const n=e.getBoundingClientRect();const r=n.left+n.width/2;const i=n.top+n.height/2;const o=0;const a="mousemove";const s=G(a,t,r,i,o);e.dispatchEvent(s)}function $(e,t,n){let r;const i=O(e.type,t);if(i){r=i}else if(I(n,t)){r=Array.from(t.element.form.elements).find((e=>e.tagName==="BUTTON"&&(!e.getAttribute("type")||!["button","reset"].includes(e.getAttribute("type").toLowerCase()))||e.tagName==="INPUT"&&e.getAttribute("type")&&e.getAttribute("type").toLowerCase()==="submit"))}else if(n.locatedElement){r=window.TSTA.getLocatedElement(n.locatedElement)}else{r=t.element}const{dispatchDragEventsOnClosestDraggable:o}=n;if(l.includes(e.type)&&o){if(!r&&t.lastDraggedElement){return t.lastDraggedElement}const e=J(r);if(e){t.lastDraggedElement=e;return e}}return r}function z(e){function t(e){let t;switch(e){case"mousedown":t="#0000FF";break;case"pointerdown":t="#8A2BE2";break;case"mouseup":t="#00FFFF";break;case"pointerup":t="#5F9EA0";break;case"mouseenter":t="#D2691E";break;case"mouseover":t="#FF7F50";break;default:t="#FF0000"}return t}const n=t(e.type);const r=document.createElement("div");r.style.height="3px";r.style.width="3px";r.style.position="fixed";r.style.top=`${e.clientY}px`;r.style.left=`${e.clientX}px`;r.style["z-index"]=9999;r.style["background-color"]=n;r.classList.add("drag-trace");r.setAttribute("event",e.type);return r}function J(e){let t=e;while(t&&t!==document.documentElement){if(t.draggable){return t}t=t.parentElement}return null}function Q(e,t,n){if(t.isFocusable&&t.isSelectable(e)&&e.type!=="submit"){try{oe(t.element,n.eventData.selection)}catch(e){}}const r=$(e,t,n);if(r&&e.type==="submit"&&r.hasAttribute("action")){const e=t.eventType==="special-key"&&Array.from(r.elements).find((e=>e.getAttribute("type")==="submit"&&e.hasAttribute("name")&&e.hasAttribute("value")));let n;if(e){n=document.createElement("input");n.setAttribute("type","hidden");n.setAttribute("name",e.getAttribute("name"));n.setAttribute("value",e.getAttribute("value"));r.appendChild(n)}r.submit();if(n){n.remove()}}else if(r){r.dispatchEvent(e)}C(t,e)}function Z(e,t,n){if(n){setTimeout(e.executeAsyncNext,re(e,t,n))}else{if(window.__unloadNavigator){window.removeEventListener("unload",window.__unloadNavigator)}D(e);e.resolve()}}function ee(){var e;let t=document.activeElement;while((e=t.shadowRoot)===null||e===void 0?void 0:e.activeElement){t=t.shadowRoot.activeElement}return t}function te(e){let t;const n=e.events[e.eventIndex];const r=e.events[++e.eventIndex];try{t=k(n,e.eventData,e.eventType,e)}catch(t){return e.reject(`exception in get event in text step:${t.message}`)}if(R(n,e)){return Z(e,n,r)}if(t){try{const r=ee();Q(t,e,n);const i=ee();if(e.trackActiveElement&&r!==i){e.element=i}}catch(t){return e.reject(`exception in executeEvent in text step:${t.message}`)}}else if(e.noEventExecuter){e.noEventExecuter(e,n)}else{return e.reject(`cannot execute event ${n.event}`)}Z(e,n,r);return undefined}function ne(e,t){return e.event==="keyup"&&t.event==="keydown"?o:0}function re(e,t,n){let r=a;const o=n.timeStamp-t.timeStamp;if(e.useRecordedMousedown&&["pointerdown","mousedown"].includes(t.event)){return o}if(e.eventType==="text"){r=ne(t,n)}if(e.eventType==="wheel"){r=i}return Math.min(o,r)}function ie(e,t){let n=e.firstChild;let r;while(n){if(n.nodeType===3){if(t.offset--<=0){return n}}else if(n.nodeType===1){r=ie(n,t);if(r){return r}}n=n.nextSibling}return null}function oe(e,t){const n=e;if(!n||!t){return}if(!Number.isNaN(t.start)){n.selectionStart=t.start;n.selectionEnd=t.end}else if(!Number.isNaN(t.nodeOffset)){let e;if(n.firstChild){e=ie(n,{offset:t.nodeOffset})}else{e=n}if(e){const n=window.getSelection();const r=document.createRange();try{n.removeAllRanges();r.setStart(e,t.textOffset);r.setEnd(e,t.textOffset);n.addRange(r)}catch(e){}}}}function ae(e,t){return window.TSTA.download(e).then((({buffer:e,fileType:n})=>({blob:new Blob([e],{type:n}),name:t})))}function se(e){const t=window.TSTA.getLocatedElement(e.locatedElement);return Promise.all(e.fileUrls.map((e=>ae(e.url,e.name)))).then((e=>t.dispatchEvent(window.TSTA.createDropEvent(e))))}function ue(e){var t,n;r=[];const i=e.isRoot?document.documentElement:window.TSTA.getLocatedElement(e.locatedElement);const o={eventIndex:0,element:i,allEventsOnSameElement:e.allEventsOnSameElement,events:e.events,eventType:e.eventType,eventData:e.eventData,stepId:e.id,testResultId:e.testResultId,quirks:e.quirks,isDoubleClick:e.isDoubleClick,isDrag:e.isDrag,useRecordedMousedown:e.useRecordedMousedown,trackActiveElement:e.trackActiveElement,isSelectOption:e.isSelectOption,resolve(e){const t={status:"done",result:e,success:true};a(t)},reject(e){const t={status:"failed",result:e||{},success:false};a(t)}};function a(t){if(o.isNonTextableElemnet){t.reason="Set text on non input element"}fe(e.transactionId,t)}window.__unloadNavigator=function(){o.resolve()};window.addEventListener("unload",window.__unloadNavigator);if(!o.element){return o.reject("element not found")}if(e.eventType==="text"){try{window.removeEventListener("keydown",g);window.addEventListener("keydown",g);o.isInput=m(o.element);o.isContentEditable=E(o.element);if(!o.isInput&&!o.isContentEditable){o.isNonTextableElemnet=true}o.isFocusable=o.isInput||o.isContentEditable;o.isSelectable=function(e){return e.type!=="keyup"};o.noEventExecuter=_}catch(e){return o.reject(`exception in set text step:${e.message}`)}}o.executeAsyncNext=function(){te(o)};const s=function(t,n){const{elementToFocusLocatedElement:r}=e;const i=window.TSTA.getLocatedElement(r);if(!r||!i){A(t,n);return}if(i!==n){try{A(t,n);w(i)}catch(e){}}};const u=ee();if(o.eventType==="mouse"&&!o.isDrag){X(o.element);K(o.element);try{q(o);if(!((t=o.quirks)===null||t===void 0?void 0:t.isReactSelect)&&!((n=o.quirks)===null||n===void 0?void 0:n.isSalesforceLightningCombobox)){s(o.element,u)}o.resolve()}catch(e){console.log("exception in executeSyncEventSequence: ");console.log(e);return o.reject(e.toString())}}else if(o.eventType==="drop-file"){se(e).then((()=>o.resolve())).catch((e=>o.reject(e.toString())))}else{setTimeout((()=>{s(o.element,u);o.executeAsyncNext()}),0)}return undefined}function ce(e){e.resultValue=e.resultValue instanceof HTMLElement?!!e.resultValue:e.resultValue}function le(e={}){const t=e.result||{};const{exports:n={},exportsTest:r={},exportsGlobal:i={},resultValue:o}=t;const a=e=>{try{JSON.stringify(e);return true}catch(e){return false}};const s=[];if(!a(n)){t.exports={};s.push("local")}if(!a(r)){t.exportsTest={};s.push("test")}if(!a(i)){t.exportsGlobal={};s.push("global")}if(s.length>0){e.success=false;t.resultValue=`cannot export ${s.join(",")} - non-serializable object`}if(s.length===0&&!a(o)){e.success=true;t.resultValue=true}}function fe(e,t){window.removeEventListener("keydown",g);ce(t.result||{});try{window.TSTA.appendToStorage(e,t)}catch(n){le(t);window.TSTA.appendToStorage(e,t)}}function de(e,t){function n(e,t){const n=function n(){return e.apply(this,t)};n.prototype=e.prototype;return new n}const r=function(t){const n={status:"done",result:t,success:true};fe(e.transactionId,n)};const i=function(t){const n={status:"failed",result:t,success:false};fe(e.transactionId,n)};const o={};const a={};const s={};try{Object.assign(e.context,{resolve:r,reject:i});const u=e.incomingParams;const c=["context"].concat(u.as.functionParameters).concat(["exports","exportsTest","exportsGlobal"]);const l=[e.context].concat(u.as.functionArguments.map((e=>(e===null||e===void 0?void 0:e.locatedElement)?window.TSTA.getLocatedElement(e.locatedElement):e))).concat([o,a,s]);c.push(e.code);const f=t||n(Function,c);const d=f.apply(null,l);if(d&&typeof d.then==="function"){window.TSTA.appendToStorage(e.transactionId,{type:"promise"});d.then((e=>{r({resultValue:e,exports:o,exportsTest:a,exportsGlobal:s})}),(e=>{i({resultValue:e.toString(),exports:o,exportsTest:a,exportsGlobal:s})}))}else{r({resultValue:d,exports:o,exportsTest:a,exportsGlobal:s})}}catch(e){const t={resultValue:"Failed to save result, session storage is full"};const n={resultValue:e.toString(),exports:o,exportsTest:a,exportsGlobal:s};const r=e.name==="QuotaExceededError"?t:n;i(r)}}function pe(){window.confirm=function(){return!window.TSTA.autoCancelConfirmDialogs};window.alert=function(){return true};window.print=function(){}}function he(){var e;HTMLInputElement.prototype.click=()=>{};window.TSTA.documentFragments=[];(e=window.TSTA).firstDocumentFragmentsCreatedPromise||(e.firstDocumentFragmentsCreatedPromise=new Promise((e=>{var t;(t=window.TSTA).fragResolve||(t.fragResolve=e)})));window.document.createDocumentFragment=function e(){window.TSTA.fragResolve();const t=v.call(window.document);window.TSTA.documentFragments.push(t);return t}}function ve(){window.document.createDocumentFragment=v;delete HTMLInputElement.prototype.click}function _e(){window.confirm=d;window.alert=p;window.print=h}function Ee(){return navigator.userAgent.includes("Firefox")}function me(){const e=Ee()?document.documentElement:document.body;e.scrollTop=0;e.scrollLeft=0}function ge(e){Object.assign(e,{withCredentials:true});window.TSTA.appendToStorage(e.transactionId,{type:"promise"});return new Promise((n=>{t(e,n)})).then((t=>{fe(e.transactionId,t)}))}return{executeAction:ue,runCode:de,runApi:ge,overloadNativeAlerts:pe,restoreNativeAlerts:_e,overloadNativeCreateDocumentFragment:he,restoreNativeCreateDocumentFragment:ve,scrollToTop:me}};
        const makeEyesRefer = function i(){const e="applitools-ref-id";const t=new Map;const n=new Map;const i=e=>e instanceof Node;const o=t=>typeof t==="object"&&t!==null&&e in t;const a=e=>n.get(e);const s=e=>{if(!e||!e.isConnected){throw new Error("StaleElementReferenceError")}};const u=(o,a)=>{if(i(o)){const i=r.injectorUtils.guid();t.set(i,o);const s={[e]:i};if(a){n.set(a,s)}return s}if(Array.isArray(o)){return o.map(u)}if(o&&typeof o==="object"){return Object.entries(o).reduce(((e,[t,n])=>Object.assign(e,{[t]:u(n)})),{})}return o};const c=n=>{if(o(n)){const r=t.get(n[e]);s(r);return r}if(Array.isArray(n)){return n.map(c)}if(n&&typeof n==="object"){return Object.entries(n).reduce(((e,[t,n])=>Object.assign(e,{[t]:c(n)})),{})}return n};return{isRef:o,get:a,ref:u,deref:c}}
        const shimSafeContainer = shimSafeQuerySelector();
        const _TSTA = Object.assign(window.TSTA || {}, registerTestimHandler({"autMessages":{"RunCode":"testim-aut-run-code-0.08942992108178305","EventMessage":"testim-aut-event-0.20962640060198878","EventResultMessage":"testim-aut-result0.3571709953856521","DisableRetries":"testim-disable-retries0.9151623866305265","RegisteredAUTMessage":"testim-aut-init0.1652721890286868","AbortMessage":"testim-aut-abort","StartMessage":"testim-aut-start","GetOffsetRequest":"testim-get-offset","GetOffsetResponse":"testim-get-offset-response","GetFrameId":"testim-get-frame-id","NotifyBgFrameId":"notify-bg-frame-id","GetFrameIdResponse":"testim-get-frame-id-response","GetFrameLocatorMessage":"testim-get-frame-locator","GetFrameLocatorResponse":"testim-get-frame-locator-response","FindElement":"testim-find-element0.713633354155937","ElementFound":"testim-element-found0.9393315820628723","NativeAlerts":"testim-set-native-alerts","LogUnwrapped":"log-message0.2472676604600792","DropFile":"drop-file","DropFileResultMessage":"drop-file-result","ApplitoolsFrameId":"applitools-frame-id"}}, apiCall, shimSafeContainer));
        _TSTA.appendToStorage = function e(t,n){const r=`data-testim-${t}`;const i="Native sessionStorage is not available";function o(e){if(!(e===null||e===void 0?void 0:e.toString)){return false}return e.toString().includes("[native code]")}try{if(![window.sessionStorage.setItem,window.sessionStorage.getItem].every(o)){throw new Error(i)}const e=JSON.parse(window.sessionStorage.getItem(r)||"{}");const t=Object.assign({},e,n);window.sessionStorage.setItem(r,JSON.stringify(t))}catch(e){const t=e.message.toLowerCase().includes("quota");const o=e.message===i;if(e.message.includes("sessionStorage")||t||o){let e=document.head.querySelector("#testim-storage-backup");if(!e){e=document.createElement("meta");e.id="testim-storage-backup";document.head.append(e)}const i=JSON.parse(e.getAttribute(r)||"{}");const a=Object.assign({},i,n);e.setAttribute(r,JSON.stringify(a));if(t||o){try{window.sessionStorage.removeItem(r)}catch(e){}window.TSTA.useFallbackStorage=true}return}throw e}};
        _TSTA.download = function e(t){return new Promise(((e,n)=>{window.TSTA.download.id=(window.TSTA.download.id||0)+1;const r=window.TSTA.download.id;window.addEventListener("message",i);window.postMessage({type:"testim:download:request",url:t,id:r},"*");function i(t){if(t.data&&t.data.type==="testim:download:response"&&t.data.id===r){const{fileType:r,buffer:o,success:a,statusText:s}=t.data;window.removeEventListener("message",i);if(a){return e({buffer:o,fileType:r})}return n(new Error(s))}return undefined}}))};
        _TSTA.getLocatedElement = (function() {
    var shimSafeQuerySelector = function r(){var t;var n;function r(){return typeof e!=="undefined"&&{}.toString.call(e)==="[object global]"}function i(e){if(e&&e.toString){return e.toString().indexOf("[native code]")>-1}else{return false}}function o(){if(n&&t){return}var e=void 0;const r=document.body||document.documentElement;try{if(r){e=document.createElement("iframe");e.style.setProperty("display","none");e.style.setProperty("pointer-events","none");r.appendChild(e);n=e.contentDocument;t=n.createElement("div")}else{n=document.implementation.createHTMLDocument();t=n.createElement("div")}}finally{if(e&&r){r.removeChild(e)}}}function a(e){return function(a,s){if(i(a.querySelector)||r()){return e==="all"?a.querySelectorAll(s):a.querySelector(s)}o();var u=a===document?n:t;return e==="all"?u.querySelectorAll.call(a,s):u.querySelector.call(a,s)}}return{querySelector:a(null),querySelectorAll:a("all")}};
    var TESTIM_ID_FIELD_NAME = "testim_dom_element_id";
    var getLocatedElement = (e=(0,i.shimSafeQuerySelector)(),t=a)=>function(n){let r;const i=typeof navigator!=="undefined"&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent);if(typeof n==="string"&&n.includes(t)){r=[n]}else if(typeof n==="string"){r=[`[${t}='${n}']`]}else{r=(n===null||n===void 0?void 0:n.shadowPath)||[]}const o=typeof n==="string"?[]:(n===null||n===void 0?void 0:n.shadowPathSelectors)||[];let a=document;let s;r.forEach(((t,n)=>{var r;s=a&&(a.shadowRoot||((r=a.getRootNode)===null||r===void 0?void 0:r.call(a)));const i=n===0?`body ${t}, body${t}`:t;const u=a;a=s&&e.querySelector(s,i)||u&&e.querySelector(u,i);if(!a&&n===0){a=s&&e.querySelector(s,t)||u&&e.querySelector(u,t)}if(!a&&o[n]){a=s&&e.querySelector(s,o[n])||u&&e.querySelector(u,o[n])}}));if(i&&a&&!(a instanceof Node)){const e=a.ownerSVGElement!==undefined?document.createElementNS("http://www.w3.org/2000/svg",a.tagName):document.createElement(a.tagName);Object.setPrototypeOf(a,e)}return a};
    return getLocatedElement(shimSafeQuerySelector(), TESTIM_ID_FIELD_NAME);
})();;
        _TSTA.createDropEvent = function r(e){const t=s();const n=t.File;const r=t.DataTransfer;function i(e,t){try{return new n([e],t,{type:e.type})}catch(n){const r=new Date;return Object.assign(e,{lastModifiedDate:r,lastModified:r.getTime(),name:t})}}function o(e){const t=new r;e.forEach((e=>t.items.add(e)));const n=t.items.length;const i=Object.create(t.items);Object.defineProperty(t,"items",{get(){return i}});Object.defineProperty(i,"length",{get(){return n}});if(n>0){const e=["Files"];if(navigator.userAgent.indexOf("Firefox")>-1){e.push("application/x-moz-file")}Object.defineProperty(t,"types",{get(){return e}})}for(let e=0;e<n;e++){const n=t.items[e];Object.defineProperty(n,"webkitGetAsEntry",{configurable:true,get(){return()=>({_file:n.getAsFile(),relativePath:"",isFile:true,isDirectory:false,file:e=>e(n.getAsFile())})}});i[e]=n}return new DragEvent("drop",{dataTransfer:t,bubbles:true,cancelable:true,composed:true})}function a(e){e.item=function(t){return e[t]};function t(){return e.map((e=>{const t={kind:"file",type:e.type,getAsFile:()=>e};Object.defineProperty(t,"webkitGetAsEntry",{configurable:true,get(){return()=>({_file:t.getAsFile(),relativePath:"",isFile:true,isDirectory:false,file:e=>e(t.getAsFile())})}});return t}))}const n=document.createEvent("HTMLEvents");n.initEvent("drop",true,true);Object.defineProperty(n,"dataTransfer",{enumerable:true,configurable:true,get:()=>({files:e,types:["Files"],items:t()})});return n}function s(){const e=typeof window.DataTransfer!=="function"||window.DataTransfer.toString().indexOf("[native code]")===-1||(typeof window.File!=="function"||window.File.toString().indexOf("[native code]")===-1);if(!e){return{File:window.File,DataTransfer:window.DataTransfer}}var t;const n=document.body||document.documentElement;try{if(n){t=document.createElement("iframe");t.style.setProperty("display","none");t.style.setProperty("pointer-events","none");n.appendChild(t);const e=t.contentWindow;return{File:e.File,DataTransfer:e.DataTransfer}}return{File:window.File,DataTransfer:window.DataTransfer}}finally{if(t&&n){n.removeChild(t)}}}const u=e.map((({blob:e,name:t})=>i(e,t)));let c;try{c=o(u)}catch(e){c=a(u)}Object.defineProperties(c,{originalEvent:{enumerable:true,configurable:true,get(){return c}}});return c};
        _TSTA.eyesRefer = makeEyesRefer();
        Array.prototype.forEach.call(shimSafeContainer.querySelectorAll(document,'.__testim__'),
            function (element) {element.remove();})
        try {
            Object.defineProperty(window, 'TSTA', {
                configurable: false,
                enumerable: false,
                set: function(x) { console.warn('__internalTestimLog__:TSTA overwrite attempt') },
                get: function() { return _TSTA },
            });
        } catch (e) {
            // this code can be called multiple times, after the first time it will throw an error because
            // window.TSTA can't be redefined. Don't log redifine errors (Chrome/edge chromium versions)
            if (!e.message.match('Cannot modify|Cannot redefine')){
                console.error('__internalTestimLog__:errror defining window.TSTA', e)
            }
        }
    ;}());
    //# sourceURL=eventAction_inAUT.js