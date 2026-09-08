const $=id=>document.getElementById(id);const tool=$('tool'),input=$('input'),output=$('output'),status=$('status'),extras=$('extras');
function loadTheme(){chrome.storage.local.get(['theme'],d=>{document.documentElement.className=(d.theme||'dark')==='light'?'light':'';});}loadTheme();
$('theme').onclick=()=>{const light=document.documentElement.className==='light';const theme=light?'dark':'light';document.documentElement.className=light?'':'light';chrome.storage.local.set({theme});};
$('side').onclick=()=>chrome.windows.getCurrent(w=>chrome.sidePanel.open({windowId:w.id}).catch(()=>status.textContent='Open the side panel from the extension menu.'));
function renderExtras(){extras.innerHTML='';if(tool.value==='regex'){extras.innerHTML='<div class="extra"><input id="pattern" placeholder="Regex pattern"><input id="flags" placeholder="Flags, e.g. gi"></div>';}if(tool.value==='case'){extras.innerHTML='<div class="extra"><select id="mode"><option value="upper">UPPERCASE</option><option value="lower">lowercase</option><option value="title">Title Case</option><option value="camel">camelCase</option></select></div>';}}
tool.onchange=renderExtras;renderExtras();
const params=new URLSearchParams(location.search);if(params.get('input')){input.value=params.get('input');const t=params.get('tool');if(t&&[...tool.options].some(o=>o.value===t))tool.value=t;renderExtras();}
$('run').onclick=async()=>{status.textContent='';output.value='';try{const extra={pattern:$('pattern')?.value,flags:$('flags')?.value,mode:$('mode')?.value};output.value=await runTool(tool.value,input.value,extra);status.textContent='Done';}catch(e){output.value='';status.textContent='Error: '+e.message;}};
$('clear').onclick=()=>{input.value='';output.value='';status.textContent='';};
$('copy').onclick=async()=>{if(!output.value)return;await navigator.clipboard.writeText(output.value);status.textContent='Copied to clipboard';};
