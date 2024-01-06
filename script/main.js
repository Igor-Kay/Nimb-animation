import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/postprocessing/UnrealBloomPass.js';

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(window.devicePixelRatio || 2);

var camera = new THREE.PerspectiveCamera(10, 1, 1, 1000);
camera.position.set(0, 0, 4);

var canvas = renderer.domElement;
document.querySelector('#character').appendChild(canvas);

var composer = new EffectComposer(renderer);
var renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2, 0.4, .85);
composer.addPass(bloomPass);

const modelPath = 'assets/scene (2).gltf';

const loader = new GLTFLoader();
let model;

let mixer;

loader.load(modelPath, function (gltf) {

  model = gltf.scene;
  const scale = 0.15;
  model.scale.set(scale, scale, scale);
  base.add(model);
  mixer = new THREE.AnimationMixer(model);
  const clips = gltf.animations;
  const clip = THREE.AnimationClip.findByName(clips, 'axisAction');
  const action = mixer.clipAction(clip);
  action.play();

});

let base = new THREE.Object3D();
scene.add(base);

base.rotation.set(0.3, 0, 0);

let clock = new THREE.Clock();
let speed = 1;

renderer.setAnimationLoop(() => {

  let delta = clock.getDelta();
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    composer.setSize(canvas.clientWidth, canvas.clientHeight);
  }
  if (mixer) {
    mixer.update(delta);
  }

  composer.render(delta);
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
