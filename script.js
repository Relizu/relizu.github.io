// @ts-check

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("background"));
const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext("2d"));
canvas.height = 2000
canvas.width = window.innerWidth
ctx.imageSmoothingEnabled = false;

let wordlist=["Scroll down ;>.","live laugh love","Hi!","I'm an engineer","isn't this cool?","may 10th is a special day", "Egypt","I LOVE CATS!","Canvas","Machine Learning","Patience!",""]



const drop = new Image();
drop.src = "drop.png";

const cloud = new Image();
cloud.src = "cloud.png";

const road = new Image();
road.src = "road.png";

const box = new Image();
box.src = "box.png";

let droplist={x:[1],y:[1]};
let cloudx =[0,200,400,600,800,1000,1200,1400];
let texts={size:[20],direction:[0],x:[1],y:[1],contents:[""]};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let sy = Math.min(255, Math.floor(window.scrollY / 5));
    let hex = sy.toString(16).padStart(2, "0");
    ctx.fillStyle = `#${hex}${hex}${hex}`;
    ctx.fillRect(0,-200,canvas.width, canvas.height+1000)
    ctx.fillStyle="#ffffff";
    ctx.font = "80px sans-serif"; 
    ctx.fillText("Welcome",(canvas.width-300)/2,300,1000);
    ctx.fillText("To",(canvas.width-50)/2,370,1000);
    ctx.fillText("My Mind.~",(canvas.width-250)/2,440,1000);

    ctx.drawImage(road,0,780,canvas.width,canvas.width/8)
    if(Math.random()>0.97){
        texts.size.push(10+Math.random()*20);
        texts.direction.push(Math.floor(Math.random() * 2));
        texts.y.push(Math.random()*1000);
        if(texts.direction[texts.direction.length-1]==1){
            texts.x.push(1600);
        }else{
            texts.x.push(-300);
        }
        texts.contents.push(wordlist[Math.floor(Math.random()*wordlist.length)]);
    }
    droplist.x.push(Math.random()*1800);
    droplist.y.push(0);
    for (let p=0;p <droplist.x.length;p++) {
        ctx.drawImage(drop,droplist.x[p],droplist.y[p],10,10);
        droplist.y[p]+=15
        droplist.x[p]-=5;
        if(droplist.y[p]>1000){
            droplist.y.splice(p,1)
            droplist.x.splice(p,1)
        }
    }
    for (let c = 0; c <cloudx.length;c++){
        ctx.drawImage(cloud,cloudx[c],-50,250,100);
        cloudx[c]-=1
        if(cloudx[c]<-250){
            cloudx[c]=1400
        }
    }
    for(let t=0; t<texts.x.length;t++){
        ctx.font =texts.size[t].toString()+"px Arial";
        ctx.fillText(texts.contents[t],texts.x[t],texts.y[t],1000);
        if(texts.direction[t]==1){
            texts.x[t] -=1;
            if(texts.x[t]<-300){
                texts.x.splice(t,1);
                texts.y.splice(t,1);
                texts.contents.splice(t,1);
                texts.direction.splice(t,1);
                texts.size.splice(t,1);
            }
        }else{
            texts.x[t] +=1;
            if(texts.x[t]>1600){
                texts.x.splice(t,1);
                texts.y.splice(t,1);
                texts.contents.splice(t,1);
                texts.direction.splice(t,1);
                texts.size.splice(t,1);
            }
        }
        
    }

    ctx.drawImage(box,(canvas.width-250)/2,1500,250,200)
    requestAnimationFrame(draw);
}

draw();