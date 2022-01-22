import KUTE from 'kute.js';

export default function renderBlob() {
  const tween = KUTE.fromTo(
    '#blob1',
    { path: '#blob1' },
    { path: '#blob2' },
    {
      repeat: 999999999,
      duration: 6000,
      yoyo: true,
      easing: 'easingQuatraticInOut',
    },
  );

  tween.start();
}
