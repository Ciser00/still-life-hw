import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ShaderMaterial, Shading } from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let clock = new THREE.Clock();

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let controls: OrbitControls;
let stats: any;
let sphere: THREE.Mesh;
let cube: THREE.Mesh;
let scube: THREE.Mesh;
let plane: THREE.Mesh;
let group: THREE.Group;
let standModel: THREE.Object3D;
let exampleTexture: THREE.Texture;

import vertexShader from '../resources/shaders/shader.vert?raw';
import fragmentShader from '../resources/shaders/shader.frag?raw';
let shaderMat: ShaderMaterial;

function main() {
    initScene();
    initStats();
    initListeners();
}

function initStats() {
    stats = new (Stats as any)();
    document.body.appendChild(stats.dom);
}

function initScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    lightAmbient = new THREE.AmbientLight(0x333333);
    scene.add(lightAmbient);

	// lightAmbient = new THREE.AmbientLight(0xffffff);
	// scene.add(lightAmbient);

    // Add a point light to add shadows
    // https://github.com/mrdoob/three.js/pull/14087#issuecomment-431003830
    const shadowIntensity = 0.25;

    lightPoint = new THREE.PointLight(0xffffff);
    lightPoint.position.set(-0.5, 0.5, 4);
    lightPoint.castShadow = true;
    lightPoint.intensity = shadowIntensity;
    scene.add(lightPoint);

	lightPoint = new THREE.PointLight(0xffffff)
	lightPoint.position.set(-0.5, 0.5, 4)
	lightPoint.castShadow = true;
	lightPoint.intensity = shadowIntensity;
	scene.add(lightPoint)

    const lightPoint2 = lightPoint.clone();
    lightPoint2.intensity = 1 - shadowIntensity;
    lightPoint2.castShadow = false;
    scene.add(lightPoint2);

    const mapSize = 1024; // Default 512
    const cameraNear = 0.5; // Default 0.5
    const cameraFar = 500; // Default 500
    lightPoint.shadow.mapSize.width = mapSize;
    lightPoint.shadow.mapSize.height = mapSize;
    lightPoint.shadow.camera.near = cameraNear;
    lightPoint.shadow.camera.far = cameraFar;

    // added sphere

    const geometrySphere = new THREE.SphereGeometry();
    const materialSphere = new THREE.MeshPhongMaterial({ color: 0x710B0B });
    sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.castShadow=true;
    sphere.position.set(-.9,-0.35,2)
    sphere.scale.set(.2,.2,.2)
    scene.add(sphere);

    // // Add a cube
    const geometryBox = new THREE.BoxGeometry();
    const materialBox = new THREE.MeshPhongMaterial({ color: 0x456789 });
    cube = new THREE.Mesh(geometryBox, materialBox);
    cube.castShadow = true;
    cube.position.set(.5,-.29,2);
    cube.scale.set(.5,.5,.5)
    cube.rotateY(200)
    scene.add(cube);
	
	// cubeMaterial.wireframe = true;

    cube = new THREE.Mesh(geometryBox, materialBox);
    cube.castShadow = true;
    cube.position.set(-0.4,-.29,2);
    cube.scale.set(.8,.5,.5)
    cube.rotateY(300)
    scene.add(cube);
    
    
    cube = new THREE.Mesh(geometryBox, materialBox);
    cube.castShadow = true;
    cube.position.set(0,0.21,2);
    cube.scale.set(.8,.5,.5)
    cube.rotateY(0)
    scene.add(cube);

    for (let i = -1; i < 9.4; i+=0.4) {
        for(let z = -5; z < 6; z+=1){
            cube = new THREE.Mesh(geometryBox, materialBox);
            cube.castShadow = true;
            cube.position.set(-4+i,z,-2);
            cube.scale.set(.1,.1,.1)
            cube.rotateY(300)
            scene.add(cube);
        }
      }


    // // load a texture and add created model
    let textureMaterial: THREE.Material;
	let textureLoader = new THREE.TextureLoader().setPath('../resources/textures/')
    textureLoader.load('stone_texture.jpg', function (texture) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        exampleTexture = texture;
		textureMaterial = new THREE.MeshBasicMaterial({map: texture});


        const modelLoader = new GLTFLoader().setPath('../resources/models/');
		modelLoader.load('stand.gltf', (gltf) => {
			standModel = gltf.scene;
			console.log(standModel)
			standModel.scale.set(0.009,0.003,0.005);
			standModel.position.x = 0.7;
            standModel.position.y = -1.5;
            standModel.castShadow = true;
		

			interface gltfMesh extends THREE.Object3D<THREE.Event> {
				material: THREE.Material
			}

            standModel.traverse((child: THREE.Object3D<THREE.Event>) => {
				console.log(child)
				console.log(child.type === "Mesh")
				if (child.type === "Mesh") {
					// (child as gltfMesh).material = teapotMat;
					(child as gltfMesh).material = textureMaterial;
				} 			
			})
			scene.add(standModel)
			///group.add(standModel)
		})
    });


	


    // // Add a plane
    const geometryPlane = new THREE.PlaneBufferGeometry(10, 10, 10, 10);
    const materialPlane = new THREE.MeshPhongMaterial({ 
		color: 0x110011, 
		side: THREE.DoubleSide,
		flatShading: true		
	});

    const uniforms = {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2(800,800) },
        // u_mouse: { type: 'v2', value: new THREE.Vector2() },
    };

    // shaderMat = new THREE.ShaderMaterial({
    //     uniforms: uniforms,
    //     vertexShader: vertexShader,
    //     fragmentShader: fragmentShader,
    // });

	shaderMat = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.DoubleSide
	})

    plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.position.z = -2;
    plane.receiveShadow = true;
    scene.add(plane);

    // // Init animation
    animate();
}

function initListeners() {
    window.addEventListener('resize', onWindowResize, false);

    window.addEventListener('keydown', (event) => {
        const { key } = event;

        switch (key) {
            case 'e':
                const win = window.open('', 'Canvas Image');

                const { domElement } = renderer;

                // Makse sure scene is rendered.
                renderer.render(scene, camera);

                const src = domElement.toDataURL();

                if (!win) return;

                win.document.write(`<img src='${src}' width='${domElement.width}' height='${domElement.height}'>`);
                break;

            default:
                break;
        }
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(() => {
        animate();
    });
    let delta = clock.getDelta();
	// console.log(vertArray)
    renderer.render(scene, camera);
}

main()
