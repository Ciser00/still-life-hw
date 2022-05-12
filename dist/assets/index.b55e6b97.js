import{S as A,a as E,P as F,W as G,b as O,O as k,A as B,c as x,d as U,M as P,e as m,B as j,T as D,R as H,f as N,G as T,g as Y,D as L,h as I,C as $,V as q}from"./vendor.0c231df0.js";const K=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&r(p)}).observe(document,{childList:!0,subtree:!0});function c(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=c(t);fetch(t.href,i)}};K();var J=`precision mediump float;

uniform float u_time;

varying vec2 UV;

void main(){
	UV = uv;
	vec4 mvPosition = modelViewMatrix*vec4(position,1.);
	mvPosition.y += sin(u_time / 2. + uv.x) * 2.0;
	mvPosition.x += cos(u_time / 1.3 + uv.y) * 2.0;
	gl_Position = projectionMatrix*mvPosition;
}`,Q=`precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 UV;

void main(void){
	vec2 position = UV * 2. - 1.;
	
	float red = abs( 
		sin(position.x * position.y + u_time / 5.)
	);
	float green = abs( 
		sin(position.x * position.y + u_time / 4.) 
	);
	float blue = abs( 
		sin(position.x * position.y + u_time / 3.) 
	);

	gl_FragColor=vec4(red, green, blue, 1.0);
}`;let a,o,u,X=new $,M,n,_,h,e,S,l;function Z(){te(),ee(),ne()}function ee(){_=new A,document.body.appendChild(_.dom)}function te(){o=new E,u=new F(75,window.innerWidth/window.innerHeight,.1,1e3),u.position.z=5,a=new G,a.shadowMap.enabled=!0,a.shadowMap.type=O,a.setPixelRatio(window.devicePixelRatio),a.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(a.domElement),new k(u,a.domElement),M=new B(3355443),o.add(M);const w=.25;n=new x(16777215),n.position.set(-.5,.5,4),n.castShadow=!0,n.intensity=w,o.add(n),n=new x(16777215),n.position.set(-.5,.5,4),n.castShadow=!0,n.intensity=w,o.add(n);const s=n.clone();s.intensity=1-w,s.castShadow=!1,o.add(s);const c=1024,r=.5,t=500;n.shadow.mapSize.width=c,n.shadow.mapSize.height=c,n.shadow.camera.near=r,n.shadow.camera.far=t;const i=new U,p=new P({color:7408395});h=new m(i,p),h.castShadow=!0,h.position.set(-.9,-.35,2),h.scale.set(.2,.2,.2),o.add(h);const f=new j,g=new P({color:4548489});e=new m(f,g),e.castShadow=!0,e.position.set(.5,-.29,2),e.scale.set(.5,.5,.5),e.rotateY(200),o.add(e),e=new m(f,g),e.castShadow=!0,e.position.set(-.4,-.29,2),e.scale.set(.8,.5,.5),e.rotateY(300),o.add(e),e=new m(f,g),e.castShadow=!0,e.position.set(0,.21,2),e.scale.set(.8,.5,.5),e.rotateY(0),o.add(e);for(let d=-1;d<9.4;d+=.4)for(let y=-5;y<6;y+=1)e=new m(f,g),e.castShadow=!0,e.position.set(-4+d,y,-2),e.scale.set(.1,.1,.1),e.rotateY(300),o.add(e);let b;new D().setPath("../resources/textures/").load("stone_texture.jpg",function(d){d.wrapS=d.wrapT=H,d.anisotropy=a.capabilities.getMaxAnisotropy(),b=new N({map:d}),new T().setPath("../resources/models/").load("stand.gltf",V=>{l=V.scene,console.log(l),l.scale.set(.009,.003,.005),l.position.x=.7,l.position.y=-1.5,l.castShadow=!0,l.traverse(v=>{console.log(v),console.log(v.type==="Mesh"),v.type==="Mesh"&&(v.material=b)}),o.add(l)})});const C=new Y(10,10,10,10),W=new P({color:1114129,side:L,flatShading:!0}),R={u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new q(800,800)}};new I({uniforms:R,vertexShader:J,fragmentShader:Q,side:L}),S=new m(C,W),S.position.z=-2,S.receiveShadow=!0,o.add(S),z()}function ne(){window.addEventListener("resize",oe,!1),window.addEventListener("keydown",w=>{const{key:s}=w;switch(s){case"e":const c=window.open("","Canvas Image"),{domElement:r}=a;a.render(o,u);const t=r.toDataURL();if(!c)return;c.document.write(`<img src='${t}' width='${r.width}' height='${r.height}'>`);break}})}function oe(){u.aspect=window.innerWidth/window.innerHeight,u.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight)}function z(){requestAnimationFrame(()=>{z()}),X.getDelta(),a.render(o,u)}Z();
