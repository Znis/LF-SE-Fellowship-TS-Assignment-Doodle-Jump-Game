var L=Object.defineProperty;var M=(t,i,c)=>i in t?L(t,i,{enumerable:!0,configurable:!0,writable:!0,value:c}):t[i]=c;var s=(t,i,c)=>(M(t,typeof i!="symbol"?i+"":i,c),c);(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))g(l);new MutationObserver(l=>{for(const f of l)if(f.type==="childList")for(const x of f.addedNodes)x.tagName==="LINK"&&x.rel==="modulepreload"&&g(x)}).observe(document,{childList:!0,subtree:!0});function c(l){const f={};return l.integrity&&(f.integrity=l.integrity),l.referrerPolicy&&(f.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?f.credentials="include":l.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function g(l){if(l.ep)return;l.ep=!0;const f=c(l);fetch(l.href,f)}})();const a={CANVAS_HEIGHT:450,CANVAS_WIDTH:300},O=50,T=50,D=12,S=40,q=40,_=40,p=40,I=50,C=.4,W=4e3,H=10,b=8;var d=(t=>(t.welcomeScreen="welcomeScreen",t.initialisation="initialisation",t.running="running",t.paused="paused",t.resume="resume",t.gameOver="gameOver",t.restart="restart",t))(d||{});const A={right:"./assets/images/doodler-right.png",left:"./assets/images/doodler-left.png"};var u=(t=>(t.right="right",t.left="left",t))(u||{}),P=(t=>(t.flexible="flexible",t.broken="broken",t))(P||{});const e={doodler:{},gameState:"welcomeScreen",score:0,highScore:0,platformArray:[],reqAnimFrame:0,gameOverTransition:150,jetAnimIdx:0,powerArray:[]},r={doodlerDir:"right",onGround:!0,onPlatform:!1,distanceFromGround:0,gravity:.4,dy:0,dx:0,fallDistance:500,hasPower:!1};class j{constructor(i,c,g,l){s(this,"startPoint");s(this,"h");s(this,"w");s(this,"imagePath");s(this,"direction");s(this,"image");this.startPoint=i,this.h=c,this.w=g,this.image=new Image,this.direction=l,this.imagePath=this.direction==u.right?A.right:A.left,this.image.src=this.imagePath}updateDoodler(){this.direction=r.doodlerDir,this.imagePath=this.direction==u.right?A.right:A.left,this.image.src=this.imagePath}}class h{constructor(i,c){s(this,"x");s(this,"y");s(this,"distance",i=>Math.sqrt((i.x-this.x)**2+(i.y-this.y)**2));this.x=i,this.y=c}}function y(t,i){return t+Math.floor((i-t)*Math.random())}class v{constructor(i,c,g,l){s(this,"startPoint");s(this,"h");s(this,"w");s(this,"imagePath");s(this,"image");s(this,"type");s(this,"move");s(this,"dx");this.startPoint=i,this.h=c,this.w=g,this.move=y(0,4)<1,this.dx=1,this.type=this.assignType(),this.image=new Image,this.imagePath=this.assignImgSrc()||l,this.image.src=this.imagePath}assignType(){return Math.random()<.05?P.broken:P.flexible}assignImgSrc(){if(this.type==P.flexible)return"./assets/images/platform-flexible.png";if(this.type==P.broken)return"./assets/images/platform-broken.png"}movePlatform(){this.move&&(this.startPoint.x+=this.dx,(this.startPoint.x+this.w>=a.CANVAS_WIDTH||this.startPoint.x<=0)&&(this.dx*=-1))}}class X{constructor(i,c,g,l){s(this,"startPoint");s(this,"h");s(this,"w");s(this,"imagePath");s(this,"image");this.startPoint=i,this.h=c,this.w=g,this.image=new Image,this.imagePath=l,this.image.src=this.imagePath}}function $(){e.doodler=new j(new h(a.CANVAS_WIDTH/2-T,a.CANVAS_HEIGHT-O),O,T,u.right)}function J(){let t=a.CANVAS_HEIGHT-p;for(;t>0;){let i=Math.floor(Math.random()*(a.CANVAS_WIDTH-S));const c=new v(new h(y(0,i),t),D,S,"./assets/images/platform.png");e.platformArray.push(c),t-=y(p,I)}}function B(){let t=Math.floor(Math.random()*(a.CANVAS_WIDTH-S));K(t);const i=new v(new h(t,0),D,S,"./assets/images/platform.png");e.platformArray.unshift(i)}function K(t){if(Math.random()<.04){const i=new X(new h(t,-_),q,_,"./assets/images/jetpack.png");e.powerArray.push(i)}}function Y(){r.distanceFromGround>a.CANVAS_HEIGHT&&e.platformArray.forEach(t=>{t.movePlatform()})}function U(){const t=e.doodler.startPoint.y-a.CANVAS_HEIGHT/2;t<0&&(e.doodler.startPoint.y-=t,e.platformArray.forEach(i=>{i.startPoint.y-=t}),e.powerArray.forEach(i=>{i.startPoint.y-=t}),z())}function z(){e.platformArray[0].startPoint.y>y(p,I)&&(B(),e.score++,e.highScore=Math.max(e.highScore,e.score),r.distanceFromGround+=y(p,I))}function G(t,i){return t.startPoint.x<i.startPoint.x+i.w&&t.startPoint.x+t.w>i.startPoint.x&&t.startPoint.y<i.startPoint.y+i.h&&t.startPoint.y+t.h>i.startPoint.y}function Q(){e.doodler.startPoint.x+=r.dx,r.dx>0&&(r.dx-=C),r.dx<0&&(r.dx+=C)}function Z(){e.platformArray.forEach(t=>{G(e.doodler,t)&&r.dy>=0&&t.type==P.flexible&&(e.doodler.startPoint.y=t.startPoint.y-e.doodler.h,r.onPlatform=!0,r.onGround=!1,r.dy=-H)})}function tt(){r.hasPower&&(r.dy=-H),r.dy+=r.gravity,e.doodler.startPoint.y+=r.dy,e.doodler.startPoint.y>=a.CANVAS_HEIGHT-e.doodler.h&&r.onGround&&(r.dy=-H),e.doodler.startPoint.y+e.doodler.h-r.gravity*2>=a.CANVAS_HEIGHT&&rt()}function et(){e.doodler.startPoint.x>a.CANVAS_WIDTH?e.doodler.startPoint.x=0:r.dx=b,r.doodlerDir=u.right,e.doodler.updateDoodler()}function it(){e.doodler.startPoint.x+e.doodler.w<0?e.doodler.startPoint.x=a.CANVAS_WIDTH-e.doodler.w:r.dx=-b,r.doodlerDir=u.left,e.doodler.updateDoodler()}function V(){e.gameState=d.initialisation,$(),J(),requestAnimationFrame(w)}function ot(){e.gameState=d.running}function rt(){e.gameState=d.gameOver}function nt(){e.powerArray.forEach(t=>{G(e.doodler,t)&&(r.hasPower||at())})}function at(){r.hasPower=!0;const t=setTimeout(()=>{clearTimeout(t),r.hasPower=!1},W)}function st(){if(r.fallDistance>0){const t=e.doodler.startPoint.y-a.CANVAS_HEIGHT/2;e.platformArray.forEach(i=>{i.startPoint.y-=t}),e.powerArray.forEach(i=>{i.startPoint.y-=t}),e.doodler.startPoint.y-=t,e.doodler.startPoint.y+=5,r.fallDistance-=5}else e.gameOverTransition>0?N(e.gameOverTransition-=4):N(0),e.doodler.startPoint.y<a.CANVAS_HEIGHT&&(e.doodler.startPoint.y+=4)}function lt(t,i,c){i.innerHTML=`${c}  &nbsp; &nbsp;<b>${e.score}</b>`,t.appendChild(i)}function dt(){e.gameState==d.running&&(e.gameState=d.paused,cancelAnimationFrame(e.reqAnimFrame),mt())}function E(){e.gameState==d.paused&&(e.gameState=d.running,requestAnimationFrame(w))}function F(){e.score=0,r.distanceFromGround=0,r.onPlatform=!1,r.onGround=!0,r.dx=0,r.dy=0,e.gameOverTransition=150,e.platformArray=[],e.gameState=d.initialisation,cancelAnimationFrame(e.reqAnimFrame),V()}const ct="/LF-SE-Fellowship-TS-Assignment-Doodle-Jump-Game/assets/images/jetSheet.png",R=new Image;R.src=ct;const m={sprite:R,width:17,height:54,position:[new h(39,128),new h(8,0),new h(39,0),new h(71,0),new h(104,0),new h(8,64),new h(39,64),new h(71,64),new h(104,64),new h(8,128)]},n=document.querySelector("#gameCanvas"),o=n.getContext("2d");n.width=a.CANVAS_WIDTH;n.height=a.CANVAS_HEIGHT;function ht(){n.style.display="block",o.clearRect(0,0,a.CANVAS_WIDTH,a.CANVAS_HEIGHT),o.fillStyle="#f7efe7",o.fillRect(0,0,a.CANVAS_WIDTH,a.CANVAS_HEIGHT);for(let t=0;t<a.CANVAS_WIDTH;t+=20)o.beginPath(),o.moveTo(t,0),o.lineTo(t,a.CANVAS_HEIGHT),o.strokeStyle="#efdbc6",o.stroke();for(let t=0;t<a.CANVAS_HEIGHT;t+=20)o.beginPath(),o.moveTo(0,t),o.lineTo(a.CANVAS_HEIGHT,t),o.strokeStyle="#efdbc6",o.stroke();e.platformArray.forEach(t=>{o.beginPath(),o.drawImage(t.image,t.startPoint.x,t.startPoint.y,t.w,t.h)}),r.hasPower||e.powerArray.forEach(t=>{o.drawImage(t.image,t.startPoint.x,t.startPoint.y,t.w,t.h)}),r.hasPower&&(e.jetAnimIdx<9?e.jetAnimIdx++:e.jetAnimIdx=0,r.doodlerDir==u.right?o.drawImage(m.sprite,m.position[e.jetAnimIdx].x,m.position[e.jetAnimIdx].y,m.width,m.height,e.doodler.startPoint.x-14,e.doodler.startPoint.y+10,20,50):o.drawImage(m.sprite,m.position[e.jetAnimIdx].x,m.position[e.jetAnimIdx].y,m.width,m.height,e.doodler.startPoint.x+T-5,e.doodler.startPoint.y+10,20,50)),ft(),o.beginPath(),o.drawImage(e.doodler.image,e.doodler.startPoint.x,e.doodler.startPoint.y,e.doodler.w,e.doodler.h)}n.addEventListener("click",()=>{e.gameState==d.gameOver&&F(),e.gameState==d.paused&&E()});function ft(){o.font="24px Outfit",o.fillStyle="#FF5733",o.fillText("Score: "+e.score,55,30)}function N(t){o.fillStyle="rgba(255, 255, 255, 0.4)",o.fillRect(0,n.height/2,n.width,n.height),o.font="32px Outfit",o.fillStyle="#ff0000",o.fillText("Game Over",n.width/2-10,n.height+(t-150)),o.font="32px Outfit",o.fillText(`Score: ${e.score}`,n.width/2-5,n.height+(t-100)),o.font="20px Outfit",o.fillText(`High Score: ${e.highScore}`,n.width/2-5,n.height+(t-50)),o.font="18px Outfit",o.fillText("Click to Restart",n.width/2-5,n.height+(t-10))}function mt(){o.fillStyle="rgba(0, 0, 0, 0.7)",o.fillRect(0,0,n.width,n.height),o.font="32px Outfit",o.fillStyle="orange",o.fillText("Game Paused",n.width/2-10,n.height/2-50),o.font="24px Outfit",o.fillText(`Score: ${e.score}`,n.width/2-5,n.height/2+10),o.font="20px Outfit",o.fillText(`High Score: ${e.highScore}`,n.width/2-5,n.height/2+70),o.font="18px Outfit",o.fillText("Click to Resume",n.width/2-5,n.height/2+140)}function gt(){o.font="20px Arial",o.fillStyle="black",o.textAlign="center",o.fillText("Press R to Start",n.width/2,n.height-60)}window.addEventListener("keydown",t=>{switch(t.key){case"d":{et();break}case"a":{it();break}case"r":{e.gameState==d.gameOver&&F(),e.gameState==d.paused&&E(),e.gameState==d.initialisation&&ot();break}case"q":{e.gameState==d.running?dt():e.gameState==d.paused&&E();break}}});const ut=document.querySelector("#info-screen"),Pt=document.querySelector("#enter-btn"),yt=document.querySelector("#side-title"),At=document.querySelector("#name"),St=document.querySelector("#right-container"),pt=document.querySelector("#leaderboard-ol"),wt=document.createElement("li");let k="";Pt.addEventListener("click",()=>{ut.style.display="none",k=At.value||"",St.style.display="flex",yt.style.display="block",e.gameState=d.initialisation,V()});function w(){e.reqAnimFrame=requestAnimationFrame(w),ht(),e.gameState==d.initialisation?gt():e.gameState==d.running?(U(),tt(),Q(),Y(),Z(),nt()):e.gameState==d.gameOver&&(lt(pt,wt,k),st(),e.highScore=e.score>e.highScore?e.score:e.highScore)}e.gameState!=d.welcomeScreen&&requestAnimationFrame(w);
