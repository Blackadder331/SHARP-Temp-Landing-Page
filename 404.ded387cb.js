document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(".cursor-big-circle"),t=e.querySelector(".circle"),o=e.querySelector(".circle-dot");if("ontouchstart"in window||navigator.maxTouchPoints)e.style.display="none";else{e.style.opacity="0",e.style.visibility="hidden";let i=(e,t)=>{Object.assign(e.style,t)},n=CSS.supports("backdrop-filter","blur(1px)");i(t,{boxSizing:"border-box",position:"fixed",zIndex:"2147483647",width:"40px",height:"40px",backgroundColor:n?"rgba(255, 255, 255, .01)":"#ffffff",borderRadius:"50%",transition:"transform 100ms ease-out, width 500ms, height 500ms",userSelect:"none",pointerEvents:"none",backdropFilter:n?"invert(0.85) grayscale(1)":"none",mixBlendMode:n?"normal":"exclusion"}),i(o,{boxSizing:"border-box",position:"fixed",zIndex:"2147483648",width:"6px",height:"6px",backgroundColor:n?"#eeeeee":"none",borderRadius:"50%",userSelect:"none",pointerEvents:"none",transition:"transform 100ms ease-out"});let r=!1,s=()=>{r||(e.style.opacity="1",e.style.visibility="visible",r=!0)},l=0,a=0,d=0,c=0,u=()=>{let e=l-t.offsetWidth/2,i=a-t.offsetHeight/2;t.style.transform=`translate(${e}px, ${i}px)`,d+=(l-d)*.2,c+=(a-c)*.2;let n=d-o.offsetWidth/2,r=c-o.offsetHeight/2;o.style.transform=`translate(${n}px, ${r}px)`,requestAnimationFrame(u)};document.onmousemove=e=>{l=e.clientX,a=e.clientY,r||s()},document.querySelectorAll("a, svg, [onclick], .cursor-hover").forEach(e=>{e.addEventListener("mouseenter",()=>{t.style.width="120px",t.style.height="120px"}),e.addEventListener("mouseleave",()=>{t.style.width="40px",t.style.height="40px"})}),document.onclick=()=>{t.style.transform+=" scale(0.75)",setTimeout(()=>{t.style.transform=t.style.transform.replace(" scale(0.75)","")},35)},requestAnimationFrame(u)}});