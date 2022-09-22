import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

camera.position.z = 0.8;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load("/file/earth/scene.gltf", (gltf) => {
  scene.add(gltf.scene);

  function animate() {
    requestAnimationFrame(animate);

    gltf.scene.rotation.y += 0.001;

    renderer.render(scene, camera);
  }

  animate();
});
