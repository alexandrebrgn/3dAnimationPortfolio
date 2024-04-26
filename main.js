import './style.css'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio); // Pixel de l'instanciation = pixels de l'ecran
renderer.setSize(window.innerWidth, window.innerHeight); // Mettre en full-screen
camera.position.x = -150;
camera.position.y = 20;
camera.position.z = 80;
renderer.render(scene, camera); // Render == draw

// const geometry = new THREE.PlaneGeometry( 1, 1 );
// const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
// const plane = new THREE.Mesh( geometry, material );
// scene.add( plane );
// _______________________________Models____________________________________//

const torus = new THREE.Mesh(new THREE.TorusGeometry(10, 3, 1000, 1000), new THREE.MeshStandardMaterial({color: 0xff6347}));
// scene.add(torus)

//_______________________________ LIGHTS ____________________________________//

const ambientLight = new THREE.AmbientLightProbe(0xffffff, .5);
scene.add(ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper =new THREE.GridHelper(200, 50)
scene.add(gridHelper);
// scene.add(lightHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 10, 5);
directionalLight.target.position.set(0, 0, 0);

// scene.add(directionalLight);
// scene.add(directionalLight.target);

const width = 8;
const height = 25;

const bigLight = new THREE.RectAreaLight(0xFFFFFF, 200, 10, 200);
const huracanLight = new THREE.RectAreaLight(0xFFFFFF, 20, width, height);
const huracanEvoLight = new THREE.RectAreaLight(0xFFFFFF, 20, width, height);
const f40Light = new THREE.RectAreaLight(0xFFFFFF, 20, width, height);
const lightHelper = new RectAreaLightHelper(huracanLight);
const lightHelper2 = new RectAreaLightHelper(huracanEvoLight);
const lightHelper3 = new RectAreaLightHelper(f40Light);
const lightHelper4 = new RectAreaLightHelper(bigLight);

bigLight.position.set(0, 20, 20);
bigLight.rotateZ(1.55);
bigLight.rotateY(0.75);
bigLight.lookAt(0, 0, 0);
bigLight.add(lightHelper4);

lightHelper.rotateOnAxis(1.5)
huracanLight.position.set(-30, 50, 0);
huracanLight.lookAt(-30, 0, 0);
huracanLight.add(lightHelper);

lightHelper2.rotateOnAxis(1.5)
huracanEvoLight.position.set(-60, 50, 0);
huracanEvoLight.lookAt(-60, 0, 0);
huracanEvoLight.add(lightHelper2);

lightHelper3.rotateOnAxis(1.5)
f40Light.position.set(60, 20, 0);
f40Light.lookAt(60, 0, 0);
f40Light.add(lightHelper3);

scene.add(huracanLight)
scene.add(huracanEvoLight)
scene.add(f40Light)
// scene.add(bigLight)

const controls = new OrbitControls(camera, renderer.domElement);

// _______________________________FUNCTIONS ______________________________//

function animate() { // Function to animate torus
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.0005;
  torus.rotation.z += 0.01; 

  controls.update();
  renderer.render(scene, camera);
}

function loadGLTF() { // Function to load gltf file of car
  const aventador = new GLTFLoader();
  const sestoElemento = new GLTFLoader();
  const huracan = new GLTFLoader();
  const huracanevo2 = new GLTFLoader();
  const f40 = new GLTFLoader();

  aventador.load('./model/lambo/scene.gltf', (gltf) => {
    gltf.scene.scale.set(10, 10, 10);
    scene.add(gltf.scene);
    renderer.render(scene, camera);
  })

  sestoElemento.load('./model/free_lamborghini_sesto_elemento/scene.gltf', (gltf) => {
    gltf.scene.scale.set(21, 21, 21);
    gltf.scene.position.set(30, 0, 0);
    gltf.scene.rotateY(1.55)
    scene.add(gltf.scene);
    renderer.render(scene, camera);
  })

  huracanevo2.load('./model/huracantrofeoevo2/scene.gltf', (gltf) => {
    gltf.scene.scale.set(10, 10, 10);
    gltf.scene.position.set(-60, 0, 0);
    scene.add(gltf.scene);
    renderer.render(scene, camera);
  })

  huracan.load('./model/huracan/scene.gltf', (gltf) => {
    gltf.scene.scale.set(7, 7, 7);
    gltf.scene.position.set(-30, 0, 0);
    scene.add(gltf.scene);
    renderer.render(scene, camera);
  })

  f40.load('./model/f40/scene.gltf', (gltf) => {
    gltf.scene.scale.set(10, 10, 10);
    gltf.scene.position.set(60, 0, 0);
    scene.add(gltf.scene);
    renderer.render(scene, camera);
  })
}


function addStar() { // Function to add stars
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star)
}

// const spaceTexture = new THREE.TextureLoader().load('stars-bg.jpg');
// scene.background = spaceTexture;

renderer.physicallyCorrectLights = true;
console.log('maj du /public')
Array(200).fill().forEach(addStar)
animate()
loadGLTF()