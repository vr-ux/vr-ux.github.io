$(document).ready(function() {

	var scene, renderer, camera, w, h;
	var waterNormals, time, water, mirrorMesh;

	init()
	animate()

	function init() {
		w = window.innerWidth;
		h = window.innerHeight
		camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000);
		camera.position.set( 2000, 750, 2000 );
		scene = new THREE.Scene();
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(w, h);
		$('#canvas-container').prepend(renderer.domElement);



		var mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10));
		mesh.position.z = -30;
		scene.add(mesh);

		waterNormals = new THREE.ImageUtils.loadTexture('img/waternormals.jpg');
		waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

		water = new THREE.Water(renderer, camera, scene, {
			textureWidth: 512,
			textureHeight: 512,
			waterNormals: waterNormals,
			alpha: 1.0,
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 50.0,
		});

		mirrorMesh = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(5000, 5000),
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
});