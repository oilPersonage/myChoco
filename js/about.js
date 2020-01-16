import Block from './three/block'
const about = document.querySelector('#about')

import img1 from '../img/about/1.jpg'
import img2 from '../img/about/2.jpg'
import img3 from '../img/about/3.jpg'

import vertex from './three/vertex.glsl'
import fragment from './three/fragment.glsl'

if (about) {

  const canvas = document.querySelector('#threeCanvas')
  const absoluteBox = document.querySelector('.absoluteBox')
  const width = window.innerWidth
  const height = window.innerHeight
  const heightContainer = 2048
  let speed = 0
  let time = 0
  let scrollTop = 0
  let scrollTopOld = 0
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.001, 100,
  );
  camera.position.set(0, 0, 1);

  const scene = new THREE.Scene();



  // lines

  const line = new THREE.PlaneGeometry(3.5, 0.8, 64, 64);
  const materialLine = new THREE.ShaderMaterial({
    uniforms: {
      opacity: { type: 'f', value: 0.1 },
      color: { type: 'vec3', value: new THREE.Vector3(0, 1, 0) },
      isTexture: { type: 'f', value: 0 },
      shift: { type: 'f', value: 0 },
    },
    // wireframe: true,
    transparent: true,
    blending: THREE.NormalBlending,
    side: THREE.DoubleSide,
    fragmentShader: fragment,
    vertexShader: vertex
  });
  const planeLine = new THREE.Mesh(line, materialLine);
  planeLine.position.set(0, 0, 0)
  planeLine.rotation.set(0, 0, 0.2);
  scene.add(planeLine);

  // end lines

  const loader = new THREE.TextureLoader();
  const raz = 1920 / 1280
  const textures = [
    { texture: loader.load(img1), x: -0.6, y: -0, height: 1, width: 1 / raz },
    { texture: loader.load(img2), x: 0.6, y: -2.5, height: 1 / raz, width: 1 },
    { texture: loader.load(img3), x: -0.6, y: -5, height: 1, width: 1 / raz }
  ];

  const planes = textures.map((element) => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        texture: { type: 't', value: element.texture },
        isTexture: { type: 'f', value: 1 },
        opacity: { type: 'f', value: 1 },
        shift: { type: 'f', value: 0 },
        time: { type: 'f', value: 0 },
        scale: { type: 'f', value: 0 }
      },
      transparent: true,
      // wireframe: true,
      fragmentShader: fragment,
      vertexShader: vertex
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(element.height, element.width, 64, 64), material);
    plane.position.set(element.x, element.y, 0);
    scene.add(plane);
    return plane;
  });

  const resize = () => {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  resize()

  const lerp = (v0, v1, t) => {
    return v0 * (1 - t) + v1 * t
  }

  absoluteBox.addEventListener('scroll', () => scrollTop = absoluteBox.scrollTop)

  function animate() {
    time += 0.1
    speed += 0.1 * (absoluteBox.scrollTop - speed)
    const l = lerp(planes[0].material.uniforms.shift.value, (scrollTop - scrollTopOld) / 200, 0.1)
    planes.forEach((plane, ndx) => {
      scrollTopOld = scrollTop
      plane.material.uniforms.time.value = time;
      plane.material.uniforms.shift.value = l;
      plane.material.uniforms.scale.value = l * 2;
      plane.position.y = textures[ndx].y + speed / 2048 * 5
    })
    planeLine.material.uniforms.shift.value = l;
    planeLine.position.y = -speed / 2048

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}