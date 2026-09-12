import {chromium} from 'playwright';
import {readFile,mkdir} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const exec=promisify(execFile);
const base=process.env.PORTFOLIO_BASE_URL||'http://localhost:8765';
const templates=JSON.parse(await readFile(new URL('../data/portfolio/catalog.json',import.meta.url),'utf8'));
const out=new URL('../assets/portfolio/previews/',import.meta.url);await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1200,height:900},reducedMotion:'reduce'});
const issues=[];
async function toWebp(pngPath){
  const webp=pngPath.replace(/\.png$/,'.webp');
  try{await exec('cwebp',['-q','82',pngPath,'-o',webp]);}
  catch(err){console.warn('cwebp failed for',pngPath,err.message);}
}
for(const t of templates){
 await page.setViewportSize({width:1200,height:900});await page.goto(`${base}/portfolio/demo/${t.slug}/`,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);
 const desk=new URL(`${t.slug}.png`,out).pathname;await page.screenshot({path:desk});await toWebp(desk);
 for(const width of [390,320]){await page.setViewportSize({width,height:844});const actual=await page.evaluate(()=>document.documentElement.scrollWidth);if(actual>width)issues.push({slug:t.slug,width,actual});if(width===390){const mob=new URL(`${t.slug}-mobile.png`,out).pathname;await page.screenshot({path:mob});await toWebp(mob);}}
 console.log(t.id,t.slug);
}
console.log('OVERFLOW',JSON.stringify(issues));await browser.close();
