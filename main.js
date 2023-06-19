import './style.css'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio); // Pixel de l'instanciation = pixels de l'ecran
renderer.setSize(window.innerWidth, window.innerHeight); // Mettre en full-screen
camera.position.setZ(30);
renderer.render(scene, camera); // Render == draw

// _______________________________Models____________________________________//

const torus = new THREE.Mesh(new THREE.TorusGeometry(10, 3, 1000, 1000), new THREE.MeshStandardMaterial({color: 0xff6347}));
scene.add(torus)

//_______________________________ LIGHTS ____________________________________//

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15, 15, 15);

// const directionalLight = new THREE.DirectionalLight(0xffffff,20);
// directionalLight.position.set(0,1,0);
// directionalLight.castShadow = true;
// scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper =new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper);

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

  carMesh.load('/model/f50/scene.gltf', (gltf) => {
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

// const spaceTexture = new THREE.TextureLoader().load('stars-bg.jpg');
// scene.background = spaceTexture;

Array(200).fill().forEach(addStar)
animate()
//loadGLTF()