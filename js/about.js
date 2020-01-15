import Block from './three/block'
const about = document.querySelector('#about')

import img1 from '../img/about/1.jpg'
import img2 from '../img/about/2.jpg'
import img3 from '../img/about/3.jpg'

if (about) {

  const canvas = document.querySelector('#threeCanvas')
  const absoluteBox = document.querySelector('.absoluteBox')
  const width = window.innerWidth
  const height = window.innerHeight
  const heightContainer = 2048
  let speed = 0
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  const camera = new THREE.OrthographicCamera(1, width, 1, height, -1, 1);

  camera.zoom = 1;

  const scene = new THREE.Scene();



  // lines

  const line = new THREE.PlaneGeometry(width * 1.5, height / 2, 0 );
  const materialLine = new THREE.MeshBasicMaterial( {color: 'rgb(30, 10, 30)', side: THREE.DoubleSide} );
  const planeLine = new THREE.Mesh( line, materialLine );
  planeLine.position.set(width / 2, 400, 0)
  planeLine.rotation.set(0, 0, -0.5);
  console.log(planeLine)
  scene.add( planeLine );

  const loader = new THREE.TextureLoader();
  const raz =  1920 / 1280
  const widthTexture = width / 3
  const heightTexture = height / 3 * raz
  const textures = [
    { texture: loader.load(img1), x: width * 0.2, y: heightContainer * 0.17, height: heightTexture, width: widthTexture },
    { texture: loader.load(img2), x: width * 0.7, y: heightContainer * 0.7, width: heightTexture, height:  widthTexture},
    { texture: loader.load(img3), x: width * 0.2, y: heightContainer * 1.17, height: heightTexture , width: widthTexture }
  ];
  const planeSize = 256;
  const planes = textures.map((element) => {
    const planeGeo = new THREE.PlaneBufferGeometry(element.width, element.height);
    const planePivot = new THREE.Object3D();
    scene.add(planePivot);
    element.texture.wrapS = THREE.RepeatWrapping;
    element.texture.wrapT = THREE.RepeatWrapping;
    element.texture.repeat.y = - 1;
    const planeMat = new THREE.MeshBasicMaterial({
      map: element.texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    planePivot.add(mesh);
    mesh.position.set(planeSize / 2 + element.x, planeSize / 2 + element.y, 0);
    return planePivot;
  });

  const resize = () => {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  resize()
  function animate(time) {
    time *= 0.001
    speed += 0.05 * (absoluteBox.scrollTop - speed)
    planes.forEach((plane, ndx) => {
      plane.position.y = 1 - speed
    })

    planeLine.position.y =  speed

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}