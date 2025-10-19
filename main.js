const skins = ['wukong-red.gif','wukong-blue.gif','wukong-green.gif'];
let idx = 0;
const img = document.getElementById('s');
const bgm = document.getElementById('bgm');

/* 公共切换函数 */
function nextSkin(){
  idx = (idx + 1) % 3;
  img.src = skins[idx];
}

/* 点击切换 + 首次出声 */
img.addEventListener('click',()=>{
  nextSkin();
  if(bgm.muted){          // 第一次点再解除静音
    bgm.muted = false;
    bgm.play().catch(()=>{});
  }
});

/* 摇一摇 */
if (window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
  // iOS 13+ 必须先问权限
  DeviceMotionEvent.requestPermission().then(response => {
    if (response === 'granted') addShake();
  }).catch(console.error);
} else {
  // Android / 旧 iOS 直接监听
  addShake();
}

function addShake(){
  let last = 0;
  window.addEventListener('devicemotion', e => {
    const a = e.accelerationIncludingGravity;
    const delta = Math.abs(a.x + a.y + a.z - last);
    if (delta > 25){          // 灵敏度，可再调大
      nextSkin();
      last = a.x + a.y + a.z;
    }
  });
}

