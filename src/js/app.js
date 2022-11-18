import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import fragment from '../shaders/fragment.glsl';
import vertex from '../shaders/vertex.glsl';

export default class Sketch {
    constructor (options){     
        this.container = options.domElement;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.time = 0

        this.addScene();
        this.resize();
        this.addObjects(); 
        this.render();
        this.setupResize();
    }
    resize(){
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.controls.update();
    }
    setupResize(){
        window.addEventListener('resize', this.resize.bind(this));
    }
    addScene(){
        this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
        this.camera.position.z = 1;
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild( this.renderer.domElement );
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);


    }
    addObjects(){
        this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: {
                    value: 1.0
                },
                resolution: {
                    value: new THREE.Vector2()
                }
            },
            vertexShader: vertex,

            fragmentShader: fragment
        });
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
        
    }
    render(){
        this.time += 1;
        this.renderer.render( this.scene, this.camera );
        requestAnimationFrame(this.render.bind(this));
    }
}

new Sketch({
    domElement: document.getElementById('container')
});