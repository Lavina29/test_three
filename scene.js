import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(
    50, window.innerWidth / window.innerHeight, 0.1, 1000
)
camera.position.set(4, 3, 5)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

scene.add(new THREE.GridHelper(20, 20))
scene.add(new THREE.AxesHelper(3))

let moon

const loader = new GLTFLoader()
loader.load(
  '/Moon_NASA_LRO_8k_Topo_Small.glb',
  (gltf) => {
    moon = gltf.scene
    scene.add(moon)
  },
  undefined,
  (error) => console.error('Не вдалось завантажити модель:', error)
)

scene.add(new THREE.AmbientLight(0xffffff, 0.5))
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(5, 10, 7)
scene.add(light)

const controls = new OrbitControls(camera, renderer.domElement)

function animate() { 
    requestAnimationFrame(animate)
    //if(moon) moon.rotation.y += -0.01
    renderer.render(scene, camera)
    controls.update()
}
animate();