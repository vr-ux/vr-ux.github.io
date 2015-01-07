$(document).ready(function(){

	var scene, renderer, camera, w, h;

	init()
	animate()

	function init() {
		w = window.innerWidth;
		h = window.innerHeight
		camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000);
		scene = new THREE.Scene();
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(w, h);
		$('#canvas-container').prepend(renderer.domElement);


		var mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10));
		mesh.position.z = -30;
		scene.add(mesh);
	}

	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);

	}

	function onResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);

	}

	window.addEventListener('resize', onResize, false);
});
