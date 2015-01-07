function Midnight() {
  var scene, renderer, camera, controls, container;
  var water, mirrorMesh, waterNormals;
  var canvasHeight;
  var oceanSize = 20000;
  var timeInc = 1 / 60;
  var scrollOffset;

  var ffGroup;

  init()
  animate()

  function init() {

    canvasHeight = window.innerHeight;

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / canvasHeight, 1, 20000);
    camera.position.set(0, 10, 0);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.sortElements = true;


    renderer.setSize(window.innerWidth, canvasHeight);
    $('#midnight-container').append(renderer.domElement);



    waterNormals = new THREE.ImageUtils.loadTexture('img/waternormals.jpg');
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    water = new THREE.Water(renderer, camera, scene, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      alpha: 1.0,

      waterColor: 0x001e0f,
      distortionScale: 50.0,
    });

    mirrorMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(oceanSize, oceanSize),
      water.material
    );

    mirrorMesh.add(water);
    mirrorMesh.rotation.x = -Math.PI * 0.5;
    mirrorMesh.renderDepth = 10;

    scene.add(mirrorMesh);

    createFireFlies();
  }

  function createFireFlies() {
    ffGroup = new SPE.Group({
      texture: new THREE.ImageUtils.loadTexture('img/firefly.png'),
      maxAge: 3
    });

    var emitter = new SPE.Emitter({
      position: new THREE.Vector3(0, 10, 0),
      positionSpread: new THREE.Vector3(100, 20, 300),
      sizeStart: 20,
      colorEnd: new THREE.Color(),
      particleCount: 1000,
      opacityStart: 0.5,
      opacityMiddle: 1,
      opacityEnd: 0.5,
      velocitySpread: new THREE.Vector3(5, 1, 5),
      accelerationSpread: new THREE.Vector3(2, 1, 2)
    })

    ffGroup.addEmitter(emitter);
    scene.add(ffGroup.mesh);
  }

  function animate() {
    requestAnimationFrame(animate);
    ffGroup.tick();
    water.material.uniforms.time.value += timeInc;
    water.render();
    renderer.render(scene, camera);

  }

  function onResize() {
    camera.aspect = window.innerWidth / canvasHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, canvasHeight);

  }

  window.addEventListener('resize', onResize, false);



}