/**
 * Portfolio storefront + preview chrome.
 *
 * Functional flow
 * ---------------
 * Gallery (/portfolio/, /portfolio/templates/)
 *   1. Card image / "Preview Website" = native <a href="/portfolio/preview/{slug}/">
 *   2. JS never intercepts that navigation (analytics only).
 *   3. Favourite is a sibling button (outside the link) — toggles localStorage shortlist.
 *
 * Preview shell (/portfolio/preview/{slug}/)
 *   1. Page chrome (back, device, open, fullscreen, choose).
 *   2. iframe loads /portfolio/demo/{slug}/ (the real demo site).
 *   3. Fullscreen enlarges the stage; if unsupported, open demo in a new tab
 *      (never navigate away from the preview shell).
 *
 * Order dialog
 *   data-order opens WhatsApp enquire modal — separate from preview navigation.
 */
import {templates,config} from './catalog.js';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const safeRead=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
const safeWrite=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{return false;}};
const report=message=>{const status=$('#store-status');if(status)status.textContent=message;};
// This consent-neutral hook contains no personal fields and sends no network requests.
// An approved analytics adapter may listen after obtaining the site's analytics consent.
export function track(event,fields={}){
  const allowed={};
  for(const key of ['template_id','category','package','device','package_id','placement','domain_option','feature','template_category','button_id'])
    if(fields[key]!=null&&fields[key]!=='')allowed[key]=fields[key];
  document.dispatchEvent(new CustomEvent('portfolio:analytics',{detail:{event,...allowed}}));
  try{
    const map={
      portfolio_page_viewed:'portfolio_gallery_view',
      template_previewed:'portfolio_template_preview',
      template_selected:'portfolio_template_select',
      template_shortlisted:'portfolio_try_click',
      package_selected:'package_select',
      whatsapp_enquiry:'whatsapp_click',
      whatsapp_clicked:'whatsapp_click',
      order_started:'portfolio_start',
      pricing_viewed:'pricing_view',
      login_start:'login_start',
      login:'login',
      login_error:'login_error',
      logout:'logout',
      password_reset_request:'password_reset_request',
      sign_up:'sign_up'
    };
    const name=map[event]||event;
    const params={...allowed,feature:'portfolio'};
    if(fields.package&&!params.package_id)params.package_id=fields.package;
    globalThis.IPDAnalytics?.track?.(name,params);
  }catch{/* ignore */}
}
track('portfolio_page_viewed',{page_type:'portfolio'});
/* Load centralized analytics if this shell did not already. */
if(!document.querySelector('script[data-ipd-analytics]')&&!globalThis.IPDAnalytics){
  const s=document.createElement('script');
  s.type='module';
  s.src='/analytics/main.js?v=20260915prod';
  s.dataset.ipdAnalytics='1';
  document.head.appendChild(s);
}
/* Header logo always goes to the main InfoparkDaily home. */
document.querySelectorAll('.store-header .store-brand').forEach((a)=>{
  a.setAttribute('href','/');
  a.setAttribute('aria-label','Infopark Daily home');
});
const menu=$('#store-menu');
if(menu){const header=$('.store-header');header.classList.add('menu-ready');const open=value=>{header.classList.toggle('menu-open',value);menu.setAttribute('aria-expanded',String(value));};menu.addEventListener('click',()=>open(menu.getAttribute('aria-expanded')!=='true'));header.addEventListener('keydown',ev=>{if(ev.key==='Escape'){open(false);menu.focus();}});$('#store-nav').addEventListener('click',()=>open(false));document.addEventListener('click',ev=>{if(!header.contains(ev.target))open(false);});}

/* --- Favourites + gallery filters --------------------------------------- */
const favouriteKey='ipd.portfolio.favourites.v1';const rawSaved=safeRead(favouriteKey,[]);let saved=new Set(Array.isArray(rawSaved)?rawSaved.filter(slug=>templates.some(t=>t.slug===slug)):[]);
function syncSaved(){for(const button of $$('[data-favourite]')){const chosen=saved.has(button.dataset.favourite);button.setAttribute('aria-pressed',String(chosen));button.textContent=chosen?'♥':'♡';button.setAttribute('aria-label',`${chosen?'Remove':'Save'} ${templates.find(t=>t.slug===button.dataset.favourite)?.name} ${chosen?'from':'to'} favourites`);}}
function toggleFavourite(slug){
  if(!slug||!templates.some(t=>t.slug===slug))return;
  saved.has(slug)?saved.delete(slug):saved.add(slug);
  const persisted=safeWrite(favouriteKey,[...saved]);
  syncSaved();
  applyFilters(false);
  report(persisted?'Shortlist updated on this device.':'Shortlist updated for this visit. Browser storage is unavailable.');
  track('template_shortlisted',{template_id:templates.find(t=>t.slug===slug)?.id});
}
syncSaved();
const controls=$('#gallery-controls'),grid=$('#template-grid');const stateKey='ipd.portfolio.gallery.v1';
function getState(){if(!controls)return {};return {q:controls.elements.q.value,category:controls.elements.category.value,style:controls.elements.style.value,sort:controls.elements.sort.value,saved:controls.elements.saved.checked};}
function restore(){if(!controls)return;const params=new URLSearchParams(location.search);const state=params.size?Object.fromEntries(params):safeRead(stateKey,{});for(const key of ['q','category','style','sort'])if(typeof state[key]==='string')controls.elements[key].value=state[key];controls.elements.sort.value ||= 'featured';controls.elements.saved.checked=state.saved===true||state.saved==='true';applyFilters(false);}
function applyFilters(update=true){if(!controls)return;const state=getState();const q=state.q.trim().toLowerCase();let list=templates.filter(t=>(!state.category||t.category===state.category)&&(!state.style||t.styleTags.includes(state.style))&&(!state.saved||saved.has(t.slug))&&(!q||[t.name,t.profession,t.description,...t.supportedSections,...t.skills].join(' ').toLowerCase().includes(q)));list.sort(state.sort==='az'?(a,b)=>a.name.localeCompare(b.name):state.sort==='newest'?(a,b)=>b.id.localeCompare(a.id):(a,b)=>Number(b.featured)-Number(a.featured)||a.id.localeCompare(b.id));const slugs=new Set(list.map(t=>t.slug));$$('.template-card',grid).forEach(card=>card.hidden=!slugs.has(card.dataset.slug));list.forEach(t=>grid.append($(`[data-slug="${t.slug}"]`,grid)));$('#result-count').textContent=`${list.length} ${list.length===1?'template':'templates'}`;$('#empty-state').hidden=!!list.length;if(update){safeWrite(stateKey,state);const query=new URLSearchParams();for(const [key,value] of Object.entries(state))if(value&&!(key==='sort'&&value==='featured'))query.set(key,String(value));history.replaceState(null,'',location.pathname+(query.size?'?'+query:'')+location.hash);}}
if(controls){controls.addEventListener('submit',e=>e.preventDefault());controls.addEventListener('input',()=>applyFilters());controls.elements.category.addEventListener('change',()=>track('category_selected',{category:controls.elements.category.value}));const reset=()=>{controls.reset();applyFilters();};controls.addEventListener('reset',()=>setTimeout(()=>applyFilters(),0));$$('[data-reset]').forEach(b=>b.addEventListener('click',reset));restore();window.addEventListener('popstate',restore);}

/* Delegated gallery actions — survives filter DOM reordering. */
document.addEventListener('click',(ev)=>{
  const fav=ev.target.closest('[data-favourite]');
  if(fav){
    ev.preventDefault();
    ev.stopPropagation();
    toggleFavourite(fav.dataset.favourite);
    return;
  }
  const previewLink=ev.target.closest('a[href^="/portfolio/preview/"]');
  if(previewLink){
    const href=previewLink.getAttribute('href');
    const t=templates.find(t=>t.previewPath===href);
    track('template_preview_opened',{template_id:t?.id});
    /* Native navigation continues — do not preventDefault. */
  }
});

$$('[data-back-gallery]').forEach(a=>{const state=safeRead(stateKey,{});const params=new URLSearchParams();for(const [key,val] of Object.entries(state))if(val&&!(key==='sort'&&val==='featured'))params.set(key,String(val));a.href='/portfolio/templates/'+(params.size?'?'+params:'');});

/* --- Order / enquire dialog --------------------------------------------- */
const dialog=$('#order-dialog'),form=$('#order-form');let selected=null,lastFocus=null;
function selectedPackage(){
  if(!form)return null;
  return config.packages.find(p=>p.id===form.elements.package.value)||null;
}
function packagePriceLabel(p){
  if(!p)return '';
  return p.priceLabel||(p.price!=null?`₹${p.price.toLocaleString('en-IN')}`:'Custom quote');
}
function selectedExtraPages(){
  if(!form)return [];
  return [...form.querySelectorAll('input[name="extra"]:checked')].map(el=>{
    const opt=config.extraPageOptions?.find(o=>o.id===el.value);
    return opt?.label||el.value;
  });
}
function syncOrderForm(){
  if(!form)return;
  const pack=selectedPackage();
  const submit=$('#order-submit');
  const note=$('#order-submit-note');
  const includesDomain=pack?.includesDomain;
  if(includesDomain&&form.elements.existing){
    form.elements.existing.checked=false;
    form.elements.existing.disabled=true;
  }else if(form.elements.existing){
    form.elements.existing.disabled=false;
  }
  const showDomain=includesDomain||form.elements.existing?.checked;
  const domainField=$('#domain-field');
  if(domainField)domainField.hidden=!showDomain;
  if(submit&&pack){
    if(pack.cta==='enitexa'){
      submit.textContent='Contact Enitexa.ai ↗';
      submit.type='button';
      submit.dataset.action='enitexa';
    }else{
      submit.textContent=`Continue on WhatsApp — ${pack.name} ↗`;
      submit.type='submit';
      delete submit.dataset.action;
    }
  }
  if(note){
    note.textContent=pack?.cta==='enitexa'
      ? 'This plan is scoped and quoted by Enitexa.ai — domain, hosting, business email and custom integrations.'
      : 'WhatsApp opens with your chosen subscription pre-filled. You send the message yourself. No payment is taken here.';
  }
}
function openOrder(slug,pack){
  if(!dialog||!form)return;
  selected=templates.find(t=>t.slug===slug)||null;
  lastFocus=document.activeElement;
  form.reset();
  if(pack&&config.packages.some(p=>p.id===pack))form.elements.package.value=pack;
  const target=$('#selected-template');
  target.replaceChildren();
  if(selected){
    const img=new Image();
    img.src=selected.thumbnail;
    img.alt=selected.name+' demo';
    const span=document.createElement('span');
    span.textContent=`${selected.name} · ${selected.id} · v${selected.version}`;
    target.append(img,span);
  }else{
    target.textContent='Need a hand choosing? We can help you find your design.';
  }
  syncOrderForm();
  dialog.showModal();
  track('package_selected',{template_id:selected?.id,package:form.elements.package.value,package_id:form.elements.package.value});
  track('order_started',{template_id:selected?.id,package_id:form.elements.package.value});
}
document.addEventListener('click',(ev)=>{
  const order=ev.target.closest('[data-order]');
  if(order){openOrder(order.dataset.order,order.dataset.package);return;}
  const enquire=ev.target.closest('[data-general-enquiry]');
  if(enquire){
    track('whatsapp_clicked');
    const plans=config.packages.filter(p=>p.cta!=='enitexa').map(p=>`${p.name} (${packagePriceLabel(p)})`).join(', ');
    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Hi InfoparkDaily! I’m interested in a portfolio website.\n\nPlease help me choose a plan. Current options: ${plans}.\n\nI’d like to understand scope, domain eligibility, extra pages, shop sections, hosting, renewals, taxes, and delivery.`)}`,'_blank','noopener,noreferrer');
  }
  const enitexaBtn=ev.target.closest('#order-submit[data-action="enitexa"]');
  if(enitexaBtn){
    ev.preventDefault();
    const pack=selectedPackage();
    track('enitexa_clicked',{package:pack?.id});
    window.open(config.enitexaContact||'/software-solutions/#contact','_blank','noopener,noreferrer');
  }
});
if(dialog){
  $('.close-dialog',dialog).addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',ev=>{if(ev.target===dialog){const r=dialog.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>lastFocus?.focus());
  form.addEventListener('change',ev=>{
    if(['package','existing'].includes(ev.target.name)||ev.target.name==='extra'){
      syncOrderForm();
      if(ev.target.name==='package')track('package_selected',{template_id:selected?.id,package:form.elements.package.value});
    }
  });
  form.addEventListener('submit',ev=>{
    ev.preventDefault();
    const pack=selectedPackage();
    if(!pack)return;
    if(pack.cta==='enitexa'){
      window.open(config.enitexaContact||'/software-solutions/#contact','_blank','noopener,noreferrer');
      track('enitexa_clicked',{package:pack.id});
      return;
    }
    const name=form.elements.name.value.trim();
    const domain=form.elements.domain.value.trim();
    const notes=form.elements.notes?.value.trim()||'';
    const extras=selectedExtraPages();
    const rows=[
      'Hi InfoparkDaily! I’d like to enquire about a portfolio website.',
      '',
      `Selected subscription: ${pack.name}`,
      `Plan ID: ${pack.id}`,
      `Listed price: ${packagePriceLabel(pack)}`,
      selected?`Template: ${selected.name}`:'Template: Please help me choose',
      selected?`Template ID: ${selected.id}`:'',
      selected?`Template version: ${selected.version}`:'',
      extras.length?`Extra pages requested: ${extras.join(', ')}`:'',
      !$('#domain-field').hidden&&domain?`${form.elements.existing.checked?'Existing':'Preferred'} domain: ${domain}`:'',
      name?`Name: ${name}`:'',
      notes?`Notes: ${notes}`:'',
      selected?`Preview: ${config.site}${selected.previewPath}`:'',
      '',
      'Please confirm domain eligibility, package inclusions, hosting and renewal charges, taxes, revisions, payment details, cancellation terms, and delivery timeline.',
    ];
    const url=`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(rows.filter(Boolean).join('\n'))}`;
    track('whatsapp_clicked',{template_id:selected?.id,package:pack.id});
    window.open(url,'_blank','noopener,noreferrer');
  });
}

/* --- Preview shell chrome ----------------------------------------------- */
$$('[data-device]').forEach(button=>button.addEventListener('click',()=>{const device=button.dataset.device;$('#preview-site').style.width=device==='desktop'?'100%':device==='tablet'?'768px':'390px';$$('[data-device]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));track('preview_device_selected',{device});}));
const fullPreview=$('.preview-fullscreen');
if(fullPreview){
  const stage=$('.preview-stage'),frame=$('#preview-site');
  const openDemoTab=()=>{
    const src=frame?.getAttribute('src')||'';
    if(!src)return;
    window.open(src,'_blank','noopener,noreferrer');
    report('Opened the full website in a new tab.');
  };
  fullPreview.addEventListener('click',async()=>{
    if(!stage||!stage.requestFullscreen){openDemoTab();return;}
    try{await stage.requestFullscreen();}
    catch{openDemoTab();}
  });
  /* If the iframe fails to load, keep chrome usable and surface a clear action. */
  frame?.addEventListener('error',()=>{
    report('Preview could not load. Use Open website to view the demo.');
  });
}
$$('[data-personalise]').forEach(button=>button.addEventListener('click',()=>{const mode=button.dataset.personalise;$('#personalise-frame').src='/portfolio/demo/flutter-studio/'+(mode==='alternate'?'?personalise=alternate':'');$$('[data-personalise]').forEach(b=>{b.setAttribute('aria-pressed',String(b===button));b.classList.toggle('active',b===button);});}));

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nextParam=new URLSearchParams(location.search).get('next')||'';
function safeNext(){
  if(!nextParam.startsWith('/portfolio/'))return '/portfolio/';
  if(nextParam.includes('//')||nextParam.includes('\\')||nextParam.includes('://')||nextParam.includes('..'))return '/portfolio/';
  return nextParam;
}
function signInHref(){
  const next=encodeURIComponent(location.pathname+location.search);
  return `/portfolio/sign-in/?next=${next}`;
}
let authMode='login';
let cloudRequest=null;
async function loadCloud(){
  if(cloudRequest)return cloudRequest;
  const mod=await import('/js/resume-builder/cloud.bundle.js?v=20260910e');
  cloudRequest=mod.request;
  return cloudRequest;
}
async function currentUser(){
  try{
    return await (await loadCloud())('/me');
  }catch(error){
    if(error.status===401)return null;
    return null;
  }
}
function paintAccount(me){
  const nav=$('#account-nav');
  if(!nav)return;
  if(location.pathname.includes('/portfolio/sign-in')){
    nav.replaceChildren();
    return;
  }
  nav.innerHTML=me
    ?`<a class="store-signin" href="/resume-builder/account/">${esc((me.name||'Account').split(' ')[0])}</a><button type="button" class="store-signin" data-auth="signout" style="margin-left:.35rem">Log out</button>`
    :`<a class="store-signin" href="${signInHref()}">Sign in</a>`;
}
function renderAuth(me){
  const root=$('#auth-app');
  if(!root)return;
  if(me){
    root.innerHTML=`<div class="auth-shell"><aside class="auth-story"><p class="eyebrow">Same InfoparkDaily account</p><h2>You’re already <em>signed in.</em></h2><p class="auth-story-lead">Use this account for resumes, ATS checks, and portfolio enquiries.</p></aside><section class="auth-card"><p class="eyebrow">Signed in</p><h1>Welcome back.</h1><p class="auth-lead">Continue as <strong>${esc(me.name)}</strong><br>${esc(me.email)}</p><a class="button" href="${esc(safeNext())}">Continue</a><button class="auth-switch" type="button" data-auth="signout">Use a different account</button></section></div>`;
    return;
  }
  const signup=authMode==='signup';
  root.innerHTML=`<div class="auth-shell"><aside class="auth-story"><p class="eyebrow">One account. Your next chapter.</p><h2>The same login you use for <em>resumes.</em></h2><p class="auth-story-lead">Google or email. Favourites and enquiries stay with your InfoparkDaily account.</p><ul class="auth-benefits"><li>One sign-in for Career Tools</li><li>Save templates you like</li><li>Come back to your enquiry</li></ul><p class="auth-story-bottom">InfoparkDaily Portfolios</p></aside><section class="auth-card"><p class="eyebrow">${signup?'Create your workspace':'Welcome back'}</p><h1>${signup?'Make this yours.':'Sign in.'}</h1><p class="auth-lead">${signup?'Create the same InfoparkDaily account used for Resume Builder.':'Use Google or the email and password from Resume Builder.'}</p><div class="auth-mode-tabs" role="group" aria-label="Account access"><button type="button" data-auth="mode" data-mode="login" class="${signup?'':'active'}" aria-pressed="${!signup}">Sign in</button><button type="button" data-auth="mode" data-mode="signup" class="${signup?'active':''}" aria-pressed="${signup}">Create account</button></div><div id="auth-error" hidden></div><button type="button" class="button auth-google" data-auth="google"><span class="auth-google-mark" aria-hidden="true">G</span>Continue with Google</button><p class="auth-or">or continue with email</p><form id="auth-form">${signup?'<div class="field"><label for="auth-name">Name</label><input id="auth-name" name="name" autocomplete="name" required maxlength="100"></div>':''}<div class="field"><label for="auth-email">Email</label><input id="auth-email" name="email" type="email" autocomplete="email" required maxlength="254"></div><div class="field"><label for="auth-password">Password</label><div class="password-field"><input id="auth-password" name="password" type="password" autocomplete="${signup?'new-password':'current-password'}" required minlength="10" maxlength="128"><button type="button" data-auth="password">Show</button></div></div>${signup?'<div class="field"><label for="auth-confirm">Confirm password</label><input id="auth-confirm" name="confirmPassword" type="password" autocomplete="new-password" required minlength="10" maxlength="128"></div>':''}<div class="auth-form-options">${signup?'<label class="check-label"><input type="checkbox" name="agree" value="yes" required><span>I agree to the <a href="/terms/#career-tools">Terms</a> and <a href="/privacy/#career-tools">Privacy Policy</a>.</span></label>':'<label class="check-label"><input type="checkbox" name="remember" value="yes">Remember me</label><button type="button" class="auth-help-link" data-auth="help">Need help?</button>'}</div><button class="button" type="submit">${signup?'Create account':'Sign in'}</button></form><p class="auth-note">By continuing, you agree to our <a href="/terms/#career-tools">Terms</a> and <a href="/privacy/">Privacy Policy</a>.</p><div class="auth-bottom-links"><a href="/portfolio/templates/">Browse templates</a><a href="/resume-builder/sign-in/">Resume Builder sign in</a></div><div id="auth-help" hidden class="auth-help-box"><h2>Reset your password</h2><p class="auth-lead">We’ll send a reset link if this email has an InfoparkDaily account.</p><form id="reset-form"><div class="field"><label for="reset-email">Email</label><input id="reset-email" name="email" type="email" required maxlength="254"></div><button class="button" type="submit">Send reset email</button></form></div></section></div>`;
}
function showAuthError(message){
  const box=$('#auth-error');
  if(!box)return;
  box.hidden=false;
  box.className='auth-error';
  box.textContent=message;
}
async function bootAccount(){
  const me=await currentUser();
  paintAccount(me);
  if($('#auth-app'))renderAuth(me);
}
const authRoot=$('#auth-app');
if(authRoot||$('#account-nav')){
  bootAccount();
  document.addEventListener('click',async ev=>{
    const el=ev.target.closest('[data-auth]');
    if(!el)return;
    const action=el.dataset.auth;
    try{
      if(action==='mode'){authMode=el.dataset.mode;renderAuth(null);}
      if(action==='password'){
        const input=$('#auth-password');
        const show=input.type==='password';
        input.type=show?'text':'password';
        el.textContent=show?'Hide':'Show';
      }
      if(action==='help'){$('#auth-help').hidden=!$('#auth-help').hidden;}
      if(action==='google'){
        track('login_start',{feature:'portfolio',placement:'google'});
        try{
          await (await loadCloud())('/auth/google',{method:'POST',body:{remember:true}});
          track('login',{feature:'portfolio'});
        }catch(error){
          track('login_error',{feature:'portfolio'});
          throw error;
        }
        location.assign(safeNext());
      }
      if(action==='signout'){
        try{
          await (await loadCloud())('/auth/logout',{method:'POST'});
          track('logout',{feature:'portfolio'});
          globalThis.IPDAnalytics?.clearUserId?.();
          paintAccount(null);
          renderAuth(null);
          if(!$('#auth-app'))location.assign('/portfolio/');
        }catch(error){showAuthError(error.message||'Sign-out failed. Please try again.');}
      }
    }catch(error){showAuthError(error.message);}
  });
  document.addEventListener('submit',async ev=>{
    if(!['auth-form','reset-form'].includes(ev.target.id))return;
    ev.preventDefault();
    const fields=Object.fromEntries(new FormData(ev.target));
    const submit=ev.target.querySelector('[type=submit]');
    submit.disabled=true;
    try{
      const request=await loadCloud();
      if(ev.target.id==='reset-form'){
        await request('/auth/reset',{method:'POST',body:{email:fields.email}});
        showAuthError('If an account exists for that email, a reset link is on its way.');
        return;
      }
      if(authMode==='signup'&&fields.password!==fields.confirmPassword)throw Error('Your passwords do not match.');
      await request('/auth/'+authMode,{method:'POST',body:{...fields,remember:fields.remember==='yes'}});
      location.assign(safeNext());
    }catch(error){showAuthError(error.message);}
    finally{submit.disabled=false;}
  });
}
