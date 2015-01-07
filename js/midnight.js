//Should we leave some white space under enath gl canvas or have it full with an arrow pointing down to let user
//know they can scroll?

function Midnight() {
  var scene, renderer, camera, controls, container;
  var waterNormals, time, water, mirrorMesh;
  var canvasHeight;
  var oceanSize = 20000;



  init()
  animate()

  function init() {

    canvasHeight = window.innerHeight;

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / canvasHeight, 1, 20000);
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
    debugger
    scene.add(mirrorMesh);
  }

  function animate() {
    requestAnimationFrame(animate);
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

};