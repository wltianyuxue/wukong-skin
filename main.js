const skins=['wukong-red.gif','wukong-blue.gif','wukong-green.gif'];
let idx=0;
const img=document.getElementById('s');
/* 点击切换 */
img.addEventListener('click',()=>{idx=(idx+1)%3;img.src=skins[idx];});
/* 摇一摇切换 */
if(window.DeviceMotionEvent){
  let last=0;
  window.addEventListener('devicemotion',e=>{
    const a=e.accelerationIncludingGravity;
    const delta=Math.abs(a.x+a.y+a.z-last);
    if(delta>25){idx=(idx+1)%3;img.src=skins[idx];last=a.x+a.y+a.z;}
  });
}