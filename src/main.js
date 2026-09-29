import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import './style.css';
import * as THREE from 'three';

const W = 3, H = 4.243, D = 0.03; // A4 ratio
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene'), antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
camera.position.z = 9;
const group = new THREE.Group();
scene.add(group);

function paperTexture() {
  const w = 1024, h = 1448, c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = '#fff'; g.fillRect(0, 0, w, h);
  g.fillStyle = '#000';
  g.font = '700 60px "JetBrains Mono", monospace'; g.fillText('ASTRAFORM', 80, 150);
  g.font = '400 24px "JetBrains Mono", monospace'; g.fillText('FORM No. 0001 / APPLICATION', 80, 200);
  g.fillRect(80, 232, w - 160, 5);
  ['FULL NAME', 'DATE OF BIRTH', 'ADDRESS', 'ID NUMBER', 'SIGNATURE'].forEach((label, i) => {
    const y = 320 + i * 190;
    g.font = '400 22px "JetBrains Mono", monospace';
    g.fillText(`${String(i + 1).padStart(2, '0')}  ${label}`, 80, y);
    g.lineWidth = 3; g.strokeRect(80, y + 22, w - 160, 92);
    g.fillRect(104, y + 62, 160 + ((i * 173) % 420), 12); // "filled" value
  });
  g.font = '400 20px "JetBrains Mono", monospace'; g.fillText('PAGE 1 / 1', 80, h - 70);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
}

async function init() {
  await Promise.all([document.fonts.load('700 60px "JetBrains Mono"'), document.fonts.load('400 24px "JetBrains Mono"')]);

  const geo = new THREE.BoxGeometry(W, H, D);
  const edge = new THREE.MeshBasicMaterial({ color: 0xdddddd });
  const paper = new THREE.Mesh(geo, [edge, edge, edge, edge,
    new THREE.MeshBasicMaterial({ map: paperTexture() }), new THREE.MeshBasicMaterial({ color: 0xf2f2f2 })]);
  group.add(paper);

  // wireframe pages stacked behind
  const pages = [];
  for (let i = 1; i <= 4; i++) {
    const p = new THREE.Group();
    p.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x000000 })));
    p.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 - i * 0.11 })));
    p.position.z = -i * 0.32;
    group.add(p); pages.push(p);
  }

  // scan line + trailing band
  const scan = new THREE.Group();
  scan.add(new THREE.Mesh(new THREE.PlaneGeometry(W + 0.3, 0.014), new THREE.MeshBasicMaterial({ color: 0x000000 })));
  const band = new THREE.Mesh(new THREE.PlaneGeometry(W, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.07 }));
  band.position.y = -0.25; scan.add(band);
  scan.position.z = D / 2 + 0.005;
  group.add(scan);

  let base = 1;
  const resize = () => {
    const w = innerWidth, h = innerHeight, wide = w / h > 1.1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    base = wide ? 1 : 0.7;
    group.position.set(wide ? 2.3 : 0, wide ? 0 : 0.9, 0);
  };
  addEventListener('resize', resize); resize();

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / innerWidth - 0.5) * 2;
    mouse.ty = (e.clientY / innerHeight - 0.5) * 2;
  });

  const clock = new THREE.Clock();
  const speed = reduced ? 0.15 : 1;
  renderer.setAnimationLoop(() => {
    const t = clock.getElapsedTime() * speed;
    const intro = Math.min(clock.getElapsedTime() / 1.8, 1), e = 1 - Math.pow(1 - intro, 4);
    mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;

    group.scale.setScalar(base * (0.6 + 0.4 * e));
    group.rotation.y = (1 - e) * -Math.PI + Math.sin(t * 0.5) * 0.45 + mouse.x * 0.3;
    group.rotation.x = -0.12 + Math.cos(t * 0.4) * 0.05 + mouse.y * 0.15;
    group.children[0].position.y = Math.sin(t * 0.9) * 0.08;
    pages.forEach((p, i) => { p.rotation.z = Math.sin(t * 0.6 + i) * 0.03 * (i + 1); p.position.y = Math.sin(t * 0.9 - i * 0.3) * 0.08; });
    scan.position.y = H / 2 - ((t * 0.35) % 1) * H;
    renderer.render(scene, camera);
  });
}
init();
