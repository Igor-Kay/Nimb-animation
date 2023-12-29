import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/GLTFLoader.js';

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.outputEncoding = THREE.sRGBEncoding;

var camera = new THREE.PerspectiveCamera(10, 1, 1, 1000);
camera.position.set(0, 0, 3.2);
camera.rotation.set(0, 0, 0)

var canvas = renderer.domElement;
document.querySelector('#character').appendChild(canvas);

var light = new THREE.PointLight(0xFFFFFF, 4, 0);
light.position.set(-2.005, 8.483, 10.960);
scene.add(light);

var light2 = new THREE.PointLight(0xFFFFFF, 4, 0);
light2.position.set(-0.756, -5.324, 2.677);
scene.add(light2);

const modelPath = 'assets/scene (1).gltf';

const loader = new GLTFLoader();
let model;
loader.load(modelPath, function (gltf) {
  model = gltf.scene;

  const scale = 0.07;
  model.scale.set(scale, scale, scale);
  base.add(model);

  model.rotation.y = Math.PI / 4;
});

let base = new THREE.Object3D();
scene.add(base);


base.rotation.set(0.3,0,0);

let clock = new THREE.Clock();
let speed = 2; 
let amplitude = 1;

// let isMouseOverModel = false;

// document.querySelector('#character').addEventListener('mouseover', function () {
//   isMouseOverModel = true;
// });

// document.querySelector('#character').addEventListener('mouseout', function () {
//   isMouseOverModel = false;
// });

renderer.setAnimationLoop(() => {
  let delta = clock.getDelta();

  // if (isMouseOverModel) {
  //   base.rotation.y += speed * delta;
  //   base.rotation.z = Math.sin(base.rotation.y) * amplitude;
  // } else {
    // base.rotation.y += speed * delta;
    // base.rotation.y %= Math.PI * 2;
  // }


    base.rotation.y += speed * delta;
    base.rotation.y %= Math.PI * 2;

  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
});

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
