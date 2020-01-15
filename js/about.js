import Block from './three/block'
const about = document.querySelector('#about')

if (about) {

  const canvas = document.querySelector('#threeCanvas')
  const absoluteBox = document.querySelector('.absoluteBox')
  const width = window.innerWidth
  const height = window.innerHeight
  let speed = 0

  // const blocks = [
  //   { x: 1, y: 10, height: 1, width: 1, factor: 0.7, color: 'rgb(50, 105, 10)' },
  //   { x: 3, y: 3, height: 1, width: 1, factor: 0.5, color: 'rgb(105, 50, 0)' },
  //   { x: 5, y: 5, height: 1, width: 1, factor: 0.3, color: 'rgb(10, 50, 105)' },
  // ]

  // const arrBlock = blocks.map(block => Block({ ...block }))
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  const camera = new THREE.OrthographicCamera(1, width, 1, height, -1, 1);

  camera.zoom = 1;

  const scene = new THREE.Scene();
  // arrBlock.forEach(el => {
  //   console.log(el.position)
  //   scene.add(el)
  // })
  // var axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper);

  const loader = new THREE.TextureLoader();
  const textures = [
    { texture: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg'), x: 1, y: 1 },
    { texture: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg'), x: 200, y: 200 },
    { texture: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg'), x: 500, y: 400 }
  ];
  const planeSize = 256;
  const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
  const planes = textures.map((element) => {
    const planePivot = new THREE.Object3D();
    scene.add(planePivot);
    element.texture.magFilter = THREE.NearestFilter;
    const planeMat = new THREE.MeshBasicMaterial({
      map: element.texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    planePivot.add(mesh);
    // move plane so top left corner is origin
    mesh.position.set(planeSize / 2 + element.x, planeSize / 2 + element.y, 0);
    return planePivot;
  });

  const resize = () => {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  resize()

  const onScroll = (e) => {
    // if ((time * 0.1) % 10 === 0) pageXOld = absoluteBox.scrollTop
  }

  absoluteBox.addEventListener('scroll', (e) => onScroll(e))
  function animate(time) {
    time *= 0.001
    speed += 0.05 * (absoluteBox.scrollTop - speed)
    planes.forEach((plane, ndx) => {
      plane.position.y = 1 + (speed * ndx)
    })

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}