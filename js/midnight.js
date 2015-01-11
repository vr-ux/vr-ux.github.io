function Midnight() {
  var scene, renderer, camera, controls, container;
  var water, mirrorMesh, waterNormals;
  var canvasHeight;
  var oceanSize = 20000;
  var timeInc = 1 / 60;
  var scrollOffset;
  var disabled = true;
  var ball;

  var ffGroup, starGroup;

  init()
  animate()

  function init() {

    canvasHeight = window.innerHeight * .5;

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
      alpha: 0.99,

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
    createStars();
    ball = new THREE.Mesh(new THREE.SphereGeometry(1, 64));
    ball.position.z = -100
    ball.position.y = -0.5
    scene.add(ball);
  }

  function createFireFlies() {
    ffGroup = new SPE.Group({
      texture: new THREE.ImageUtils.loadTexture('img/firefly.png'),
      maxAge: 1.7
    });

    var ffEmitter = new SPE.Emitter({
      position: new THREE.Vector3(0, 11, -160),
      positionSpread: new THREE.Vector3(500, 2, 300),
      sizeStart: 7,
      sizeStartSpread:5,
      colorEnd: new THREE.Color(),
      particleCount: 2000,
      opacityStart: 0.0,
      opacityMiddle: 1,
      opacityEnd: 0.0,
      velocitySpread: new THREE.Vector3(3, .5, 3),
      // accelerationSpread: new THREE.Vector3(1, 0.1, 1)
    })

    ffGroup.addEmitter(ffEmitter);
    scene.add(ffGroup.mesh);

  }

  function createStars(){
    starGroup = new SPE.Group({
      texture: new THREE.ImageUtils.loadTexture('img/smoke.png'),
      maxAge: 7
    });

    var starEmitter = new SPE.Emitter({
      position: new THREE.Vector3(0, 2000, -oceanSize/2),
      positionSpread: new THREE.Vector3(oceanSize * 10, 7000, 5000),
      particleCount: 10000,
      opacityStart: 0,
      opacityMiddle:1,
      opacityEnd: 0,
      sizeStart: 100,
      sizeMiddle: 200,
      sizeEnd: 100,
      sizeMiddleSpread: 50
    });

    starGroup.addEmitter(starEmitter); 

    scene.add(starGroup.mesh);
  }

  function animate() {
    requestAnimationFrame(animate);

    if(disabled){
      return;
    }
    ffGroup.tick();
    starGroup.tick();
    water.material.uniforms.time.value += timeInc;
    water.render();
    renderer.render(scene, camera);
    // ball.position.y += .1

  }

  function onResize() {
    camera.aspect = window.innerWidth / canvasHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, canvasHeight);

  }

  $(window).scroll(function() {


    scrollOffset = document.body.scrollTop;



    if (scrollOffset > canvasHeight + 20) {
      disabled = false;
    }

    if(scrollOffset < canvasHeight + 20){
      disabled = true;
    }

  });

  window.addEventListener('resize', onResize, false);



}