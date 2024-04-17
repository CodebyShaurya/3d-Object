import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js' 
import Stats from 'three/examples/jsm/libs/stats.module.js'
import {GUI} from 'dat.gui'

const scene = new THREE.Scene()
scene.background = new THREE.CubeTextureLoader().load([
  'https://sbcode.net/img/px.png', 
  'https://sbcode.net/img/nx.png', 
  'https://sbcode.net/img/py.png', 
  'https://sbcode.net/img/ny.png', 
  'https://sbcode.net/img/pz.png', 
  'https://sbcode.net/img/nz.png'])

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 4
scene.add(new THREE.GridHelper)
// const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
// scene.add(new THREE.AxesHelper(5))
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const stats = new Stats()
document.body.appendChild(stats.dom)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
// camera.position.set(0,0,0)
new OrbitControls(camera,renderer.domElement)
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const gui = new GUI()


const cube = new THREE.Mesh(geometry, material)
// cube.position.x=0.5;
// cube.position.z=-0.5
// cube.position.y=0.5
gui.addFolder("camera").add(camera.position,"z",-10,30)
const CubeControls = gui.addFolder("Cube") 
CubeControls.add(cube.rotation,"x",0 ,Math.PI*2)
CubeControls.add(cube.rotation,"z",0 ,Math.PI*2)

CubeControls.add(cube.rotation,"y",0 ,Math.PI*2)

scene.add(cube)

function animate() {
  requestAnimationFrame(animate)

  // cube.rotation.x += 0.01
  // cube.rotation.z += 1
  // cube.rotation.y += 0.01
  stats.update()

  renderer.render(scene, camera)
}

animate()