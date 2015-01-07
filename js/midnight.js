//Should we leave some white space under enath gl canvas or have it full with an arrow pointing down to let user
//know they can scroll?

(function Midnight() {
  var scene, renderer, camera, controls, container;
  var waterNormals, time, water, mirrorMesh;
  var canvasHeight;
  var sun;
  var oceanSize = 20000;
  var sunStartHeight = 1500;
  var sunsetHeight = -1500;

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

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / canvasHeight, 1, 20000);
    camera.position.set(0, 10, -2000);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    skyColor.setHSL(skyHue, skySat, skyLight);
    renderer.setClearColor(skyColor);


    renderer.setSize(window.innerWidth, canvasHeight);
    $('#midnight-container').append(renderer.domElement);


    var sunGeo = new THREE.CircleGeometry(sunRadius, 64);
    var sunMat = new THREE.MeshBasicMaterial({
      color: 0xff0000
    });
    sun = new THREE.Mesh(sunGeo, sunMat);
    sun.position.y = sunStartHeight;
    sun.position.z = -oceanSize * 0.5;
    scene.add(sun);

    waterNormals = new THREE.ImageUtils.loadTexture('img/waternormals.jpg');
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    water = new THREE.Water(renderer, camera, scene, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      alpha: 1.0,

      sunColor: sun.material.color,
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
    water.material.uniforms.time.value += 1.0 / 60.0;
    water.render();
    renderer.render(scene, camera);

  }

  function onResize() {
    camera.aspect = window.innerWidth / canvasHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, canvasHeight);

  }

  window.addEventListener('resize', onResize, false);



  function map(value, min1, max1, min2, max2) {
    return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
  }

})();