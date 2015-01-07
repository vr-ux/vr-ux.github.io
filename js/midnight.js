function Midnight() {
  var scene, renderer, camera, controls, container;
  var water, mirrorMesh, waterNormals;
  var canvasHeight;
  var sun;
  var oceanSize = 20000;
  var sunStartHeight = 1500;
  var sunsetHeight = -1500;
  var timeInc = 1/60;

  var skyColor = new THREE.Color();
  var startSkyHue = 0.12;
  var endSkyHue = -0.28;
  var startSkyLight = 0.5;
  var endSkyLight = 0.11;
  var skySat = 0.86;
  var skyHue = startSkyHue;
  var skyLight = startSkyLight

  var sunStartScale = 1;
  var sunEndScale = 2;
  var sunRadius = 1500;
  var sunScale =1;

  var scrollOffset;

  init()
  animate()

  function init() {

    canvasHeight = window.innerHeight;

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / canvasHeight, 1, 20000);
    camera.position.set(0, 10, -2000);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();


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
    scene.add(mirrorMesh);
  }

  function animate() {
    requestAnimationFrame(animate);
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