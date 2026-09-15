var Ne=()=>{};var Be=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},Pt=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=e[n++];t[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=e[n++],o=e[n++],a=e[n++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{let s=e[n++],o=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return t.join("")},Me={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){let s=e[i],o=i+1<e.length,a=o?e[i+1]:0,c=i+2<e.length,l=c?e[i+2]:0,h=s>>2,g=(s&3)<<4|a>>4,p=(a&15)<<2|l>>6,M=l&63;c||(M=64,o||(p=64)),r.push(n[h],n[g],n[p],n[M])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Be(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):Pt(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){let s=n[e.charAt(i++)],a=i<e.length?n[e.charAt(i)]:0;++i;let l=i<e.length?n[e.charAt(i)]:64;++i;let g=i<e.length?n[e.charAt(i)]:64;if(++i,s==null||a==null||l==null||g==null)throw new K;let p=s<<2|a>>4;if(r.push(p),l!==64){let M=a<<4&240|l>>2;if(r.push(M),g!==64){let Nt=l<<6&192|g;r.push(Nt)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},K=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Bt=function(e){let t=Be(e);return Me.encodeByteArray(t,!0)},J=function(e){return Bt(e).replace(/\./g,"")},Le=function(e){try{return Me.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function Mt(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Lt=()=>Mt().__FIREBASE_DEFAULTS__,$t=()=>{if(typeof process>"u"||typeof process.env>"u")return;let e=process.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},Ft=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let t=e&&Le(e[1]);return t&&JSON.parse(t)},Ut=()=>{try{return Ne()||Lt()||$t()||Ft()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}};var Y=()=>Ut()?.config;var L=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}};function X(){let e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function k(){try{return typeof indexedDB=="object"}catch{return!1}}function R(){return new Promise((e,t)=>{try{let n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(n){t(n)}})}function Q(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}var Ht="FirebaseError",b=class e extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=Ht,Object.setPrototypeOf(this,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,I.prototype.create)}},I=class{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){let r=n[0]||{},i=`${this.service}/${t}`,s=this.errors[t],o=s?Vt(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new b(i,a,r)}};function Vt(e,t){try{let n=0,r="";for(;n<e.length;){let i=e.indexOf("{$",n);if(i===-1){r+=e.substring(n);break}let s=e.indexOf("}",i+2);if(s===-1){r+=e.substring(n);break}let o=e.substring(i+2,s),a=t[o];r+=e.substring(n,i)+(a!=null?String(a):`<${o}?>`),n=s+1}return r}catch{return e}}function O(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);for(let i of n){if(!r.includes(i))return!1;let s=e[i],o=t[i];if(Pe(s)&&Pe(o)){if(!O(s,o))return!1}else if(s!==o)return!1}for(let i of r)if(!n.includes(i))return!1;return!0}function Pe(e){return e!==null&&typeof e=="object"}var jt=1e3,zt=2,Wt=14400*1e3,qt=.5;function Z(e,t=jt,n=zt){let r=t*Math.pow(n,e),i=Math.round(qt*r*(Math.random()-.5)*2);return Math.min(Wt,r+i)}function $(e){return e&&e._delegate?e._delegate:e}var m=class{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}};var A="[DEFAULT]";var ee=class{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){let n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){let r=new L;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){let n=this.normalizeInstanceIdentifier(t?.identifier),r=t?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Kt(t))try{this.getOrInitializeService({instanceIdentifier:A})}catch{}for(let[n,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(n);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(t=A){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){let t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=A){return this.instances.has(t)}getOptions(t=A){return this.instancesOptions.get(t)||{}}initialize(t={}){let{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(let[s,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(t,n){let r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(t),this.onInitCallbacks.set(r,i);let s=this.instances.get(r);return s&&t(s,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){let r=this.onInitCallbacks.get(n);if(r)for(let i of r)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Gt(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=A){return this.component?this.component.multipleInstances?t:A:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Gt(e){return e===A?void 0:e}function Kt(e){return e.instantiationMode==="EAGER"}var F=class{constructor(t){this.name=t,this.providers=new Map}addComponent(t){let n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);let n=new ee(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}};var Jt=[],f;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(f||(f={}));var Yt={debug:f.DEBUG,verbose:f.VERBOSE,info:f.INFO,warn:f.WARN,error:f.ERROR,silent:f.SILENT},Xt=f.INFO,Qt={[f.DEBUG]:"log",[f.VERBOSE]:"log",[f.INFO]:"info",[f.WARN]:"warn",[f.ERROR]:"error"},Zt=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=Qt[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)},x=class{constructor(t){this.name=t,this._logLevel=Xt,this._logHandler=Zt,this._userLogHandler=null,Jt.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in f))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Yt[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,f.DEBUG,...t),this._logHandler(this,f.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,f.VERBOSE,...t),this._logHandler(this,f.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,f.INFO,...t),this._logHandler(this,f.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,f.WARN,...t),this._logHandler(this,f.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,f.ERROR,...t),this._logHandler(this,f.ERROR,...t)}};var en=(e,t)=>t.some(n=>e instanceof n),$e,Fe;function tn(){return $e||($e=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function nn(){return Fe||(Fe=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Ue=new WeakMap,ne=new WeakMap,He=new WeakMap,te=new WeakMap,ie=new WeakMap;function rn(e){let t=new Promise((n,r)=>{let i=()=>{e.removeEventListener("success",s),e.removeEventListener("error",o)},s=()=>{n(w(e.result)),i()},o=()=>{r(e.error),i()};e.addEventListener("success",s),e.addEventListener("error",o)});return t.then(n=>{n instanceof IDBCursor&&Ue.set(n,e)}).catch(()=>{}),ie.set(t,e),t}function sn(e){if(ne.has(e))return;let t=new Promise((n,r)=>{let i=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",o),e.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",s),e.addEventListener("error",o),e.addEventListener("abort",o)});ne.set(e,t)}var re={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return ne.get(e);if(t==="objectStoreNames")return e.objectStoreNames||He.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return w(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Ve(e){re=e(re)}function on(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){let r=e.call(U(this),t,...n);return He.set(r,t.sort?t.sort():[t]),w(r)}:nn().includes(e)?function(...t){return e.apply(U(this),t),w(Ue.get(this))}:function(...t){return w(e.apply(U(this),t))}}function an(e){return typeof e=="function"?on(e):(e instanceof IDBTransaction&&sn(e),en(e,tn())?new Proxy(e,re):e)}function w(e){if(e instanceof IDBRequest)return rn(e);if(te.has(e))return te.get(e);let t=an(e);return t!==e&&(te.set(e,t),ie.set(t,e)),t}var U=e=>ie.get(e);function H(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(e,t),a=w(o);return r&&o.addEventListener("upgradeneeded",c=>{r(w(o.result),c.oldVersion,c.newVersion,w(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var cn=["get","getKey","getAll","getAllKeys","count"],ln=["put","add","delete","clear"],se=new Map;function je(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(se.get(t))return se.get(t);let n=t.replace(/FromIndex$/,""),r=t!==n,i=ln.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||cn.includes(n)))return;let s=async function(o,...a){let c=this.transaction(o,i?"readwrite":"readonly"),l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return se.set(t,s),s}Ve(e=>({...e,get:(t,n,r)=>je(t,n)||e.get(t,n,r),has:(t,n)=>!!je(t,n)||e.has(t,n)}));var ae=class{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(fn(n)){let r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}};function fn(e){return e.getComponent()?.type==="VERSION"}var ce="@firebase/app",ze="0.16.2";var E=new x("@firebase/app"),un="@firebase/app-compat",dn="@firebase/analytics-compat",hn="@firebase/analytics",pn="@firebase/app-check-compat",mn="@firebase/app-check",gn="@firebase/auth",bn="@firebase/auth-compat",yn="@firebase/database",wn="@firebase/data-connect",In="@firebase/database-compat",_n="@firebase/functions",En="@firebase/functions-compat",vn="@firebase/installations",An="@firebase/installations-compat",Sn="@firebase/messaging",Cn="@firebase/messaging-compat",Dn="@firebase/performance",Tn="@firebase/performance-compat",On="@firebase/remote-config",xn="@firebase/remote-config-compat",kn="@firebase/storage",Rn="@firebase/storage-compat",Nn="@firebase/firestore",Pn="@firebase/ai",Bn="@firebase/firestore-compat",Mn="firebase";var le="[DEFAULT]",Ln={[ce]:"fire-core",[un]:"fire-core-compat",[hn]:"fire-analytics",[dn]:"fire-analytics-compat",[mn]:"fire-app-check",[pn]:"fire-app-check-compat",[gn]:"fire-auth",[bn]:"fire-auth-compat",[yn]:"fire-rtdb",[wn]:"fire-data-connect",[In]:"fire-rtdb-compat",[_n]:"fire-fn",[En]:"fire-fn-compat",[vn]:"fire-iid",[An]:"fire-iid-compat",[Sn]:"fire-fcm",[Cn]:"fire-fcm-compat",[Dn]:"fire-perf",[Tn]:"fire-perf-compat",[On]:"fire-rc",[xn]:"fire-rc-compat",[kn]:"fire-gcs",[Rn]:"fire-gcs-compat",[Nn]:"fire-fst",[Bn]:"fire-fst-compat",[Pn]:"fire-vertex","fire-js":"fire-js",[Mn]:"fire-js-all"};var N=new Map,$n=new Map,fe=new Map;function We(e,t){try{e.container.addComponent(t)}catch(n){E.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function v(e){let t=e.name;if(fe.has(t))return E.debug(`There were multiple attempts to register component ${t}.`),!1;fe.set(t,e);for(let n of N.values())We(n,e);for(let n of $n.values())We(n,e);return!0}function B(e,t){let n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}var Fn={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},_=new I("app","Firebase",Fn);var ue=class{constructor(t,n,r){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new m("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw _.create("app-deleted",{appName:this._name})}};function pe(e,t={}){let n=e;typeof t!="object"&&(t={name:t});let r={name:le,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!="string"||!i)throw _.create("bad-app-name",{appName:String(i)});if(n||(n=Y()),!n)throw _.create("no-options");let s=N.get(i);if(s)if(O(n,s.options)){if(O(r,s.config))return s;throw _.create("duplicate-app",{appName:i,mismatchedParam:"config",oldValue:JSON.stringify(s.config),newValue:JSON.stringify(r)})}else throw _.create("duplicate-app",{appName:i,mismatchedParam:"options",oldValue:JSON.stringify(s.options),newValue:JSON.stringify(n)});let o=new F(i);for(let c of fe.values())o.addComponent(c);let a=new ue(n,r,o);return N.set(i,a),a}function V(e=le){let t=N.get(e);if(!t&&e===le&&Y())return pe();if(!t)throw _.create("no-app",{appName:e});return t}function Je(){return Array.from(N.values())}function y(e,t,n){let r=Ln[e]??e;n&&(r+=`-${n}`);let i=r.match(/\s|\//),s=t.match(/\s|\//);if(i||s){let o=[`Unable to register library "${r}" with version "${t}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),E.warn(o.join(" "));return}v(new m(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}var Un="firebase-heartbeat-database",Hn=1,P="firebase-heartbeat-store",oe=null;function Ye(){return oe||(oe=H(Un,Hn,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(P)}catch(n){console.warn(n)}}}}).catch(e=>{throw _.create("idb-open",{originalErrorMessage:e.message})})),oe}async function Vn(e){try{let n=(await Ye()).transaction(P),r=await n.objectStore(P).get(Xe(e));return await n.done,r}catch(t){if(t instanceof b)E.warn(t.message);else{let n=_.create("idb-get",{originalErrorMessage:t?.message});E.warn(n.message)}}}async function qe(e,t){try{let r=(await Ye()).transaction(P,"readwrite");await r.objectStore(P).put(t,Xe(e)),await r.done}catch(n){if(n instanceof b)E.warn(n.message);else{let r=_.create("idb-set",{originalErrorMessage:n?.message});E.warn(r.message)}}}function Xe(e){return`${e.name}!${e.options.appId}`}var jn=1024,zn=30,de=class{constructor(t){this.container=t,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new he(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{let n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ge();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>zn){let i=qn(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(t){E.warn(t)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=Ge(),{heartbeatsToSend:n,unsentEntries:r}=Wn(this._heartbeatsCache.heartbeats),i=J(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return E.warn(t),""}}};function Ge(){return new Date().toISOString().substring(0,10)}function Wn(e,t=jn){let n=[],r=e.slice();for(let i of e){let s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Ke(n)>t){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ke(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}var he=class{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return k()?R().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await Vn(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){let r=await this.read();return qe(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){let r=await this.read();return qe(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}};function Ke(e){return J(JSON.stringify({version:2,heartbeats:e})).length}function qn(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}function Gn(e){v(new m("platform-logger",t=>new ae(t),"PRIVATE")),v(new m("heartbeat",t=>new de(t),"PRIVATE")),y(ce,ze,e),y(ce,ze,"esm2020"),y("fire-js","")}Gn("");var Kn="firebase",Jn="12.19.0";y(Kn,Jn,"app");var et="@firebase/installations",ye="0.6.24";var tt=1e4,nt=`w:${ye}`,rt="FIS_v2",Yn="https://firebaseinstallations.googleapis.com/v1",Xn=3600*1e3,Qn="installations",Zn="Installations";var er={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},C=new I(Qn,Zn,er);function it(e){return e instanceof b&&e.code.includes("request-failed")}function st({projectId:e}){return`${Yn}/projects/${e}/installations`}function ot(e){return{token:e.token,requestStatus:2,expiresIn:nr(e.expiresIn),creationTime:Date.now()}}async function at(e,t){let r=(await t.json()).error;return C.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function ct({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function tr(e,{refreshToken:t}){let n=ct(e);return n.append("Authorization",rr(t)),n}async function lt(e){let t=await e();return t.status>=500&&t.status<600?e():t}function nr(e){return Number(e.replace("s","000"))}function rr(e){return`${rt} ${e}`}async function ir({appConfig:e,heartbeatServiceProvider:t},{fid:n}){let r=st(e),i=ct(e),s=t.getImmediate({optional:!0});if(s){let l=await s.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}let o={fid:n,authVersion:rt,appId:e.appId,sdkVersion:nt},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await lt(()=>fetch(r,a));if(c.ok){let l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:ot(l.authToken)}}else throw await at("Create Installation",c)}function ft(e){return new Promise(t=>{setTimeout(t,e)})}function sr(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}var or=/^[cdef][\w-]{21}$/,be="";function ar(){try{let e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;let n=cr(e);return or.test(n)?n:be}catch{return be}}function cr(e){return sr(e).substr(0,22)}function z(e){return`${e.appName}!${e.appId}`}var ut=new Map;function dt(e,t){let n=z(e);ht(n,t),lr(n,t)}function ht(e,t){let n=ut.get(e);if(n)for(let r of n)r(t)}function lr(e,t){let n=fr();n&&n.postMessage({key:e,fid:t}),ur()}var S=null;function fr(){return!S&&"BroadcastChannel"in self&&(S=new BroadcastChannel("[Firebase] FID Change"),S.onmessage=e=>{ht(e.data.key,e.data.fid)}),S}function ur(){ut.size===0&&S&&(S.close(),S=null)}var dr="firebase-installations-database",hr=1,D="firebase-installations-store",me=null;function we(){return me||(me=H(dr,hr,{upgrade:(e,t)=>{t===0&&e.createObjectStore(D)}})),me}async function j(e,t){let n=z(e),i=(await we()).transaction(D,"readwrite"),s=i.objectStore(D),o=await s.get(n);return await s.put(t,n),await i.done,(!o||o.fid!==t.fid)&&dt(e,t.fid),t}async function pt(e){let t=z(e),r=(await we()).transaction(D,"readwrite");await r.objectStore(D).delete(t),await r.done}async function W(e,t){let n=z(e),i=(await we()).transaction(D,"readwrite"),s=i.objectStore(D),o=await s.get(n),a=t(o);return a===void 0?await s.delete(n):await s.put(a,n),await i.done,a&&(!o||o.fid!==a.fid)&&dt(e,a.fid),a}async function Ie(e){let t,n=await W(e.appConfig,r=>{let i=pr(r),s=mr(e,i);return t=s.registrationPromise,s.installationEntry});return n.fid===be?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function pr(e){let t=e||{fid:ar(),registrationStatus:0};return mt(t)}function mr(e,t){if(t.registrationStatus===0){if(!navigator.onLine){let i=Promise.reject(C.create("app-offline"));return{installationEntry:t,registrationPromise:i}}let n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=gr(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:br(e)}:{installationEntry:t}}async function gr(e,t){try{let n=await ir(e,t);return j(e.appConfig,n)}catch(n){throw it(n)&&n.customData.serverCode===409?await pt(e.appConfig):await j(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function br(e){let t=await Qe(e.appConfig);for(;t.registrationStatus===1;)await ft(100),t=await Qe(e.appConfig);if(t.registrationStatus===0){let{installationEntry:n,registrationPromise:r}=await Ie(e);return r||n}return t}function Qe(e){return W(e,t=>{if(!t)throw C.create("installation-not-found");return mt(t)})}function mt(e){return yr(e)?{fid:e.fid,registrationStatus:0}:e}function yr(e){return e.registrationStatus===1&&e.registrationTime+tt<Date.now()}async function wr({appConfig:e,heartbeatServiceProvider:t},n){let r=Ir(e,n),i=tr(e,n),s=t.getImmediate({optional:!0});if(s){let l=await s.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}let o={installation:{sdkVersion:nt,appId:e.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await lt(()=>fetch(r,a));if(c.ok){let l=await c.json();return ot(l)}else throw await at("Generate Auth Token",c)}function Ir(e,{fid:t}){return`${st(e)}/${t}/authTokens:generate`}async function _e(e,t=!1){let n,r=await W(e.appConfig,s=>{if(!gt(s))throw C.create("not-registered");let o=s.authToken;if(!t&&vr(o))return s;if(o.requestStatus===1)return n=_r(e,t),s;{if(!navigator.onLine)throw C.create("app-offline");let a=Sr(s);return n=Er(e,a),a}});return n?await n:r.authToken}async function _r(e,t){let n=await Ze(e.appConfig);for(;n.authToken.requestStatus===1;)await ft(100),n=await Ze(e.appConfig);let r=n.authToken;return r.requestStatus===0?_e(e,t):r}function Ze(e){return W(e,t=>{if(!gt(t))throw C.create("not-registered");let n=t.authToken;return Cr(n)?{...t,authToken:{requestStatus:0}}:t})}async function Er(e,t){try{let n=await wr(e,t),r={...t,authToken:n};return await j(e.appConfig,r),n}catch(n){if(it(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await pt(e.appConfig);else{let r={...t,authToken:{requestStatus:0}};await j(e.appConfig,r)}throw n}}function gt(e){return e!==void 0&&e.registrationStatus===2}function vr(e){return e.requestStatus===2&&!Ar(e)}function Ar(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Xn}function Sr(e){let t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function Cr(e){return e.requestStatus===1&&e.requestTime+tt<Date.now()}async function Dr(e){let t=e,{installationEntry:n,registrationPromise:r}=await Ie(t);return r?r.catch(console.error):_e(t).catch(console.error),n.fid}async function Tr(e,t=!1){let n=e;return await Or(n),(await _e(n,t)).token}async function Or(e){let{registrationPromise:t}=await Ie(e);t&&await t}function xr(e){if(!e||!e.options)throw ge("App Configuration");if(!e.name)throw ge("App Name");let t=["projectId","apiKey","appId"];for(let n of t)if(!e.options[n])throw ge(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function ge(e){return C.create("missing-app-config-values",{valueName:e})}var bt="installations",kr="installations-internal",Rr=e=>{let t=e.getProvider("app").getImmediate(),n=xr(t),r=B(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Nr=e=>{let t=e.getProvider("app").getImmediate(),n=B(t,bt).getImmediate();return{getId:()=>Dr(n),getToken:i=>Tr(n,i)}};function Pr(){v(new m(bt,Rr,"PUBLIC")),v(new m(kr,Nr,"PRIVATE"))}Pr();y(et,ye);y(et,ye,"esm2020");var Ee="analytics",Br="firebase_id",Mr="origin",Lr=60*1e3,$r="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Oe="https://www.googletagmanager.com/gtag/js";var u=new x("@firebase/analytics");var Fr={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},d=new I("analytics","Analytics",Fr);function Ur(e){if(!e.startsWith(Oe)){let t=d.create("invalid-gtag-resource",{gtagURL:e});return u.warn(t.message),""}return e}function vt(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function Hr(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function Vr(e,t){let n=Hr("firebase-js-sdk-policy",{createScriptURL:Ur}),r=document.createElement("script"),i=`${Oe}?l=${e}&id=${t}`;r.src=n?n?.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function jr(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function zr(e,t,n,r,i,s){let o=r[i];try{if(o)await t[o];else{let c=(await vt(n)).find(l=>l.measurementId===i);c&&await t[c.appId]}}catch(a){u.error(a)}e("config",i,s)}async function Wr(e,t,n,r,i){try{let s=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);let a=await vt(n);for(let c of o){let l=a.find(g=>g.measurementId===c),h=l&&t[l.appId];if(h)s.push(h);else{s=[];break}}}s.length===0&&(s=Object.values(t)),await Promise.all(s),e("event",r,i||{})}catch(s){u.error(s)}}function qr(e,t,n,r){async function i(s,...o){try{if(s==="event"){let[a,c]=o;await Wr(e,t,n,a,c)}else if(s==="config"){let[a,c]=o;await zr(e,t,n,r,a,c)}else if(s==="consent"){let[a,c]=o;e("consent",a,c)}else if(s==="get"){let[a,c,l]=o;e("get",a,c,l)}else if(s==="set"){let[a]=o;e("set",a)}else e(s,...o)}catch(a){u.error(a)}}return i}function Gr(e,t,n,r,i){let s=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=qr(s,e,t,n),{gtagCore:s,wrappedGtag:window[i]}}function Kr(e){let t=window.document.getElementsByTagName("script");for(let n of Object.values(t))if(n.src&&n.src.includes(Oe)&&n.src.includes(e))return n;return null}var Jr=30,Yr=1e3,ve=class{constructor(t={},n=Yr){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}},At=new ve;function Xr(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function Qr(e){let{appId:t,apiKey:n}=e,r={method:"GET",headers:Xr(n)},i=$r.replace("{app-id}",t),s=await fetch(i,r);if(s.status!==200&&s.status!==304){let o="";try{let a=await s.json();a.error?.message&&(o=a.error.message)}catch{}throw d.create("config-fetch-failed",{httpStatus:s.status,responseMessage:o})}return s.json()}async function Zr(e,t=At,n){let{appId:r,apiKey:i,measurementId:s}=e.options;if(!r)throw d.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw d.create("no-api-key")}let o=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new Ae;return setTimeout(async()=>{a.abort()},Lr),St({appId:r,apiKey:i,measurementId:s},o,a,t)}async function St(e,{throttleEndTimeMillis:t,backoffCount:n},r,i=At){let{appId:s,measurementId:o}=e;try{await ei(r,t)}catch(a){if(o)return u.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${a?.message}]`),{appId:s,measurementId:o};throw a}try{let a=await Qr(e);return i.deleteThrottleMetadata(s),a}catch(a){let c=a;if(!ti(c)){if(i.deleteThrottleMetadata(s),o)return u.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:s,measurementId:o};throw a}let l=Number(c?.customData?.httpStatus)===503?Z(n,i.intervalMillis,Jr):Z(n,i.intervalMillis),h={throttleEndTimeMillis:Date.now()+l,backoffCount:n+1};return i.setThrottleMetadata(s,h),u.debug(`Calling attemptFetch again in ${l} millis`),St(e,h,r,i)}}function ei(e,t){return new Promise((n,r)=>{let i=Math.max(t-Date.now(),0),s=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(s),r(d.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function ti(e){if(!(e instanceof b)||!e.customData)return!1;let t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}var Ae=class{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}};var Se;async function ni(e,t,n,r,i){if(i&&i.global){e("event",n,r);return}else{let s=await t,o={...r,send_to:s};e("event",n,o)}}async function ri(e,t,n,r){if(r&&r.global)return e("set",{user_id:n}),Promise.resolve();{let i=await t;e("config",i,{update:!0,user_id:n})}}async function ii(e,t,n,r){if(r&&r.global){let i={};for(let s of Object.keys(n))i[`user_properties.${s}`]=n[s];return e("set",i),Promise.resolve()}else{let i=await t;e("config",i,{update:!0,user_properties:n})}}var Ce;function si(e){Ce=e}function oi(e){Se=e}async function ai(){if(k())try{await R()}catch(e){return u.warn(d.create("indexeddb-unavailable",{errorInfo:e?.toString()}).message),!1}else return u.warn(d.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function ci(e,t,n,r,i,s,o){let a=Zr(e);a.then(p=>{n[p.measurementId]=p.appId,e.options.measurementId&&p.measurementId!==e.options.measurementId&&u.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${p.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(p=>u.error(p)),t.push(a);let c=ai().then(p=>{if(p)return r.getId()}),[l,h]=await Promise.all([a,c]);Kr(s)||Vr(s,l.measurementId),Ce&&(i("consent","default",Ce),si(void 0)),i("js",new Date);let g=o?.config??{};return g[Mr]="firebase",g.update=!0,h!=null&&(g[Br]=h),i("config",l.measurementId,g),Se&&(i("set",Se),oi(void 0)),l.measurementId}var De=class{constructor(t){this.app=t}_delete(){return delete T[this.app.options.appId],Promise.resolve()}},T={},yt=[],wt={},q="dataLayer",Ct="gtag",It,G,Te=!1;function Dt(e){if(Te)throw d.create("already-initialized");e.dataLayerName&&(q=e.dataLayerName),e.gtagName&&(Ct=e.gtagName)}function li(){let e=[];if(X()&&e.push("This is a browser extension environment."),Q()||e.push("Cookies are not available."),e.length>0){let t=e.map((r,i)=>`(${i+1}) ${r}`).join(" "),n=d.create("invalid-analytics-context",{errorInfo:t});u.warn(n.message)}}function fi(e,t,n){li();let r=e.options.appId;if(!r)throw d.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)u.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw d.create("no-api-key");if(T[r]!=null)throw d.create("already-exists",{id:r});if(!Te){jr(q);let{wrappedGtag:s,gtagCore:o}=Gr(T,yt,wt,q,Ct);G=s,It=o,Te=!0}return T[r]=ci(e,yt,wt,t,It,q,n),new De(e)}function Tt(e,t={}){let n=B(e,Ee);if(n.isInitialized()){let i=n.getImmediate();if(O(t,n.getOptions()))return i;throw d.create("already-initialized")}return n.initialize({options:t})}async function Ot(){if(X()||!Q()||!k())return!1;try{return await R()}catch{return!1}}function xt(e,t,n){e=$(e),ri(G,T[e.app.options.appId],t,n).catch(r=>u.error(r))}function xe(e,t,n){e=$(e),ii(G,T[e.app.options.appId],t,n).catch(r=>u.error(r))}function ke(e,t,n,r){e=$(e),ni(G,T[e.app.options.appId],t,n,r).catch(i=>u.error(i))}var _t="@firebase/analytics",Et="0.10.25";function ui(){v(new m(Ee,(t,{options:n})=>{let r=t.getProvider("app").getImmediate(),i=t.getProvider("installations-internal").getImmediate();return fi(r,i,n)},"PUBLIC")),v(new m("analytics-internal",e,"PRIVATE")),y(_t,Et),y(_t,Et,"esm2020");function e(t){try{let n=t.getProvider(Ee).getImmediate();return{logEvent:(r,i,s)=>ke(n,r,i,s),setUserProperties:(r,i)=>xe(n,r,i)}}catch(n){throw d.create("interop-component-reg-failed",{reason:n})}}}ui();import{firebaseConfig as kt}from"../js/resume-builder/firebase-config.js";import{config as di}from"./src/config.js";var Re;async function Rt(){return Re||(Re=(async()=>{if(di.gaMeasurementId!==kt.measurementId)throw Error("Analytics stream does not match the Firebase web app.");if(!await Ot())return null;Dt({gtagName:"gtag",dataLayerName:"dataLayer"});let e=Je().length?V():pe(kt);return Tt(e,{config:{send_page_view:!1}})})().catch(()=>null)),Re}async function Zi(e,t){let n=await Rt();n&&ke(n,e,t||{})}async function es(e,t={}){let n=await Rt();n&&(xt(n,e||null),xe(n,{auth_state:e?"signed_in":"signed_out",account_area:e&&t.account_area||"none"}))}export{Zi as sendEvent,es as setAnalyticsUserId};
/*! Bundled license information:

@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/logger/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/analytics/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
@firebase/analytics/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
@firebase/installations/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/analytics/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
