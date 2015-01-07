
//NEED TO GRACEFULLY LOAD IN WEBGL!!
$(document).ready(function() {

	var scene, renderer, camera, controls;
	var waterNormals, time, water, mirrorMesh;
	var sun;
	var oceanSize = 20000;
	var sunRadius = 1100;
	var sunStartHeight = sunRadius * 2;
	var sunsetHeight = -sunRadius * 2;
	var color

	init()
	animate()

	function init() {


		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.set(0, 400, 1000);
		scene = new THREE.Scene();
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		$('#canvas-container').prepend(renderer.domElement);


		var sunGeo = new THREE.CircleGeometry(sunRadius, 64);
		var sunMat = new THREE.MeshBasicMaterial({
			color: 0xff0000
		});
		sun = new THREE.Mesh(sunGeo, sunMat);
		sun.position.y = sunStartHeight;
		sun.position.z = -oceanSize/2.5
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
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);

	}

	window.addEventListener('resize', onResize, false);

	$(window).scroll(function() {
		var pos = map(document.body.scrollTop, 0, 483, sunStartHeight, sunsetHeight )
		sun.position.y = Math.min(pos, sunStartHeight);

	});

	function map(value, min1, max1, min2, max2) {
    return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
  }
});