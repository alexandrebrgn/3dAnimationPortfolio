import './style.css'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio); // Pixel de l'instanciation = pixels de l'ecran
renderer.setSize(window.innerWidth, window.innerHeight); // Mettre en full-screen
camera.position.x = 50;
camera.position.y = 25;
camera.position.z = 60;
camera.rotation.y = 45/180*Math.PI;
renderer.render(scene, camera); // Render == draw

// const geometry = new THREE.PlaneGeometry( 1, 1 );
// const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
// const plane = new THREE.Mesh( geometry, material );
// scene.add( plane );
// _______________________________Models____________________________________//

const torus = new THREE.Mesh(new THREE.TorusGeometry(10, 3, 1000, 1000), new THREE.MeshStandardMaterial({color: 0xff6347}));
// scene.add(torus)

//_______________________________ LIGHTS ____________________________________//

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15, 15, 15);

const ambientLight = new THREE.AmbientLightProbe(0xffffff, 10);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper =new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff,2, 2);
directionalLight.position.set(0,1,0);
directionalLight.castShadow = false;
scene.add(directionalLight);

const light = new THREE.PointLight(0xc4c4c4, 5);
const lighthelp = new THREE.PointLightHelper(light);
light.position.set(0, 300, 500);
scene.add(light, lighthelp);

const light2 = new THREE.PointLight(0xc4c4c4, 5);
const lighthelp2 = new THREE.PointLightHelper(light2);
light.position.set(500, 100, 0);
scene.add(light2, lighthelp2);

const light3 = new THREE.PointLight(0xc4c4c4, 5);
const lighthelp3 = new THREE.PointLightHelper(light3);
light.position.set(0, 100, -500);
scene.add(light3, lighthelp3);

const light4 = new THREE.PointLight(0xc4c4c4, 5);
const lighthelp4 = new THREE.PointLightHelper(light4);
light.position.set(-500, 300, 0);
scene.add(light4, lighthelp4);

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
  const carMesh = new GLTFLoader();

  carMesh.load('model/lambo/scene.gltf', (gltf) => {
    gltf.scene.scale.set(10, 10, 10);
    scene.add(gltf.scene);
    carMesh.position.x = 10;
    carMesh.position.y = 10;
    carMesh.position.z = 10;
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

const spaceTexture = new THREE.TextureLoader().load('stars-bg.jpg');
//scene.background = spaceTexture;

Array(200).fill().forEach(addStar)
animate()
loadGLTF()