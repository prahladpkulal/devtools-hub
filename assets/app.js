const input=document.getElementById('toolSearch');
if(input && !window.DevToolsHubUX){
  input.addEventListener('keydown',event=>{
    if(event.key==='Escape'){input.value='';input.dispatchEvent(new Event('input'));input.blur();}
  });
}
