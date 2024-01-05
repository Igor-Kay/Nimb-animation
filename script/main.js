import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/GLTFLoader.js';

var scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.outputEncoding = THREE.sRGBEncoding;

var camera = new THREE.PerspectiveCamera(10, 1, 1, 1000);
camera.position.set(0, 0, 3.2);

var canvas = renderer.domElement;
document.querySelector('#character').appendChild(canvas);

// var light = new THREE.PointLight(0xFFFFFF, 3, 0);
// light.position.set(0.625, 10, -0.008);
// scene.add(light);

// var light2 = new THREE.PointLight(0xFFFFFF, 3, 0);
// light2.position.set(0.625, -10, -0.008);
// scene.add(light2);

// var light3 = new THREE.PointLight(0xFFFFFF, 3, 0);
// light3.position.set(0, 0, 10);
// scene.add(light3); //

// var light4 = new THREE.PointLight(0xFFFFFF, 3, 0);
// light4.position.set(0, 0, -10);
// scene.add(light4);

// var light5 = new THREE.PointLight(0xFFFFFF, 3, 0);
// light5.position.set(-10, 0, 0);//
// scene.add(light5);

// var light6 = new THREE.PointLight(0xFFFFFF, 3, 0);
// light6.position.set(10, 0, 0); //
// scene.add(light6);

const modelPath = 'assets/scene (2).gltf';
const speed = 2;
const assetLoader = new GLTFLoader();

let mixer;


assetLoader.load(modelPath, function(gltf) {
    const model = gltf.scene;
    const scale = 0.15;
    model.scale.set(scale, scale, scale);
    model.rotation.set(0.3, 0, 0);
    scene.add(model);
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    clips.forEach(function(clip) {
        const action = mixer.clipAction(clip);
        action.play();
    });

}, undefined, function(error) {
    console.error(error);
});

const clock = new THREE.Clock();
function animate() {

    if(mixer)
        mixer.update(clock.getDelta());
    renderer.render(scene, camera);

    if (resize(renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
}


renderer.setAnimationLoop(animate);

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
