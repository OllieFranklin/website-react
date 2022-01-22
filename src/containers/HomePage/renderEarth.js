import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import earthImage from '../../assets/HomePage/earth.png';
import cloudModel from '../../assets/HomePage/cloud.glb';

export default function renderEarth() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(5, 1, 25, 30);

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#earth-canvas'),
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(320, 320);
  camera.position.setZ(30);

  const earthTexture = new THREE.TextureLoader().load(earthImage);
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshBasicMaterial({
      map: earthTexture,
    }),
  );

  const gltfLoader = new GLTFLoader();

  const addCloud = (eastRot, northRot) => {
    gltfLoader.load(
      cloudModel,
      gltf => {
        const cloud = gltf.scene;

        // apply white material
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        cloud.traverse(o => {
          if (o.isMesh) o.material = material;
        });

        cloud.position.set(0, 0, 0);

        cloud.rotateY(eastRot + 0);
        cloud.rotateZ(northRot + 0.2 * Math.random());
        cloud.translateX(1.05);

        cloud.scale.set(0.11, 0.11, 0.11);

        cloud.rotateY(Math.PI / 2);
        cloud.rotateZ(Math.random() * 2 * Math.PI);

        earth.add(cloud);
      },
      undefined,
      error => console.error(error),
    );
  };

  const cloudPositions = [
    { north: 0, quantity: 4, eastOffset: 0 },
    { north: -0.4, quantity: 4, eastOffset: Math.PI / 4 },
    { north: 0.4, quantity: 4, eastOffset: Math.PI / 4 },
    { north: -1, quantity: 2, eastOffset: 0 },
    { north: 1, quantity: 2, eastOffset: 0 },
  ];

  for (const { north, quantity, eastOffset } of cloudPositions) {
    for (let i = 0; i < quantity; i++) {
      addCloud((i / quantity) * Math.PI * 2 + eastOffset, north);
    }
  }

  const group = new THREE.Group();
  group.add(earth);
  scene.add(group);

  let distance = 0;
  let velocity = 0;
  const maxVelocity = 0.02;

  const animate = () => {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.003;

    const acceleration = (Math.min(distance, 50) / 50) * 0.005;

    velocity += acceleration;
    if (acceleration === 0) {
      velocity /= 1.05;
    }

    velocity = Math.min(velocity, maxVelocity);

    group.rotation.y += velocity;

    distance = 0;

    renderer.render(scene, camera);
  };
  animate();

  let prevMouseX, prevMouseY;

  document.addEventListener('mousemove', event => {
    if (prevMouseX !== undefined && prevMouseY !== undefined) {
      const xDiff = event.clientX - prevMouseX;
      const yDiff = event.clientY - prevMouseY;

      distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }

    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
  });
}
