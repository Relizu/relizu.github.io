// @ts-check

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("background"));
const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext("2d"));
canvas.height = 3000
canvas.width = window.innerWidth
ctx.imageSmoothingEnabled = false;





const drop = new Image();
drop.src = "drop.png";

const cloud = new Image();
cloud.src = "cloud.png";

const road = new Image();
road.src = "road.png";


let droppos=[1];
let dropy=[1];
let cloudx =[0,200,400,600,800,1000,1200,1400];


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let sy = Math.min(255, Math.floor(window.scrollY / 5));
    let hex = sy.toString(16).padStart(2, "0");
    ctx.fillStyle = `#${hex}${hex}${hex}`;
    ctx.fillRect(0,-200,canvas.width, canvas.height+1000)
    ctx.drawImage(road,0,780,canvas.width,canvas.width/8)
    if(Math.random()>0){
        droppos.push(Math.random()*1800)
        dropy.push(0);
    }
    for (let p=0;p <droppos.length;p++) {
        ctx.drawImage(drop,droppos[p],dropy[p],10,10);
        dropy[p]+=15
        droppos[p]-=5;
        if(dropy[p]>1000){
            dropy.splice(p,1)
            droppos.splice(p,1)
        }
    }
    for (let c = 0; c <cloudx.length;c++){
        ctx.drawImage(cloud,cloudx[c],-50,250,100);
        cloudx[c]-=1
        if(cloudx[c]<-250){
            cloudx[c]=1400
        }
    }

    requestAnimationFrame(draw);
}

draw();