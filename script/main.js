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

var canvas = renderer.domElement;
document.querySelector('#character').appendChild(canvas);


var light = new THREE.PointLight(0xFFFFFF, 3, 0);
light.position.set(0.625, 10, -0.008);
scene.add(light);

var light2 = new THREE.PointLight(0xFFFFFF, 3, 0);
light2.position.set(0.625, -10, -0.008);
scene.add(light2);

var light3 = new THREE.PointLight(0xFFFFFF, 3, 0);
light3.position.set(0, 0, 10);
scene.add(light3);

var light4 = new THREE.PointLight(0xFFFFFF, 3, 0);
light4.position.set(0, 0, -10);
scene.add(light4);

var light5 = new THREE.PointLight(0xFFFFFF, 3, 0);
light5.position.set(-10, 0, 0);
scene.add(light5);

var light6 = new THREE.PointLight(0xFFFFFF, 3, 0);
light6.position.set(10, 0, 0);
scene.add(light6);

let light3Angle = 0;
let light4Angle = 0;
let light5Angle = 0;
let light6Angle = 0;

const modelPath = 'assets/torus.gltf';

const loader = new GLTFLoader();
let model;

loader.load(modelPath, function (gltf) {

  model = gltf.scene;

  const scale = 0.15;
  model.scale.set(scale, scale, scale);
  base.add(model);

});

let base = new THREE.Object3D();
scene.add(base);


base.rotation.set(0.3,0,0);

let clock = new THREE.Clock();
let speed = 2;

let lightRotationSpeed = 0.5;

renderer.setAnimationLoop(() => {
  let delta = clock.getDelta();

  base.rotation.y += speed * delta;
  base.rotation.y %= Math.PI * 2;

  light3Angle += lightRotationSpeed * delta;
  light4Angle += lightRotationSpeed * delta;
  light5Angle += lightRotationSpeed * delta;
  light6Angle += lightRotationSpeed * delta;

  light3.position.set(0, 10 * Math.sin(light3Angle), 10 * Math.cos(light3Angle));
  light4.position.set(0, 10 * Math.sin(light4Angle), -10 * Math.cos(light4Angle));
  light5.position.set(-10 * Math.cos(light5Angle), 0, -10 * Math.sin(light5Angle));
  light6.position.set(10 * Math.cos(light6Angle), 0, -10 * Math.sin(light6Angle));

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
