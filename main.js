const skins = ['wukong-red.gif','wukong-blue.gif','wukong-green.gif'];
let idx = 0;
const img = document.getElementById('s');
const bgm = document.getElementById('bgm');

/* 公共切图 + 首次出声 */
function nextSkin() {
  idx = (idx + 1) % 3;
  // 用时间戳冲掉缓存，保证每次拿到新图
  img.src = skins[idx] + '?t=' + Date.now();
  if (bgm.muted) {          // 第一次交互再解除静音
    bgm.muted = false;
    bgm.play().catch(()=>{});
  }
}

/* 点击切换 */
img.addEventListener('click', nextSkin);

/* 摇一摇切换 */
function addShake() {
  let last = 0;
  window.addEventListener('devicemotion', e => {
    const a = e.accelerationIncludingGravity;
    const delta = Math.abs(a.x + a.y + a.z - last);
    if (delta > 20) {          // 灵敏度，可再调大
      nextSkin();
      last = a.x + a.y + a.z;
    }
  });
}

/* 权限处理 */
if (window.DeviceMotionEvent) {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    // iOS 13+ 先问权限
    DeviceMotionEvent.requestPermission()
      .then(state => { if (state === 'granted') addShake(); })
      .catch(console.error);
  } else {
    // Android / 旧 iOS 直接监听
    addShake();
  }
}

