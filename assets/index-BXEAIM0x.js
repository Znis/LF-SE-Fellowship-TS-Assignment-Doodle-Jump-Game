var M=Object.defineProperty;var q=(e,o,l)=>o in e?M(e,o,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[o]=l;var s=(e,o,l)=>(q(e,typeof o!="symbol"?o+"":o,l),l);(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))g(d);new MutationObserver(d=>{for(const f of d)if(f.type==="childList")for(const x of f.addedNodes)x.tagName==="LINK"&&x.rel==="modulepreload"&&g(x)}).observe(document,{childList:!0,subtree:!0});function l(d){const f={};return d.integrity&&(f.integrity=d.integrity),d.referrerPolicy&&(f.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?f.credentials="include":d.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function g(d){if(d.ep)return;d.ep=!0;const f=l(d);fetch(d.href,f)}})();const a={CANVAS_HEIGHT:450,CANVAS_WIDTH:300},_=50,T=50,b=12,S=40,W=40,O=40,p=40,I=50,C=.4,j=4e3,H=10,D=8;var c=(e=>(e.welcomeScreen="welcomeScreen",e.initialisation="initialisation",e.running="running",e.paused="paused",e.resume="resume",e.gameOver="gameOver",e.restart="restart",e))(c||{});const A={right:"./assets/images/doodler-right.png",left:"./assets/images/doodler-left.png"};var u=(e=>(e.right="right",e.left="left",e))(u||{}),P=(e=>(e.flexible="flexible",e.broken="broken",e))(P||{});const t={doodler:{},gameState:"welcomeScreen",score:0,highScore:0,platformArray:[],reqAnimFrame:0,gameOverTransition:150,jetAnimIdx:0,powerArray:[]},r={doodlerDir:"right",onGround:!0,onPlatform:!1,distanceFromGround:0,gravity:.4,dy:0,dx:0,fallDistance:500,hasPower:!1};class X{constructor(o,l,g,d){s(this,"startPoint");s(this,"h");s(this,"w");s(this,"imagePath");s(this,"direction");s(this,"image");this.startPoint=o,this.h=l,this.w=g,this.image=new Image,this.direction=d,this.imagePath=this.direction==u.right?A.right:A.left,this.image.src=this.imagePath,console.log(this.imagePath)}updateDoodler(){this.direction=r.doodlerDir,this.imagePath=this.direction==u.right?A.right:A.left,this.image.src=this.imagePath}}class h{constructor(o,l){s(this,"x");s(this,"y");s(this,"distance",o=>Math.sqrt((o.x-this.x)**2+(o.y-this.y)**2));this.x=o,this.y=l}}function y(e,o){return e+Math.floor((o-e)*Math.random())}class v{constructor(o,l,g,d){s(this,"startPoint");s(this,"h");s(this,"w");s(this,"imagePath");s(this,"image");s(this,"type");s(this,"move");s(this,"dx");this.startPoint=o,this.h=l,this.w=g,this.move=y(0,4)<1,this.dx=1,this.type=this.assignType(),this.image=new Image,this.imagePath=this.assignImgSrc()||d,this.image.src=this.imagePath}assignType(){return Math.random()<.1?P.broken:P.flexible}assignImgSrc(){if(this.type==P.flexible)return"./assets/images/platform-flexible.png";if(this.type==P.broken)return"./assets/images/platform-broken.png"}movePlatform(){this.move&&(this.startPoint.x+=this.dx,(this.startPoint.x+this.w>=a.CANVAS_WIDTH||this.startPoint.x<=0)&&(this.dx*=-1))}}class ${constructor(o,l,g,d){s(this,"startPoint");s(this,"h");s(this,"w");s(this,"imagePath");s(this,"image");this.startPoint=o,this.h=l,this.w=g,this.image=new Image,this.imagePath=d,this.image.src=this.imagePath}}function J(){t.doodler=new X(new h(a.CANVAS_WIDTH/2-T,a.CANVAS_HEIGHT-_),_,T,u.right)}function B(){let e=a.CANVAS_HEIGHT-p;for(;e>0;){let o=Math.floor(Math.random()*(a.CANVAS_WIDTH-S));const l=new v(new h(y(0,o),e),b,S,"./assets/images/platform.png");t.platformArray.push(l),e-=y(p,I)}}function K(){let e=Math.floor(Math.random()*(a.CANVAS_WIDTH-S));if(Math.random()<.04){const l=new $(new h(e,-O),W,O,"./assets/images/jetpack.png");t.powerArray.push(l)}const o=new v(new h(e,0),b,S,"./assets/images/platform.png");t.platformArray.unshift(o)}function Y(){console.log(r.distanceFromGround),r.distanceFromGround>a.CANVAS_HEIGHT&&t.platformArray.forEach(e=>{e.movePlatform()})}function U(){const e=t.doodler.startPoint.y-a.CANVAS_HEIGHT/2;e<0&&(t.doodler.startPoint.y-=e,t.platformArray.forEach(o=>{o.startPoint.y-=e}),t.powerArray.forEach(o=>{o.startPoint.y-=e}),t.platformArray[0].startPoint.y>y(p,I)&&(K(),t.score++,t.highScore=Math.max(t.highScore,t.score),r.distanceFromGround+=y(p,I)))}function G(e,o){return e.startPoint.x<o.startPoint.x+o.w&&e.startPoint.x+e.w>o.startPoint.x&&e.startPoint.y<o.startPoint.y+o.h&&e.startPoint.y+e.h>o.startPoint.y}function z(){t.doodler.startPoint.x+=r.dx,r.dx>0&&(r.dx-=C),r.dx<0&&(r.dx+=C)}function Q(){t.platformArray.forEach(e=>{G(t.doodler,e)&&r.dy>=0&&e.type==P.flexible&&(t.doodler.startPoint.y=e.startPoint.y-t.doodler.h,r.onPlatform=!0,r.onGround=!1,r.dy=-H)})}function V(){r.hasPower&&(r.dy=-H),r.dy+=r.gravity,t.doodler.startPoint.y+=r.dy,t.doodler.startPoint.y>=a.CANVAS_HEIGHT-t.doodler.h&&r.onGround&&(r.dy=-H),t.doodler.startPoint.y+t.doodler.h-r.gravity*2>=a.CANVAS_HEIGHT&&it(),t.doodler.startPoint.y<a.CANVAS_HEIGHT/2&&r.onPlatform}function Z(){t.doodler.startPoint.x>a.CANVAS_WIDTH?t.doodler.startPoint.x=0:r.dx=D,r.doodlerDir=u.right,t.doodler.updateDoodler()}function tt(){t.doodler.startPoint.x+t.doodler.w<0?t.doodler.startPoint.x=a.CANVAS_WIDTH-t.doodler.w:r.dx=-D,r.doodlerDir=u.left,t.doodler.updateDoodler()}function F(){t.gameState=c.initialisation,J(),B(),requestAnimationFrame(w)}function et(){t.gameState=c.running}function it(){t.gameState=c.gameOver}function ot(){t.powerArray.forEach(e=>{G(t.doodler,e)&&(r.hasPower||rt())})}function rt(){r.hasPower=!0;const e=setTimeout(()=>{clearTimeout(e),r.hasPower=!1},j)}function nt(){if(r.fallDistance>0){const e=t.doodler.startPoint.y-a.CANVAS_HEIGHT/2;t.platformArray.forEach(o=>{o.startPoint.y-=e}),t.powerArray.forEach(o=>{o.startPoint.y-=e}),t.doodler.startPoint.y-=e,t.doodler.startPoint.y+=5,r.fallDistance-=5}else t.gameOverTransition>0?N(t.gameOverTransition-=4):N(0),t.doodler.startPoint.y<a.CANVAS_HEIGHT&&(t.doodler.startPoint.y+=4)}function at(e,o,l){o.innerHTML=`${l}  &nbsp; &nbsp;<b>${t.score}</b>`,e.appendChild(o)}function st(){t.gameState==c.running&&(t.gameState=c.paused,cancelAnimationFrame(t.reqAnimFrame),ht())}function E(){t.gameState==c.paused&&(t.gameState=c.running,requestAnimationFrame(w))}function k(){t.score=0,r.distanceFromGround=0,r.onPlatform=!1,r.onGround=!0,r.dx=0,r.dy=0,t.gameOverTransition=150,t.platformArray=[],t.gameState=c.initialisation,cancelAnimationFrame(t.reqAnimFrame),F()}const lt="/LF-SE-Fellowship-TS-Assignment-Doodle-Jump-Game/assets/images/jetSheet.png",R=new Image;R.src=lt;const m={sprite:R,width:17,height:54,position:[new h(39,128),new h(8,0),new h(39,0),new h(71,0),new h(104,0),new h(8,64),new h(39,64),new h(71,64),new h(104,64),new h(8,128)]},n=document.querySelector("#gameCanvas"),i=n.getContext("2d");n.width=a.CANVAS_WIDTH;n.height=a.CANVAS_HEIGHT;function dt(){n.style.display="block",i.clearRect(0,0,a.CANVAS_WIDTH,a.CANVAS_HEIGHT),i.fillStyle="#f7efe7",i.fillRect(0,0,a.CANVAS_WIDTH,a.CANVAS_HEIGHT);for(let e=0;e<a.CANVAS_WIDTH;e+=20)i.beginPath(),i.moveTo(e,0),i.lineTo(e,a.CANVAS_HEIGHT),i.strokeStyle="#efdbc6",i.stroke();for(let e=0;e<a.CANVAS_HEIGHT;e+=20)i.beginPath(),i.moveTo(0,e),i.lineTo(a.CANVAS_HEIGHT,e),i.strokeStyle="#efdbc6",i.stroke();t.platformArray.forEach(e=>{i.beginPath(),i.drawImage(e.image,e.startPoint.x,e.startPoint.y,e.w,e.h)}),r.hasPower||t.powerArray.forEach(e=>{i.drawImage(e.image,e.startPoint.x,e.startPoint.y,e.w,e.h)}),r.hasPower&&(t.jetAnimIdx<9?t.jetAnimIdx++:t.jetAnimIdx=0,r.doodlerDir==u.right?i.drawImage(m.sprite,m.position[t.jetAnimIdx].x,m.position[t.jetAnimIdx].y,m.width,m.height,t.doodler.startPoint.x-14,t.doodler.startPoint.y+10,20,50):i.drawImage(m.sprite,m.position[t.jetAnimIdx].x,m.position[t.jetAnimIdx].y,m.width,m.height,t.doodler.startPoint.x+T-5,t.doodler.startPoint.y+10,20,50)),ct(),i.beginPath(),i.drawImage(t.doodler.image,t.doodler.startPoint.x,t.doodler.startPoint.y,t.doodler.w,t.doodler.h)}n.addEventListener("click",()=>{t.gameState==c.gameOver&&k(),t.gameState==c.paused&&E()});function ct(){i.font="24px Outfit",i.fillStyle="#FF5733",i.fillText("Score: "+t.score,55,30)}function N(e){i.fillStyle="rgba(255, 255, 255, 0.4)",i.fillRect(0,n.height/2,n.width,n.height),i.font="32px Outfit",i.fillStyle="#ff0000",i.fillText("Game Over",n.width/2-10,n.height+(e-150)),i.font="32px Outfit",i.fillText(`Score: ${t.score}`,n.width/2-5,n.height+(e-100)),i.font="20px Outfit",i.fillText(`High Score: ${t.highScore}`,n.width/2-5,n.height+(e-50)),i.font="18px Outfit",i.fillText("Click to Restart",n.width/2-5,n.height+(e-10))}function ht(){i.fillStyle="rgba(0, 0, 0, 0.7)",i.fillRect(0,0,n.width,n.height),i.font="32px Outfit",i.fillStyle="orange",i.fillText("Game Paused",n.width/2-10,n.height/2-50),i.font="24px Outfit",i.fillText(`Score: ${t.score}`,n.width/2-5,n.height/2+10),i.font="20px Outfit",i.fillText(`High Score: ${t.highScore}`,n.width/2-5,n.height/2+70),i.font="18px Outfit",i.fillText("Click to Resume",n.width/2-5,n.height/2+140)}function ft(){i.font="20px Arial",i.fillStyle="black",i.textAlign="center",i.fillText("Press R to Start",n.width/2,n.height-60)}window.addEventListener("keydown",e=>{switch(e.key){case"w":{V();break}case"d":{Z();break}case"a":{tt();break}case"r":{t.gameState==c.gameOver&&k(),t.gameState==c.paused&&E(),t.gameState==c.initialisation&&et();break}case"q":{t.gameState==c.running?st():t.gameState==c.paused&&E();break}}});const mt=document.querySelector("#info-screen"),gt=document.querySelector("#enter-btn"),ut=document.querySelector("#side-title"),Pt=document.querySelector("#name"),yt=document.querySelector("#right-container"),At=document.querySelector("#leaderboard-ol"),St=document.createElement("li");let L="";gt.addEventListener("click",()=>{mt.style.display="none",L=Pt.value||"",yt.style.display="flex",ut.style.display="block",t.gameState=c.initialisation,F()});function w(){t.reqAnimFrame=requestAnimationFrame(w),dt(),t.gameState==c.initialisation?ft():t.gameState==c.running?(U(),V(),z(),Y(),Q(),ot()):t.gameState==c.gameOver&&(at(At,St,L),nt(),t.highScore=t.score>t.highScore?t.score:t.highScore)}t.gameState!=c.welcomeScreen&&requestAnimationFrame(w);
